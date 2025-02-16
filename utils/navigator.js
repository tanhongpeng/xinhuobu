export const navigateTo = (url, authRequired = false) => {
  if (authRequired && !getApp().globalData.isAuthed) {
    wx.showModal({
      title: '访问受限',
      content: '该功能需要登录后使用',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({ url: '/pages/login/login' });
        }
      }
    });
    return;
  }
  
  wx.navigateTo({ url });
};

export const navigateBack = () => {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    wx.navigateBack();
  } else {
    wx.switchTab({ url: '/pages/home/home' });
  }
};