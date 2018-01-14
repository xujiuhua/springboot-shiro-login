/**
 * 工具组件 对原有的工具进行封装，自定义某方法统一处理
 *
 * @author clk 2017/10/04
 * @version 1.00
 */

var screenHeight = document.documentElement.clientHeight;
var screenWidth = document.documentElement.clientWidth;
var gridWidth = 0;
var gridHeight = 0;

(function () {

    //避免按钮多次点击这个代码实现在select2.me.js中
//	$('button').each(function() {
//		var _this = $(this);
//		_this.click(function(){
//			var _this1 = $(this);
//			_this1.attr("disabled",true);
//			setTimeout(function(){
//				
//				_this.attr("disabled",false);
//			},8000)
//		});
//	});

    if (screenWidth < 760) {
        gridWidth = screenWidth
        gridHeight = screenHeight;
    } else {
        gridWidth = screenWidth - 20;
        gridHeight = screenHeight - 70;
    }

    ly = {};
    ly.ajax = (function (params) {
        var pp = {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                layer.open({
                    type: 1,
                    title: "出错啦！",
                    area: ['95%', '95%'],
                    content: "<div id='layerError' style='color:red'>" + XMLHttpRequest.responseText + "</div>"
                });
            }
        };
        $.extend(pp, params);
        $.ajax(pp);
    });

    ly.ajaxSubmit = (function (form, params) {// form 表单ID. params ajax参数
        var pp = {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                layer.open({
                    type: 1,
                    title: "出错啦！",
                    area: ['95%', '95%'],
                    content: "<div id='layerError' style='color:red'>" + XMLHttpRequest.responseText + "</div>"
                });
            }
        };
        $.extend(pp, params);
        $(form).ajaxSubmit(pp);
    });

    CommnUtil = {
        /**
         * ajax同步请求 返回一个html内容 dataType=html. 默认为html格式 如果想返回json.
         * CommnUtil.ajax(url, data,"json")
         *
         */
        ajax: function (url, data, dataType) {
            if (!CommnUtil.notNull(dataType)) {
                dataType = "html";
            }
            var html = '没有结果!';
            // 所以AJAX都必须使用ly.ajax..这里经过再次封装,统一处理..同时继承ajax所有属性
            if (url.indexOf("?") > -1) {
                url = url + "&_t=" + new Date();
            } else {
                url = url + "?_t=" + new Date();
            }
            ly.ajax({
                type: "post",
                data: data,
                url: url,
                dataType: dataType,// 这里的dataType就是返回回来的数据格式了html,xml,json
                async: false,
                cache: false,// 设置是否缓存，默认设置成为true，当需要每次刷新都需要执行数据库操作的话，需要设置成为false
                success: function (data) {
                    html = data;
                }
            });
            return html;
        },
        /**
         * 判断某对象不为空..返回true 否则 false
         */
        notNull: function (obj) {
            if (obj === null) {
                return false;
            } else if (obj === undefined) {
                return false;
            } else if (obj === "undefined") {
                return false;
            } else if (obj === "") {
                return false;
            } else if (obj === "[]") {
                return false;
            } else if (obj === "{}") {
                return false;
            } else {
                return true;
            }

        },

        /**
         * 判断某对象不为空..返回obj 否则 ""
         */
        notEmpty: function (obj) {
            if (obj === null) {
                return "";
            } else if (obj === undefined) {
                return "";
            } else if (obj === "undefined") {
                return "";
            } else if (obj === "") {
                return "";
            } else if (obj === "[]") {
                return "";
            } else if (obj === "{}") {
                return "";
            } else {
                return obj;
            }

        },
        loadingImg: function () {
            var html = '<div class="alert alert-warning">' + '<button type="button" class="close" data-dismiss="alert">' + '<i class="ace-icon fa fa-times"></i></button><div style="text-align:center">' + '<img src="' + rootPath + '/images/loading.gif"/><div>' + '</div>';
            return html;
        },
        /**
         * html标签转义
         */
        htmlspecialchars: function (str) {
            var s = "";
            if (str.length == 0)
                return "";
            for (var i = 0; i < str.length; i++) {
                switch (str.substr(i, 1)) {
                    case "<":
                        s += "&lt;";
                        break;
                    case ">":
                        s += "&gt;";
                        break;
                    case "&":
                        s += "&amp;";
                        break;
                    case " ":
                        if (str.substr(i + 1, 1) == " ") {
                            s += " &nbsp;";
                            i++;
                        } else
                            s += " ";
                        break;
                    case "\"":
                        s += "&quot;";
                        break;
                    case "\n":
                        s += "";
                        break;
                    default:
                        s += str.substr(i, 1);
                        break;
                }
            }
        },
        /**
         * in_array判断一个值是否在数组中
         */
        in_array: function (array, string) {
            for (var s = 0; s < array.length; s++) {
                thisEntry = array[s].toString();
                if (thisEntry == string) {
                    return true;
                }
            }
            return false;
        }
    };

})();

