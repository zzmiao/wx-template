// pages/canvas/canvas.js
const app = getApp()
const util = require("../../utils/util");
let ctx = wx.createCanvasContext('my_canvas');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasWidth: '',
    canvasHeight: '',
    drawImage: '', 
    localImg: ''
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
    let that = this;

    this.drawPic()

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
   * 绘图
   */
  drawPic: function() {
    let that = this;

    wx.downloadFile({
      url: 'https://img3.doubanio.com/view/photo/l/public/p2327709524.jpg',
      success: function(res) {
        console.log("[downLoadile]", res)
        wx.getImageInfo({
          src: res.tempFilePath,
          success: function(res) {
            console.log("[getImageInfo]", res)
            console.log(res.width * 0.2)
            console.log(res.height * 0.2)
            console.log(res.path)
            that.setData({
              canvasWidth: res.width * 0.2,
              canvasHeight: res.height * 0.2,
              drawImage: res.path
            })
            ctx.drawImage(res.path, 0, 0, 300, 400);
            ctx.setFillStyle('red');
            ctx.setFontSize(20);
            let tx = util.canvasWorkBreak(216, 20, "生命周期函数--监听页面初次渲染完成")
            console.log(tx)
            let txHeight = 60;
            for (let i = 0; i < tx.length; i++) {
              ctx.fillText(tx[i], 16, txHeight);
              txHeight += 30;
            }

            ctx.fillText("珍爱生命，远离毒品", 16, res.height * 0.2 - 20);

            ctx.drawImage(res.path, 50, 50, 100, 100);

            ctx.draw(false, function() {
              wx.showLoading({
                title: '生成图片中',
              })
              setTimeout(
                function() {
                  //把当前画布指定区域的内容导出生成指定大小的图片
                  wx.canvasToTempFilePath({
                    canvasId: 'my_canvas',
                    x: 0,
                    y: 0,
                    width: res.width * 0.2,
                    height: res.height * 0.2,
                    success: function(res) {
                      wx.hideLoading();
                      that.setData({
                        localImg: res.tempFilePath
                      })
                    },
                    fail: function(res) {
                      wx.hideLoading();
                    }
                  })
                }, 1000 * 0.5)
            });
          }
        })
      }
    })
  },
  /**
   * 保存图片:保存图片到系统相册
   */
  saveImages: function() {
    let that = this;
    console.log(that.data.localImg);
    wx.saveImageToPhotosAlbum({
      filePath: that.data.localImg,
      success: function(res) {
        console.log(res);
        wx.showToast({
          title: '保存成功',
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '保存失败',
        })
      }
    })
  }
})