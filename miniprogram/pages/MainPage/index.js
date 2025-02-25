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
          'Images/cover_1.jpg',
          'Images/cover_2.jpg'
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

                    creditB: res.result.data[1].credit,
                    userB:res.result.data[1].userName
                })
            })
    }
})