function BindSelect(ctrlName, url) {
    var control = $('#' + ctrlName);
    // 绑定Ajax的内容
    $.getJSON(url, function (data) {
        control.empty();// 清空下拉框
        $.each(data, function (i, item) {
            control.append("<option value='" + item.value + "'>&nbsp;" + item.text + "</option>");
        });
    });

    // 设置Select2的处理
    control.select2({
        allowClear: false,
        placeholder: "请选择",
        escapeMarkup: function (m) {
            return m;
        }
    });
}

function BindDictItem(ctrlName, dictTypeName) {
    var url = '../dic/getDicValueText.do?dictTypeName=' + encodeURI(dictTypeName);
    BindSelect(ctrlName, url);
}

// 级联查询下拉列表
function BindConcatSelect(ctrlName, url, level) {
    var control = $('#' + ctrlName);
    // 设置Select2的处理
    control.select2({
        allowClear: false,
        placeholder: "请选择",
        escapeMarkup: function (m) {
            return m;
        }
    });

    // 绑定Ajax的内容
    $.getJSON(url, function (data) {
        control.empty();// 清空下拉框
        $.each(data, function (i, item) {
            if (control.attr("val") == item.value)
                control.append("<option value='" + item.value + "' selected>&nbsp;" + item.text + "</option>");
            else
                control.append("<option value='" + item.value + "'>&nbsp;" + item.text + "</option>");
        });
        // 初始化设置下拉框值
        if (level == 1) {
            setConcatDropDownValueOne(ctrlName);
        } else if (level == 2) {
            setConcatDropDownValueTwo(ctrlName);
        } else if (level == 3) {
            setConcatDropDownValueThree(ctrlName);
        }
    });
}

function BindConcatDictItem(ctrlName, dictTypeName, pid, level) {
    var url = '../dic/getContactDicValueText.do?dictTypeName=' + encodeURI(dictTypeName) + '&pId=' + pid;
    BindConcatSelect(ctrlName, url, level);
}

function formatResult(repo) {
    if (repo.loading)
        return repo.text;
    var markup = "<div>" + repo.name + "</div>";
    return markup;
}

// 表单json格式化方法……不使用&拼接
(function ($) {
    $.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, // month
            "d+": this.getDate(), // day
            "h+": this.getHours(), // hour
            "m+": this.getMinutes(), // minute
            "s+": this.getSeconds(), // second
            "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
            "S": this.getMilliseconds()
            // millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
})(jQuery);

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var minute = date.getMinutes();
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + minute
        + seperator2 + date.getSeconds();
    return currentdate;
}

function getDefaultFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var minute = parseInt(date.getMinutes());
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + minute
        + seperator2 + date.getSeconds();
    return currentdate;
}

function isCardNo(card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) == false) {
        alert("身份证输入不合法");
        return true;
    }
}

function jumpTarget(curl, cName, url) {
    var html = '<li><i class="fa fa-home"></i>';
    html += '<a href="index.do">Home</a></li>';
    //html+='<li><a href="javascript:jumpTarget('','+cName+','+curl+')">'+cName+'</a></li>';
    //$("#topli").html(html);
    var tb = $("#loadhtml");
    tb.html(CommnUtil.loadingImg());
    tb.load(url);
}

