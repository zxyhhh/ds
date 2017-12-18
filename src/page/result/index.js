/*
* @Author: zxy
* @Date:   2017-12-17 21:19:37
* @Last Modified by:   zxy
* @Last Modified time: 2017-12-18 13:39:23
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _ds=require('util/ds.js');

$(function(){
	var type=_ds.getUrlParam('type')||'default';
	$element=$('.'+type+'-success');
	$element.show();

})