// pages/mine/signOneName/signOneName.js
const app = getApp();
const util = require("../../utils/util");
let content;
let touchs;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSign: true, //是否签名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //初始化数据
    content = null;
    touchs = [];
    //获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        //设置画布高度
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight - util.rpx2px(254, res.windowWidth) - 1
        })
      }
    })
    //获得Canvas的上下文
    content = wx.createCanvasContext('signCanvas');
    //设置线的颜色
    content.setStrokeStyle("#000000");
    //设置线的宽度
    content.setLineWidth(5);
    //设置线两端端点样式更加圆润
    content.setLineCap('round');
    //设置两条线连接处更加圆润
    content.setLineJoin('round');
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

  },
  //绘制
  draw: function (touchs) {
    this.setData({
      isSign: false
    })
    let point1 = touchs[0];
    let point2 = touchs[1];
    touchs.shift();
    content.moveTo(point1.x, point1.y);
    content.lineTo(point2.x, point2.y);
    content.stroke();
    content.draw(true);
  },

  //清除画布
  clear: function () {
    content.clearRect(0, 0, app.globalData.deviceInfo.windowWidth, this.data.height);
    content.draw(true);
    this.setData({
      isSign: true
    })
  },
  // 画布的触摸移动开始手势响应
  start: function (event) {
    //获取触摸开始的 x,y
    let point = {
      x: event.changedTouches[0].x,
      y: event.changedTouches[0].y
    }
    touchs.push(point)
  },

  // 画布的触摸移动手势响应
  move: function (e) {
    let point = {
      x: e.touches[0].x,
      y: e.touches[0].y
    }
    touchs.push(point)
    if (touchs.length >= 2) {
      this.draw(touchs)
    }
  },

  // 画布的触摸移动结束手势响应
  end: function (e) {
    console.log("触摸结束" + e)
    //清空轨迹数组
    for (let i = 0; i < touchs.length; i++) {
      touchs.pop()
    }
  },

  // 画布的触摸取消响应
  cancel: function (e) {
    console.log("触摸取消" + e)
  },

  // 画布的长按手势响应
  tap: function (e) {
    console.log("长按手势" + e)
  },
  error: function (e) {
    console.log("画布触摸错误" + e)
  },
  //点击确认-保存图片
  save: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    //将canvas保存成文件
    wx.canvasToTempFilePath({
      canvasId: 'signCanvas',
      destHeight: that.data.height,
      destWidth: that.data.width,
      success: function (res) {
        console.log('签名图片路径:' + res.tempFilePath);
        //上传保存的canvas签名图片
        wx.hideLoading();
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '签名图片保存失败，请重试!',
          icon: "none"
        })
      }
    })

  },
})