// 本地数据缓存
export default {
  /**
   * @function 设置storage
   * @param {String} key 键值
   * @param { * } data 数据
   */
  set(key: string, data: any) {
    try {
      uni.setStorageSync(key, data);
    } catch (err) {
      console.error(err);
    }
  },

  /**
   * @function 设置storage
   * @param {String} key 键值
   */
  get(key: string) {
    try {
      return uni.getStorageSync(key);
    } catch (err) {
      console.error(err);
    }
  },

  /**
   * @function 清除所有storage
   */
  clear() {
    try {
      uni.clearStorageSync();
    } catch (err) {
      throw new Error(err as string);
    }
  },

  /**
   * @function 删除指定值
   * @param {String} key 键值
   */
  remove(key: string) {
    try {
      uni.removeStorageSync(key);
    } catch (err) {
      console.error(err);
    }
  },
};
