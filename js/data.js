'use strict'

var data = [
	{
		name: 'IFE项目',
		childs: [
			{
				name: 'task0001',
				childs: [
					{
						name: 'to-do-1',
						date: '2015-09-09',
						content: '完成task0001-1'
					},
					{
						name: 'to-do-2',
						date: '2015-09-09',
						content: '完成task0001-2'
					}
				]
			},
			{
				name: 'task0002',
				childs: [
					{
						name: 'to-do-1',
						date: '2015-08-09',
						content: '完成task0001-1'
					},
					{
						name: 'to-do-2',
						date: '2015-08-09',
						content: '完成task0001-2'
					}
				]
			}
		]
	},
	{
		name: '个人设计',
		childs: [
			{
				name: 'blog',
				childs: [
					{
						name: 'to-do-1',
						date: '2015-07-09',
						content: '完成首页'
					},
					{
						name: 'to-do-2',
						date: '2015-07-09',
						content: '完成详情页'
					}
				]
			}
		]
	},
	{
		name: '默认分类',
		childs: [
			{
				name: 'qixi',
				childs: [
					{
						name: 'to-do-1',
						date: '2015-09-09',
						content: '完成主列表'
					},
					{
						name: 'to-do-2',
						date: '2015-09-09',
						content: '完成留言列表'
					}
				]
			},
			{
				name: 'start',
				childs: [
					{
						name: 'to-do-1',
						date: '2015-08-09',
						content: '完成API设计'
					},
					{
						name: 'to-do-2',
						date: '2015-08-09',
						content: '完成后台'
					}
				]
			}
		]
	}
]