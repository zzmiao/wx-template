// pages/scrollView/scrollview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight: '',
    scrollTop: 0,
    isShowScrollBtn: false,
    imgArr: ["scrollview", "scrollview", "scrollview", "scrollview", "scrollview"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let systemInfo = wx.getSystemInfoSync();
    this.setData({
      screenHeight: systemInfo.windowHeight
    })
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
  /**
   * scroll-view页面滚动事件
   */
  scrollFunction: function(e) {
    console.log(e)
    if (e.detail.scrollTop > 100) {
      this.setData({
        isShowScrollBtn: true,
      })
    } else {
      this.setData({
        isShowScrollBtn: false,
      })
    }
  },
  scrollBackTop: function() {
    console.log("ok")
    this.setData({
      scrollTop: 0
    })
  }
})