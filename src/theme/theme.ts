import { humpToLine } from './../utils/tools';
import { getItem, setItem } from '@/utils/storage';
import { themes } from './themeData';
import { darkConfig, defaultConfig } from './themeData.json';

/**
 * 用于getlocalitem设置整体的style属性
 * @param config type : GlobalConfig 要求类型是一个全局配置项
 */
const setProperty = (config: GlobalConfig) => {
  for (const key in config) {
    // 由于命名原因 如果是number类型的config 则直接转换成横线
    if (typeof config[key] === 'number') {
      if (key === 'backGroundImgLight') {
        document.documentElement.style.setProperty(`--${key}`, `${config[key]}%`);
      } else if (key === 'backGroundImgBlur') {
        document.documentElement.style.setProperty(`--${key}`, `${config[key]}rem`);
      } else {
        document.documentElement.style.setProperty(`--${humpToLine(key)}`, `${config[key]}rem`);
      }
    } else {
      if (key === 'backGroundImg') {
        try {
          const container: HTMLElement = document.getElementsByClassName(
            'cotainer'
          )[0] as HTMLElement;
          container.style.backgroundImage = `url(${config[key]})`;
        } catch (error) {
          console.log(error);
        }
      } else {
        document.documentElement.style.setProperty(`--${key}`, config[key]);
      }
    }
  }
};

/**
 * 可以自适应的传入或者不传入 不传入则默认读取本地的配置
 * 传入local 配置则保存本地
 * @param config 一个GlobalConfig 或者不传
 * @param local Boolean 默认为false 用于保存本地
 */
export const setConfig = (config: GlobalConfig | void, local = false) => {
  if (!config) {
    const localConfig = getItem('globalConfig');
    if (!localConfig) {
      setProperty(defaultConfig);
      setItem('globalConfig', defaultConfig);
    } else {
      setProperty(localConfig);
    }
  } else {
    setProperty(config);
    if (local) {
      // 如果不传 则不保存到本地
      setItem('globalConfig', config);
    }
  }
};
/**
 * 用于将设置重置回默认设置
 */
export const setDefault = () => {
  setConfig(defaultConfig, true);
};
/**
 * 用于将配置设置为夜间模式
 */
export const setDark = () => {
  setConfig(darkConfig, true);
};
