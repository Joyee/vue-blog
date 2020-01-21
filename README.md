# vue-blog

## 技术栈
+ vue-cli3
+ node.js > 8.0
+ mysql
+ express
+ ElementUI (我这里采用的是按需加载，需要在.babelrc中配置, 官方文档[https://element.eleme.cn/#/zh-CN/component/quickstart])
+ axios

## 初始化项目
新建文件夹```vue-blog```

快速开始一个项目: ```vue create client```,选择 Vuex, less, router

运行 ```yarn serve```

目录结构:

## 准备
+ 安装 ElementUI 
+ 配置vue.config.js

## 公共方法
+ axios封装 参考[https://juejin.im/post/5d2f1c54e51d454f6f16eca9]

## 后端技术栈

+ JWT验证

1. jwt: 服务器不保存session数据，所有数据都保存在客户端。详情解释看阮一峰: JSON Web Token 入门教程[http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html]