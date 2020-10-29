//index.js
//获取应用实例
const app = getApp()
const util = require("../../utils/util");
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');


let qqmapsdk = null;
let timer = null;

Page({
  data: {
    times: 60,
    verfityText: '获取验证码',
    verifyStatus: false, //false:不可点击状态 ；true:可点击状态

    submitStatus: true,

    loanUse: ['经营性贷款', '消费性贷款', '购车贷款', '装修贷款', '创业贷款'],
    loanUseIndex: 0,
    idcard: '',
    job: '',
    phone: '',
    province: '-',
    city: '-',
    address: '---',
    images: []
  },
  onLoad: function() {
   
    qqmapsdk = new QQMapWX({
      key: 'D55BZ-C63KU-KZXV7-BR44B-62NWK-WUBKS' //这里自己的key秘钥进行填充
    });


  },
  onShow: function() {
    this.getUserLocation();
  },
  getIdCard: function(e) {
    let curStatus = util.verifyIDcard(e.detail.value);
    console.log(curStatus);

  },
  radioChange: function(e) {
    this.setData({
      job: e.detail.value
    })
  },
  getLoadUse: function(e) {
    this.setData({
      loanUseIndex: e.detail.value
    })
  },
  getPhone: function(e) {
    var that = this;
    if (e.detail.value.length >= 11) {
      wx.hideKeyboard()
      let curStatus = util.verifyPhone(e.detail.value);
      if (curStatus) {
        that.setData({
          verifyStatus: true,
          phone: e.detail.value,
          verfityText: "获取验证码",
          times: 60
        })
        clearInterval(timer);
      } else {
        wx.showToast({
          icon: 'none',
          title: '手机号码格式错误',
        })
      }
    } else {
      that.setData({
        verifyStatus: false
      })
      clearInterval(timer);
    }
  },
  getVerifyCode: function() {
    let that = this;
    let times = this.data.times;

    if (times == 60) {
      timer = setInterval(function() {
        times -= 1;
        if (times <= 0) {
          that.setData({
            verfityText: "获取验证码",
            times: 60
          })
          clearInterval(timer);
        } else {
          that.setData({
            verfityText: times + "秒后获取",
            times: times
          })
        }

      }, 1000);
    }

  },
  getMsgVerifyCode: function(e) {

    var code = e.detail.value;
    if (code.length >= 6) {
      this.setData({
        submitStatus: false
      })
    } else {
      this.setData({
        submitStatus: true
      })
    }
  },
  //获取当前位置
  getUserLocation: function() {
    let that = this;
    wx.getSetting({
      success: function(res) {
        console.log("[wx.getSetting]", res);
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权

        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取你的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(res) {
                    console.log("[wx.openSetting]", res)
                    if (res.authSetting['scope.userLocation'] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      that.getLocation();
                      console.log("getlocation1")

                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //用户首次进入页面,调用wx.getLocation的API
          that.getLocation();
          console.log("getlocation2")
        } else {
          //调用wx.getLocation的API
          that.getLocation();
          console.log("getlocation3")
        }
      }
    })
  },
  //微信获得经纬度
  getLocation: function() {
    let that = this;
    wx.showLoading({
      title: '加载',
    })
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log("[wx.getLocation]", res)
        const latitude = res.latitude
        const longitude = res.longitude
        that.getLocal(latitude, longitude);
      },
    })
  },
  //获取当前位置
  getLocal: function(latitude, longitude) {
    let that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        console.log("[mapMessage]", res);
        let province = res.result.ad_info.province;
        let city = res.result.ad_info.city;
        let address = res.result.address;
        that.setData({
          province: province,
          city: city,
          address: address
        })
        wx.hideLoading();
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {

      }
    });
  },
  //上传图片
  uploadImages: function() {
    let that = this;
    let tempImages = this.data.images;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log("[wx.chooseImage]", res);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        if (tempFilePaths.length == 0) {
          return false;
        }

        for (let i = 0; i < tempFilePaths.length; i++) {
          tempImages.push(tempFilePaths[i]);
        }
        that.setData({
          images: tempImages
        })
        console.log(that.data.images)
      },
    })
  },
  //删除图片
  cancelImg: function(e) {
    let that = this;
    var curIndex = e.currentTarget.dataset.index;
    let tempImages = this.data.images;
    wx.showModal({
      title: '提示',
      content: '确认删除吗？',
      success: function(res) {
        if (res.confirm) {
          tempImages.splice(curIndex, 1);
          that.setData({
            images: tempImages
          })
          wx.showToast({
            title: '成功',
            icon: 'success'
          })
        }
      }
    })
  },

})