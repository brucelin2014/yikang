// 2021-01-02, Bruce

'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	//console.log('event : ' + JSON.stringify(event));

	const collection = db.collection("bugs");

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
			"number": event.number,
			"project": event.project,
			"type": event.type,
			"frequency": event.frequency,
			"ponderance": event.ponderance,
			
			"priority": event.priority,
			"version": event.version,
			"title": event.title,
			"remarks": event.remarks,
			"attachments": event.attachments,
			
			"status": event.status,
			"submitter": event.submitter,
			"assigned": event.assigned,
			"replys": event.replys,
			
			//"created_date": event.created_date,
			"last_modified_date": event.last_modified_date
		});
		//console.log("update " + JSON.stringify(res));
	} else {
		// 增加
		res = await collection.add({
			"number": event.number,
			"project": event.project,
			"type": event.type,
			"frequency": event.frequency,
			"ponderance": event.ponderance,
			
			"priority": event.priority,
			"version": event.version,
			"title": event.title,
			"remarks": event.remarks,
			"attachments": event.attachments,
			
			"status": event.status,
			"submitter": event.submitter,
			"assigned": event.assigned,
			"replys": event.replys,
			
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
