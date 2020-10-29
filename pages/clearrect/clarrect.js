// pages/clearrect/clarrect.js
let ctx = wx.createCanvasContext("clear-canvas");
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

    ctx.setFillStyle('#efefef');
    ctx.fillRect(0, 0, 200, 100);
    
    ctx.draw()
  

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
  /**开始 */
  touchStart: function(e) {
    console.log("[touchstart]", e);
    let startX = e.touches[0].x;
    let startY = e.touches[0].y;
    ctx.clearRect(startX, startX, 5, 5)
    ctx.draw()
  },
  /**移动 */
  touchMove: function(e) {
    console.log("[touchmove]", e);
    
    let moveX = e.touches[0].x;
    let moveY = e.touches[0].y;
    
    ctx.clearRect(moveX, moveY, 5, 5)

  },
  /**结束 */
  touchEnd: function(e) {
    console.log("[touchend]",e);
  }
})