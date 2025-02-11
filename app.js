App({
  onLaunch() {
    wx.loadFontFace({
      family: 'WenKai',
      source: 'url("https://fonts.lxgw.io/css2?family=LXGWWenKai")',
      success: () => console.log('全局字体预加载成功'),
      fail: () => console.warn('网络字体预加载失败')
    })
  }
})