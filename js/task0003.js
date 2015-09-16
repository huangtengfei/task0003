'use strict'

var newCate = $('#newCate'),
	newTodo = $('#newTodo'),
	editBtn = $('#editBtn'),
	chkBtn = $('#checkBtn'),
	filter = $('.filter'),
	firLevel = $('.first-level'),
	secLevel = $('.second-level'),
	firItems = document.getElementsByClassName('fir-item'),
	todoDiv = $('.todos'),
	secRight = $('.sec-right'),
	secRightEdit = $('.sec-right-edit');
	

var currCate, currTodo;

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
	initTodos('cate0001');
	var curr = $('.third-level li');
	addClass(curr, 'selected');

	var li = $('.todos .second-level li');
	addClass(li, 'selected');
	currTodo = 'todo0001';
	createContent(currTodo);

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
		initTodos(currCate.getAttribute('guid'));
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

// 初始化待办任务
function initTodos(guid) {
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
			createTodo(innerUl, item2.name, item2.guid);
		})

		outerLi.appendChild(span);
		outerLi.appendChild(innerUl);
		outUl.appendChild(outerLi);

	})

	todoDiv.appendChild(outUl);

}

// 新建任务的点击事件
addEvent(newTodo, 'click', function(){

	secRight.style.display = 'block';
	secRightEdit.style.display = 'none';

	var todoName = window.prompt('请输入待办事项名称');
	if(!todoName) {
		return;
	}

	var firstLi = $('.todos li');
	var firstTodo = $('.todos span').innerHTML;

	if(firstTodo == getToday()){
		var ul = $('.todos .second-level');
		createTodo(ul, todoName);
	}else{
		var outUl = $('.todos .first-level');
		var li = document.createElement('li');
		var span = document.createElement('span');
		span.innerHTML = getToday();
		var innerUl = document.createElement('ul');
		addClass(innerUl, 'second-level');
		li.appendChild(span);
		li.appendChild(innerUl);
		outUl.insertBefore(li, firstLi);
		createTodo(innerUl, todoName);
	}
	
})

// 创建一条todo
function createTodo(innerUl, name, guid){
	var innerLi = document.createElement('li');
	innerLi.innerHTML = name;
	if(guid){
		innerLi.setAttribute('guid', guid);
	}else{
		// TBD 生成guid
		secRight.style.display = 'none';
		secRightEdit.style.display = 'block';
		var todoTitle = $('.sec-right-edit .title input'),
			todoDate = $('.sec-right-edit .date input'),
			todoContent = $('.sec-right-edit .content textarea');

		todoTitle.value = name;
		todoDate.value = getToday();
		todoContent.value = '';
		todoContent.focus();

		updateSelected(innerLi);	// 将新创建的条目样式设置为选中
	}
	innerLi.setAttribute('onclick', 'getContent()');
	innerUl.appendChild(innerLi);
}

// 设置某todo为选中项
function updateSelected(target) {
	var lis = todoDiv.getElementsByTagName('li');
	each(lis, function(item){
		removeClass(item, 'selected');
	})
	addClass(target, 'selected');	
}

// 绑定给todo列表的事件函数
function getContent(){

	secRight.style.display = 'block';
	secRightEdit.style.display = 'none';

	var evt = arguments[0] || window.event,
		target = evt.srcElement || evt.target;

	updateSelected(target);
	
	currTodo = target.getAttribute('guid');
	createContent(currTodo, target.textContent);
}

// 获取某一todo的内容并更新页面
function createContent(guid, name){
	var todoTitle = $('.sec-right .title h4'),
		todoDate = $('.sec-right .date span'),
		todoContent = $('.sec-right .content p');

	each(contentData, function(item){
		if(guid){
			if(item.guid == guid){
				todoTitle.innerHTML = item.name;
				todoDate.innerHTML = item.date;
				todoContent.innerHTML = item.content;
			}
		}else{
			todoTitle.innerHTML = name;
			todoDate.innerHTML = getToday();
			todoContent.innerHTML = '';
		}
	})
}

// 获取格式化的当天日期
function getToday(){

	var arr = [];
	var today = new Date();
	var month = today.getMonth() + 1;
	month = month < 10 ? '0' + month : month;
	var date = today.getDate();
	date = date < 10 ? '0' + date : date;
	arr.push(today.getFullYear());
	arr.push(month);
	arr.push(date);
	return arr.join('-');

}

// 编辑按钮的点击事件
addEvent(editBtn, 'click', function(){
	secRight.style.display = 'none';
	secRightEdit.style.display = 'block';

	if(currTodo){
		var todoTitle = $('.sec-right-edit .title input'),
			todoDate = $('.sec-right-edit .date input'),
			todoContent = $('.sec-right-edit .content textarea');

		each(contentData, function(item){
			if(item.guid == currTodo){
				todoTitle.value = item.name;
				todoDate.value = item.date;
				todoContent.value = item.content;
			}
		})
	}

})
