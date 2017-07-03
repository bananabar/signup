// pages/activedetail/activedetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    activedetail: [],
    activeInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: id
    })
    var id = options.id
    var rd_session = app.globalData.session
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    console.log(id)
    var httpsurl = app.globalData.httpsurl + "api/activitydetail/get"
    wx.request({
      url: httpsurl,
      data: { activityid: id },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          activedetail: res.data.Data
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      }
    })
    var activeInfo = app.globalData.activeInfo
    for (var i = 0; i < activeInfo.length; i++) {
      if (id == activeInfo[i].Activity_Info.ID) {
        that.setData({
          activeInfo: activeInfo[i]
        })
        console.log("active", activeInfo[i])
      }
    }

  },

  baoming: function () {
    var id = this.data.id
    wx.navigateTo({
      url: '../canjia/canjia?id=' + id,
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})