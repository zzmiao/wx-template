const updateManager = wx.getUpdateManager();
//app.js
App({
  onLaunch: function () {
    let that = this;
    //获得设备信息
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        that.globalData.deviceInfo = res;
      },
    })

    wx.login({
      success: function (res) {

        if (res.code) {
          console.log("获取用户登录凭证：" + res.code);
          wx.getUserInfo({
            success: function (res) {
              console.log("[wx.getUserInfo]", res.userInfo);
            }
          })
        } else {
          console.log("获取用户登录失败：" + res.errMsg);
        }
      }
    })


  },
  onShow: function (options) {
    console.log("[onShow]", options);
    let that = this;
    this.globalData.appOnShowOpts = options;

    if (wx.canIUse('getUpdateManager')) {
      updateManager.onCheckForUpdate(function (res) {
        //请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                console.log("success==", res)
                if (res.confirm) {
                  //新的版本已经下载好，调用applyUpdate应用新版本并重启
                  updateManager.applyUpdate();
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            //新的版本下载失败
            wx.showModal({
              title: '已经有新版本了呦~',
              content: '新版本已经上线啦~，请你删除当前小程序，重新搜索打开呦~',
            })
          })

        }
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
      })
    }

  },
  globalData: {
    userInfo: null,
    deviceInfo: '',
    appOnShowOpts: '',
    isAuth: false
  },

})