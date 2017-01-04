/**
 * Created by ihaiu@qq.com on 2016-12-29.
 * http://blog.ihaiu.com
 */



RefType = {

    All				: -1,
	None 			: 0,
	Resource 		: 1,
    MResource		: 2,
    Editor			: 3,
    Ref 			: 4,
    NoUse			: 5
};


AssetType = 
{
	Scene		: "Scene",
	Prefab		: "Prefab",
	Material	: "Material",
	Shader		: "Shader",
	Asset		: "Asset",
	Animation	: "Animation",
	Image		: "Image",
	Font		: "Font",
	Sound		: "Sound",
	Video		: "Video",
	Script		: "Script",
	Lua			: "Lua",
	Config		: "Config"
};


PageConfig = 
{
	// 一页显示多少个item
	itemNum : 10,

	// 页码数量
	pageNum : 10
};

PageButtonType = 
{
	First 			: 0,
	Previous 		: 1,
	Next 			: 2,
	Last 			: 3,
	Ellipsis 		: 4,
	Index 			: 5
};

NavType =
{
	RefType 	: 0,
	AssetType 	: 1
};

RefTypeNames = {};
RefTypeNames[RefType.All] 		= "All";
RefTypeNames[RefType.None] 		= "None";
RefTypeNames[RefType.Resource] 	= "Resource";
RefTypeNames[RefType.MResource] = "MResource";
RefTypeNames[RefType.Editor] 	= "Editor";
RefTypeNames[RefType.Ref] 		= "Ref";
RefTypeNames[RefType.NoUse] 	= "NoUse";


AssetTypeNames = {};
AssetTypeNames[AssetType.Scene] 		= "Scene";
AssetTypeNames[AssetType.Prefab] 		= "Prefab";
AssetTypeNames[AssetType.Material] 		= "Material";
AssetTypeNames[AssetType.Shader] 		= "Shader";
AssetTypeNames[AssetType.Animation] 	= "Animation";
AssetTypeNames[AssetType.Image] 		= "Image";
AssetTypeNames[AssetType.Font] 			= "Font";
AssetTypeNames[AssetType.Sound] 		= "Sound";
AssetTypeNames[AssetType.Video] 		= "Video";
AssetTypeNames[AssetType.Script] 		= "Script";
AssetTypeNames[AssetType.Lua] 			= "Lua";
AssetTypeNames[AssetType.Config] 		= "Config";


RefTypeNavConfig	 = [
	{navType: NavType.RefType 		, name:"All"		, cnname: "所有"				, typeVal: RefType.All,			cls: "text-dsbd-blue"},
	{navType: NavType.RefType 		, name:"Resource"	, cnname: "Resource"		, typeVal: RefType.Resource,	cls: "text-dsbd-purple"},
	{navType: NavType.RefType 		, name:"MResource"	, cnname: "MResource"		, typeVal: RefType.MResource,	cls: "text-dsbd-green"},
	{navType: NavType.RefType 		, name:"Editor"		, cnname: "Editor"			, typeVal: RefType.Editor,		cls: "text-dsbd-black"},
	{navType: NavType.RefType 		, name:"Ref"		, cnname: "被引用资源"		, typeVal: RefType.Ref,			cls: "text-dsbd-yellow"},
	{navType: NavType.RefType 		, name:"NoUse"		, cnname: "没用到资源"		, typeVal: RefType.NoUse,		cls: "text-dsbd-red"}
	];



AssetTypeNavConfig	 = [
	{navType: NavType.AssetType 		, name:"Scene"		, cnname: "场景"				, typeVal: AssetType.Scene 		},
	{navType: NavType.AssetType 		, name:"Prefab"		, cnname: "预设"				, typeVal: AssetType.Prefab 		},
	{navType: NavType.AssetType 		, name:"Material"	, cnname: "材质"				, typeVal: AssetType.Material 	},
	{navType: NavType.AssetType 		, name:"Shader"		, cnname: "Shader"			, typeVal: AssetType.Shader 		},
	{navType: NavType.AssetType 		, name:"Asset"		, cnname: "序列化"			, typeVal: AssetType.Asset 		},
	{navType: NavType.AssetType 		, name:"Image"		, cnname: "图片"				, typeVal: AssetType.Image 		},
	{navType: NavType.AssetType 		, name:"Animation"	, cnname: "动画"				, typeVal: AssetType.Animation 	},
	{navType: NavType.AssetType 		, name:"Font"		, cnname: "字体"				, typeVal: AssetType.Font 		},
	{navType: NavType.AssetType 		, name:"Sound"		, cnname: "音频"				, typeVal: AssetType.Sound 		},
	{navType: NavType.AssetType 		, name:"Video"		, cnname: "视频"				, typeVal: AssetType.Video 		},
	{navType: NavType.AssetType 		, name:"Script"		, cnname: "Script"			, typeVal: AssetType.Script 		},
	{navType: NavType.AssetType 		, name:"Lua"		, cnname: "Lua"				, typeVal: AssetType.Lua 		},
	{navType: NavType.AssetType 		, name:"Config"		, cnname: "Config"			, typeVal: AssetType.Config 	},
	];


