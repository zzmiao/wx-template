// pages/makephonecall/makephonecall.js
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
  callPhone: function(e) {
    let phone = e.currentTarget.dataset.phone;
    console.log(phone);
    wx.makePhoneCall({
      phoneNumber: phone,
      success: function(res) {
        console.log("[phone:success]", res)
      },
      fail: function(res) {
        console.log("[phone:fail]", res)
      }
    })
  },
  scanCode: function() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        wx.redirectTo({
          url: res.result,
        })
        
      }
    })
  }
})