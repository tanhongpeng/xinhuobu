Page({ 
  data: { 
    // 可以在这里定义页面所需的数据 
  }, 
  // 导航到记录页的方法 
  navigateToRecord() { 
    wx.navigateTo({  
      url: '/pages/record/record', 
      success: function(res) { 
        // 页面跳转成功的回调函数 
        console.log(' 导航成功'); 
      }, 
      fail: function(res) { 
        // 页面跳转失败的回调函数 
        console.log(' 导航失败', res); 
      }, 
      complete: function(res) { 
        // 页面跳转结束的回调函数（调用成功、失败都会执行） 
        console.log(' 导航结束', res); 
      } 
    }); 
  } 
}); 