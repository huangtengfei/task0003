'use strict'

var data = [
	{
		guid: 'top00001',
		name: 'IFE项目',
		childs: [
			{
				guid: 'cate0001',
				name: 'task0001'
			},
			{
				guid: 'cate0002',
				name: 'task0002'			
			}
		]
	},
	{
		guid: 'top00002',
		name: '个人设计',
		childs: [
			{
				guid: 'cate0003',
				name: 'blog'
			}
		]
	},
	{
		guid: 'top00003',
		name: '默认分类',
		childs: [
			{
				guid: 'cate0004',
				name: 'qixi'	
			},
			{
				guid: 'cate0005',
				name: 'start'				
			}
		]
	}
];

var todoData = [
	{
		guid: 'cate0001',
		data: [
			{
				date: '2015-09-09',
				todos: [
					{
						guid: 'todo0001',
						name: 'to-do-3',
						finished: true
					},
					{
						guid: 'todo0002',
						name: 'to-do-4',
						finished: false
					}
				]
			},
			{
				date: '2015-09-08',
				todos: [
					{
						guid: 'todo0003',
						name: 'to-do-1',
						finished: false
					},
					{
						guid: 'todo0004',
						name: 'to-do-2',
						finished: true
					}
				]
			}
		]
	},
	{
		guid: 'cate0002',
		data: [
			{
				date: '2015-09-09',
				todos: [
					{
						guid: 'todo0005',
						name: 'to-do-1',
						finished: false
					},
					{
						guid: 'todo0006',
						name: 'to-do-2',
						finished: false
					}
				]
			}
		]
	},
	{
		guid: 'cate0003',
		data: [
			{
				date: '2015-07-09',
				todos: [
					{
						guid: 'todo0007',
						name: 'to-do-1',
						finished: true
					},
					{
						guid: 'todo0008',
						name: 'to-do-2',
						finished: false
					}
				]
			}
		]
	},
	{
		guid: 'cate0004',
		data: [
			{
				date: '2015-08-09',
				todos: [
					{
						guid: 'todo0009',
						name: 'to-do-3',
						finished: true
					},
					{
						guid: 'todo0010',
						name: 'to-do-4',
						finished: false
					}
				]
			},
			{
				date: '2015-08-08',
				todos: [
					{
						guid: 'todo0011',
						name: 'to-do-1',
						finished: true
					},
					{
						guid: 'todo0012',
						name: 'to-do-2',
						finished: true
					}
				]
			}
		]
	},
	{
		guid: 'cate0005',
		data: [
			{
				date: '2015-06-09',
				todos: [
					{
						guid: 'todo0013',
						name: 'to-do-1',
						finished: true
					},
					{
						guid: 'todo0014',
						name: 'to-do-2',
						finished: false
					}
				]
			}
		]
	}
]

var contentData = [
	{
		guid: 'todo0001',
		name: 'to-do-3',
		date: '2015-09-09',
		content: '完成task0001-1'
	},
	{
		guid: 'todo0002',
		name: 'to-do-4',
		date: '2015-09-09',
		content: '完成task0001-2'
	},
	{
		guid: 'todo0003',
		name: 'to-do-1',
		date: '2015-09-08',
		content: '完成task0002-1'
	},
	{
		guid: 'todo0004',
		name: 'to-do-2',
		date: '2015-09-08',
		content: '完成task0002-2'
	},
	{
		guid: 'todo0005',
		name: 'to-do-1',
		date: '2015-09-09',
		content: '完成task0003-1'
	},
	{
		guid: 'todo0006',
		name: 'to-do-2',
		date: '2015-09-09',
		content: '完成task0003-2'
	},
	{
		guid: 'todo0007',
		name: 'to-do-1',
		date: '2015-07-09',
		content: '完成首页'
	},
	{
		guid: 'todo0008',
		name: 'to-do-2',
		date: '2015-07-09',
		content: '完成详情页'
	},
	{
		guid: 'todo0009',
		name: 'to-do-3',
		date: '2015-08-09',
		content: '完成主列表'
	},
	{
		guid: 'todo0010',
		name: 'to-do-4',
		date: '2015-08-09',
		content: '完成留言列表'
	},
	{
		guid: 'todo0011',
		name: 'to-do-1',
		date: '2015-08-08',
		content: '完成leancloud对接'
	},
	{
		guid: 'todo0012',
		name: 'to-do-2',
		date: '2015-08-08',
		content: '完成留言样式'
	},
	{
		guid: 'todo0013',
		name: 'to-do-1',
		date: '2015-06-09',
		content: '完成API设计'
	},
	{
		guid: 'todo0014',
		name: 'to-do-2',
		date: '2015-06-09',
		content: '完成后台'
	}
]
