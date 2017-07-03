// pages/baoming/baoming.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slidevalue: 5,
    title: "",
    introduction: "",
    time: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  titleinputchange: function(e){
    this.setData({
      title: e.detail.value
    })
  },

  introctioninputchange: function (e) {

    this.setData({
      introduction: e.detail.value
    })
  },

  slidechange: function (e) {

    this.setData({
      slidevalue: e.detail.value
    })
  },

  shijianinputchange: function (e) {

    this.setData({
      time: e.detail.value
    })
  },

  submit: function () {
    var httpsurl = app.globalData.httpsurl + "api/activity/insert"
    var that = this
    var rd_session = app.globalData.session
    var item = {
      Name: that.data.title,
      Instruction: that.data.introduction,
      Date: that.data.time,
      RenShu: that.data.slidevalue,
      rd_session: rd_session
    }
    console.log(item)
    wx.request({
      url: httpsurl,
      method: "POST",
      data: item,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        httpsurl = app.globalData.httpsurl + "api/activity/get"
        wx.request({
          url: httpsurl,
          data: { rd_session: rd_session },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            app.globalData.activeInfo = res.data.Data
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '上传成功',
              success: function (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '/pages/mine/mine',
                  })
                }
              }
            })
          }
        })
      },
    })
  }
})