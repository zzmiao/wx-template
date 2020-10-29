// pages/floatblock/floatbox.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left: "",
    top: "",
    systemInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let systemInfo = wx.getSystemInfoSync();
    console.log(systemInfo)
    this.setData({
      systemInfo: systemInfo
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
  setTouchMove: function(e) {
    console.log(e);
    let top = e.touches[0].clientY;
    let left = e.touches[0].clientX;
    let systemInfo = this.data.systemInfo;
    let maxTop = systemInfo.windowHeight * 0.78;
    let maxLeft = systemInfo.windowWidth * 0.89;
    if (top <= 0) {
      top = 0;
    }
    if (top >= maxTop) {
      top = maxTop;
    }
    if (left <= 0) {
      left = 0;
    }
    if (left >= maxLeft) {
      left = maxLeft;
    }

    this.setData({
      left: left + "px",
      top: top + "px"
    })
  },
  setCoordinates: function(e) {
    let left = Number(this.data.left.replace("px", ""));
    if (left > (this.data.systemInfo.windowWidth / 2)) {
      left = this.data.systemInfo.windowWidth * 0.89 - 10;
    } else {
      left = 10;
    }
    this.setData({
      left: left + "px"
    })
  }
})