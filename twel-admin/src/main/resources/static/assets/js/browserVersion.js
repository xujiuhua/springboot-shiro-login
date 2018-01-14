

var browserVersion = (function () {
    var minimum = {
        "msie": 9.0,
        "ie": 9.0
    };
    var pick = function (o, keys) {
        for (var i = 0; i < keys.length; i++) {
            if (o[keys[i]]) {
                return keys[i]
            }
        }
        return 'Unknown'
    };
    var userAgent = navigator.userAgent;
    return {
        getBrowserInfo: getBrowserInfo,
        checkBrowserIsAccord: function () {
            var browserInfo = getBrowserInfo();
            var browser = minimum[browserInfo.name];
            return (!(browser && browserInfo.version < browser));
        }
    };
    
    function getBrowserInfo() {
        userAgent = userAgent.toLocaleLowerCase();
        var browser = {
            chrome: /chrome/.test(userAgent),
            safari: (/webkit/.test(userAgent) && !/chrome/.test(userAgent)),
            opera: /opera/.test(userAgent),
            firefox: /firefox/.test(userAgent),
            msie: (/msie/.test(userAgent) && !/opera/.test(userAgent)),
            qqbrowser: /qqbrowser/.test(userAgent),
            ucbrowser: (/UCBrowser/i.test(userAgent) && !/UCWEB/i.test(userAgent)), // 非极速模式
            ucweb: /UCWEB/i.test(userAgent), // 极速模式UC
            wechart: /wechart|MicroMessenger/i.test(userAgent), // 微信自带浏览器
            // spec browser
            bolt: /bolt/.test(userAgent),
            doris: /doris/.test(userAgent),
            fennec: /fennec/.test(userAgent),
            gobrowser: /gobrowser/.test(userAgent),
            iris: /iris/.test(userAgent),
            minimo: /minimo/.test(userAgent),

            // browser core
            mozilla: (/mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)),
            webkit: /webkit/.test(userAgent),

            gecko: /[^like]{4} gecko/.test(userAgent),
            presto: /presto/.test(userAgent),

            xoom: /xoom/.test(userAgent)
        };
        var info = {};
        info.name = pick(browser, ['chrome', 'safari', 'opera', 'firefox', 'msie', 'qqbrowser', 'ucbrowser', 'ucweb', 'wechart']);
        info.core = pick(browser, ['mozilla', 'webkit', 'gecko', 'presto', 'xoom']);
        info.version = (userAgent.match(/.+(?:rv|it|ra|ie|me|ve)[\/: ]([\d.]+)/) || [])[1];
        return info;
    }
})();