function showFunctionChild(curl, title) {

    $("#iframepage2", parent.document).attr("src", curl);
    $(".tab2", parent.document).click();
    $("#funTab", parent.document).text(title);
    parent.iFrameHeight();
}

/*
 * 根据日期加多少天后返回日
 */
function getNewDay(dateTemp, days) {
    var dateTemp = dateTemp.split("-");
    var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式    
    var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
    var rDate = new Date(millSeconds);
    var year = rDate.getFullYear();
    var month = rDate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var date = rDate.getDate();
    if (date < 10) date = "0" + date;
    return (year + "-" + month + "-" + date);
}

//毫秒格式化
function formatDateMS(value) {
    var d = new Date(value)
    return d.format('yyyy-MM-dd');
}
function DateFormatMs(value) {
    var d = new Date(value)
    return d.format('yyyy-MM-dd');
}
function formatDateMs(value) {
    return formatDateMS(value)
}
function formatDate(utcCurrTime) {
    utcCurrTime = utcCurrTime + "";
    var date = "";
    var month = new Array();
    month["Jan"] = 1;
    month["Feb"] = 2;
    month["Mar"] = 3;
    month["Apr"] = 4;
    month["May"] = 5;
    month["Jun"] = 6;
    month["Jul"] = 7;
    month["Aug"] = 8;
    month["Sep"] = 9;
    month["Oct"] = 10;
    month["Nov"] = 11;
    month["Dec"] = 12;
    var week = new Array();
    week["Mon"] = "一";
    week["Tue"] = "二";
    week["Wed"] = "三";
    week["Thu"] = "四";
    week["Fri"] = "五";
    week["Sat"] = "六";
    week["Sun"] = "日";

    str = utcCurrTime.split(" ");
    date = str[5] + "-";
    date = date + month[str[1]] + "-" + str[2] + " " + str[3];
    return date;
}


/**
 这是用 js 实现数值的千分位及保存小数方法：
 * 将数值四舍五入后格式化.
 * @param num 数值(Number或者String)
 * @param cent 要保留的小数位(Number)
 * @param isThousand 是否需要千分位 0:不需要,1:需要(数值类型);
 * @return 格式的字符串,如'1,234,567.45'
 * @type String
 */
function formatNumber(num, cent, isThousand) {
    num = num.toString().replace(/\$|\,/g, '');

    // 检查传入数值为数值类型
    if (isNaN(num))
        num = "0";

    // 获取符号(正/负数)
    sign = (num == (num = Math.abs(num)));

    num = Math.floor(num * Math.pow(10, cent) + 0.50000000001);  // 把指定的小数位先转换成整数.多余的小数位四舍五入
    cents = num % Math.pow(10, cent);              // 求出小数位数值
    num = Math.floor(num / Math.pow(10, cent)).toString();   // 求出整数位数值
    cents = cents.toString();               // 把小数位转换成字符串,以便求小数位长度  

    // 补足小数位到指定的位数
    while (cents.length < cent)
        cents = "0" + cents;

    if (isThousand) {
        // 对整数部分进行千分位格式化.
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    }

    if (cent > 0)
        return (((sign) ? '' : '-') + num + '.' + cents);
    else
        return (((sign) ? '' : '-') + num);
}


function searchInfo() {
    var queryParams = $("#searchForm").serializeJson();
    $('#tb').datagrid('options').queryParams = queryParams;
    $("#tb").datagrid('load');
};

function resetSearch() {
    $('input[type!=hidden]').val('');
    $('select').val('');
    $('.Wdate').val('');
    $('.select2').val('0');
    // $('.easyui-combobox').combobox('setValue','');
    searchInfo();
};

//上传excel公共方法
//参数type是具体哪个后台service处理上传的文件
function importExcel(type) {
    pageii = layer.open({
        title: "上传Excel文件",
        type: 2,
        area: ["550px", "240px"],
        content: '../excel/importExcelUI.do?type=' + type
    });
};

