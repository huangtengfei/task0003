'use strict'

/*
* js数据类型及语言基础
*/

// 判断arr是否为一个数组，返回一个bool值
function isArray(src) {
	return (src instanceof Array);
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction (src) {
	return (typeof src === 'function');
}

// 比typeof运算符更准确的类型判断函数
function type(src) {
	var s = Object.prototype.toString.call(src);
	return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {	
	if (type(src) === 'object') {
		var result = {};
		for(var key in src){
			if(src.hasOwnProperty(key)){
				result[key] = (type(src[key] === 'object') ? cloneObject(src[key]) : src[key]);
			}
		}
		return result;
	}else if(type(src) == 'array' && src.length) {
		return src.slice(0);
	}else if(type(src) == 'number' || type(src) == 'string' || 
		type(src) == 'boolean' || type(src) == 'date') {
		return src;
	}else {
		throw new Error('cannot clone this type!');
	}
}

// 判断数组是否包含某一元素
function contains(arr, obj){
	var n = arr.length;
	while(n--) {
		if (obj===arr[n]) {
			return true;
		};	
	}
	return false;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
	var tmpArr = [];
	for(var i = 0; i < arr.length; i++){
		if(!contains(tmpArr, arr[i])){
			tmpArr.push(arr[i]);
		}
	}
	return tmpArr;
}

// 简单的trim函数，用于去除一个字符串的空白字符，假定空白字符只有半角空格、Tab
function simpleTrim(str) {
    var strArr = str.split('');
    for (var i = strArr.length - 1; i >= 0; i--) {
    	if(strArr[i] == ' ' || strArr[i] == '\t'){
    		strArr.splice(i, 1); 		
    	}
    }; 
    return strArr.join('');
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str) {
    return str.replace(/\s+/g, '');
}

// 判断字符串是否以特定字符开头
String.prototype.startWith = function(str) {
	var reg = new RegExp('^' + str);
	return reg.test(this);
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0; arr && i < arr.length; i++) {
    	fn(arr[i], i);
    };
}

// 去除数组中的空元素
function validArray(arr) {
	var tmpArr = [];
	each(arr, function(item){
		if(!!item && item!=' ') {
			tmpArr.push(trim(item));
		}
	})
	return tmpArr;
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var count = 0;
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			count++;
		}
	}
	return count;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var reg = /^\w+(\.\w+)*@\w+((\.\w+)+)$/g
    return reg.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var reg = /^1(3|5|7|8)[0-9]{9}$/g
    return reg.test(phone);
}

/*
* dom操作
*/
// 判断一个元素对象是否有某个class
function hasClass(ele, cls) {
	return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

// 为element增加一个样式名为newClassName的新样式
function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
    	ele.className = ele.className + ' ' + cls;
    };
}

