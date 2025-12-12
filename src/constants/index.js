/**
 * 应用常量定义
 */

// TOTP配置
export const TOTP_CONFIG = {
  TIME_STEP: 30, // TOTP时间步长（秒）
  CODE_LENGTH: 6, // 验证码长度
  UPDATE_INTERVAL: 100, // UI更新间隔（毫秒）
  WARNING_THRESHOLD: 5, // 警告阈值（秒）
};

// 密钥验证配置
export const SECRET_CONFIG = {
  MIN_LENGTH: 16, // 最小长度
  BASE32_PATTERN: /^[A-Z2-7]+$/, // Base32字符模式
  CLEAN_PATTERN: /[\s\-]/g, // 需要清理的字符
};

// 本地存储键名
export const STORAGE_KEYS = {
  SECRET: "2fa_secret",
  THEME: "theme",
};

// 主题配置
export const THEME = {
  LIGHT: "light",
  DARK: "dark",
  DEFAULT: "light",
};

// DOM元素ID
export const ELEMENT_IDS = {
  SECRET_INPUT: "secretInput",
  SUBMIT_BTN: "submitBtn",
  USE_DEMO_BTN: "useDemoBtn",
  RESULT_SECTION: "resultSection",
  CODE_VALUE: "codeValue",
  SECRET_DISPLAY: "secretDisplay",
  TIME_REMAINING: "timeRemaining",
  PROGRESS_FILL: "progressFill",
  COPY_BTN: "copyBtn",
  COPY_TEXT: "copyText",
  COPIED_TEXT: "copiedText",
  THEME_TOGGLE: "themeToggle",
  DEMO_SECRET: "demoSecret",
};

// 错误消息
export const ERROR_MESSAGES = {
  EMPTY_SECRET: "请输入2FA密钥",
  INVALID_FORMAT: "密钥格式不正确，请输入有效的Base32编码密钥（仅包含A-Z和2-7）",
  INVALID_LENGTH: "密钥长度不足，请输入至少16个字符的密钥",
  GENERATE_FAILED: "生成验证码失败",
  COPY_FAILED: "复制失败，请手动复制",
  INVALID_TOKEN: "生成的验证码格式不正确",
};

// 演示密钥
export const DEMO_SECRET = "7J64V3P3E77J3LKNUGSZ5QANTLRLTKVL";

