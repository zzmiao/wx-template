// pages/star/star.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starNumber: 3, //默认星星数
    starsDescribe: [{
        message: '非常差'
      },
      {
        message: '差'
      },
      {
        message: '一般'
      },
      {
        message: '好'
      },
      {
        message: '非常好'
      }
    ],
    starok: "../../images/starok.png",
    starno: "../../images/starno.png",
    comment: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      comment: this.data.starsDescribe[this.data.starNumber - 1].message
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
   * 点击改变星星
   */
  changeStar: function(e) {
    let msg = e.target.dataset.title;
    let idx = e.target.dataset.index;
    this.setData({
      starNumber: idx,
      comment: msg
    })
  }
})