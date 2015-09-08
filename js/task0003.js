'use strict'

var newCate = $('#newCate');
var firLevel = $('.first-level');
var secLevel = $('.second-level');
var currCate = $('.third-level li');

// 点击 新增分类 按钮时的处理
addEvent(newCate, 'click', function(){

	if(currCate.parentElement.className == 'third-level'){	
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

	if(currCate.parentElement.className != 'third-level'){
		if(ul){
			ul.style.background = '#f2f2f2';
		}
	}else{
		newCate.style.cursor = 'not-allowed';
	}

	addClass(currCate, 'selected');		// 为当前选中的分类添加样式

})

// 创建一个分类，参数：分类名称
function createCate(cateName){

	var ul = currCate.getElementsByTagName('ul')[0];

	var li = document.createElement('li'),
	 	img = document.createElement('img'),
	 	span = document.createElement('span');

	if(currCate.parentElement.className == 'second-level'){		
		img.setAttribute('src', 'image/file.png');
	}else {
		img.setAttribute('src', 'image/folder-open.png');
	}
	span.innerHTML = cateName;
	
	li.appendChild(img);
	li.appendChild(span);
	ul.appendChild(li);
}

