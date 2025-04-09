// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (context) => {
  //获取所有记录
  const allrecords = db.collection('UserList').get();
  for (let record in allrecords) {
    db.collection('UserList').doc(record._id).update({
      data: {
        weekCreditLimit: 500
      }
    })
  }
}