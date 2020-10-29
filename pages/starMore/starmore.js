// pages/starMore/starmore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    list: [{
      id: 1,
      name: "服务",
      score: 5, //默认星星数
    }, {
      id: 2,
      name: "质量",
      score: 5, //默认星星数
    }, {
      id: 3,
      name: "产品",
      score: 5, //默认星星数
    }, {
      id: 4,
      name: "售后",
      score: 5, //默认星星数
    }]
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
  changeStar: function(e) {
   
    let id = e.target.dataset.id;
    let msg = e.target.dataset.title;
    let idx = e.target.dataset.index;
    let temp = this.data.list;
    temp[id].score = idx;
    this.setData({
      list: temp
    })
    console.log(this.data.list)

  }
})