/**
 * Created by ihaiu@qq.com on 2016-12-29.
 * http://blog.ihaiu.com
 */


this.app = this.app || {};
(function(){

	var Data = function()
    {

    };

    // var p = Data.prototype;
    var p = Data;

    p.list 						= {};
    p.assetTotalNum 			= 0;

    p.assetListDictByRefType    = {};
    p.assetListDictByAssetType  = {};

    p.dictByGuid = {};
    p.dictByName = {};


    /** 初始化数据 */
    p.init = function ()
    {
    	this.list = guidData.list;
    	this.assetTotalNum = this.list.length;

    	for(var i = 0; i < this.assetTotalNum; i ++)
    	{
    		var item = this.list[i];

    		this.dictByGuid[item.guid] = item;
    		this.dictByName[item.filename] = item;
    		this.addAssetByRefType(item);
    		this.addAssetByAssetType(item);
    	}

    	for(var i = 0; i < this.assetTotalNum; i ++)
    	{
    		var item = this.list[i];
    		item.defList = [];
    		item.refList = [];
            item.defIndList = [];
            item.defDict = {};

            item.defNum = item.depGUIDList.length;
            item.refNum = item.refGUIDList.length;

    		for(var d = 0; d < item.depGUIDList.length; d ++)
    		{
    			var def = this.getAssetByGUID(item.depGUIDList[d]);
    			item.defList.push(def);
    		}


    		for(var d = 0; d < item.refGUIDList.length; d ++)
    		{
    			var ref = this.getAssetByGUID(item.refGUIDList[d]);
    			item.refList.push(ref);
    		}
    	}

        for(var i = 0; i < this.assetTotalNum; i ++)
        {
            var item = this.list[i];
            this.generateDefIndList(item, null);
        }



        for(var i = 0; i < this.assetTotalNum; i ++)
        {
            var item = this.list[i];
            item.defIndNum = item.defIndList.length;
        }
    };

    p.generateDefIndList = function(item, parents)
    {
        if(parents == null)
        {
            for(var i = 0; i < item.refList.length; i ++)
            {
                item.refList[i].defDict[item.guid] = item;
                this.generateDefIndList(item, item.refList[i].refList);
            }
        }
        else
        {
            for(var i = 0; i < parents.length; i ++)
            {
                if(parents[i].defDict[item.guid] == null)
                {
                    parents[i].defDict[item.guid] = item;
                    parents[i].defIndList.push(item);
                    this.generateDefIndList(item, parents[i].refList);
                }
            }
        }
    };

    /** 添加资源到 refType Dict */
    p.addAssetByRefType = function(item)
    {
    	this.assetListDictByRefType[item.refType] = this.assetListDictByRefType[item.refType] || []
    	this.assetListDictByRefType[item.refType].push(item);
    }



    /** 添加资源到 assetType Dict */
    p.addAssetByAssetType = function(item)
    {
    	this.assetListDictByAssetType[item.type] = this.assetListDictByAssetType[item.type] || []
    	this.assetListDictByAssetType[item.type].push(item);
    }

    /** 获取资源数量--RefType */
    p.getAssetNumByRefType = function(refType)
    {
        if(refType == RefType.All) return this.assetTotalNum;
    	return this.assetListDictByRefType[refType] == null ? 0 : this.assetListDictByRefType[refType].length;
    };


    /** 获取资源数量--AssetType */
    p.getAssetNumByAssetType = function(assetType)
    {
    	return this.assetListDictByAssetType[assetType] == null ? 0 : this.assetListDictByAssetType[assetType].length;
    };


    /** 获取AssetItem List--RefType */
    p.getAssetListByRefType = function(refType)
    {
        if(refType == RefType.All) return this.list;

        this.assetListDictByRefType[refType] = this.assetListDictByRefType[refType] || [];
    	return this.assetListDictByRefType[refType];
    };


    /** 获取AssetItem List--AssetType */
    p.getAssetListByAssetType = function(assetType)
    {
        this.assetListDictByAssetType[assetType] =  this.assetListDictByAssetType[assetType] || [];
    	return this.assetListDictByAssetType[assetType];
    };

    p.getAssetList = function(navType, typeVal)
    {
        if(navType == NavType.RefType)
        {
            return this.getAssetListByRefType(typeVal);
        }
        else
        {
            return this.getAssetListByAssetType(typeVal);
        }
    };


    /** 获取AssetItem--GUID */
    p.getAssetByGUID = function(guid)
    {
    	return this.dictByGuid[guid];
    };

    /** 获取AssetItem--Name */
    p.getAssetByName = function(name)
    {
    	return this.dictByName[guid];
    };


    app.data = Data;
}());