//下载模板excel公共方法
//参数modelName是模板的名称
function downloadExcelModel(modelName) {
    $.messager.confirm('提示', '确定要下载价格模板?', function (r) {
        if (r) {
            document.getElementById("frmExcel").action = '../filedownload/download.do?path=' + modelName;
            document.getElementById("frmExcel").submit();
        }
    });
};

/**
 * 导出excel（带进度条）
 * @param exportExcelUrl
 * @param scanTime 检测是否导出完毕请求间隔 单位毫秒
 * @param interval 进度条更新间隔（每次更新进度10%）  单位毫秒  导出时间越长 请设置越大 200 对应2秒导出时间
 */
function exportExcWithprogress(exportExcelUrl, scanTime, interval) {
    $.messager.confirm('确认', '确认要导出Excel数据?', function (r) {
        if (r) {
            if (scanTime < 1000 || scanTime == undefined) {
                scanTime = 1000;
            }
            $.messager.progress({
                title: '导出中,请等待...',
                msg: '正在导出数据...',
                interval: interval
            });
            document.getElementById("searchForm").action = exportExcelUrl;
            document.getElementById("searchForm").submit();
            var timer = setInterval(function () {
                $.ajax({
                    url: "../base/isExport.do",
                    success: function (data) {
                        if (data == 1) {
                            $.messager.progress('close');
                            clearInterval(timer);
                        }
                    },
                    error: function (e) {
                        console.log(e.responseText);
                    }
                });
            }, scanTime);
        }
    })
};

//打开弹出窗口
var pageii = null;
function openLayerWin(title, url, width, height) {
    if (screenWidth > 800) {
        if (title == '添加产品' || title == 'Add Product' || title == '选择物料' || title == 'select material') {
            pageii = layer.open({
                title: title,
                type: 2,
                scrollbar: false,
                area: ["910px", height],
                content: url
            });
        } else {
            if (height == '95%') {
                pageii = layer.open({
                    title: title,
                    type: 2,
                    scrollbar: false,
                    //offset:[0,210],
                    area: ["1000px;", '100%'],
                    content: url
                });
            } else if (height == '340px') {
                pageii = layer.open({
                    title: title,
                    type: 2,
                    scrollbar: false,
                    //offset:[0,210],
                    area: [width, height],
                    content: url
                });
            } else {
                pageii = layer.open({
                    title: title,
                    type: 2,
                    scrollbar: false,
                    area: [width, height],
                    content: url
                });
            }
        }
    } else {
        pageii = layer.open({
            title: title,
            type: 2,
            scrollbar: false,
            area: ["100%", "100%"],
            content: url
        });

    }
};

//打开弹出窗口
var mainpageii = null;
function openMainLayerWin(title, url, width, height) {
    if (screenWidth > 800) {
        if (title == '添加产品' || title == 'Add Product' || title == '选择物料' || title == 'select material') {
            mainpageii = top.layer.open({
                title: title,
                type: 2,
                scrollbar: false,
                area: ["910px", height],
                content: url
            });
        } else {
            if (height == '95%') {
                mainpageii = top.layer.open({
                    title: title,
                    type: 2,
                    scrollbar: false,
                    //offset:[0,210],
                    area: ["1000px;", '100%'],
                    content: url
                });
            } else if (height == '340px') {
                mainpageii = top.layer.open({
                    title: title,
                    type: 2,
                    scrollbar: false,
                    //offset:[0,210],
                    area: [width, height],
                    content: url
                });
            } else {
                mainpageii = top.layer.open({
                    title: title,
                    type: 2,
                    scrollbar: false,
                    area: [width, height],
                    content: url
                });
            }
        }
    } else {
        mainpageii = top.layer.open({
            title: title,
            type: 2,
            scrollbar: false,
            area: ["100%", "100%"],
            content: url
        });

    }
    console.log(mainpageii);

    console.log(top.window['layui-layer-iframe' + mainpageii].window);
};

//业务相关的方法
function closeLayer() {
    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    console.log(index);

    // parent.layer.close(index);

    // if (common_pageii == null) {
    parent.layer.close(index);
    // } else {
    // 	parent.layer.close(common_pageii);
    // }
};

