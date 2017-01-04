/**
 * Created by ihaiu@qq.com on 2016-12-29.
 * http://blog.ihaiu.com
 */


this.app = this.app || {};
app.View = app.View || {};

(function(){
	var View = function()
    {

    };

    // var p = View.prototype;
    var p = View;
    p.vBreadcrumb = null;
    p.vNavTitleList = null;
    p.vNavTitleItem = null;
    p.vListBox = null;
    p.vItemInfoBox = null;
    p.vInputSearch = null;



    /** 初始化数据 */
    p.init = function ()
    {
        this.vBreadcrumb         = $("#breadcrumb");
        this.vNavTitleList         = $("#nav-title-list");
        this.vNavTitleItem         = $("#nav-title-item");

        this.vListBox       = $("#box-list");
        this.vItemInfoBox   = $("#item-info");

        this.main.init();
        this.itemInfo.init();

        this.setListVisiable(false);
        this.setItemInfoVisiable(false);

        this.vInputSearch = $("#input-search");
        this.vNavTitleList.children().click(this.onClickListTime);

        this.vInputSearch.bind('input porpertychange', this.onInputSearchChange);
    };

    p.onInputSearchChange = function()
    {
        var key = app.view.vInputSearch.val().trim();
        var list = [];

        var item = app.data.getAssetByGUID(key);
        if(item != null)
        {
            list.push(item);
        }

        for(var i = 0; i < app.data.list.length; i ++)
        {
            item = app.data.list[i];

            // if(item.filename.indexOf(key) >= 0)
            // {
            //     list.push(item);
            // }

            if(item.filename.match(key))
            {
                list.push(item);
            }
        }



        app.view.list.setList("搜索结果 " + list.length + "个", list);

    };

    p.setListTitle = function(title)
    {
        this.vNavTitleList.children().html(title);
    };

    p.setItemTitle = function(title)
    {
        this.vNavTitleItem.children().html(title);
    };

    p.onClickListTime = function()
    {
        app.view.setListVisiable(true);
    };




    p.setListVisiable = function(val)
    {
        if(val)
        {
            this.vListBox.show();
            this.setItemInfoVisiable(false);
        }
        else
        {
            this.vListBox.hide();
        }

        this.vBreadcrumb.show();
    };



    p.setItemInfoVisiable = function(val)
    {
        if(val)
        {
            this.vItemInfoBox.show();
            this.vNavTitleItem.show();
            this.vNavTitleList.removeClass("active");
            this.setListVisiable(false);


        }
        else
        {
            this.vItemInfoBox.hide();
            this.vNavTitleItem.hide();
            this.vNavTitleList.addClass("active");
        }
    };






    app.view = View;
}());



(function(){
	var ViewMain = function()
    {

    };

    // var p = ViewMain.prototype;
    var p = ViewMain;
    p.navList = [];
    p.select  = null;

    /** 初始化数据 */
    p.init = function ()
    {
        this.createNavRefType();
        this.createNavAssetType();
    };

    p.createNavRefType = function()
    {
        var root = $("#nav-reftype");
        var tpl = $("#tpl-reftype").html();

        for(var i = RefTypeNavConfig.length - 1; i >= 0; i --)
        {
            var config = RefTypeNavConfig[i];
            config.id = "nav-reftype-" + config.name;

            var item = tpl.replace("__NAME__", config.cnname)
                        .replace("__ID__", config.id)
                        .replace("__CLS__", config.cls)
                        .replace("__NUM__",  app.data.getAssetNumByRefType(config.typeVal));



            config.view = $(item);
            config.view.prependTo(root);
            config.view.click(config, this.onClickNav);
            this.navList.push(config);
        }
    }

    p.createNavAssetType = function()
    {

        var root = $("#nav-assettype");
        var tpl = $("#tpl-assettype").html();

        

        for(var i = AssetTypeNavConfig.length - 1; i >= 0; i --)
        {
            var config = AssetTypeNavConfig[i];
            config.id = "nav-assettype-" + config.name;

            var item = tpl.replace("__NAME__", config.cnname)
                        .replace("__ID__", config.id)
                        .replace("__NUM__",  app.data.getAssetNumByAssetType(config.typeVal));



            config.view = $(item);
            config.view.prependTo(root);
            config.view.click(config, this.onClickNav);
            this.navList.push(config);
        }
    };

    p.onClickNav = function(event)
    {
        var config = event.data;
        p.select = config;

        for(var i = 0; i < p.navList.length; i ++)
        {
            p.navList[i].view.children().removeClass("active");
        }

        config.view.children().addClass("active");
        app.view.list.set(config.cnname, config.navType, config.typeVal);
    }






    app.view.main = ViewMain;
}());



