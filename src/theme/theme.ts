import {humpToLine} from './../utils/tools';
import {getItem, setItem} from '@/utils/storage';
// import {darkConfig, defaultConfig, themes} from "./themeData";
import {themes} from './themeData';
import {darkConfig,defaultConfig} from './themeData.json';
// 修改页面中的样式变量值
const changeStyle = (obj : Theme) => {
    let style: HTMLStyleElement;
    if (document.head.getElementsByTagName('style')[0] !== null) {
        style = document.head.getElementsByTagName('style')[0];
    } else {
        style = document.createElement('style');
    }
    let str = "";
    for (let key in obj) {
        str += `--${key}:${
            obj[key]
        };
        `
    }
    style.innerHTML = `body:root{
        ${str}
    }`;
    document.head.appendChild(style);
};
// 改变主题的方法
export const setTheme = (themeName : string | void) => {
    if (themeName) {
        let themeConfig = themes[themeName];
        if (themeConfig) {
            setItem("theme", themeConfig);
            changeStyle(themeConfig); // 改变样式
            setItem("themeName", themeName);
        } else { // 没有对应主题 使用上次存下来的主题
            themeConfig = getItem("theme")
            if (! themeConfig) { // 也没有本地存储 使用默认主题
                changeStyle(themes["default"]);
                setItem("theme", themes["default"]);
                setItem("themeName", "default");
            }
        }
    } else { // 没有对应主题 使用上次存下来的主题
        let themeConfig = getItem("theme");
        let themeName2 = getItem("themeName");
        if (! themeConfig) { // 也没有本地存储 使用默认主题
            changeStyle(themes["default"]);
            setItem("theme", themes["default"]);
            setItem("themeName", "default");
        } else { // 有存储
            changeStyle(themeConfig);
            setItem("themeName", themeName2);
        }
    }
};
/**
 * 用于getlocalitem设置整体的style属性
 * @param config type : GlobalConfig 要求类型是一个全局配置项
 */
const setProperty = (config : GlobalConfig) => {
    for (let key in config) { // 由于命名原因 如果是number类型的config 则直接转换成横线
        if (typeof config[key] === 'number') {
            if (key === 'backGroundImgLight') {
                document.documentElement.style.setProperty(`--${key}`, `${
                    config[key]
                }%`);
            } else if (key === 'backGroundImgBlur') {
                document.documentElement.style.setProperty(`--${key}`, `${
                    config[key]
                }rem`);
            } else {
                document.documentElement.style.setProperty(`--${
                    humpToLine(key)
                }`, `${
                    config[key]
                }rem`);
            }
        } else {
            if (key === 'backGroundImg') {
                try {
                    let container: HTMLElement = document.getElementsByClassName('cotainer')[0] as HTMLElement;
                    container.style.backgroundImage = `url(${
                        config[key]
                    })`;
                } catch (error) {
                    console.log(error);
                }
            } else {
                document.documentElement.style.setProperty(`--${key}`, config[key]);
            }
        }
    }
}
/**
 * 用于设置单个属性 不需要每次都全部遍历设置属性
 * @param varName css属性变量的名字
 * @param val 属性的值 可以为number或者string
 */
const setOneProperty = (varName : string, val : string | number) => {}
/**
 * 可以自适应的传入或者不传入 不传入则默认读取本地的配置
 * 传入local 配置则保存本地
 * @param config 一个GlobalConfig 或者不传 
 * @param local Boolean 默认为false 用于保存本地
 */
export const setConfig = (config : GlobalConfig | void, local : Boolean = false) => {
    if (!config) {
        let localConfig = getItem('globalConfig');
        if (! localConfig) {
            setProperty(defaultConfig);
            setItem('globalConfig', defaultConfig);
        } else {
            setProperty(localConfig);
        }
    } else {
        setProperty(config);
        if (local) { // 如果不传 则不保存到本地
            setItem('globalConfig', config);
        }
    }
}
/**
 * 用于将设置重置回默认设置
 */
export const setDefault = () => {
    setConfig(defaultConfig, true);
}
/**
 * 用于将配置设置为夜间模式
 */
export const setDark = () => {
    setConfig(darkConfig, true);
}
