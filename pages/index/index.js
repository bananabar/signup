//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    var rd_session = app.globalData.session 
    var httpsurl = app.globalData.httpsurl + "api/activity/get"
    wx.request({
      url: httpsurl,
      data: { rd_session: rd_session },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        app.globalData.activeInfo = res.data.Data
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      }
    })
  },
  faqibaoming: function(){
    wx.navigateTo({
      url: '../baoming/baoming',

    })
  }
})