(function(){
	var ViewList = function()
    {

    };

    // var p = ViewList.prototype;
    var p = ViewList
    p.navType = NavType.RefType;
    p.typeVal = RefType.All;
    p.dataList = [];
    p.viewCaches = [];

    /** 初始化数据 */
    p.init = function ()
    {

    };

    p.set = function(name, navType, typeVal)
    {
        this.navType = navType;
        this.typeVal = typeVal;

        this.dataList = app.data.getAssetList(navType, typeVal);
        this.setList(name, this.dataList);
    };

    p.setList = function(name, dataList)
    {
        this.dataList = dataList;

        app.view.viewPage.set();
        app.view.setListTitle(name);
        app.view.setListVisiable(true);
    };

    p.setShow = function(beginIndex, endIndex)
    {

        var root    = $("#list-body");

        var row = 0; 
        for(var i = beginIndex; i < endIndex; i ++)
        {
            var itemData = this.dataList[i];

            var itemView;
            if(row < this.viewCaches.length)
            {
                itemView = this.viewCaches[row];
            }
            else
            {
                itemView = new app.View.ViewListItem();
                this.viewCaches.push(itemView);
            }
            itemView.set(itemData, root, "inline-tags-list-blue");
            row ++;
        }


        for(var i = row; i < this.viewCaches.length; i ++)
        {
            this.viewCaches[i].hide();
        }
    };


    app.view.list = ViewList;
}());



(function(){
    var ViewListItem = function()
    {

    };

    ViewListItem.tpl = null;


    ViewListItem.getTpl = function()
    {
        if(ViewListItem.tpl == null)
        {
            ViewListItem.tpl = $("#tpl-list-tr").html();
        }

        return ViewListItem.tpl;
    }





    var p = ViewListItem.prototype;
    p.itemData      = null;
    p.view          = null;
    p.vPath         = null;
    p.vGuid         = null;
    p.vReftype      = null;
    p.vAssettype    = null;
    p.vRefnum       = null;
    p.vDefnum       = null;

    /** 初始化数据 */
    p.init = function ()
    {

    };

    p.hide = function()
    {
        if(this.view != null)
        {
            this.view.hide();
        }
    };

    p.show = function()
    {
        if(this.view != null)
        {
            this.view.show();
        }
    };



    p.set = function(itemData, root, cls)
    {
        this.itemData = itemData;


        if(this.view == null)
        {

            this.view = $(ViewListItem.getTpl());
            this.vPath          = this.view.find("[name=path]");
            this.vGuid          = this.view.find("[name=guid]");
            this.vReftype       = this.view.find("[name=reftype]");
            this.vAssettype     = this.view.find("[name=assettype]");
            this.vRefnum        = this.view.find("[name=refnum]");
            this.vDefnum        = this.view.find("[name=defnum]");
            this.view.children().first().addClass(cls);

            root.append(this.view);
            this.vPath.click(this, this.onClickItem);
        }

        this.vPath.text         (        itemData.filename                   );
        this.vGuid.text         (        itemData.guid                       );
        this.vReftype.text      (        RefTypeNames[itemData.refType]      );
        this.vAssettype.text    (        AssetTypeNames[itemData.type]       );
        this.vRefnum.text       (        itemData.refNum                     );
        this.vDefnum.text       (        itemData.defNum                     );


        this.show();

    };

    p.onClickItem = function(event)
    {
        app.view.itemInfo.set(event.data.itemData); 
    };




    app.View.ViewListItem = ViewListItem;
}());




