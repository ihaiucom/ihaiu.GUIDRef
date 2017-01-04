/**
 * Created by ihaiu@qq.com on 2016-12-29.
 * http://blog.ihaiu.com
 */

  String.prototype.trim=function()
  {
　　    return this.replace(/(^\s*)|(\s*$)/g, "");
　　}

　　 String.prototype.ltrim=function(){
　　    return this.replace(/(^\s*)/g,"");
　　 }
　　 String.prototype.rtrim=function(){
　　    return this.replace(/(\s*$)/g,"");
　　 }


function main()
{
	console.log('guidData.list.length=%d', guidData.list.length);

	app.data.init();
	app.view.init();
}