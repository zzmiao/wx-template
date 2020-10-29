// pages/component/component.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: '',
    content: "这是组件",
    dataObject: [{
      id: '001',
      name: "苗振振",
      content: "这是苗振振列表"
    }, {
      id: '002',
      name: "李文辉",
      content: "这是李文辉列表"
    }, {
      id: '003',
      name: "郑胜祥",
      content: "这是郑胜祥列表"
    }, {
      id: '004',
      name: "牛洋辉",
      content: "这是牛洋辉列表"
    }, {
      id: '005',
      name: "邵克",
      content: "这是邵克列表"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 调用子组件中methods的getChildrenData方法
    let data = this.selectComponent('#list').getChildrenData();
    console.log(data)
    this.setData({
      count: data.length
    })
    let data2 = this.selectComponent('#list').onShow();
    console.log(data2)
    let childrenData = this.selectComponent("#list").myChildrenValue();
    console.log(childrenData);
    wx.hideLoading();
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
  fatherEvent: function(e) {
    console.log(e)
    this.setData({
      count: e.detail.childrenToFather.length
    })

  }
})