(function(){
    var ViewPage = function()
    {

    };

    // var p = ViewPage.prototype;
    var p = ViewPage;
    p.isInit    = false;
    p.pageIndex = 0;
    p.pageMax = 0;
    p.itemCount = 0;

    p.vRoot                 = null;

    p.vPageFirst            = null;
    p.vPagePrevious         = null;

    p.vPagepIndexFirst      = null;
    p.vPagepIndexLast       = null;

    p.vPageNext             = null;
    p.vPageLast             = null;


    p.vPageEllipsisBefore   = null;
    p.vPageEllipsisAfter    = null;

    p.vPageIndexs            = [];

    /** 初始化数据 */
    p.init = function ()
    {
        if(this.isInit) return;
        this.isInit = true;

        this.vRoot                  = $("#page-num-list");


        this.vPageFirst             = new app.View.ViewPageNum(     $("#page-num-first")        );
        this.vPagePrevious          = new app.View.ViewPageNum(     $("#page-num-previous")     );

        this.vPagepIndexFirst       = new app.View.ViewPageNum(     $("#page-num-index-first")     );
        this.vPageEllipsisBefore    = new app.View.ViewPageNum(     $("#page-num-ellipsis-before")     );
        this.vPageEllipsisAfter     = new app.View.ViewPageNum(     $("#page-num-ellipsis-after")     );
        this.vPagepIndexLast        = new app.View.ViewPageNum(     $("#page-num-index-last")     );

        this.vPageNext              = new app.View.ViewPageNum(     $("#page-num-next")     );
        this.vPageLast              = new app.View.ViewPageNum(     $("#page-num-last")     );




        this.vPageFirst             .setType(PageButtonType.First          );
        this.vPagePrevious          .setType(PageButtonType.Previous       );
        this.vPageEllipsisBefore    .setType(PageButtonType.Ellipsis           );
        this.vPageEllipsisAfter     .setType(PageButtonType.Ellipsis           );
        this.vPageNext              .setType(PageButtonType.Next       );
        this.vPageLast              .setType(PageButtonType.Last       );


        this.vPagepIndexFirst               .setType(PageButtonType.Index       ).setIndex(0);
        this.vPagepIndexLast                .setType(PageButtonType.Index       ).setIndex(9);



        var tpl = $("#tpl-pagenum-index").html();
        for(var i = 0; i < PageConfig.pageNum - 2; i ++)
        {
            var itemView =  new app.View.ViewPageNum( $(tpl) );
            itemView.setType(PageButtonType.Index).setIndex(i);
            this.vPageEllipsisAfter.view.before(itemView.view);
            this.vPageIndexs.push(itemView);

        }

    };

    p.set = function()
    {
        this.init();

        this.itemCount = app.view.list.dataList.length;
        this.pageMax = Math.ceil(this.itemCount / PageConfig.itemNum) - 1;
        if(this.pageMax < 0) this.pageMax = 0;


        if(this.pageMax <= 0)
        {
            this.vRoot.hide();
        }
        else
        {
            this.vRoot.show();
        }

        this.vPagepIndexLast.setIndex(this.pageMax);


        this.firstPage();
    };

    p.setPage = function(pageIndex)
    {
        var pageMax = this.pageMax;
        if(pageIndex > pageMax) pageIndex = pageMax;
        if(pageIndex < 0) pageIndex = 0;
        this.pageIndex = pageIndex;

        var begin   = pageIndex * PageConfig.itemNum;
        var end     = begin + PageConfig.itemNum;
        if(end > this.itemCount)
        {
            end = this.itemCount;
        }


        app.view.list.setShow(begin, end);


        this.vPageEllipsisBefore.setVisiable(pageIndex >= (PageConfig.itemNum -1) && pageMax > PageConfig.itemNum);
        this.vPageEllipsisAfter.setVisiable(pageIndex < (pageMax - PageConfig.itemNum) );

        this.vPagepIndexFirst.setSelect(pageIndex == 0);
        this.vPagepIndexLast.setSelect(pageIndex == pageMax);

        this.vPageFirst.setEnable(pageIndex > 0);
        this.vPagePrevious.setEnable(pageIndex > 0);

        this.vPageNext.setEnable(pageIndex < pageMax);
        this.vPageLast.setEnable(pageIndex < pageMax);

        var pageNumBegin, pageNumEnd;
        if(pageIndex < PageConfig.itemNum -1)
        {
            pageNumBegin = 1;
            pageNumEnd = PageConfig.itemNum - 2;
        }
        else if(pageIndex > (pageMax - PageConfig.itemNum + 1) )
        {
            pageNumBegin = pageMax - PageConfig.itemNum + 2;
            pageNumEnd = pageMax - 1;
        }
        else
        {
            pageNumBegin = pageIndex - Math.ceil(PageConfig.itemNum / 2) + 2;
            pageNumEnd = pageIndex + Math.ceil(PageConfig.itemNum / 2) - 1;
        }
        pageNumBegin = Math.max(pageNumBegin, 0);
        pageNumEnd = Math.min(pageNumEnd, pageMax - 1);


        var index = 0;
        for(var i = pageNumBegin; i <= pageNumEnd; i ++)
        {
            var itemView = this.vPageIndexs[index];
            itemView.setIndex(i).setVisiable(true).setSelect(i == pageIndex);
            index ++;
        }



        for(var i = index; i < this.vPageIndexs.length; i ++)
        {
            this.vPageIndexs[i].setVisiable(false);
        }






    };

    p.prePage = function()
    {
        this.setPage(this.pageIndex - 1);
    };

    p.nextPage = function()
    {
        this.setPage(this.pageIndex + 1);
    };

    p.firstPage = function()
    {
        this.setPage(0);
    };

    p.lastPage = function()
    {
        this.setPage(this.pageMax);
    };





    app.view.viewPage = ViewPage;
}());


