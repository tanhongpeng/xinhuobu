const authPages = {
  'withdraw': true,
  'budget': true
};

Page({
  navigateTo(page) {
    if (authPages[page] && !getApp().globalData.isAuthed) {
      wx.showModal({
        title: '需要登录',
        content: '该功能需要先进行身份验证',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/login/login' });
          }
        }
      });
      return;
    }
    
    const map = {
      'record': '/pages/record/record',
      'withdraw': '/pages/withdraw/withdraw',
      'budget': '/pages/budget/budget',
      'summary': '/pages/summary/summary'
    };
    
    wx.navigateTo({ url: map[page] });
  }
});