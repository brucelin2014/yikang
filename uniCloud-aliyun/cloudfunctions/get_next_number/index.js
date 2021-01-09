// 2021-01-07, Bruce

'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	//console.log('get_next_number : ' + event)

	const collection = db.collection("bugs");
	const $ = db.command.aggregate;
	let res = await collection.aggregate()
		.group({
			_id: '1',
			maxNumber: $.max('$number')
		})
		.end();
	
	let nextNumber = 0;
	if (res.data.length > 0) {
		nextNumber = res.data[0].maxNumber;
	}
	nextNumber++;
	console.log(nextNumber);
	for (var i=(nextNumber + "").length; i<6; i++) {
		nextNumber = "0" + nextNumber;
	}

	//返回数据给客户端
	return {
		code: 200,
		msg: '成功',
		data: nextNumber
	}
};
