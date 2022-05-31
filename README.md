<p align="center">  
    <img src="https://img.shields.io/badge/-Vue3-34495e?logo=vue.j" />
    <img src="https://img.shields.io/badge/-Vite2.7-646cff?logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/-Pinia-yellow?logo=picpay&logoColor=white" />
    <img src="https://img.shields.io/badge/-Axios-008fc7?logo=axios.js&logoColor=white" />
    <img src="https://img.shields.io/badge/-Less-1D365D?logo=less&logoColor=white" alt="Less">
<p>  


# Myblog-Vue3viteTs

个人博客项目，目的是为了搭建一个供个人使用的简单易用的博客，支持简单的登录和注册功能。再加上留言功能。

目前实现功能：发布文章，登录/注册，黑夜白天模式切换，浏览文章，文章排序，标签筛选，评论，留言，个人信息修改，自定义头图。

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

后端暂不开源，涉及到一些秘钥和apikey  可以参考我之前的项目

https://github.com/ADKcodeXD/Springboot-vue-Blog
