# 项目工程规范

## 目录规范

1. Java目录命名规范
    
    所有类都应该以这个目录为顶级目录 `com.jtech`, 其他相关功能模块包都从属在这个目录之下；

    - `com.jtech.twel.code`            错误编码包
    - `com.jtech.twel.config`          Spring Boot 相关配置包，比如 `Shiro`的配置等
    - `com.jtech.twel.controller`      MVC之控制器层，处理用户请求、参数校验、信息返回、调用业务服务接口功能
    - `com.jtech.twel.exception`       错误的异常定义 以及 全局错误异常处理
    - `com.jtech.twel.security`        身份认证相关类和处理器
    - `com.jtech.twel.**.service`      业务服务接口定义
    - `com.jtech.twel.**.service.impl` 业务服务接口实现
    - `com.jtech.twel.**.domain`       业务数据库实体包，与数据库一一对应
    - `com.jtech.twel.**.dao`          数据库DAO接口，如果是`Mybatis`，则就是 `Mapper`接口的包
    - `com.jtech.twel.**.dao.impl`     非`Mybatis`时，DAO接口的实现类
    - `com.jtech.twel.**.exception`    业务服务异常定义
    - `com.jtech.twel.**.dto`          数据传输对象（Data Transfer Object）；`Service` 和 `Manager` 向外传输的对象
    - `com.jtech.twel.**.query`        数据查询对象，各层接收上层的查询请求。注:超过`2`个参数的查询封装，禁止使用`Map`类来传输。
    - `com.jtech.twel.**.vo`           显示层对象(View Object)，通常是 Web 向模板渲染引擎层传输的对象。
    
    > `**`表示业务模块的名称，比如用户中心-user，也就是 `com.jtech.twel.user.service` 等
    > 
    > 另外请注意，`dto` 可以代替 `vo` 来进行 视图对象的转换  

    * 具体分层，请查阅 `阿里巴巴 Java 开发手册.pdf` 中的工程结构

2. 前端目录规范

    根据 `SpringBoot`的 静态资源文件的规范，将静态文件放在 `src/webapp/static` 目录下。我们的目录结构为：

    ```
    .
    ├── apps                # 工程应用JavaScript和Css文件
    │   ├── css             # 本工程的Css文件目录
    │   ├── modules         # 遵循layui的模块化组件或者JS文件
    │   ├── pages           # 与视图界面对应的并遵循layui的视图JavaScript，可以理解为JavaScript的控制器
    │   └── readme.txt      # 描述文件
    ├── assets              # 后台管理的布局、皮肤、控件
    │   ├── admin-tools     # 管理工具的的CSS和Js文件
    │   ├── fonts           # 字体、图标
    │   ├── img             # 图片
    │   ├── js              # 公共使用的JavaScript控件和工具
    │   └── skin            # 皮肤目录
    └── vendor              # 插件控件 js控件等
        ├── ie              # IE兼容的插件 html5 css3支持的架包
        ├── jquery          # jquery 和 jqueryui 的js库
        └── plugins         # 用到的各个组件库
    ```

    关于layui的模块化，请参考 [http://www.layui.com/doc/base/modules.html](http://www.layui.com/doc/base/modules.html)中的 *预先加载* 章节的说明。
    
3. 数据库设计规范

    ```
    create_time             创建时间
    creater                 创建人
    update_time             更新时间
    updater                 更新人
    status                  启停标识： 0-停用;  1-启用
    delete_flag             删除标识： 0-未删除;1-已删除
    ```