//刷新frame框架的datagrid数据
function refreshFramesDatagrid(name) {
    var ss = parent.frames[name];
    if (ss == undefined || ss == null) {
        console.log("没有找到frame窗口");
    } else {
        ss.$('#tb').datagrid('load');
    }
    closeLayer();

}

// 公共弹出层封装逻辑

// 1. 集成表单验证组件，比如 niceValitor https://validator.niceue.com/
// 2. 集成ajax表单提交组件  https://github.com/jquery-form/form
// 3. 使用 parent.layer.open 形式打开内容
// 4. 在 yes 函数中进行表单验证和提交ajaxSubmit，并暴露 onSuccess 函数出来
// 5. 在 onSuccess函数中进行表格渲染等
// 参数说明 窗口title ，打开这个窗口的url ， 宽度 ，长度 ，弹出窗口提交url ，刷新父窗口的datagrid的方法

function openCommonLayer(title, layerurl, width, height, submiturl, successFun) {
    parent.layer.open({
        title: title,
        type: 2,
        area: [width, height],
        content: layerurl,
        btn: ['提交', '关闭'],
        yes: function (index, layero) {
            var body = parent.layer.getChildFrame('body', index);
            var form = body.contents().find('#form');
            // alert(submiturl);
            $(form).on('valid.form', function () {
                alert(submiturl);
                $(this).ajaxSubmit({
                    url: submiturl,
                    success: function (d) {
                        successFun(d);
                    }
                });
            });
        },
    })
};

//删除左右两端的空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
};

//num传入的数字，n需要的字符长度，js补零方法
function addZoe(num, n) {
    return (Array(n).join(0) + num).slice(-n);
};

//通过ID获得字典表对应name
var dictData = [];
function getDictItemNameByDictId(value, name) {
    var item_name = "";
    $.ajax({
        url: '../dic/findByDicListPage',
        method: "post",
        async: false,
        data: {page: 1, rows: 2000, appSearchType: "(" + name + ")"},
        success: function (data) {
            dictData = data.rows;
            item_name = getDictName(value, name);
            return item_name;
        },
        error: function (data) {
            layer.alert(common_opt_msg.opt_fail_msg);
            return "";
        }
    });
    return item_name;
};

function getDictName(value, name) {
    if ((value + "").indexOf(",") > 0) {
        var strs = value.split(",");
        var ss = ""
        for (var ii = 0; ii < strs.length; ii++) {
            for (var i = 0; i < dictData.length; i++) {
                if (dictData[i].item_value == strs[ii] && dictData[i].dict_type_value == name) {
                    ss = dictData[i].item_name + "," + ss;
                }
            }
        }
        return ss.substring(0, ss.length - 1);
    } else {
        for (var i = 0; i < dictData.length; i++) {
            if (dictData[i].item_value == value && "'" + dictData[i].dict_type_value + "'" == name) {
                return dictData[i].item_name;
            }
        }
    }
    return value;
};

function init_select2_dict(params) {
    var url = params.url;
    var field = params.field;

    $.each(params.data, function (index, item) {
        var result = _findDictData(url, field, item.field_value);
        var value = $(item.dom).data('value');

        $(item.dom).select2({
            data: result,
            placeholder: '请选择',//默认文字提示
            language: 'zh-CN',//汉化
            allowClear: true,//允许清空
            width: '100%'
        });

        $(item.dom).select2().val(value).trigger("change");
    });

};

// 获取下拉框值，取字典
function init_select_dict(params) {
    var url = params.url;
    var field = params.field;

    $.each(params.data, function (index, item) {
        var result = _findDictData(url, field, item.field_value);
        var value = $(item.dom).data('value');
        var html = '';
        for (var i in result) {
            if (value == result[i].id) {
                html += '<option selected value="' + result[i].id + '">' + result[i].text + '</option>';
            } else {
                html += '<option value="' + result[i].id + '">' + result[i].text + '</option>';
            }
        }
        $(item.dom).append(html);
    });
}

