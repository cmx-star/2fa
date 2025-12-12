import { authenticator } from "@otplib/preset-browser";
import {
  TOTP_CONFIG,
  ERROR_MESSAGES,
  DEMO_SECRET,
} from "./constants/index.js";
import { SecretValidator } from "./utils/secretValidator.js";
import { TimeUtils } from "./utils/timeUtils.js";
import { Storage } from "./utils/storage.js";
import { DOM } from "./utils/dom.js";
import { Clipboard } from "./utils/clipboard.js";
import { ThemeManager } from "./utils/theme.js";

/**
 * 2FA验证码生成器主类
 */
class TwoFactorAuth {
  /**
   * 构造函数
   */
  constructor() {
    this.secret = "";
    this.interval = null;
    this.errorShown = false;
    this.elements = null;

    this.init();
  }

  /**
   * 初始化应用
   */
  init() {
    this.elements = DOM.getElements();
    this.bindEvents();
    this.loadSavedData();
  }

  /**
   * 绑定事件监听器
   */
  bindEvents() {
    const { secretInput, submitBtn, useDemoBtn, copyBtn, themeToggle } =
      this.elements;

    submitBtn?.addEventListener("click", () => this.handleSubmit());
    useDemoBtn?.addEventListener("click", () => this.useDemoSecret());
    copyBtn?.addEventListener("click", () => this.copyCode());
    themeToggle?.addEventListener("click", () => this.toggleTheme());

    secretInput?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleSubmit();
      }
    });
  }

  /**
   * 加载保存的数据
   */
  loadSavedData() {
    // 加载主题
    const savedTheme = ThemeManager.loadSavedTheme();
    this.updateThemeIcon(savedTheme);

    // 加载保存的密钥
    const savedSecret = Storage.getSecret();
    if (savedSecret && this.elements.secretInput) {
      this.elements.secretInput.value = savedSecret;
      this.handleSubmit();
    }
  }

  /**
   * 使用演示密钥
   */
  useDemoSecret() {
    if (this.elements.secretInput) {
      this.elements.secretInput.value = DEMO_SECRET;
      this.handleSubmit();
    }
  }

  /**
   * 处理提交
   */
  handleSubmit() {
    const inputValue = this.elements.secretInput?.value || "";

    // 验证密钥
    const validation = SecretValidator.validate(inputValue);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    // 设置密钥
    this.secret = validation.secret;
    this.updateUI();
    Storage.saveSecret(this.secret);

    // 开始生成验证码
    this.startGeneration();
  }

  /**
   * 更新UI显示
   */
  updateUI() {
    const { secretDisplay, resultSection } = this.elements;

    if (secretDisplay) {
      secretDisplay.textContent = this.secret;
    }

    DOM.show(resultSection);
  }

  /**
   * 开始生成验证码
   */
  startGeneration() {
    // 清除之前的定时器
    if (this.interval) {
      clearInterval(this.interval);
    }

    // 立即生成一次
    this.updateCode();

    // 设置定时器
    this.interval = setInterval(() => {
      this.updateCode();
    }, TOTP_CONFIG.UPDATE_INTERVAL);
  }

  /**
   * 更新验证码
   */
  updateCode() {
    try {
      if (!this.secret) {
        return;
      }

      // 生成验证码
      const token = authenticator.generate(this.secret);

      if (!token || token.length !== TOTP_CONFIG.CODE_LENGTH) {
        throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
      }

      // 更新显示
      this.updateCodeDisplay(token);
      this.updateTimer();
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * 更新验证码显示
   * @param {string} token - 验证码
   */
  updateCodeDisplay(token) {
    if (this.elements.codeValue) {
      this.elements.codeValue.textContent = token;
    }
  }

  /**
   * 更新倒计时
   */
  updateTimer() {
    const { remaining, progress } = TimeUtils.calculateRemainingTime();
    const { timeRemaining, progressFill } = this.elements;

    // 更新倒计时文本
    if (timeRemaining) {
      timeRemaining.textContent = TimeUtils.formatRemainingTime(remaining);
    }

    // 更新进度条
    if (progressFill) {
      progressFill.style.width = `${progress}%`;

      // 警告颜色
      if (remaining <= TOTP_CONFIG.WARNING_THRESHOLD) {
        progressFill.style.backgroundColor = "#dc3545";
      } else {
        progressFill.style.backgroundColor = "var(--primary-color)";
      }
    }
  }

  /**
   * 处理错误
   * @param {Error} error - 错误对象
   */
  handleError(error) {
    console.error("生成验证码失败:", error);
    console.error("密钥:", this.secret);
    console.error("错误详情:", error.message, error.stack);

    const { codeValue, timeRemaining } = this.elements;

    if (codeValue) {
      codeValue.textContent = "错误";
    }
    if (timeRemaining) {
      timeRemaining.textContent = "0秒";
    }

    // 显示错误提示（仅第一次）
    if (!this.errorShown) {
      this.errorShown = true;
      setTimeout(() => {
        alert(
          `${ERROR_MESSAGES.GENERATE_FAILED}: ${
            error.message || "未知错误"
          }\n\n请检查密钥是否正确，或尝试刷新页面。`
        );
        this.errorShown = false;
      }, 100);
    }
  }

  /**
   * 复制验证码
   */
  async copyCode() {
    const { codeValue, copyText, copiedText, copyBtn } = this.elements;
    const code = codeValue?.textContent;

    if (!code || code === "------" || code === "错误") {
      return;
    }

    if (!Clipboard.isAvailable()) {
      alert(ERROR_MESSAGES.COPY_FAILED);
      return;
    }

    try {
      await Clipboard.copy(code);

      // 显示复制成功反馈
      if (copyText) copyText.style.display = "none";
      if (copiedText) copiedText.style.display = "inline";
      if (copyBtn) copyBtn.classList.add("copied");

      setTimeout(() => {
        if (copyText) copyText.style.display = "inline";
        if (copiedText) copiedText.style.display = "none";
        if (copyBtn) copyBtn.classList.remove("copied");
      }, 2000);
    } catch (error) {
      console.error("复制失败:", error);
      alert(ERROR_MESSAGES.COPY_FAILED);
    }
  }

  /**
   * 切换主题
   */
  toggleTheme() {
    const newTheme = ThemeManager.toggle();
    this.updateThemeIcon(newTheme);
  }

  /**
   * 更新主题图标
   * @param {string} theme - 主题名称
   */
  updateThemeIcon(theme) {
    if (this.elements.themeToggle) {
      this.elements.themeToggle.textContent =
        ThemeManager.getThemeIcon(theme);
    }
  }
}

// 初始化应用
document.addEventListener("DOMContentLoaded", () => {
  new TwoFactorAuth();
});

