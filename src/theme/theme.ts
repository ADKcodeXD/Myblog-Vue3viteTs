import { Theme } from '@/interface/theme.type';
import { getItem, setItem } from '@/utils/storage';
import { themes } from "./themeData";


// 修改页面中的样式变量值
const changeStyle = (obj: Theme) => {
  for (let key in obj) {
    document
      .getElementsByTagName("body")[0]
      .style.setProperty(`--${key}`, obj[key]);
  }
};
// 改变主题的方法
export const setTheme = (themeName: string | void) => {
  if (themeName) {
    let themeConfig = themes[themeName];
    if (themeConfig) {
      setItem("theme", themeConfig);
      changeStyle(themeConfig); // 改变样式
      setItem("themeName", themeName);
    } else {
      // 没有对应主题 使用上次存下来的主题
      themeConfig = getItem("theme")
      if (!themeConfig) {
        // 也没有本地存储 使用默认主题
        changeStyle(themes["default"]);
        setItem("theme", themes["default"]);
        setItem("themeName", "default");

      }
    }
  } else {
    // 没有对应主题 使用上次存下来的主题
    let themeConfig = getItem("theme");
    let themeName2 = getItem("themeName");
    if (!themeConfig) {
      // 也没有本地存储 使用默认主题
      changeStyle(themes["default"]);
      setItem("theme", themes["default"]);
      setItem("themeName", "default");
    } else {
      // 有存储
      changeStyle(themeConfig);
      setItem("themeName", themeName2);
    }
  }
};