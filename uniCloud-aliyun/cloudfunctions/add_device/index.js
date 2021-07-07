// 2021-07-07, Bruce

'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	//console.log('event : ' + JSON.stringify(event));

	const collection = db.collection("devices");

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
			"name": event.name,
			"serial_number": event.serial_number,
			"mac": event.mac,
			"ip_address": event.ip_address,
			"available_space": event.available_space,
			
			"registration_date": event.registration_date,
			"available_date": event.available_date,
			"temperature": event.temperature,
			"humidity": event.humidity,
			
			//"created_date": event.created_date,
			"last_modified_date": event.last_modified_date
		});
		//console.log("update " + JSON.stringify(res));
	} else {
		// 增加
		res = await collection.add({
			"name": event.name,
			"serial_number": event.serial_number,
			"mac": event.mac,
			"ip_address": event.ip_address,
			"available_space": event.available_space,
			
			"registration_date": event.registration_date,
			"available_date": event.available_date,
			"temperature": event.temperature,
			"humidity": event.humidity,
			
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
