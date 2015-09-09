'use strict'

var newCate = $('#newCate'),
	filter = $('.filter'),
	firLevel = $('.first-level'),
	secLevel = $('.second-level'),
	firItems = document.getElementsByClassName('fir-item');

var currCate;

// 初始化分类列表
(function init(){

	each(data, function(item1, index1){
		currCate = firLevel.getElementsByClassName('fir-item')[0];
		each(item1.childs, function(item2, index2){
			createCate(item2.name, true);
		})
	})

	each(data, function(item1, index1){
		currCate = firLevel.getElementsByClassName('fir-item')[1];
		createCate(item1.name);
		each(item1.childs, function(item2, index2){
			currCate = secLevel.getElementsByClassName('sec-item')[index1];
			createCate(item2.name, true);
		})
	})

})();

// 点击 新增分类 按钮时的处理
addEvent(newCate, 'click', function(){

	if(!currCate) {
		return;
	}

	var className = trim(currCate.parentElement.className);
	if(className == 'third-level' || className == 'all-task'){	
		return;
	}else{
		var cateName = window.prompt('请输入分类名称');
		if(!cateName) {
			return;
		}
		createCate(cateName);
	}

})

// 为分类列表下每个条目添加click事件
addEvent(firLevel, 'click', function(){

	var evt = arguments[0] || window.event,
		target = evt.srcElement || evt.target,
		cates = firLevel.getElementsByTagName('li');

	each(cates, function(item){		// 取消原先选中分类上的样式
		removeClass(item, 'selected');
	})
	newCate.style.cursor = 'pointer';	// 取消新增分类按钮上的禁止样式

	currCate = target.tagName == 'LI' ? target : target.parentElement;
	var ul = currCate.getElementsByTagName('ul')[0];

	if(target.tagName == 'IMG') {
		if(currCate.parentElement.className != 'third-level'){
			if(ul.style.display == 'none'){
				ul.style.display = 'block';
				target.setAttribute('src', 'image/folder-open.png');
			}else{
				ul.style.display = 'none';
				target.setAttribute('src', 'image/folder-closed.png');
			}
		}
	}

	var className = trim(currCate.parentElement.className);
	if(className == 'third-level' || className == 'all-task'){
		newCate.style.cursor = 'not-allowed';
	}else{
		if(ul){
			ul.style.background = '#f2f2f2';
		}		
	}

	addClass(currCate, 'selected');		// 为当前选中的分类添加样式

})

// 双击展开或隐藏最顶层分类
each(firItems, function(item){
	addEvent(item, 'dblclick', function(){
		var ul = item.getElementsByTagName('ul')[0];
		if(ul.style.display == 'none'){
			ul.style.display = 'block';
		}else {
			ul.style.display = 'none';
		}
	})
})

addEvent(filter, 'click', function(){
	var evt = arguments[0] || window.event,
		target = evt.srcElement || evt.target;

	var lis = filter.getElementsByTagName('li');
	each(lis, function(item){
		removeClass(item, 'selected');
	})	
	addClass(target, 'selected');
})

// 创建一个分类，参数：分类名称
function createCate(cateName, isSecondLevel){

	var ul = currCate.getElementsByTagName('ul')[0];

	var li = document.createElement('li'),
	 	img = document.createElement('img'),
	 	span = document.createElement('span');

	span.innerHTML = cateName;
	li.appendChild(img);
	li.appendChild(span);

	if(isSecondLevel || currCate.parentElement.className == 'second-level'){		
		img.setAttribute('src', 'image/file.png');
	}else {
		img.setAttribute('src', 'image/folder-open.png');
		var childUl = document.createElement('ul');
		addClass(childUl, 'third-level');
		li.appendChild(childUl);
		addClass(li, 'sec-item');
	}
	
	ul.appendChild(li);
}


