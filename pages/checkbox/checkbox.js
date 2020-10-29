// pages/checkbox/checkbox.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice: 0,
    curChooseStatus: false,
    checkboxText: "这是服务协议",
    singleArr: [{
        name: 'USA',
        value: '美国',
        checked: false,
        price: 90
      },
      {
        name: 'CHN',
        value: '中国',
        checked: false,
        price: 100
      },
      {
        name: 'BRA',
        value: '巴西',
        checked: false,
        price: 60
      },
      {
        name: 'JPN',
        value: '日本',
        checked: false,
        price: 59
      },
      {
        name: 'ENG',
        value: '英国',
        checked: false,
        price: 60
      },
      {
        name: 'TUR',
        value: '法国',
        checked: false,
        price: 60
      }
    ],
    items: [{
        name: 'USA',
        value: '美国',
        checked: false
      },
      {
        name: 'CHN',
        value: '中国',
        checked: true
      },
      {
        name: 'BRA',
        value: '巴西',
        checked: false
      },
      {
        name: 'JPN',
        value: '日本',
        checked: false
      },
      {
        name: 'ENG',
        value: '英国',
        checked: false
      },
      {
        name: 'TUR',
        value: '法国',
        checked: false
      },
    ]
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
  checkboxRadio: function(e) {
    let curStatus = this.data.curChooseStatus;
    let singleArrTemp = this.data.singleArr;

    this.setData({
      curChooseStatus: !curStatus
    })

    if (!curStatus) {
      for (let i = 0; i < singleArrTemp.length; i++) {
        singleArrTemp[i].checked = true;
      }
    } else {
      for (let i = 0; i < singleArrTemp.length; i++) {
        singleArrTemp[i].checked = false;
      }
    }
    this.setData({
      singleArr: singleArrTemp
    })
    let tempPrice = this.getCheckedVal();
    this.setData({
      totalPrice: tempPrice
    })
  },
  checkboxRadioSingle: function(e) {
    console.log(e);
    let curIndex = e.currentTarget.dataset.index;
    let curStatus = e.currentTarget.dataset.checked;
    let tempSingleArr = this.data.singleArr;
    if (!curStatus) {
      tempSingleArr[curIndex].checked = true;
    } else {
      tempSingleArr[curIndex].checked = false;
    }
    this.setData({
      singleArr: tempSingleArr
    })
    let tempPrice = this.getCheckedVal();
    this.setData({
      totalPrice: tempPrice
    })

  },
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  getCheckedVal: function() {
    let checkedTempData = this.data.singleArr;

    let totalPrice = 0;
    let count = 0;
    for (let i = 0; i < checkedTempData.length; i++) {
      if (checkedTempData[i].checked) {
        totalPrice += checkedTempData[i].price;
        count += 1;
      }
    }
    console.log(count);
    if (count == checkedTempData.length) {
      this.setData({
        curChooseStatus: true
      })
    } else {
      this.setData({
        curChooseStatus: false
      })
    }
    return totalPrice
  }
})