App({
  async onLaunch() {
    this.initcloud()

    this.globalData = {
      //记录使用者的openid
      _openidA: 'oA0Lz65os84YwbY2OezOutdnDVXc',
      _openidB: 'oA0Lz6zm85boP5n1Jc4ED-wOReiA',

      //记录使用者的名字
      userA: '小孙',
      userB: '小于',

      users:[
        {
          userName:'小孙',
          _openid:'oA0Lz65os84YwbY2OezOutdnDVXc',
        },
        {
          userName:'小于',
          _openid:'oA0Lz6zm85boP5n1Jc4ED-wOReiA',
        }
      ],

      //用于存储待办记录的集合名称
      collectionMissionList: 'MissionList',
      collectionMarketList: 'MarketList',
      collectionStorageList: 'StorageList',
      collectionUserList: 'UserList',

      //最多单次交易积分
      maxCredit: 10,
    }
  },

  flag: false,

  /**
   * 初始化云开发环境
   */
  async initcloud() {
    const normalinfo = require('./envList.js').envList || [] // 读取 envlist 文件
    if (normalinfo.length != 0 && normalinfo[0].envId != null) { // 如果文件中 envlist 存在
      wx.cloud.init({ // 初始化云开发环境
        traceUser: true,
        env: normalinfo[0].envId
      })
      // 装载云函数操作对象返回方法
      this.cloud = () => {
        return wx.cloud // 直接返回 wx.cloud
      }
    } else { // 如果文件中 envlist 不存在，提示要配置环境
      this.cloud = () => {
        wx.showModal({
          content: '无云开发环境', 
          showCancel: false
        })
        throw new Error('无云开发环境')
      }
    }
  },

  // 获取云数据库实例
  async database() {
    return (await this.cloud()).database()
  },
})