// components/images-box/images-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: { //获取父组件传递来的值
    imgList: {
      type: Array,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgHeight: 0, //图片的高度
    imgWidth: 0, //图片的宽度
    mgleft: 0, //图片的位置
    mgtop: 0, //图片的位置
    isShowPupop: false, //是否显示弹出
    isShowTransform: false,
    isScaleY: 1, //是否上下反转
    isRotate: 0, //左右旋转值
    scale: 1, //缩放比例
    distanceScale: 0, //两指距离
    zoom: false, //是否缩放
    ismove: true, //手指是否拖动
    currentImg: '', //当前图片
    currentImgIndex: 0, //当前图片的下标
    currentImgTotal: 0, //当前图片的总数
    startX: 0,
    startY: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 放大
     */
    enlarge: function() {
      let scale = this.data.scale;
      scale += 0.2;
      this.setData({
        scale: scale
      })
    },
    /**
     * 缩小
     */
    narrow: function() {
      let scale = this.data.scale;
      scale -= 0.2;
      this.setData({
        scale: scale
      })
    },
    /**
     * 上下反转
     */
    rotatescale: function() {
      let isScaleY = this.data.isScaleY;
      isScaleY = isScaleY > 0 ? '-1' : '1'
      this.setData({
        isScaleY: isScaleY,
      })
    },
    /**
     * 向左旋转
     */
    rotateleft: function() {
      let isRotate = this.data.isRotate;
      isRotate -= 90;
      this.setData({
        isRotate: isRotate,
      })
    },
    /**
     * 向右旋转
     */
    rotateright: function() {
      let isRotate = this.data.isRotate;
      isRotate += 90;
      this.setData({
        isRotate: isRotate,
      })
    },
    /**
     * 上一张
     */
    prev: function() {
      let that = this;
      let currentImgTotal = this.data.currentImgTotal;
      let currentImgIndex = this.data.currentImgIndex;
      let imgList = this.data.imgList; //图片数组
      currentImgIndex <= 0 ? currentImgIndex = currentImgTotal - 1 : currentImgIndex--;
      let currentImg = imgList[currentImgIndex].url; //展示图片
      this.viewCommonFunction(currentImg, currentImgTotal, currentImgIndex);

    },
    /**
     * 下一张
     */
    next: function() {
      let that = this;
      let currentImgTotal = this.data.currentImgTotal;
      let currentImgIndex = this.data.currentImgIndex;
      let imgList = this.data.imgList; //图片数组
      currentImgIndex >= currentImgTotal - 1 ? currentImgIndex = 0 : currentImgIndex++;
      let currentImg = imgList[currentImgIndex].url; //展示图片
      this.viewCommonFunction(currentImg, currentImgTotal, currentImgIndex);
    },
    /**
     * 接触图片
     */
    startTouchMove: function(e) {
      console.log("[start]", e)
      if (e.touches.length == 1) {
        let startx = e.touches[0].clientX;
        let starty = e.touches[0].clientY;
        this.setData({
          startX: startx,
          startY: starty,
          ismove: false
        })
      } else {
        let xMoveZoom = e.touches[1].clientX - e.touches[0].clientX;
        let yMoveZoom = e.touches[1].clientY - e.touches[0].clientY;
        let distance = Math.sqrt(xMoveZoom * xMoveZoom + yMoveZoom * yMoveZoom);
        console.log("ok")
        this.setData({
          distanceScale: distance,
          zoom: true
        })
      }



    },
    /**
     * 移动图片
     */
    moveTouchMove: function(e) {
      console.log("[move]", e);
      if (e.touches.length == 1) {
        //单指移动
        let zoom = this.data.zoom;
        if (zoom) {
          return;
        }
        let mgtop = this.data.mgtop;
        let mgleft = this.data.mgleft;
        let startX = this.data.startX;
        let startY = this.data.startY;
        let movex = e.touches[0].clientX;
        let movey = e.touches[0].clientY;
        console.log(movex, movey)
        let disx = movex - startX;
        let disy = movey - startY;
        mgtop += disy;
        mgleft += disx;
        this.setData({
          mgtop: mgtop,
          mgleft: mgleft,
          startX: movex,
          startY: movey
        })
      } else {
        //双指缩放
        let scale = this.data.scale;
        let startDistance = this.data.distanceScale;
        let xMoveZoom = e.touches[1].clientX - e.touches[0].clientX;
        let yMoveZoom = e.touches[1].clientY - e.touches[0].clientY;
        let distance = Math.sqrt(xMoveZoom * xMoveZoom + yMoveZoom * yMoveZoom);
        let distanceDiff = distance - startDistance;
        let newScale = scale + 0.005 * distanceDiff;
        console.log("[耍不告知]", newScale)
        this.setData({
          distanceScale: distance,
          scale: newScale
        })
      }

    },
    /**
     * 离开
     */
    endTouchMove: function(e) {
      if (e.touches.length == 0) {
        this.setData({
          zoom: false
        })
      }
      this.setData({
        ismove: true,
      })

    },
    /**
     * 关闭弹出
     */
    closePupop: function() {
      this.setData({
        isShowPupop: false
      })
    },
    /**
     * 浏览图片
     */
    viewPictures: function(e) {

      let that = this;
      let currentImgIndex = e.currentTarget.dataset.index; //当前图片的下标
      let imgList = this.data.imgList; //图片数组
      let currentImgTotal = imgList.length; //图片数量
      let currentImg = imgList[currentImgIndex].url; //展示图片
      this.viewCommonFunction(currentImg, currentImgTotal, currentImgIndex);


    },
    /**
     *图片展示公共函数
     */
    viewCommonFunction(currentImg, currentImgTotal, currentImgIndex) {
      let that = this;
      let width = 0,
        height = 0,
        mgleft = 0,
        mgtop = 0;
      wx.getSystemInfo({
        success: function(succ) {
          console.log(succ)
          wx.getImageInfo({
            src: currentImg,
            success: function(res) {
              console.log(res)
              if (res.width >= succ.windowWidth - 20) {
                width = succ.windowWidth * 0.8;
                height = (res.height * width / res.width);
                mgleft = (succ.windowWidth - width) / 2;
                mgtop = (succ.windowHeight - height) / 2;
              } else {
                width = res.width;
                height = res.height;
                mgleft = (succ.windowWidth - res.width) / 2;
                mgtop = (succ.windowHeight - res.height) / 2;
              }

              that.setData({
                currentImgTotal: currentImgTotal,
                currentImgIndex: currentImgIndex,
                currentImg: currentImg,
                isShowPupop: true,
                imgHeight: height,
                imgWidth: width,
                mgleft: mgleft,
                mgtop: mgtop,
                startX: 0,
                startY: 0,
                isRotate: 0,
                isScaleY: 1,
                scale: 1,
              })
            }
          })
        },
      })
    }
  }
})