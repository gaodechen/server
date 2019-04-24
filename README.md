# TODO

高并发系统有三把利器：缓存、降级和限流

# Resume

+ MVC
+ controllers负责与HTTP交互，参数检查，调用services
+ services负责实际的逻辑

## imports

+ express以及各种中间件
+ mongodb & mongoose
+ redis
+ ...

## install & run

```
nppm install
or
cnpm install
```

run Redis Server:

```
redis-server
```

Hot-Loading:

```
node-dev ./bin/www
```

or:

```
npm start
```

## Structure

    bin
        www                                     服务器入口
    config                                      服务器配置
    lib                                         各类库配置
        mongodb.js                              MongoDB配置以及接口
        redis.js                                Redis配置以及接口
        recommender.js                          推荐系统配置以及接口
    constants                                   常量
    services                                    业务逻辑
        user.js                                 user管理逻辑
        auth.js                                 权限管理逻辑
        ...
    controllers                                 HTTP交互层
        session.js                              session请求HTTP交互层
        user.js                                 user请求HTTP交互层
        ...
    models                                      MongoDB schema定义
    public                                      公共资源
    routes                                      路由
    utils                                       工具API
    app.js                                      express server
