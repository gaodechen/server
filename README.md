# Resume

+ MVC
+ middlewares: 各中间件配置
+ controllers: 负责与HTTP交互，参数过滤检查，调用services
+ services: 负责实际的逻辑

## imports

+ express & middlewares
+ mongodb & mongoose
+ redis
+ cors
+ multer
+ cookie-parser
+ compression
...

## install & run

```
nppm install
or:
cnpm install
```

run Redis Server:

```
redis-server
```

Production Mode (pm2):

```
npm run build
or
export NODE_ENV='production' && pm2 start ./bin/www -i 0
```

Development Mode:

```
npm run start
```

## Structure

    bin
        www                                     主程序入口
    config
        development.js                          development mode config
        production.js                           production mode config
        common.js                               common config of development & production
        index.js
    lib                                         接口二次封装
        mongodb.js                              MongoDB二次封装
        redis.js                                Redis二次封装
        recommender.js                          推荐系统配置
    constants                                   常量
    services                                    业务逻辑
        user.js                                 user管理逻辑
        auth.js                                 权限管理逻辑
        ...
    controllers                                 控制器
        session.js                              session请求HTTP交互层
        user.js                                 user请求HTTP交互层
        ...
    models                                      MongoDB schema定义
    public                                      公共资源
    routes                                      路由
    utils                                       工具API
    app.js                                      express server