// 移除element中的样式oldClassName
function removeClass(ele, cls) {
    if(hasClass(ele, cls)) {
    	var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    	ele.className = ele.className.replace(reg, ' ');
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(ele1, ele2) {
    return ele1.parentNode === ele2.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    return {
    	x: element.offsetLeft,
    	y: element.offsetTop
    }
}

// 实现一个简单的Query
function $(selector) {
	var sltArr = selector.split(/\s+/);
	var curr = document;
	sltArr.forEach(function(item, index){
		var type = item.charAt(0);
		switch (type) {
			case '#':
				curr = curr.getElementById(item.slice(1));
				break;
			case '.':
				curr = curr.getElementsByClassName(item.slice(1))[0];
				break;
			case '[':
				if(item.slice(-1) === ']') {
					var slt = item.slice(1, -1);
					var eles = curr.getElementsByTagName('*');
					for(var i = 0; i < eles.length; i++){
						if(slt.indexOf('=') != -1){
							var arr = slt.split('=');
							if(arr[1] == eles[i].getAttribute(arr[0])){
								curr = eles[i];
								break;
							}
						}else {
							if(eles[i].getAttribute(slt)){
								curr = eles[i];
								break;
							}
						}
					}				
				}
				// 如果遍历后i已经等于eles的长度，说明没有满足条件的dom元素
				if(eles.length === i){
					curr = [];
				}
				break;
			default:
				curr = curr.getElementsByTagName(item)[0];
				break;	
		}		
	})
	return curr;
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(element.addEventListener) {
    	element.addEventListener(event, listener, false);
    }else {
    	element.attachEvent('on' + event, listener);
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if(element.removeEventListener) {
    	element.removeEventListener(event, listener, false);
    }else {
    	element.detachEvent('on' + event, listener);
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {

    document.onkeydown = function(e) {
    	//IE事件监听器内使用的是一个全局的Event对象
    	//而w3c是将event对象作为参数传递给监听器
    	var e = e || window.event;
    	if(e.keyCode == 13) {
    		addEvent(element, 'keydown', listener);
    	}
    }
}

// 简单的事件代理
// function delegateEvent(element, tag, eventName, listener) {
//     each(element.getElementsByTagName(tag), function(item){
//     	addEvent(item, eventName, listener);
//     })
// }

// $.on = addEvent;
// $.un = removeEvent;
// $.click = addClickEvent;
// $.enter = addEnterEvent;
// $.delegate = delegateEvent;

$.on = function(selector, event, listener) {
    addEvent($(selector), event, listener);
}

$.click = function(selector, listener) {
    addClickEvent($(selector), listener);
}

$.un = function(selector, event, listener) {
    removeEvent($(selector), event, listener);
}

$.enter = function(selector, event, listener) {
    addEnterEvent($(selector), event, listener);
}

$.delegate = function(selector, tag, event, listener) {
    each($(selector).getElementsByTagName(tag), function(item){
    	addEvent(item, event, listener);
    })
}

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
	var ua = navigator.userAgent.toLowerCase();
    return window.ActiveXObject ? ua.match(/msie ([\d.]+)/)[1] : -1;
}

// 判断浏览器类型及版本
function getUserAgent() {
	var ua = navigator.userAgent.toLowerCase();
	var sys = {};
	if(window.ActiveXObject) {
		sys.ie = ua.match(/msie ([\d.]+)/)[1];
	}else if(window.getBoxObjectFor) {
		sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
	}else if(window.MessageEvent && !document.getBoxObjectFor) {
		sys.chrome = ua.match(/chrome\/([\d.]+)/)[1];
	}else if(window.opera) {
		sys.opera = ua.match(/opera.([\d.]+)/)[1]
	}else if(window.openDatabase) {
		sys.safari = ua.match(/version\/([\d.]+)/)[1];
	}
	return sys;
}

// 获取cookie值
function getCookie(cookieName) {
	var cookie = document.cookie;
    if(cookie.length > 0) {
    	var start = cookie.indexOf(cookieName + '=');
    	if(start != -1){
    		start = start + cookieName.length + 1;
    		var end = cookie.indexOf(';') > -1 ? cookie.indexOf(';') : cookie.length;
    		return unescape(cookie.substring(start, end));
    	}
    }
    return '';
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var exDate = new Date();
    exDate.setDate(exDate.getDate() + expiredays);
    document.cookie = cookieName + '=' + escape(cookieValue) + 
    	((exDate === null) ? '' : ';expires=' + exDate.toGMTString());
}

// 封装的Ajax方法
/*
* options是一个对象，里面可以包括的参数为:
*     type: post或者get，可以有一个默认值
*     data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
*     onsuccess: 成功时的调用函数
*     onfail: 失败时的调用函数
*/
function ajax(url, options) {

	function fn(){};
    var xhr,
    	data = options && options.data || '',
    	success = options && options.onsuccess || fn,
    	fail = options && options.onfail || fn,
    	type = options && options.type.toUpperCase() || 'GET';
    

    xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")

    xhr.open(type, url);

    if(type === 'POST') {
    	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;');
    	xhr.send(data);
    }else {  	
    	url = url + (url.indexOf('?') === -1 ? '?' : '&') + data;
    	xhr.send();
    }

    xhr.onreadystatechange = function(){
    	if(xhr.readyState == 4 && xhr.status == 200) {
    		return success(xhr.responseText);
    	}else {
    		return fail(xhr.status);
    	}
    }
}