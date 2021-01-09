// 2021-01-03, Bruce

'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	//console.log('get_list_bug : ' + event)

	const collection = db.collection("bugs");
	
	var filter = event.filter ? event.filter : {};         //筛选条件，默认为空，格式 {key:'values'}
	var pageIndex = event.pageIndex ? event.pageIndex : 1; //当前第几页，默认为第一页
	var pageSize = event.pageSize ? event.pageSize : 10;   //每页取多少条记录，默认为10条
	
	const countResult = await collection.where(filter).count(); //获取集合中的总记录数
	const total = countResult.total;                            //得到总记录数 
	const totalPage = Math.ceil(total / pageSize);              //计算页数
	
	var hasMore;  //提示前端是否还有数据
	if (pageIndex > totalPage || pageIndex == totalPage) { //如果没有数据了，就返回false
		hasMore = false;
	} else {
		hasMore = true;
	}

	//查询指定字段的一条记录
	let res = await collection.where(filter).skip((pageIndex - 1) * pageSize).limit(pageSize).orderBy("last_modified_date", "desc").get(); // asc / desc
	//console.log("get " + JSON.stringify(res));

	//返回数据给客户端
	return {
		code: 200,
		msg: '成功',
		data: res.data
	}
};
