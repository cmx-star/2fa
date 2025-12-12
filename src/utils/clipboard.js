/**
 * 剪贴板工具
 */
export class Clipboard {
  /**
   * 复制文本到剪贴板
   * @param {string} text - 要复制的文本
   * @returns {Promise<void>}
   */
  static async copy(text) {
    if (!text) {
      throw new Error("文本不能为空");
    }

    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("复制失败:", error);
      throw error;
    }
  }

  /**
   * 检查剪贴板API是否可用
   * @returns {boolean}
   */
  static isAvailable() {
    return !!navigator.clipboard && !!navigator.clipboard.writeText;
  }
}

