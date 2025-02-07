// 注意路径根据实际情况调整
const echarts = require('../../../ec-canvas/ec-canvas/echarts.js');

function initChart(canvas, width, height) {
  try {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);

    const option = {
      xAxis: {
        type: 'category',
        data: ['一月', '二月', '三月']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150],
        type: 'bar'
      }]
    };

    chart.setOption(option);
    return chart;
  } catch (error) {
    console.error('初始化图表失败:', error);
    return null;
  }
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  }
});