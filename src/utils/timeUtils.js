import { TOTP_CONFIG } from "../constants/index.js";

/**
 * 时间计算工具
 */
export class TimeUtils {
  /**
   * 计算TOTP剩余时间
   * @returns {{ remaining: number, progress: number }} 剩余时间和进度百分比
   */
  static calculateRemainingTime() {
    const epoch = Math.floor(Date.now() / 1000);
    const counter = Math.floor(epoch / TOTP_CONFIG.TIME_STEP);
    const nextCounter = counter + 1;
    const nextEpoch = nextCounter * TOTP_CONFIG.TIME_STEP;
    const remaining = nextEpoch - epoch;

    const progress = (remaining / TOTP_CONFIG.TIME_STEP) * 100;

    return { remaining, progress };
  }

  /**
   * 格式化剩余时间显示
   * @param {number} seconds - 剩余秒数
   * @returns {string} 格式化后的时间字符串
   */
  static formatRemainingTime(seconds) {
    return `${seconds}秒`;
  }
}

