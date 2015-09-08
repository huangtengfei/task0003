'use strict'

var newCate = $('#newCate');
var secLevel = $('.second-level');
var currCate = $('.third-level li');

addEvent(newCate, 'click', function(){

	var cateName = window.prompt('请输入分类名称');

	if(!cateName) {
		return;
	}

	var li = document.createElement('li');
	var img = document.createElement('img');

	if(currCate.parentElement.className == 'third-level'){		
		img.setAttribute('src', 'image/file.png');
	}else {
		img.setAttribute('src', 'image/folder.png');
	}

	var span = document.createElement('span');
	span.innerHTML = cateName;

	li.appendChild(img);
	li.appendChild(span);
	currCate.parentElement.appendChild(li);

})

addEvent(secLevel, 'click', function(){
	var evt = arguments[0] || window.event;
	var target = evt.srcElement || evt.target;
	currCate = target.tagName == 'SPAN' ? target.parentElement : target;
})

