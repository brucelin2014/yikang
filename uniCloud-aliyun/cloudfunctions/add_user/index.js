// 2021-01-09, Bruce

'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	//console.log('event : ' + JSON.stringify(event));

	const collection = db.collection("users");

	// 查询指定字段的一条记录
	let res = await collection.where({
		"_id": event._id
	}).get();
	//console.log("get " + JSON.stringify(res));

	if (res.data.length > 0) {
		// 更新
		res = await collection.where({
			"_id": event._id
		}).update({
			"code": event.code,
			"name": event.name,
			"password": event.password,
			
			//"created_date": event.created_date,
			"last_modified_date": event.last_modified_date
		});
		//console.log("update " + JSON.stringify(res));
	} else {
		// 增加
		res = await collection.add({
			"code": event.code,
			"name": event.name,
			"password": event.password,
			
			"created_date": event.created_date,
			"last_modified_date": event.last_modified_date
		});
		//console.log("add " + JSON.stringify(res));
	}

	//返回数据给客户端
	return {
		code: 200,
		msg: '成功',
		data: event._id == '' ? res.id : res.data
	}
};
