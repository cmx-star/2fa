import { STORAGE_KEYS } from "../constants/index.js";

/**
 * 本地存储工具
 */
export class Storage {
  /**
   * 获取密钥
   * @returns {string|null} 保存的密钥
   */
  static getSecret() {
    return localStorage.getItem(STORAGE_KEYS.SECRET);
  }

  /**
   * 保存密钥
   * @param {string} secret - 密钥
   */
  static saveSecret(secret) {
    localStorage.setItem(STORAGE_KEYS.SECRET, secret);
  }

  /**
   * 获取主题
   * @returns {string} 主题名称
   */
  static getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME);
  }

  /**
   * 保存主题
   * @param {string} theme - 主题名称
   */
  static saveTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }
}

