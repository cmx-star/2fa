import { THEME, STORAGE_KEYS } from "../constants/index.js";
import { Storage } from "./storage.js";

/**
 * 主题管理工具
 */
export class ThemeManager {
  /**
   * 获取当前主题
   * @returns {string} 主题名称
   */
  static getCurrentTheme() {
    return (
      document.documentElement.getAttribute("data-theme") || THEME.DEFAULT
    );
  }

  /**
   * 切换主题
   * @returns {string} 新主题名称
   */
  static toggle() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK;

    this.setTheme(newTheme);
    Storage.saveTheme(newTheme);

    return newTheme;
  }

  /**
   * 设置主题
   * @param {string} theme - 主题名称
   */
  static setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  /**
   * 加载保存的主题
   */
  static loadSavedTheme() {
    const savedTheme = Storage.getTheme() || THEME.DEFAULT;
    this.setTheme(savedTheme);
    return savedTheme;
  }

  /**
   * 获取主题切换按钮图标
   * @param {string} theme - 主题名称
   * @returns {string} 图标文本
   */
  static getThemeIcon(theme) {
    return theme === THEME.DARK ? "☀️" : "🌙";
  }
}

