import { ELEMENT_IDS } from "../constants/index.js";

/**
 * DOM操作工具
 */
export class DOM {
  /**
   * 获取所有需要的DOM元素
   * @returns {Object} DOM元素对象
   */
  static getElements() {
    return {
      secretInput: document.getElementById(ELEMENT_IDS.SECRET_INPUT),
      submitBtn: document.getElementById(ELEMENT_IDS.SUBMIT_BTN),
      useDemoBtn: document.getElementById(ELEMENT_IDS.USE_DEMO_BTN),
      resultSection: document.getElementById(ELEMENT_IDS.RESULT_SECTION),
      codeValue: document.getElementById(ELEMENT_IDS.CODE_VALUE),
      secretDisplay: document.getElementById(ELEMENT_IDS.SECRET_DISPLAY),
      timeRemaining: document.getElementById(ELEMENT_IDS.TIME_REMAINING),
      progressFill: document.getElementById(ELEMENT_IDS.PROGRESS_FILL),
      copyBtn: document.getElementById(ELEMENT_IDS.COPY_BTN),
      copyText: document.getElementById(ELEMENT_IDS.COPY_TEXT),
      copiedText: document.getElementById(ELEMENT_IDS.COPIED_TEXT),
      themeToggle: document.getElementById(ELEMENT_IDS.THEME_TOGGLE),
      demoSecret: document.getElementById(ELEMENT_IDS.DEMO_SECRET),
    };
  }

  /**
   * 显示元素
   * @param {HTMLElement} element - DOM元素
   */
  static show(element) {
    if (element) {
      element.style.display = "block";
    }
  }

  /**
   * 隐藏元素
   * @param {HTMLElement} element - DOM元素
   */
  static hide(element) {
    if (element) {
      element.style.display = "none";
    }
  }
}

