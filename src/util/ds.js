/*
* @Author: zxy
* @Date:   2017-12-15 15:33:27
* @Last Modified by:   zxy
* @Last Modified time: 2017-12-16 17:38:21
*/
var conf={
	serverHost:''
};
var Hogan=require('hogan');//渲染模板
var _ds={
	request:function(param){
		var self=this;
		$.ajax({
			url: param.url ||'',
			type: param.type || 'get',
			dataType: param.type ||'json',
			data: param.data || '',
			success:function(res){
				if(res.status==0){
					typeof param.success==='function' && param.success(res.data,res.msg);
				}else if(res.status==10){
					//需要登录
					self.doLogin();
				}else if(res.status==1){
					typeof param.error==='function' && param.error(res.msg);
				}
			},
			error:function(err){
				typeof param.error==='function' && param.error(err.statusText);

			}
		})
	},
	//获取服务器地址
	getServerUrl:function(path){
		return conf.serverHost=path;

	},
	//获取url参数

	getUrlParam:function(name){
		//www?keyword=&keyword= 形式
		var reg=new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
		var result=window.location.search.substr(1).match(reg);
		return result? decodeURIComponent(result[2]):null;
	},
	//渲染html  hogan组件
	renderHtml:function(htmlTemplate,data){
		var template=Hogan.compile(htmlTemplate);
        var result=template.render(data);
        return result;    
	},
	//成功提示
	successTips:function(msg){
		alert(msg||'操作成功');

	},
	errorTips:function(msg){
		alert(msg||'哪里出错了');

	},
	//字段验证支持是否为空，手机，邮箱
	validate:function(value,type){
		var value=$.trim(value);
		if('require'===type){
			return !!value;
			//强制装换成boolean
		}
		if('phone'===type){
			return /^1\d{10}$/.test(value);
		}
		if('email'==type){
			return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value);
		}

	},
	//返回主页面
	goHome:function(){
		window.location.href="./index.html"
	},
	//登录
	doLogin:function(){
		window.location.href="./login/html?redirect="+encodeURIComponent(window.location.href);
	}

};
module.exports=_ds;