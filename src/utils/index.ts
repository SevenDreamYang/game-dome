import { ObjectToParams } from './tool';
import { TabPage } from './routerRule';

/**
 * @function 值否为真
 * @param { * } value
 */
export function isDef(value: any) {
  return value !== undefined && value !== null && value !== '';
}
/**
 * @function 是否为假
 * @param {*} value
 */

export function isUndef(value: any) {
  return value === undefined || value === null || value === '';
}

/**
 * @function Toast 吐司
 * @param {String} title
 * @param {Boolean} mask
 * @param {ShowToastOptions} icon
 * @param {Number} dr
 */
type ToastIcon = UniApp.ShowToastOptions;
export function showToast(title: string, icon = 'none', mask = false, time = 2000) {
  uni.showToast({
    title,
    mask,
    icon,
    duration: time,
  } as ToastIcon);
}

/**
 * @function loading 加载
 */
export async function showloading(title = '加载中...', mask = true) {
  return await uni.showLoading({
    title,
    mask,
  });
}
/**
 * @function loading 取消加载
 * @param {number} ms 延迟秒数
 */

export function hideLoading(ms = 500) {
  setTimeout(() => {
    uni.hideLoading();
  }, ms);
}

/**
 * @function nextPage 页面跳转
 * @param {string} url
 * @param {anyObject} params
 * @param {function} callback
 */
export function nextPage(url: string, params: AnyObject = {}, callback: (...args: any[]) => {}) {
  const ParamsSrt = ObjectToParams(typeof params === 'object' ? params : {});
  const urlParams = url + ParamsSrt;
  // 是不是跳转到tabber到页面
  const isTabPage = TabPage.includes(url);
  const goType = isTabPage ? 'switchTab' : getCurrentPages().length >= 10 ? 'redirectTo' : 'navigateTo';
  uni[goType]({
    url: urlParams,
    success: (res) => {
      callback && callback(res);
    },
    fail: (err) => {
      console.error(err);
    },
  });
}

/**
 * @function goTypePage 页面跳转2
 * @param {String | Number} url  地址
 * @param {jumpType} type  跳转类型
 * @param {AnyObject} params 传参
 */

type jumpType = 'redirectTo' | 'reLaunch' | 'switchTab';
export function goTypePage(url: string | number, type: jumpType, params: AnyObject) {
  if (typeof url === 'number') {
    // 回退
    uni.navigateBack({ delta: url });
    return;
  }
  if (!url || type === undefined) {
    console.warn('缺少url或type');
    return false;
  }
  const ParamsSrt = ObjectToParams(typeof params === 'object' ? params : {});
  const urlParams = url + ParamsSrt;

  switch (type) {
    case 'redirectTo':
      // 关闭当前页面，跳转到应用内的某个页面。
      uni.redirectTo({ url: urlParams });
      break;
    case 'reLaunch':
      // 关闭所有页面，打开到应用内的某个页面。
      uni.reLaunch({ url: urlParams });
      break;
    case 'switchTab':
      // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
      uni.switchTab({ url: urlParams });
      break;
  }
}

/**
 * https://uniapp.dcloud.io/api/ui/nodes-info?id=nodesrefboundingclientrect
 * 获取节点信息
 * @param {String} node
 */
type NodeInfo = UniApp.NodeInfo;

export function getRect(node: string, that: any): Promise<NodeInfo> {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery().in(that);
    query
      .select(node)
      .boundingClientRect((data) => {
        resolve(data);
      })
      .exec();
  });
}

/**
 * https://uniapp.dcloud.io/api/ui/nodes-info?id=nodesrefbound
 * 获取一组节点信息
 * @param {array} nodeGroup
 */
export function getRectGroup(nodeGroup: string[], that: any) {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery().in(that);
    nodeGroup.forEach((node) => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      query.select(node).boundingClientRect(() => {});
    });
    query.exec((res) => {
      resolve(res);
    });
  });
}
