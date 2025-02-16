// 删除自定义的 throttle 函数定义
import { throttle } from '../../utils/util.js';

Component({
  options: {
    pureDataPattern: /^_/,
    multipleSlots: true
  },

  data: {
    list: Object.freeze([
      { pagePath: "/pages/home/home", text: "首页", iconClass: "icon-home" },
      { pagePath: "/pages/record/record", text: "记账", iconClass: "icon-record" },
      { pagePath: "/pages/summary/summary", text: "统计", iconClass: "icon-chart" }
    ]),
    activeIndex: 0,
    _lastTapTime: 0
  },

  lifetimes: {
    attached() {
      const app = getApp();
      this.setData({ 
        activeIndex: app.globalData.currentTab 
      });
    }
  },

  methods: {
    handleTabChange: throttle(function(e) {
      const { path, index } = e.currentTarget.dataset;
      const now = Date.now();
      
      if (now - this.data._lastTapTime < 300) return;
      
      getApp().globalData.currentTab = index;
      
      this.setData({
        activeIndex: index,
        _lastTapTime: now
      });

      wx.switchTab({ url: path });
    }, 300)
  }
});