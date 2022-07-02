<p align="center">
    <img src="https://img.shields.io/badge/-Vue3-34495e?logo=vue.j" />
    <img src="https://img.shields.io/badge/-Vite2.7-646cff?logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/-Pinia-yellow?logo=picpay&logoColor=white" />
    <img src="https://img.shields.io/badge/-Axios-008fc7?logo=axios.js&logoColor=white" />
    <img src="https://img.shields.io/badge/-Less-1D365D?logo=less&logoColor=white" alt="Less">
    <img src="https://img.shields.io/badge/adk-adkblog-red" alt="Less">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/ADKcodeXD/Myblog-Vue3viteTs">
    <img alt="CD" src="https://github.com/ADKcodeXD/Myblog-Vue3viteTs/actions/workflows/push.yml/badge.svg">
<p>  
# ADK-BLOG

![adkblog]([http://firssst.oss-cn-guangzhou.aliyuncs.com/20220611/0238df3a-a7cd-4376-9951-57c03916cdf9.png?Expires=1812599738&OSSAccessKeyId=LTAI5t78YcsGmmK8uLsF2QFE&Signature=zgRvR1hwnqMABsutX6FiZfl5RbY%3D]#pic_center)

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
- 首页[![jVy3OH.png]([https://s1.ax1x.com/2022/06/27/jVy3OH.png)](https://imgtu.com/i/jVy3OH]#pic_center)
- 文章详情页

[![jVysmj.png]([https://s1.ax1x.com/2022/06/27/jVysmj.png)](https://imgtu.com/i/jVysmj]#pic_center)

- 文章列表

[![jVyh1U.md.png](https://s1.ax1x.com/2022/06/27/jVyh1U.png)](https://imgtu.com/i/jVyh1U)

- 设置页

[![jVyTB9.md.png](https://s1.ax1x.com/2022/06/27/jVyTB9.png)](https://imgtu.com/i/jVyTB9)

- 画廊功能

[![jVyX9K.md.png](https://s1.ax1x.com/2022/06/27/jVyX9K.png)](https://imgtu.com/i/jVyX9K)

- 画廊展示页

[![jV6PAI.png](https://s1.ax1x.com/2022/06/27/jV6PAI.png)](https://imgtu.com/i/jV6PAI)

- 写文章

[![jV683T.png](https://s1.ax1x.com/2022/06/27/jV683T.png)](https://imgtu.com/i/jV683T)

- 留言板

[![jV6NDJ.png](https://s1.ax1x.com/2022/06/27/jV6NDJ.png)](https://imgtu.com/i/jV6NDJ)

- 动漫页

[![jV6r8K.png](https://s1.ax1x.com/2022/06/27/jV6r8K.png)](https://imgtu.com/i/jV6r8K)

- 动漫详情

[![jV6WVA.png](https://s1.ax1x.com/2022/06/27/jV6WVA.png)](https://imgtu.com/i/jV6WVA)

更多的请访问*http://adkdream.top*

## 2022.6.27 更新日志📋

🎉**新功能：**

- 增加了画廊功能，用户可以通过上传图片来进行共享生活和动态。

🔨**修复:**

- 修复了富文本编辑器的上传图片bug tinymce6不支持之前的success 改成了promise

- 修复了后端的缓存bug 用户信息更改也能够及时刷新了 将token过期时间提高到了5天
- 修复了后端缓存无论什么都存入缓存的问题

**⚡优化：**

- 优化了首页图片展示，利用了oss的请求参数做到了图片压缩 更快的网页加载
- 将oss存储改成了内网转发 节省流量
- 项目抽取了部分功能性代码为util
- 将自定义指令的全局注册改为局部注册 首屏速度更友好了
- 后端支持了动态生成文章sitemap 其他页面暂未支持
- 利用了gitcz进行项目提交管理 提交更加规范了

**🖊TODO**：

- **支持https**
- **每日签到**
- **制作分享界面**
- **个人创作中心**
- 增加一个聊天室功能 详见这里6.23👇
- 对文章增加分区 板块 调整
- 制作数据导出的功能
- 制作动态分享功能

## 2022.6.23 log 更新readme

目前网站大部分的页面的重构基本完成。对于动漫详情页和动漫播放页的重构也做好了

- 抛弃了xgplayer 更新为dplayer  (后面要改成artplayer)
- 修复了留言板不能正常发送正常使用的bug
- 增加了seo支持，对于文章详情以及动漫详情利用usehead做好了meta改造
- 改进了html结构，使用了语义化标签
- prerender nginx中间件服务部署 可以让爬虫知道我是啥了！！详见：http://adkdream.top/article/1539263599424200706
- 修复一些bug 例如后端注册bug

TODO：

- **增加画廊功能 可以用户上传分享自己喜欢的图片 以及瀑布流布局**

- **爬取senfan.net 多播放源播放动漫**
- **制作分享界面 美观的进行分享**
- **增加个人创作中心，管理自己的文章（私有文章 公共文章）**
- **修复富文本编辑器的上传图片bug**
- 签到积分功能 做个每日签到
- 增加个人动态功能
- 对于表情组件进行调整 制作一个类似于b站的表情组件
- 增加一个聊天室功能，可以在线建造聊天室 邀请他人进来聊天(人数为0则自动销毁聊天室)
- - 生成短链接  并且可以实时进行聊天 聊完销毁
  - 聊天期间加入短链接都能够看到历史记录
  - 销毁了自动销毁聊天记录和短链()
- 对于文章增加分区 增加板块
- 修复bgm首页轮播图显示的bug
- 做好部署迁移的准备 做好全套部署教程
- 制作数据导出的功能 一键导出为md文件/富文本文件

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

