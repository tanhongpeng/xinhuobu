Page({
  data: {
    // 可以在这里定义页面所需的数据
  },
  // 导航到记录页的方法
  navigateToRecord() {
    wx.navigateTo({
      url: '/pages/record/record',
      success() {
        console.log('成功导航到记录页');
      },
      fail(err) {
        console.error('导航到记录页失败', err);
      }
    });
  },
  onLoad() {
    // 页面加载时的逻辑
    console.log('主页加载完成');
  }
});