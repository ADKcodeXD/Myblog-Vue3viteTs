<p align="center">  
    <img src="https://img.shields.io/badge/-Vue3-34495e?logo=vue.j" />
    <img src="https://img.shields.io/badge/-Vite2.7-646cff?logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/-Pinia-yellow?logo=picpay&logoColor=white" />
    <img src="https://img.shields.io/badge/-Axios-008fc7?logo=axios.js&logoColor=white" />
    <img src="https://img.shields.io/badge/-Less-1D365D?logo=less&logoColor=white" alt="Less">
    <img src="https://img.shields.io/badge/adk-adkblog-red" alt="Less">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/ADKcodeXD/Myblog-Vue3viteTs">
<p>  

# ADK-BLOG

![adkblog](http://firssst.oss-cn-guangzhou.aliyuncs.com/20220611/0238df3a-a7cd-4376-9951-57c03916cdf9.png?Expires=1812599738&OSSAccessKeyId=LTAI5t78YcsGmmK8uLsF2QFE&Signature=zgRvR1hwnqMABsutX6FiZfl5RbY%3D)

**一款二次元风格主题的个人博客**

展示页:http://adkdream.top

主要功能为:

- 博客的主要功能
- 抓取bangumi数据 可以获取每日番剧更新
- 抓取樱花数据 可以进行在线动漫观看
- 多用户共享博客
- 二级评论 markdown以及富文本双重编辑器
- 自定义主题
- 支持移动端(尽可能支持)

## 预览

![欢迎页视觉效果](http://firssst.oss-cn-guangzhou.aliyuncs.com/20220611/64d99526-d0cc-4d44-85d0-b56fdf908bfb.png?Expires=1812599815&OSSAccessKeyId=LTAI5t78YcsGmmK8uLsF2QFE&Signature=kS99FfYUoKbKXGoVbC9l9YgfpyA%3D)

![首页视觉效果](http://firssst.oss-cn-guangzhou.aliyuncs.com/20220611/7cd3eb4a-3208-4d9b-9424-d12570be20dd.png?Expires=1812642445&OSSAccessKeyId=LTAI5t78YcsGmmK8uLsF2QFE&Signature=lhJoWfYALVNOELc14m6I9TpQmbI%3D)

![文章详情图片效果](http://firssst.oss-cn-guangzhou.aliyuncs.com/20220611/8a1b1dd8-47aa-4a7a-a4cc-1a83206491be.png?Expires=1812642563&OSSAccessKeyId=LTAI5t78YcsGmmK8uLsF2QFE&Signature=Ut2srKWj2uZn%2BmnCgUDTrekSKUE%3D)

![设置界面](http://firssst.oss-cn-guangzhou.aliyuncs.com/20220611/87bba0c1-cb8a-4fa9-b3e1-27787d9b6771.png?Expires=1812642710&OSSAccessKeyId=LTAI5t78YcsGmmK8uLsF2QFE&Signature=6CAXPP4LIgF7KuYAjAQ4A4QvZeM%3D)

更多的请访问*http://adkdream.top*

## 2022.6.11 网站再次更新 主题功能的完成！！！

- 对于主要功能的页面的样式以及风格完成了统一
- 抽取了所有(主要)页面的less 并且通过css变量的形式实现了自定义控制页面风格
- type统一declare和定义namespace
- 定义了几个全局变量用于控制文字大小
- 新增设置页面
- 重写了upload的组件和hooks 支持取消上传和上传进度预览
- 升级了tinymce6.x版本 并且通过本地引入的方式引入tinymce
- 修复后端bug 如上传的登录拦截 用户的like
- 重写评论组件 使用了emoji组件自带的输入来实现emoji评论输入 并压缩emoji的编码
- 对部分elementplus组件的写法根据官网进行了更正

TODO

- https
- 风格切换的部分bug 以及交互的跟进
- 开启nuxt3分支 支持服务端渲染
- 用户的收藏和点赞功能的完善
- 动漫详情页的重写

此外 我也对我的博客后端进行了开源 地址如下

**https://github.com/ADKcodeXD/ADKblog-backend**

详细更新可以在这里查看:

http://adkdream.top/article/1535536385474035713

## 2022.5.31 重构了整个网站的样式 并且加入了一些新功能

- 首先对网站的样式进行了重写 采用了简笔画的风格来进行页面的展示

- 其次 增加了bangumi的番剧管理的api 虽然暂时好像失效了

- 对于网站的架构和一些地方进行调整 增加了规范性和封装性

- 对于网站的性能进行调整，对于一些不需要的js和样式文件进行按需引入，且开始采用font spider 以及其他手动对网站进行优化

- 对网站的视觉效果重新进行设计、一些老旧的组件进行重新封装和重构

  TODO：

  - 接入ssr 接入https 另外对首页视觉的重新设计和一些不足之处的改进

  - 后续会在b站进行宣传 并且对后端进行安全性的验证和改进~ 例如限制接口的访问次数以及计入mysql和EL搜索以及rabbitMQ等功能。

  - 另外对于SSR订阅和动漫花园的搜索服务 需要做研究 争取做一个动漫资讯类型的博客网站~ 

  - 对于播放页面还需要一定的美化 
  - 新增用户设置页面 可以自由设置
  - 新增个人简历页面 文件查看等功能
  - 新增文章视频嵌入 支持iframe等功能

**暂时下线了 夜间模式等功能~**

## 2022.3.15 后台管理系统上线

更多详情可以查看该文章

http://adkdream.top/article/1503743748647849986

- **上线了后台管理系统 可以更改和管理数据**
- 对文章列表的排序功能，查找功能，筛选功能进行了实现
- 首页文章和banner轮播图支持自行上架和下架
- 对标签点击跳转，文章归档进行了实现
- 对移动端下的侧边小控件进行了调整，可以缩放了
- 优化了移动端下编辑文章的体验
- 移除了一些奇怪的样式
- 对头像组件样式进行了调整
- 修复了threejs内存溢出的问题

## 2022.3.3
修改了首页样式，个人信息样式，集成了three3d场景和自我介绍场景，增加了动态新增tag的功能，优化了路由配置。

## 2022.2.23

新增github风格样式渲染文章 ，移动端适配，响应式 ，富文本和markdown编辑器切换功能，标签样式修改，

具体可以看我在网站发布的文章。

## 2022.2.19

网站正式上线：http://adkdream.top/

## 本项目食用技巧：

``` sh
cd yourpath
npm install
npm run dev
```

~~后端暂不开源，涉及到一些秘钥和apikey  可以参考我之前的项目~~

~~https://github.com/ADKcodeXD/Springboot-vue-Blog~~

