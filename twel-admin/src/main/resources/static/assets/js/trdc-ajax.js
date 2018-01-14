/*
 * The Hefei JingTong RDC(Research and Development Centre) Group.
 * __________________
 *
 *    Copyright 2015-2017
 *    All Rights Reserved.
 *
 *    NOTICE:  All information contained herein is, and remains
 *    the property of JingTong Company and its suppliers,
 *    if any.
 */
'use strict';

/**扩展jquery ajax**/
(function ($) {

    var _messages = {
        en: {
            404: '',
            403: '',
            500: ''
        },
        cn: {
            404: '您所请求的地址不存在',
            403: '您没有权限进行此项操作，请联系管理员!',
            500: '请求接口发生错误，请稍后重试！'
        }
    };

    var loadlayer = null;
    $.showLoading = function (msg) {
        loadlayer = layer.msg(msg, {icon: 16, shade: [0.8, '#393D49'], time: 1000000});
    };
    $.hideLoading = function () {
        if (loadlayer) {
            layer.close(loadlayer);
        }
    };
    $.alert = function (msg) {
        layer.alert(msg);
    };

    //备份jquery的ajax方法
    var _ajax = $.ajax;

    //重写jquery的ajax方法
    $.ajax = function (opt) {
        //备份opt中error和success方法
        var fn = {
            beforeSend: function (XMLHttpRequest) {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            },
            success: function (data, textStatus) {
            },
            complete: function (XMLHttpRequest, textStatus) {
            },
            loadingTip: '正在加载',
            showLoadingTip: true
        };
        if (opt.url) {
            // if (opt.url.trim() === '') return;
            if ($.trim(opt.url) === '') return;
        } else {
            return;
        }
        if (opt.error) {
            fn.error = opt.error;
        }

        if (opt.success) {
            fn.success = opt.success;
        }
        if (opt.complete) {
            fn.complete = opt.complete;
        }
        if (opt.loadingTip) {
            fn.loadingTip = opt.loadingTip;
        }
        if (opt.showLoadingTip === false) {
            fn.showLoadingTip = opt.showLoadingTip;
        }

        opt.data = opt.data || {};

        var contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        if (opt.dataType) {
            switch (opt.dataType) {
                case 'json':
                    contentType = 'application/json; charset=utf-8';
                    break;
                case 'html':
                    contentType = 'application/html; charset=utf-8';
                    break;
                default:
                    break;
            }
        }

        if (!opt.lang) {
            opt.lang = 'cn';
        }
        //扩展增强处理
        var _opt = $.extend(opt, {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //错误方法增强处理
                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },
            success: function (data, textStatus) {
                fn.success(data, textStatus);
            },
            beforeSend: function (XHR) {
                fn.beforeSend(XHR);
                if (fn.showLoadingTip) {
                    //提交前回调方法
                    $.showLoading(fn.loadingTip);
                }
            },
            complete: function (e, xhr, settings) {
                //请求完成后回调函数 (请求成功或失败之后均调用)。

                if (fn.showLoadingTip) {
                    $.hideLoading();
                }

                var httpStatusCode = e.status;
                if (httpStatusCode <= 0) {
                    layer.alert('您的网络无法连接服务器，请检查！', {icon: 2, title: '温馨提示'});
                    return;
                }
                var icon = 5;
                switch (httpStatusCode) {
                    case 200:
                        fn.complete(xhr, settings);
                        return;

                    case 400:
                    case 500: {
                        icon = 2;
                        break;
                    }
                    default: {
                        break;
                    }

                }
                if(opt.dataType){
                    if (opt.dataType === 'json') {

                        var responseBody = e.responseJSON;
                        var errorMessage = responseBody.message;
                        if (!errorMessage) {
                            errorMessage = _messages[opt.lang][httpStatusCode];
                        }
                        layer.alert(errorMessage, {icon: icon, title: '温馨提示'})
                    } else {
                        fn.complete(xhr, settings);
                    }
                } else {
                    var responseBody = e.responseJSON;
                    var errorMessage = responseBody.message;
                    if (!errorMessage) {
                        errorMessage = _messages[opt.lang][httpStatusCode];
                    }
                    layer.alert(errorMessage, {icon: icon, title: '温馨提示'})
                }



            },
            contentType: contentType,
            //html(默认), xml, script, json...接受服务端返回的类型
            timeout: 180000 //超时时间
        });
        // 兼容不支持异步回调的版本
        var def = _ajax.call($, _opt);
        if ('done' in def) {
            var done = def.done;
            def.done = function (func) {
                done.call(def, func);
                return def;
            };
        }
        return def;
    };
})(jQuery);