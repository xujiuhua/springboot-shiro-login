/*
 * The Hefei JingTong RDC(Research and Development Centre) Group.
 * __________________
 *
 *    Copyright 2015-2017
 *    All Rights Reserved.
 *
 *    NOTICE:  All information contained herein is, and remains
 *    the property of JingTong Company and its suppliers, if any.
 */

/**
 *
 * @author sog
 * @version 1.0
 */
$(document).ready(function () {
    if (!browserVersion.checkBrowserIsAccord()) {
        window.location.href = g.ctx + "static/view/change_brower.html";
        return;
    }

    // 当登录页面不是在顶层显示，则跳转
    if (window.parent.window != window) {
        window.top.location = g.ctx + "login";
    }

    // 拦截登录表单
    $('form#login-form').submit(function () {
        var $password = $('input:password');
        var password = $password.val();
        if (password.length !== 32 && typeof(md5) === 'function') $password.val(md5(password));
    });

    /*登录界面二维码切换*/
    function qrTab(){
        $("#qr").click(function(){
            $(".main").eq(0).hide();
            $(".main").eq(1).show();
        });
        $("#uName").click(function(){
            $(".main").eq(1).hide();
            $(".main").eq(0).show();
        });
    }
    qrTab();
    /* 登录切换方式特效  */
    function loginTab(){
        $(".login-tab-switcher").click(function(){
            $(this).addClass("is-loginTab-active").siblings(".login-tab-switcher").removeClass("is-loginTab-active");
            $(".login-tab").eq($(this).index()).show().siblings(".login-tab").hide();
        })
    }
    loginTab();
});