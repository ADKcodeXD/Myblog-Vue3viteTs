export const TextFilter = function (str: string) {
  const pattern = new RegExp(/[`~%!@#^=''?~！@#￥……&——‘”“'？*()（），,。.、]/g) //[]内输入你要过滤的字符
  return str.replaceAll(pattern, '')
}
