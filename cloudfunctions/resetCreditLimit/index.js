// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (context) => {
  //获取所有记录
  const users = db.collection('UserList');
  const res = await users.where({}).update({
    data: {
      weekCreditLimit: 500
    }
  });
  console.log("res",res);
}