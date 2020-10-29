// pages/animation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    showRotate: '',
    rotateStatus: true
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

    var animation = wx.createAnimation({
      duration: 5000, //动画的持续时间
      timingFunction: 'ease', //动画的效果设置
      delay: 0, //动画延迟时间
    })

    this.animation = animation

    animation
      .translate(200, 0).scale(0.5).rotate(180).step()
      .translate(200, 200).scale(1).rotate(360).step()
      .translate(0, 200).scale(0.5).rotate(-180).step()
      .translate(0, 0).scale(1).rotate(-360).step();

    this.setData({
      animationData: animation.export()
    })
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
  rotate: function() {
    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    })

    if (this.data.rotateStatus) {
      animation.rotate(180).step();
      this.setData({
        rotateStatus: false
      })
    } else {
      animation.rotate(0).step();
      this.setData({
        rotateStatus: true
      })
    }

    this.setData({
      showRotate: animation.export()
    })
  }
})