(function(){
    var ViewPageNum = function(view)
    {
        this.init(view);
    };

    var p = ViewPageNum.prototype;
    p.view          = null;
    p.buttonType    = PageButtonType.Index;
    p.index         = 0;


    /** 初始化数据 */
    p.init = function (view)
    {
        this.view = view;
        view.click(this, this.onClick);
        return this;
    };

    p.setType = function(buttonType)
    {
        this.buttonType = buttonType;
        return this;
    };

    p.setIndex = function(index)
    {
        this.index = index;
        this.view.children().html(index + 1);
        return this;
    }

    

    p.setVisiable = function(val)
    {

        if(val)
        {
            this.view.show();
        }
        else
        {
            this.view.hide();
        }
        return this;
    }

    p.setEnable = function(val)
    {
        if(val)
        {
            this.view.removeClass("disabled");
        }
        else
        {
            this.view.addClass("disabled");
        }
        return this;
    };

    p.setSelect = function(val)
    {
        if(val)
        {
            this.view.addClass("active");
        }
        else
        {
            this.view.removeClass("active");
        }
        return this;
    };



    p.onClick = function(event)
    {
        var data = event.data;


        switch(data.buttonType)
        {
            case PageButtonType.First:
                app.view.viewPage.firstPage();
                break;

            case PageButtonType.Previous:
                app.view.viewPage.prePage();
                break;
                
            case PageButtonType.Next:
                app.view.viewPage.nextPage();
                break;
                
            case PageButtonType.Last:
                app.view.viewPage.lastPage();
                break;
                
            case PageButtonType.Index:
                app.view.viewPage.setPage(data.index);
                break;
        }
    };





    app.View.ViewPageNum = ViewPageNum;
}());



(function(){
	var ViewItemInfo = function()
    {

    };

    // var p = ViewItemInfo.prototype;
    var p = ViewItemInfo;
    p.config = null;
    p.headDep = null;
    p.headRef = null;

    p.listRootDep = null;
    p.listRootRef = null;

    p.viewCachesDep = [];
    p.viewCachesRef = [];


    p.listRootDepIndirect   = null;
    p.headDepIndirect       = null;
    p.viewCachesDepIndirect = [];


    /** 初始化数据 */
    p.init = function ()
    {
        this.headDep = $("#item-info-head-dep");
        this.headRef = $("#item-info-head-ref");

        this.listRootDep = $("#item-info-list-dep");
        this.listRootRef = $("#item-info-list-ref");


        this.headDepIndirect = $("#item-info-head-dep-indirect");
        this.listRootDepIndirect = $("#item-info-list-dep-indirect");
    };


    p.set = function(config)
    {
        this.config = config;


        app.view.setItemTitle(config.filename);
        app.view.setItemInfoVisiable(true);

        this.headDep.html("它直接依赖的资源("+config.defNum+")");
        this.headDepIndirect.html("它间接依赖的资源("+config.defIndNum+")");

        this.headRef.html("引用它的资源("+config.refNum+")");



        this.setRefList();
        this.setDepList();
        this.setIndirectDepList();

    };

    p.setRefList = function()
    {

        var row = 0; 
        for(var i = 0; i < this.config.refList.length; i ++)
        {
            var itemData = this.config.refList[i];

            var itemView;
            if(row < this.viewCachesRef.length)
            {
                itemView = this.viewCachesRef[row];
            }
            else
            {
                itemView = new app.View.ViewListItem();
                this.viewCachesRef.push(itemView);
            }
            itemView.set(itemData, this.listRootRef, "inline-tags-list-green2");
            row ++;
        }


        for(var i = row; i < this.viewCachesRef.length; i ++)
        {
            this.viewCachesRef[i].hide();
        }

    };


    p.setDepList = function()
    {
        var row = 0; 
        for(var i = 0; i < this.config.defList.length; i ++)
        {
            var itemData = this.config.defList[i];

            var itemView;
            if(row < this.viewCachesDep.length)
            {
                itemView = this.viewCachesDep[row];
            }
            else
            {
                itemView = new app.View.ViewListItem();

                this.viewCachesDep.push(itemView);
            }
            itemView.set(itemData, this.listRootDep, "inline-tags-list-blue2");
            row ++;
        }


        for(var i = row; i < this.viewCachesDep.length; i ++)
        {
            this.viewCachesDep[i].hide();
        }

    };


    p.setIndirectDepList = function()
    {
        var row = 0; 
        for(var i = 0; i < this.config.defIndList.length; i ++)
        {
            var itemData = this.config.defIndList[i];

            var itemView;
            if(row < this.viewCachesDepIndirect.length)
            {
                itemView = this.viewCachesDepIndirect[row];
            }
            else
            {
                itemView = new app.View.ViewListItem();

                this.viewCachesDepIndirect.push(itemView);
            }
            itemView.set(itemData, this.listRootDepIndirect, "inline-tags-list-yellow");
            row ++;
        }


        for(var i = row; i < this.viewCachesDepIndirect.length; i ++)
        {
            this.viewCachesDepIndirect[i].hide();
        }

    };







    app.view.itemInfo = ViewItemInfo;
}());