function _findDictData(url, field, field_value) {
    var result = [];
    var jsonStr = '{ "' + field + '": "' + field_value + '" }';
    $.ajax({
        type: 'POST',
        url: url,
        async: false,
        data: eval('(' + jsonStr + ')'),
        success: function (data) {
            $.each(data, function (index, item) {
                var obj = {};
                obj.id = item.id;
                obj.text = item.dictName;
                result.push(obj);
            });
        }
    });
    return result;
}


// 初始combobox下拉框，数据从字典中获取 params=[{domId:'**',dictType:'**',prompt:'**'}]
function init_combobox_dict(params) {
    for(var i in params){
        $('#'+params[i].domId).combobox({
            url: g.ctx + 'sys/dirRest/entry/getDic?value='+params[i].dictType,
            valueField : 'id',
            textField : 'dictName',
            panelHeight : 'auto',
            prompt : params[i].prompt,
            editable: false
        });
    }
}


function look_file(file_name, url) {
    var type = url.substring((url.lastIndexOf(".") + 1), url.length);

    if (type == 'jpg' || type == 'png' || type == 'psd') {
        var url = '/static/' + url;
        var array = [];
        array.push(url);
        lookPicture(array);
    } else if (type == 'pdf') {
        playVideo('/static/' + url, file_name);
    } else {
        var a = document.createElement('a');
        a.href = g.ctx + 'static/' + url;
        a.download = file_name;
        a.click();
    }
}

function playVideo(url, title) {
    var index = layer.open({
        type: 2,
        title: title,
        area: ['300px', '220px'],
        maxmin: true,
        content: url
    });

    layer.full(index);
}

function lookPicture(img_src) {
    var data = [];
    $.each(img_src, function (index, item) {
        var obj = {};
        obj.alt = "";
        obj.pid = 1;
        obj.src = item;
        obj.thumb = '';

        data.push(obj)
    });
    var json = {
        "title": "", //相册标题
        "id": 1, //相册id
        "start": 0, //初始显示的图片序号，默认0
        "data": data  //相册包含的图片，数组格式
    };
    layer.photos({
        photos: json
        , anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机
    });
};

/**
 * 数据导入
 * @param url 执行导入的Controller地址
 * @param tem_type 导出的模板类型 0-检验特性 1-检验计划 2-疵点管理 6.网版管理 7.颜色管理 8.花型管理 9.维护地点
 * @param table 表格对象
 */
function importExcelData(url, tem_type, table) {
    parent.layer.open({
        title: '数据导入',
        type: 2,
        area: ["670px", "500px"],
        content: g.ctx + 'quality/main/feature/import/excel/file',
        moveType: 1,
        shade: 0.01,
        shadeClose: true,
        success: function (layero, index) {
            var iframeWin = parent.window[layero.find('iframe')[0]['name']];
            var $body = iframeWin.window.$('body');
            $body.find('#url').val(url);
            $body.find('#tem_type').val(tem_type);
        },
        end: function () {
            table.datagrid('load');
        }
    });
}

/**
 * 导出数据
 * @param ids 需要导出的数据id
 * @param url 导出url
 */
function exportData(ids, url) {
    var message = '';
    if (ids.length == 0) {
        message = '您确定导出所有数据吗？';
    } else {
        message = '您确定导出所选的数据吗？';
    }
    parent.layer.confirm(message, {icon: 3, title: '温馨提示'}, function (idx) {
        parent.layer.close(idx);
        var a = document.createElement("a");
        a.href = url;
        a.download = "network error.xls"; // 必须，不能缺少
        a.click();
    });

}

/**
 * 生成条码
 * @param type 条码类型
 * @param len 条码长度
 * @param prefix 条码前缀
 */
function genBarcode(type,len,prefix) {
    var rm = Math.floor(Math.random()*1000);
    return prefix + ' 9966 '+rm+' 962464';
}


