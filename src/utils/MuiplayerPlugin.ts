export default [
	{
		functions:'清晰度',
		model:'select',
		show:true,
		zIndex:0,
		childConfig:[
			{functions:'蓝光1080P'},
			{functions:'超清'},
			{functions:'高清',selected:true},
			{functions:'标清'},
		],
		onToggle:function(data:any,selected:any,back:any) {
            // Action
        }
	},
]