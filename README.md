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
    services                                    实际逻辑
        user.js                                 user管理逻辑
    controllers                                 控制器
        auth.js                                 用于身份验证的中间件
        follow.js                               Following & Followers
        music.js                                乐曲管理
        session.js                              session管理，登陆态
        user.js                                 用户管理
        recommend.js                            推荐系统
        like.js                                 用户喜欢
        ...
    models                                      MongoDB schema定义
    public                                      公共资源
    routes                                      路由
    util                                        工具API
    app.js                                      express server
