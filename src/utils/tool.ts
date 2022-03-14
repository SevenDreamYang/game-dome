/**
 * @function ObjectToParams 对象转
 * @param {Object} param 传参
 */
export function ObjectToParams(params: { [s: string]: unknown } | ArrayLike<unknown>) {
  let ParamsSrt = '?';
  Object.entries(params).forEach(([key, value]) => {
    ParamsSrt += `${key}=${value}&`;
  });
  ParamsSrt = ParamsSrt.substring(0, ParamsSrt.length - 1);
  return ParamsSrt;
}

/**
 * @function 颜色转RGB
 * @param {string} val
 * @param {number} opa 透明度
 * @returns
 */
export function colorToRGB(val: string, opa: string) {
  const pattern = /^(#?)[a-fA-F0-9]{6}$/; //16进制颜色值校验规则
  const isOpa = typeof opa == 'number'; //判断是否有设置不透明度

  if (!pattern.test(val)) {
    //如果值不符合规则返回空字符
    return '';
  }
  const v = val.replace(/#/, ''); //如果有#号先去除#号
  const rgbArr = [];
  let rgbStr = '';
  for (let i = 0; i < 3; i++) {
    const item = v.substring(i * 2, i * 2 + 2);
    const num = parseInt(item, 16);
    rgbArr.push(num);
  }
  rgbStr = rgbArr.join();
  rgbStr = 'rgb' + (isOpa ? 'a' : '') + '(' + rgbStr + (isOpa ? ',' + opa : '') + ')';
  return rgbStr;
}

/**
 * @function deepCopy 深度拷贝
 * @param {Object|Array} obj
 */
export function deepCopy(obj: any) {
  let result: any = '';
  if (typeof obj === 'object') {
    result = obj.constructor === Array ? [] : {};
    for (const i in obj) {
      result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
    }
  } else {
    result = obj;
  }
  return result;
}
