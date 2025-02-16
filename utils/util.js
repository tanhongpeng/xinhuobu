import { throttle } from '../../utils/util.js'; // 正确导入路径

// 定义节流函数并导出
export const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
};