var FORM = (function () {

    var _formInitValidate = function ($form, handlerSubmit) {
        var validobj = $form.validate({
            debug: false,
            ignore: [],
            onkeyup: false,
            errorClass: 'myErrorClass',
            errorElement: 'em',
            errorPlacement: function (error, element) {
                if (element.is(':radio') || element.is(':checkbox')) {
                    element.closest('.option-group').after(error);
                } else if (element.is('select') && $(element).hasClass('select2-hidden-accessible')) {
                    $(element.parent()).append(error);
                } else {
                    //put error message behind each form element
                    error.insertAfter(element);
                }
            },
            // When there is an error normally you just add the class to the element.
            // But in the case of select2s you must add it to a UL to make it visible.
            // The select element, which would otherwise get the class, is hidden from view.
            highlight: function (element, errorClass, validClass) {
                var elem = $(element);
                if (elem.hasClass('select2-hidden-accessible')) {
                    // TODO
                } else {
                    elem.addClass(errorClass);
                }
            },
            //When removing make the same adjustments as when adding
            unhighlight: function (element, errorClass, validClass) {
                var elem = $(element);
                if (elem.hasClass('select2-hidden-accessible')) {
                    // TODO
                } else {
                    elem.removeClass(errorClass);
                }
            },
            submitHandler: handlerSubmit
        });
    };

    return {
        initValidate: function (formId, submitHandler) {
            var $form = $(formId);
            if ($form) {
                _formInitValidate($form, submitHandler)
            }
        }
    }
}());

/**
 * 扩展combox验证，easyui原始只验证select text的值，不支持value验证
 */
$.extend($.fn.validatebox.defaults.rules, {
    selectValueRequired: {
        validator: function (value, param) {
            return $(param[0]).find("option:contains('" + value + "')").val() != '';
        },
        message: '该输入项为必输项'
    }
});

/**
 * 重新封装easyui-combogrid插件，过滤时限制只能选择现有项
 * 参考：http://blog.csdn.net/apollokk/article/details/44810401
 * @type {{init}}
 */
var ComboGrid = (function () {

    var _combogrid = function ($selectId, options) {

        var artChanged;
        var selectRow;

        options = $.extend(true, {
            onChange: function (newValue, oldValue) {
                artChanged = true;//记录是否有改变（当手动输入时发生)
            },
            onHidePanel: function () {
                if (artChanged) {
                    if (selectRow == null) { //没有选择或者选项不相等时清除内容
                        $(this).combogrid('setValue', '');
                    }
                }
                artChanged = false;
                selectRow = null;
            },
            onShowPanel: function () {
            },
            onSelect: function (index, row) {
                selectRow = row;
            }
        }, options);

        $selectId.combogrid(options);
    };

    return {
        init: function (selectId, options) {
            var $selectId = $(selectId);
            if ($selectId) {
                _combogrid($selectId, options);
            }
        }
    }

}());

// 字典下拉数据
$(function () {
    var dic = $('[data-dic]');
    $.each(dic, function (index, item) {
        $(this).combobox({
            url: g.ctx + 'sys/dirRest/entry/getDic',
            queryParams: {
                value: $(this).data('dic')
            },
            valueField: 'id',
            textField: 'dictName'
        });
    });
});

// base64加密开始
var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"
    + "wxyz0123456789+/" + "=";
function encode64(input) {

    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
            + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output;
}
// base64加密结束

// loading
var MaskUtil = (function () {

    var $mask, $maskMsg;

    var defMsg = '正在处理，请稍待。。。';

    function init() {
        if (!$mask) {
            $mask = $("<div class=\"datagrid-mask mymask\"></div>").appendTo("body");
        }
        if (!$maskMsg) {
            $maskMsg = $("<div class=\"datagrid-mask-msg mymask\">" + defMsg + "</div>")
                .appendTo("body").css({'font-size': '12px'});
        }

        $mask.css({width: "100%", height: $(document).height()});

        $maskMsg.css({
            left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2,
        });

    }

    return {
        mask: function (msg) {
            init();
            $mask.show();
            $maskMsg.html(msg || defMsg).show();
        }
        , unmask: function () {
            $mask.hide();
            $maskMsg.hide();
        }
    }

}());


