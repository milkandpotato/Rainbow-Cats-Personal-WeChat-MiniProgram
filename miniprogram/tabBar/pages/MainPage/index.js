/* Main page of the app */
Page({
    //允许接收服务通知
    async requestSubscribeMessage() {
        const templateId = 'R5sHALA7TKs6jCyH_kwNr9l8vVfWKCU5cXQnFKWlwfA'//填入你自己想要的模板ID，记得复制粘贴全，我自己因为网页没开全，结果浪费半小时
        wx.requestSubscribeMessage({
        //tmplIds: [templateId,templateId2,templateId3],
        tmplIds: [templateId],
        success: (res) => {
            //if (res[templateId] === 'accept'&&res[templateId2] === 'accept'&&res[templateId3] === 'accept') {
            if (res[templateId] === 'accept') {
            this.setData({
                requestSubscribeMessageResult: '成功',
            })
            } else {
            this.setData({
                requestSubscribeMessageResult: `失败（${res[templateId]}）`,
            })
            }
        },
        fail: (err) => {
            this.setData({
            requestSubscribeMessageResult: `失败（${JSON.stringify(err)}）`,
            })
        },
        })
    },
    data: {
        creditA: 0,
        creditB: 0,

        userA: '',
        userB: '',

        limitA:0,
        limitB:0,

        //轮播图路径
        imageList:[
          'cloud://test-0gtbizkc74d96d88.7465-test-0gtbizkc74d96d88-1344432440/images/mainPage/微信图片_20250227110325.jpg',
          'cloud://test-0gtbizkc74d96d88.7465-test-0gtbizkc74d96d88-1344432440/images/mainPage/微信图片_20250227110321.jpg',
          'cloud://test-0gtbizkc74d96d88.7465-test-0gtbizkc74d96d88-1344432440/images/mainPage/微信图片_20250227110317.jpg'
        ]
    },

    async onShow(){
        this.getInformation();
    },

    //获取积分
    getInformation(){
        wx.cloud.callFunction({name: 'getList', data: {list: getApp().globalData.collectionUserList}})
            .then(res => {
                this.setData({
                    creditA:res.result.data[0].credit,
                    userA:res.result.data[0].userName,
                    limitA:res.result.data[0].weekCreditLimit,

                    creditB: res.result.data[1].credit,
                    userB:res.result.data[1].userName,
                    limitB:res.result.data[1].weekCreditLimit,
                })
            })
    }
})