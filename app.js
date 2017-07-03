//app.js
App({
  onLaunch: function () {
    var that = this
    var session = wx.getStorageSync('session')
    var userInfo = wx.getStorageSync('userInfo')
    that.globalData.userInfo = userInfo
    that.globalData.session = session
    // //调用API从本地缓存中获取数据
    if (session == ""||session==null) {
      //登录态过期
      wx.login({
        success: function (res) {
          console.log(res)
          var userInfo
          var restemp = res
          wx.getUserInfo({
            success: function (res) {
              userInfo = res.userInfo
              console.log(res)
              that.globalData.userInfo = userInfo
              try {
                wx.setStorageSync('userInfo', userInfo)
              } catch (e) { }
              if (restemp.code) {
                //发起网络请求
                var item = {
                  code: restemp.code,
                  PictureUrl: userInfo.avatarUrl,
                  Name: userInfo.nickName
                }
                var httpsurl = that.globalData.httpsurl + "api/activity/onlogin/"
                wx.request({
                  url: httpsurl,
                  method: "POST",
                  data: item,
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    console.log(res)
                    var session = res.data.Data
                    that.globalData.session = session
                    try {
                      wx.setStorageSync('session', session)
                    } catch (e) { }
                  },
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          })

        }
      })
    }
  },

  globalData: {
    // httpsurl:"https://rw.oupusoft.com/", //服务器地址
    httpsurl: "http://localhost/",
    userInfo: null,//当前微信用户信息
    session: null, //登录标志
    activeInfo: null //活动信息
  }
})