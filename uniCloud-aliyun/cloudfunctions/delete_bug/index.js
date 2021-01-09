// 2021-01-02, Bruce

'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	//console.log('event : ' + event)

	const collection = db.collection("bugs");

	// 删除信息
	let res = await collection.where({
		"_id": event._id
	}).remove();
	//console.log("remove " + JSON.stringify(res));

	// 返回数据给客户端
	return {
		code: 200,
		msg: '删除成功',
		data: res.data
	}
};
