/*
* @Author: zxy
* @Date:   2017-12-17 15:20:02
* @Last Modified by:   zxy
* @Last Modified time: 2017-12-17 15:55:44
*/
require('./index.css');
var _ds=require('util/ds.js');
//页面头部
var header={
	init:function(){
		this.bindEvent();
		
	},
    onLoad:function(){
    	var keyword=_ds.getUrlParam('keyword');
    	if(keyword){
    		$('#search-input').val(keyword);
    	};
    },
    // 点击
	bindEvent:function(){
		var _this=this;
		$('#search-btn').click(function(){
			_this.searchSubmit();
		})
		//输入回车提交
		$('#search-input').keyup(function(e){
			if(e.keyCode==13){
				_this.searchSubmit();
			}

		})

	},
	//提交
	searchSubmit:function(){
		var keyword=$.trim($('#search-input').val());
		if(keyword){
			window.location.href='./list.html?keyword='+keyword;
		}else{
			_ds.goHome();
		}

	}
}
header.init();