// pages/shouquan/shouquan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSettingFun();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**判断是否授权 */
  getSettingFun: function() {
    let that = this;
    //先通过 wx.getSetting 先查询一下用户是否授权了 "scope.userLocation" 这个 scope，也可直接调用wx.authorize请求授权；
    wx.getSetting({
      success: function(res) {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        console.log(res);
        let status = res.authSetting["scope.userLocation"];
        console.log(status);
        if (status != undefined && status != true) {
          console.log("om");
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取你的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(res) {
                    console.log("[wx.openSetting]", res)
                    if (res.authSetting['scope.userLocation'] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //成功授权直接调用getlocation的API
                      that.getLocationFun();


                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })

        } else if (status == undefined) {
          //首次授权(undefined)
          // 发起请求用户授权
          wx.authorize({
            scope: 'scope.userLocation',
            success: function(res) {
              //成功授权直接调用getlocation的API
              that.getLocationFun();
            }
          })
        } else {
          //成功授权直接调用getlocation的API
          that.getLocationFun();
        }
      }
    })
  },
  /**获取经纬度 */
  getLocationFun: function() {
    wx.getLocation({
      success: function(res) {
        console.log(res);
      },
    })
  }
})