<#compress>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>愉悦MES管理系统</title>
    <link rel="stylesheet" type="text/css" href="${ctx}/static/apps/css/login/reset.css"/>
    <link rel="stylesheet" type="text/css" href="${ctx}/static/apps/css/login/login.css"/>
    <link rel="stylesheet" type="text/css" href="${ctx}/static/apps/css/login/common.css"/>


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="${ctx}/static/vendor/ie/html5shiv.js"></script>
    <script src="${ctx}/static/vendor/ie/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<section class="g-login u-pos-re">
    <div class="g-login-head">
        <div class="u-clearfix">
            <img src="${ctx}/static/assets/img/login/login-new-logo.png" class="img-jtLogo u-fl"/>
            <div class="u-fl sys-name">
                <h1>愉悦MES管理系统</h1>
                <p>Yuyue MES management system</p>
            </div>
        </div>

    </div>
    <div class="g-login-bd">
        <div class="g-login-container">
            <div class="g-login-main">
                <div class="login-tab-switch ext-brB">
                    <span class="login-tab-switcher u-t-primaryLight is-loginTab-active u-t-primary">账号登录</span>
                    <span class="login-tab-switcher u-t-primaryLight u-t-primary">扫码登录</span>
                </div>
                <div class="login-tab" style="display: block;">
                    <form id="login-form" action="${ctx}/login"  method="post" class="g-login-form" >
                        <label class="u-pos-re">
                            <input type="text" class="ui-login-input" placeholder="用户名" name="username" id="username"/>
                            <img src="${ctx}/static/assets/img/login/login-input-user.png" alt="" class="img-loginInput"/>
                        </label>
                        <label class="u-pos-re">
                            <input type="password" class="ui-login-input" placeholder="密码" name="password" id="password"/>
                            <img src="${ctx}/static/assets/img/login/login-input-pd.png" alt="" class="img-loginInput"/>
                        </label>

                        <input type="submit" value="登&nbsp;&nbsp;录" class="g-login-btn ui-btn-primary"/>
                    </form>

                </div>
                <div class="login-tab login-tab-qr  u-txt-center">
                    <img src="${ctx}/static/assets/img/login/QR-code.png" alt="" class="img-QR"/>
                    <p class="u-txt-center">请扫描二维码</p>
                </div>
            </div>
        </div>
    </div>
    <footer class="g-foot u-txt-center">
        <p class="g-footTxt1">技术支持：上海景同信息科技股份有限公司</p>
        <p class="g-footTxt2">
            Copyright ® 2014 愉悦家纺 All Rights Reserved &nbsp;&nbsp;鲁公网安备 &nbsp;3716910200000
            <img src="${ctx}/static/assets/img/login/login-ft-ico.jpg" alt="" />
        </p>
    </footer>
</section>
<!-- BEGIN: PAGE SCRIPTS -->

<!-- jQuery -->
<script type="text/javascript" src="${ctx}/static/vendor/jquery/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="${ctx}/static/vendor/jquery/jquery_ui/jquery-ui.min.js"></script>

<!-- Theme Javascript -->
<script type="text/javascript">
    "use strict";
    var g = {ctx: '${ctx}/'};
</script>
<script src="${ctx}/static/assets/js/browserVersion.js" type="text/javascript"></script>
<script type="text/javascript" src="${ctx}/static/assets/js/utility/utility.js"></script>
<script type="text/javascript" src="${ctx}/static/assets/js/md5.min.js"></script>
<script type="text/javascript" src="${ctx}/static/apps/controllers/login.js"></script>

</body>
</html>
</#compress>