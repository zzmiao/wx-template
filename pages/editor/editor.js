// pages/editor/editor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formats: {
      bold: false,
      italic: false,
      strike: false
    },
    formData: {
      content: ''
    },
    pageData: {
      content: ''
    }
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
  /**编辑器内容改变时触发 */
  getEditorValue: function(e) {
    console.log(e);
    this.setData({
      ['formData.content']: e.detail.html
    })
  },
  /**编辑器初始化完成时触发 */
  onEditorReady: function() {
    let that = this;
    console.log("编辑器初始化完成时触发");
    wx.createSelectorQuery().select('#editor').context(function(res) {
      console.log(res);
      that.editorCtx = res.context;
      wx.showLoading({
        title: '加载内容中...',
      })
      setTimeout(function() {
        let data = that.data;
        wx.hideLoading();
        that.editorCtx.setContents({
          html: data.pageData ? data.pageData.content : '',
          success: (res) => {
            console.log(res)
          },
          fail: (res) => {
            console.log(res)
          }
        })
      }, 1000)
    }).exec();
  },
  insertDivider: function() {
    //插入分割线
    this.editorCtx.insertDivider({
      success: function() {
        console.log('insert divider success')
      }
    })
  },
  format: function(e) {
    console.log(e)
    let that = this;
    let {
      name,
      value
    } = e.target.dataset;
    if (!name) {
      return false;
    } else {
      this.editorCtx.format(name, value);

      that.setData({
        ["formats." + name]: !that.data.formats[name]
      })

    }

  },
  /**清除当前选区的样式 */
  removeFormat: function() {
    let that = this;
    this.editorCtx.removeFormat({
      success: function(res) {
        console.log(res);
        let tempAr = that.data.formats;

        for (let i in tempAr) {
          tempAr[i] = false;
        }

        that.setData({
          formats: tempAr
        })

      }
    })

  },
  /**上传图片 */
  insertImage: function() {
    let that = this;

    wx.chooseImage({
      success: function(res) {
        console.log(res);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;

        that.editorCtx.insertImage({
          src: tempFilePaths[0],
          width: "100px",
          height: "100px"
        })
      },
    })
  },
  /**清空编辑器内容 */
  clear: function() {
    this.editorCtx.clear({
      success: function(res) {
        wx.showToast({
          title: '成功',
        })
      }
    })
  }
})