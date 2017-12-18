/*
* @Author: zxy
* @Date:   2017-12-17 17:51:11
* @Last Modified by:   zxy
* @Last Modified time: 2017-12-17 21:06:45
*/
require('./index.css');
var _ds=require('util/ds.js');
var templateIndex=require('./index.string');
var navSide={
	option:{
		name:'',
		navList:[
		  {name:'user-center',desc:'个人中心',href:'./user-center.html'},
		  {name:'order-list',desc:'我的订单',href:'./order-list.html'},
		  {name:'user-pass-update',desc:'修改密码',href:'./user-pass-update.html'},
		  {name:'about',desc:'关于MMALL',href:'./about.html'}
		]
	},
	init:function(option){
		//把参数中的name赋值给现在的option中name
		$.extend(this.option,option);
		this.renderNav();
	},
	//渲染导航菜单
	renderNav:function(){
		for(var i=0,len=this.option.navList.length;i<len;i++){
			if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
		}
		var navHtml = _ds.renderHtml(templateIndex, {
            navList : this.option.navList
        });
        $('.nav-side').html(navHtml);
	}
}
module.exports=navSide;