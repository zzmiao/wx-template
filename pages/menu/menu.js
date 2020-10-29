// pages/menu/menu.js
let app = getApp();
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
    console.log(app.globalData.isAuth)
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
  toForm: function(e) {
    wx.navigateTo({
      url: "/pages/index/index",
    })
  },
  toCanvas: function() {
    wx.navigateTo({
      url: "/pages/canvas/canvas",
    })
  },
  toPhone: function() {
    wx.navigateTo({
      url: "/pages/makephonecall/makephonecall",
    })
  },
  toMoveFloatBox: function() {
    wx.navigateTo({
      url: "/pages/floatblock/floatbox",
    })
  },
  toAnimation: function() {
    wx.navigateTo({
      url: "/pages/animation/index",
    })
  },
  toScrollBackTop: function() {
    wx.navigateTo({
      url: "/pages/scrollView/scrollview",
    })
  },
  toSwiper: function() {
    wx.navigateTo({
      url: "/pages/swiper/swiper",
    })
  },
  toComponent: function() {
    wx.navigateTo({
      url: "/pages/component/component",
    })
  },
  toCheckRadio: function() {
    wx.navigateTo({
      url: "/pages/checkbox/checkbox",
    })
  },
  toEditor: function() {
    wx.navigateTo({
      url: "/pages/editor/editor",
    })
  },
  toWrite: function() {
    wx.navigateTo({
      url: "/pages/writename/writename",
    })
  },
  toStarSingle: function() {
    wx.navigateTo({
      url: "/pages/star/star",
    })
  },
  toStarMore: function() {
    wx.navigateTo({
      url: "/pages/starMore/starmore",
    })
  },
  toAuthorize: function() {
    wx.navigateTo({
      url: "/pages/shouquan/shouquan",
    })
  },
  toPupopImages: function() {
    wx.navigateTo({
      url: "/pages/imagesBox/imagesbox",
    })
  }
})