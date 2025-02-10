Page({
  data: {
    username: '',
    password: '',
    loading: false // 新增 loading 状态，用于显示登录时的加载状态
  },

  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    });
  },

  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  onLogin() {
    const { username, password } = this.data;
    if (!username || !password) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'none'
      });
      return;
    }

    // 显示加载状态
    this.setData({
      loading: true
    });

    // 模拟登录请求，这里可以替换为实际的登录请求
    setTimeout(() => {
      // 这里可以添加登录逻辑，比如发送请求到服务器验证用户名和密码
      // 假设登录成功
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
      // 登录成功后跳转到主页
      wx.reLaunch({
        url: '/pages/index/index'
      });
    }, 2000);
  }
})