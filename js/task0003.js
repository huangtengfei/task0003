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

var todoTitle = $('.sec-right .title h4'),
	todoDate = $('.sec-right .date span'),
	todoContent = $('.sec-right .content p'),
	eTodoTitle = $('.sec-right-edit .title input'),
	eTodoDate = $('.sec-right-edit .date input'),
	eTodoContent = $('.sec-right-edit .content textarea');
	
var currCate, 
	currTodo,
	cateData = data;

// ----------------------------初始化----------------------------

// 初始化分类列表
(function init(){

	// 从 localStorage 读取初始化数据
	if(localStorage.cateData) {
		cateData = JSON.parse(localStorage.cateData);
	}else{
		localStorage.cateData = JSON.stringify(cateData);
	}

	if(localStorage.todoData) {
		todoData = JSON.parse(localStorage.todoData);
	}else{
		localStorage.todoData = JSON.stringify(todoData);
	}

	if(localStorage.contentData) {
		contentData = JSON.parse(localStorage.contentData);
	}else{
		localStorage.contentData = JSON.stringify(contentData);
	}

	// 初始化所有任务
	each(cateData, function(item1, index1){
		currCate = firLevel.getElementsByClassName('fir-item')[0];
		each(item1.childs, function(item2, index2){
			createCate(item2.name, item2.guid);
		})
	})

	// 初始化分类列表
	each(cateData, function(item1, index1){
		currCate = firLevel.getElementsByClassName('fir-item')[1];
		createCate(item1.name, item1.guid);
		each(item1.childs, function(item2, index2){
			currCate = secLevel.getElementsByClassName('sec-item')[index1];
			createCate(item2.name, item2.guid);
		})
	})

	// 默认选中第一个小分类
	initTodos('cate0001', 0);
	currCate = $('.second-level .third-level li');
	addClass(currCate, 'selected');
	var icon = currCate.getElementsByClassName('remove-icon')[0];
	icon.style.display = 'block';

	var li = $('.todos .second-level li');
	addClass(li, 'selected');
	currTodo = 'todo0001';
	createContent(currTodo);

})();

// ----------------------------分类列表----------------------------

