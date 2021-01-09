// 2021-01-06, Bruce

'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	//console.log('get_list_bug : ' + event)

	const collection = db.collection("settings");

	//查询指定字段的一条记录
	let res = await collection.get();
	//console.log("get " + JSON.stringify(res));

	//返回数据给客户端
	return {
		code: 200,
		msg: '成功',
		data: res.data
	}
};
