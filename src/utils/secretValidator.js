import { SECRET_CONFIG, ERROR_MESSAGES } from "../constants/index.js";

/**
 * 密钥验证工具
 */
export class SecretValidator {
  /**
   * 清理密钥（移除空格和分隔符）
   * @param {string} secret - 原始密钥
   * @returns {string} 清理后的密钥
   */
  static clean(secret) {
    return secret.trim().toUpperCase().replace(SECRET_CONFIG.CLEAN_PATTERN, "");
  }

  /**
   * 验证密钥格式
   * @param {string} secret - 密钥
   * @returns {{ valid: boolean, error?: string }} 验证结果
   */
  static validate(secret) {
    if (!secret) {
      return { valid: false, error: ERROR_MESSAGES.EMPTY_SECRET };
    }

    const cleanSecret = this.clean(secret);

    if (!SECRET_CONFIG.BASE32_PATTERN.test(cleanSecret)) {
      return { valid: false, error: ERROR_MESSAGES.INVALID_FORMAT };
    }

    if (cleanSecret.length < SECRET_CONFIG.MIN_LENGTH) {
      return {
        valid: false,
        error: ERROR_MESSAGES.INVALID_LENGTH,
      };
    }

    return { valid: true, secret: cleanSecret };
  }
}

