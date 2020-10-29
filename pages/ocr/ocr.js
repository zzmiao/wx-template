// pages/ocr/ocr.js
const app = getApp()
const util = require("../../utils/util");
const imgFrontDefault = "/images/ocr/idCardFront.png";
const imgBackDefault = "/images/ocr/idCardBack.png";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgFront: imgFrontDefault,
    imgBack: imgBackDefault,
    hideCancelImgFront: true,
    hideCancelImgBack: true,
    ocrButtonDisable: true,
    imgFrontResult: "",
    imgBackResult: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    // if (util.compareVersion(app.globalData.deviceInfo.SDKVersion, "1.9.3") < 0) {
    //   console.log("基础库低于1.9.3");
    //   wx.showModal({
    //     title: '操作提示',
    //     showCancel: false,
    //     content: '您的微信版本不支持人脸识别功能！',
    //     complete: function() {
    //       wx.navigateBack()
    //     }
    //   })
    // } else {
    //   wx.checkIsSupportFacialRecognition({
    //     fail() {
    //       wx.showModal({
    //         title: '操作提示',
    //         showCancel: false,
    //         content: '您的手机不支持人脸识别功能！',
    //         complete: function() {
    //           wx.navigateBack()
    //         }
    //       })
    //     }
    //   })
    // }
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
  /**点击身份证头像面 */
  onIdCardFront: function(e) {
    let that = this;
    wx.chooseImage({
      sourceType: ["camera", "album"],
      sizeType: ["compressed"], //"original",
      count: 1,
      success: function(res) {
        console.log(res);
        var path = res.tempFilePaths[0];
        that.setData({
          imgFront: path,
          imgFrontResult: path,
          hideCancelImgFront: false,
        })
        that.changeOcrButtonBgColor();
      },
    })
  },
  /**点击身份证国徽面 */
  onIdCardBack: function(e) {
    var that = this;
    wx.chooseImage({
      sourceType: ["camera", "album"],
      sizeType: ["compressed"], //"original", 
      count: 1,
      success: function(res) {
        console.log(res.tempFilePaths[0])
        var path = res.tempFilePaths[0];
        that.setData({
          imgBack: path,
          imgBackResult: path,
          hideCancelImgBack: false,
        })
        that.changeOcrButtonBgColor();
      },
      fail: function() {

      },
    })
  },
  /**点击取消身份证头像面 */
  onCancelFront: function(e) {
    this.setData({
      imgFrontResult: "",
      hideCancelImgFront: true,
      imgFront: imgFrontDefault,
      ocrButtonDisable: true,
    })
  },
  /**点击取消身份证国徽面 */
  onCancelBack: function(e) {
    this.setData({
      imgBackResult: "",
      hideCancelImgBack: true,
      imgBack: imgBackDefault,
      ocrButtonDisable: true,
    })
  },
  changeOcrButtonBgColor: function() {
    if (util.chekString(this.data.imgFrontResult) &&
      util.chekString(this.data.imgBackResult)) {
      this.setData({
        ocrButtonDisable: false,
      })
    }
  },
  /**点击识别按钮 */
  onButtonOcr: function(e) {
    let that = this;
    if (!util.chekString(this.data.imgFrontResult)) {
      wx.showToast({
        title: '身份证头像面尚未拍摄',
        icon: "none",
        mask: true,
        duration: 2000,
      })
      return;
    }
    if (!util.chekString(this.data.imgBackResult)) {
      wx.showToast({
        title: '身份证国徽面尚未拍摄',
        icon: "none",
        mask: true,
        duration: 2000,
      })
      return;
    }
    wx.showLoading({
      title: '正在上传',
      mask: true,
    })
  }
})