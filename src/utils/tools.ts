export function isValidKey(key : string | number | symbol, object : object): key is keyof typeof object {
    return key in object;
}
/**
 * 用于将驼峰命名法的变量转换为横杠线连接的命名
 * @param val 一个驼峰的string属性
 */
export const humpToLine = (val : string) => {
    if (val === val.toLowerCase()) { // 全是小写 不需要转换
        return val;
    } else {
        let res = ""
        for (let i = 0; i < val.length; i++) {
            if (val.charCodeAt(i) > 65 && val.charCodeAt(i) < 90) {
                res += `-${
                    val[i].toLowerCase()
                }`;
            } else {
                res += val[i];
            }
        }
        return res;
    }
}
