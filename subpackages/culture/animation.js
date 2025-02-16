const quotes = require('../../../data/quotes.js');

Page({
  data: {
    inkAnimation: {},
    currentQuote: '',
    quoteSource: ''
  },

  onReady() {
    this._initInkAnimation();
    this._showRandomQuote();
  },

  _initInkAnimation() {
    const animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease-out'
    });
    
    animation.translateX('100%').scaleY(1.2).step();
    this.setData({
      inkAnimation: animation.export()
    });
  },

  _showRandomQuote() {
    const cultureQuotes = quotes.filter(q => q.scene === '文化展示');
    const randomIndex = Math.floor(Math.random() * cultureQuotes.length);
    const selected = cultureQuotes[randomIndex] || {};
    
    this.setData({
      currentQuote: selected.text || '薪火相传，匠心永铸',
      quoteSource: selected.source || '传统工匠谚语'
    });
  }
});