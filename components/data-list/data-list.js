Component({
  properties: { //获取父组件传递来的值
    dataArray: {
      type: Array,
      value: ""
    }
  },
  data: {
    listData: [],
    childrenText: "我是子组件传递来的值，请多多关照。"
  },
  observers: { //组件数据字段监听器，用于监听 properties 和 data 的变化
    "dataArray": function(options) {
      let that = this;
      console.log(options)
      this.setData({
        listData: options
      })
    }
  },
  methods: {
    myChildrenValue: function() {
      return this.data.childrenText;
    },
    onShow: function() {
      return this.properties.dataArray;
    },
    getChildrenData: function() {
      return this.data.listData;
    },
    deleteBtn: function(e) { //删除事件
      let that = this;
      console.log(e)
      let tempData = this.properties.dataArray;
      let curIndex = e.currentTarget.dataset.index;
      wx.showModal({
        title: '操作提示',
        content: '确认删除吗？',
        success: function(res) {
          console.log(res)
          if (res.confirm) {
            tempData.splice(curIndex, 1);
            that.setData({
              dataArray: tempData
            })
            //需要添加部分，getDataFromChilren是父页面调用需要，把值传递给父组件
            let childrenToFather = {
              childrenToFather: that.properties.dataArray
            };
            that.triggerEvent("getDataFromChilren", childrenToFather);

            wx.showToast({
              title: '成功',
            })
          }
        }
      })

      console.log(this.properties.dataArray)

    },
    confirmBtn: function(e) { //确认事件
      let tempData = this.properties.dataArray;
      let curIndex = e.currentTarget.dataset.index;
      wx.showModal({
        title: tempData[curIndex].name,
        content: tempData[curIndex].content,
        showCancel: false
      })
    }
  }
})