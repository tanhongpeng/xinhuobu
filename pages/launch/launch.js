// pages/launch/launch.js
Page({
  data: {
    loadingProgress: 0, // 加载进度
    errorMessage: ''    // 错误信息
  },

  onLoad() {
    this._startLoading()
  },

  // 加载进度模拟
  _startLoading() {
    const interval = setInterval(() => {
      if (this.data.loadingProgress >= 100) {
        clearInterval(interval)
        this._navigateToHome()
        return
      }
      this.setData({
        loadingProgress: Math.min(this.data.loadingProgress + 15, 100)
      })
    }, 300)
  },

  // 跳转主页逻辑
  _navigateToHome() {
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/home/home',
        fail: (err) => {
          console.error('跳转失败:', err)
          this.setData({
            errorMessage: '初始化失败，请退出重试'
          })
        }
      })
    }, 500) // 留500ms完成最终动画
  }
})