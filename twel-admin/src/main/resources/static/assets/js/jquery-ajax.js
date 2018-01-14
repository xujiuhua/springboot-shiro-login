/**
 *
 * @author jiuhua.xu
 * @version 1.0
 */


$.submitForm = function ($form, fnSuccess, url) {
    var options = {
        url: url,
        type: 'POST',
        dataType: 'json',
        clearForm: false,
        timeout: 0,
        success: function (responseText, statusText, xhr, $form) {
            fnSuccess();
        },
        error: function (error) {
            var errorMsg = "系统异常";
            if (error.responseJSON && error.responseJSON.code) {
                // 约定如下：
                // 1.50000 属于系统异常：如NullPointerException、数据库SQL异常（字段长度大于数据库长度等）
                // 2.非50000 属于用户自定义异常
                if (error.responseJSON.code !== 50000) {
                    errorMsg = error.responseJSON.message || errorMsg;
                }
            }
            parent.layer.msg(errorMsg, {icon: 2});
        }
    };
    $form.ajaxSubmit(options);
};
