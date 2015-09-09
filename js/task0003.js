'use strict'

var newCate = $('#newCate'),
	filter = $('.filter'),
	firLevel = $('.first-level'),
	secLevel = $('.second-level'),
	firItems = document.getElementsByClassName('fir-item'),
	todoDiv = $('.todos'),
	todoTitle = $('.sec-right .title h4'),
	todoDate = $('.sec-right .date span'),
	todoContent = $('.sec-right .content p');


var currCate;

// 初始化分类列表
(function init(){

	each(data, function(item1, index1){
		currCate = firLevel.getElementsByClassName('fir-item')[0];
		each(item1.childs, function(item2, index2){
			createCate(item2.name, item2.guid);
		})
	})

	each(data, function(item1, index1){
		currCate = firLevel.getElementsByClassName('fir-item')[1];
		createCate(item1.name);
		each(item1.childs, function(item2, index2){
			currCate = secLevel.getElementsByClassName('sec-item')[index1];
			createCate(item2.name, item2.guid);
		})
	})

	// 默认选中第一个小分类
	createTodos('cate0001');
	var curr = $('.third-level li');
	addClass(curr, 'selected');

	var li = $('.todos .second-level li');
	addClass(li, 'selected');
	createContent('todo0001');

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
		createTodos(currCate.getAttribute('guid'));
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

// 为待办任务的筛选条件添加点击事件
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
function createCate(cateName, cateId){

	var ul = currCate.getElementsByTagName('ul')[0];

	var li = document.createElement('li'),
	 	img = document.createElement('img'),
	 	span = document.createElement('span');

	span.innerHTML = cateName;
	li.appendChild(img);
	li.appendChild(span);

	if(cateId || currCate.parentElement.className == 'second-level'){
		li.setAttribute('guid', cateId);		
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

// 创建待办任务
function createTodos(guid) {
	var datas = [];
	var ul = $('.todos .first-level');
	todoDiv.removeChild(ul);

	each(todoData, function(item){
		if(item.guid == guid){
			datas = item.data;
		}
	})

	var outUl = document.createElement('ul');
	addClass(outUl, 'first-level');

	each(datas, function(item1){

		var outerLi = document.createElement('li');
		var span = document.createElement('span');
		span.innerHTML = item1.date;

		var innerUl = document.createElement('ul');
		addClass(innerUl, 'second-level');
		each(item1.todos, function(item2){
			var innerLi = document.createElement('li');
			innerLi.setAttribute('guid', item2.guid);
			innerLi.setAttribute('onclick', 'getContent()');
			innerLi.innerHTML = item2.name;
			innerUl.appendChild(innerLi);
		})

		outerLi.appendChild(span);
		outerLi.appendChild(innerUl);
		outUl.appendChild(outerLi);

	})

	todoDiv.appendChild(outUl);

}

// 绑定给todo列表的事件函数
function getContent(){
	var evt = arguments[0] || window.event,
		target = evt.srcElement || evt.target;

	var lis = todoDiv.getElementsByTagName('li');
	each(lis, function(item){
		removeClass(item, 'selected');
	})
	addClass(target, 'selected');	

	createContent(target.getAttribute('guid'));
}

// 获取某一todo的内容并更新页面
function createContent(guid){
	each(contentData, function(item){
		if(item.guid == guid){
			todoTitle.innerHTML = item.name;
			todoDate.innerHTML = item.date;
			todoContent.innerHTML = item.content;
		}
	})
}