// 为分类列表下每个条目添加click事件
addEvent(firLevel, 'click', function(){

	var evt = arguments[0] || window.event,
		target = evt.srcElement || evt.target,
		cates = firLevel.getElementsByTagName('li');

	var icons = document.getElementsByClassName('remove-icon');
	each(icons, function(item){
		item.style.display = 'none';
	})

	each(cates, function(item){		// 取消原先选中分类上的样式
		removeClass(item, 'selected');
	})
	newCate.style.cursor = 'pointer';	// 取消新增分类按钮上的禁止样式

	currCate = target.tagName == 'LI' ? target : target.parentElement;
	var parentCateClass = trim(currCate.parentElement.className);
	var ul = currCate.getElementsByTagName('ul')[0];

	if(target.tagName == 'IMG' && trim(target.className) != 'remove-icon') {
		if(parentCateClass != 'third-level'){
			if(ul.style.display == 'none'){
				ul.style.display = 'block';
				target.setAttribute('src', 'image/folder-open.png');
			}else{
				ul.style.display = 'none';
				target.setAttribute('src', 'image/folder-closed.png');
			}
		}
	}

	if(parentCateClass == 'third-level' || parentCateClass == 'all-task'){
		newCate.style.cursor = 'not-allowed';
		initTodos(currCate.getAttribute('guid'), 0);
	}else{
		if(ul){
			ul.style.background = '#f2f2f2';
		}		
	}
	
	if(trim(currCate.className) != 'fir-item'){
		var icon = currCate.getElementsByClassName('remove-icon')[0];
		icon.style.display = 'block';
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

// 点击 新增分类 按钮时的处理
addEvent(newCate, 'click', function(){

	if(!currCate) {
		return;
	}

	var parentCateClass = trim(currCate.parentElement.className);

	if(parentCateClass == 'third-level' || parentCateClass == 'all-task'){	
		return;
	}else{
		var cateName = window.prompt('请输入分类名称');
		if(!cateName) {
			return;
		}
		createCate(cateName);
	}

})

// 创建一个分类，参数：分类名称
function createCate(cateName, cateId){

	var ul = currCate.getElementsByTagName('ul')[0];

	var li = document.createElement('li'),
	 	img = document.createElement('img'),
	 	span = document.createElement('span');

	if(!cateId){
		var newGuid = guid();
		li.setAttribute('guid', newGuid);	
	}else{
		li.setAttribute('guid', cateId);
	}

	var parentCateClass = trim(currCate.parentElement.className);

	span.innerHTML = cateName;
	li.style.position = 'relative';
	li.appendChild(img);
	li.appendChild(span);

	var img2 = document.createElement('img');
	img2.setAttribute('src', 'image/remove.png');
	img2.setAttribute('onclick', 'removeCate()');
	addClass(img2, 'remove-icon');
	li.appendChild(img2);
	

	if (parentCateClass == 'second-level'){
				
		img.setAttribute('src', 'image/file.png');
		if(!cateId){
			saveCate(cateName, newGuid, 2);
		}	
	}else{
		img.setAttribute('src', 'image/folder-open.png');
		var childUl = document.createElement('ul');
		addClass(childUl, 'third-level');
		li.appendChild(childUl);
		addClass(li, 'sec-item');
		if(!cateId){	// 有cateId表示初始化时创建分类，没有cateId表示新建分类，需要存储
			saveCate(cateName, newGuid, 1);	// 对接存储接口
		}	
	}

	ul.appendChild(li);
	
}

// 往localStorage里添加分类
function saveCate(cateName, guid, level) {
	cateData = JSON.parse(localStorage.cateData);
	todoData = JSON.parse(localStorage.todoData);
	if (level === 1) {
		var hasSame = false;
		each(cateData, function(item, index){
			if(item.name == cateName){
				hasSame = true;
			}
		})	
		if(!hasSame){
			cateData.push({
				guid: guid,
				name: cateName,
				childs: []
			})
			localStorage.cateData = JSON.stringify(cateData);
		}	
	}else{
		var parentCate = currCate.getElementsByTagName('span');
		if(parentCate.length){
			parentCate = parentCate[0].innerHTML;
			each(cateData, function(item){
				if(item.name == parentCate){
					var newCate = {
						guid: guid,
						name: cateName
					}
					item.childs.push(newCate);
				}
			})
			localStorage.cateData = JSON.stringify(cateData);
			todoData.push({
				guid: guid,
				data: []
			})
			localStorage.todoData = JSON.stringify(todoData);
		}	
	}
}

function removeCate(){
	var submitted = confirm('确定要删除该分类吗？');
	if(submitted){
		cateData = JSON.parse(localStorage.cateData);
		var evt = arguments[0] || window.event,
			target = evt.srcElement || evt.target;

		var guid = target.parentElement.getAttribute('guid');
		console.log(guid);
		each(cateData, function(item1, index1){
			if (item1.guid == guid) {
				cateData.splice(index1, 1);
				return;
			}else{
				each(cateData[index1].childs, function(item2, index2){
					if(item2.guid == guid){
						cateData[index1].childs.splice(index2, 1);
						return;
					}
				})
			}
		})
		localStorage.cateData = JSON.stringify(cateData);
		location.reload();
	}
}

// ----------------------------待办任务----------------------------

// 查看所有任务
function selectAll(){
	initTodos(currCate.getAttribute('guid'), 0);
}

// 查看未完成任务
function selectUnfinished(){
	initTodos(currCate.getAttribute('guid'), 1);
}

// 查看已完成任务
function selectFinished(){
	initTodos(currCate.getAttribute('guid'), 2);
}

// 初始化待办任务
function initTodos(guid, type) {
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

		var lisOfUl = 0;
		var outerLi = document.createElement('li');
		var span = document.createElement('span');
		span.innerHTML = item1.date;

		var innerUl = document.createElement('ul');
		addClass(innerUl, 'second-level');

		each(item1.todos, function(item2){
			var cond1 = ((type == 1) && !item2.finished),
				cond2 = ((type == 2) && item2.finished),
				cond3 = (type == 0);

			if(cond1 || cond2 || cond3){
				createTodo(innerUl, item2.name, item2.guid, item2.finished);
				lisOfUl++;
			}
		})

		if(lisOfUl > 0){
			outerLi.appendChild(span);
			outerLi.appendChild(innerUl);
			outUl.appendChild(outerLi);
		}

	})

	todoDiv.appendChild(outUl);

}

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

// 新建任务的点击事件
addEvent(newTodo, 'click', function(){

	secRight.style.display = 'block';
	secRightEdit.style.display = 'none';

	var todoName = window.prompt('请输入待办事项名称');
	if(!todoName) {
		return;
	}

	var currUl,
		hasDate = false;

	var dateSpans = $('.todos').getElementsByTagName('span');
	each(dateSpans, function(item){
		if(item.innerHTML == getToday()){
			hasDate = true;
			currUl = item.parentElement.getElementsByClassName('second-level')[0];
		}
	})

	if(hasDate){
		console.log(currUl);
		createTodo(currUl, todoName);
	}else{
		var outUl = $('.todos .first-level');
		var li = document.createElement('li');
		var span = document.createElement('span');
		span.innerHTML = getToday();
		var innerUl = document.createElement('ul');
		addClass(innerUl, 'second-level');
		li.appendChild(span);
		li.appendChild(innerUl);
		outUl.appendChild(li);
		createTodo(innerUl, todoName);
	}
	
})

// 创建一条todo
function createTodo(innerUl, name, todoId, finished){
	var innerLi = document.createElement('li');
	innerLi.innerHTML = name;
	if(!todoId){
		
		var todoId = guid();// 生成guid
		var cateId = currCate.getAttribute('guid');
		var today = getToday();
		saveTodo(cateId, todoId, today, name);

		secRight.style.display = 'none';
		secRightEdit.style.display = 'block';

		eTodoTitle.value = name;
		eTodoDate.value = today;
		eTodoContent.value = '';
		eTodoContent.focus();
		currTodo = todoId;

		updateSelected(innerLi);	// 将新创建的条目样式设置为选中
	}
	innerLi.setAttribute('guid', todoId);
	innerLi.setAttribute('onclick', 'getContent()');
	if (finished) {
		addClass(innerLi, 'finished-todo');
	};
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

// 保存一个任务到localStorage
function saveTodo(cateId, todoId, date, name, finished){
	todoData = JSON.parse(localStorage.todoData);
	var todo = {
		guid: todoId,
		name: name
	};
	each(todoData, function(item){
		if(item.guid == cateId){
			var hasDate = false;
			for (var i = 0; i < item.data.length; i++) {
				if(item.data[i].date == date){
					hasDate = true;
					item.data[i].todos.push(todo);
				}
			};
			if(!hasDate || !item.data.length){
				var tmpTodos = [];
				tmpTodos.push(todo);
				item.data.push({
					date: date,
					todos: tmpTodos
				})
			}
		}
	})
	localStorage.todoData = JSON.stringify(todoData);
	saveContent(todoId, name, date, '');
}

// ----------------------------任务详情----------------------------

// 编辑按钮的点击事件
addEvent(editBtn, 'click', function(){
	secRight.style.display = 'none';
	secRightEdit.style.display = 'block';

	if(currTodo){

		each(contentData, function(item){
			if(item.guid == currTodo){
				eTodoTitle.value = item.name;
				eTodoDate.value = item.date;
				eTodoContent.value = item.content;
			}
		})
	}

})

// 完成任务事件
addEvent(checkBtn, 'click', function(){
	var cateId = currCate.getAttribute('guid');
	each(todoData, function(item1){
		if (item1.guid == cateId) {
			each(item1.data, function(item2){
				each(item2.todos, function(item3){
					if (item3.guid == currTodo) {
						item3.finished = true;
					};
				})
			})
		};
	})

	localStorage.todoData = JSON.stringify(todoData);

	var secLevel = $('.todos').getElementsByClassName('second-level');
	each(secLevel, function(item){
		var lis = item.getElementsByTagName('li');
		each(lis, function(li){
			if(li.getAttribute('guid') == currTodo){
				addClass(li, 'finished-todo');
			}
		})
	})
	
})

// 右侧内容区域失去光标，触发提交事件
function submit(){
	secRight.style.display = 'block';
	secRightEdit.style.display = 'none';

	todoTitle.innerHTML = eTodoTitle.value;
	todoDate.innerHTML = eTodoDate.value;
	todoContent.innerHTML = eTodoContent.value;

	saveContent(currTodo, eTodoTitle.value, eTodoDate.value, eTodoContent.value);
}

// 保存任务内容
function saveContent(guid, title, date, content, finished){
	contentData = JSON.parse(localStorage.contentData);
	var hasTodo = false;
	each(contentData, function(item){
		if(guid == item.guid){
			hasTodo = true;
			item.name = title;
			item.date = date;
			item.content = content;
			item.finished = finished;
		}
	})
	if(!hasTodo){
		contentData.push({
			guid: guid,
			name: title,
			date: date,
			content: content,
			finished: finished
		})
	}
	localStorage.contentData = JSON.stringify(contentData);
}


// ----------------------------工具方法----------------------------

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

// 生成guid
function guid(){
	var now = new Date();
	var nowStr = now.getFullYear() + '' + 
		(now.getMonth() + 1) + '' + 
		now.getDate() + '' + 
		now.getHours() + '' + 
		now.getMinutes() + '' + 
		now.getSeconds() + '' + 
		now.getMilliseconds();
	return nowStr;
}



