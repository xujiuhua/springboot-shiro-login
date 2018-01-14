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

var Form = (function () {
    var _formInitValidate = function ($form, handlerSubmit) {
        $form.validate({
            errorClass: 'state-error',
            validClass: 'state-success',
            errorElement: 'em',

            highlight: function (element, errorClass, validClass) {
                $(element).closest('.field').addClass(errorClass).removeClass(validClass)
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).closest('.field').removeClass(errorClass).addClass(validClass)
            },
            errorPlacement: function (error, element) {
                if (element.is(':radio') || element.is(':checkbox')) {
                    element.closest('.option-group').after(error)
                } else {
                    error.insertAfter(element.parent())
                }
            },

            // 回调处理 submitHandler
            submitHandler: handlerSubmit

        })
    };

    var _renderSleect2 = function ($select) {
        var selectOptions = $select.data();
        var _options = {language: 'zh-CN'};
        var selOpt = $.extend({}, selectOptions, _options);
        $select.select2(selOpt)
    };

    var runFormElements = function ($dom) {
        var Tooltips = $dom.find('[data-toggle=tooltip]');
        if (Tooltips.length) {
            if (Tooltips.parents('#sidebar_left')) {
                Tooltips.tooltip({
                    container: $('body'),
                    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                })
            } else {
                Tooltips.tooltip()
            }
        }

        var Popovers = $dom.find('[data-toggle=popover]');
        if (Popovers.length) {
            Popovers.popover()
        }

        $dom.find('.dropdown-menu.dropdown-persist').on('click', function (e) {
            e.stopPropagation()
        });

        $dom.find('.dropdown-menu .nav-tabs li a').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).tab('show')
        });

        $dom.find('.dropdown-menu .btn-group-nav a').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            $(this).siblings('a').removeClass('active').end().addClass('active').tab('show')
        });

        var $btn = $dom.find('.btn-states');
        if ($btn.length) {
            $btn.on('click', function () {
                $(this).addClass('active').siblings().removeClass('active')
            })
        }

        var panelScroller = $dom.find('.panel-scroller');
        if (panelScroller.length) {
            panelScroller.each(function (i, e) {
                var This = $(e);
                var Delay = This.data('scroller-delay');
                var Margin = 5;

                if (This.hasClass('scroller-thick')) {
                    Margin = 0
                }

                var DropMenuParent = This.parents('.dropdown-menu');
                if (DropMenuParent.length) {
                    DropMenuParent.prev('.dropdown-toggle').on('click', function () {
                        setTimeout(function () {
                            This.scroller();
                            $('.navbar').scrollLock('on', 'div')
                        }, 50)
                    });
                    return
                }

                if (Delay) {
                    setTimeout(function () {
                        This.scroller({trackMargin: Margin});
                        $('#content').scrollLock('on', 'div')
                    }, Delay)
                } else {
                    This.scroller({trackMargin: Margin});
                    $('#content').scrollLock('on', 'div')
                }
            })
        }

        var SmoothScroll = $dom.find('[data-smoothscroll]');
        if (SmoothScroll.length) {
            SmoothScroll.each(function (i, e) {
                var This = $(e);
                var Offset = This.data('smoothscroll');
                var Links = This.find('a');

                Links.smoothScroll({
                    offset: Offset
                })
            })
        }

        // 下拉选择
        var selectComp = $dom.find('[data-toggle="select2"]');
        if (selectComp && selectComp.length > 0) {
            selectComp.each(function (i, sel) {
                var $select = $(sel);
                _renderSleect2($select)
            })
        }
        // 数字选择
        var $spinnerCmp = $dom.find('[data-toggle="spinner"]');
        if ($spinnerCmp && $spinnerCmp.length > 0) {
            $spinnerCmp.each(function (i, spin) {
                var $spin = $(spin);
                var thisOptions = $spin.data();
                var _options = {language: 'zh-CN', step: 1, max: 9999999};
                var selOpt = $.extend({}, thisOptions, _options);
                $spin.spinner(selOpt)
            })
        }
    };

    return {
        initValidate: function (formId, submitHandler) {
            var $form = $(formId);
            if ($form) {
                _formInitValidate($form, submitHandler)
            }
        },
        renderElements: function ($dom) {
            runFormElements($dom)
        },
        renderSelect2: function ($select) {
            if ($select) {
                _renderSleect2($select)
            }
        }

    }
}());
var Core = (function () {
    var Body = $('body');
    var Navbar = $('.navbar');
    var Topbar = $('#topbar');
    var $sbTopBody = $('body.sb-top');
    var sidebarTop = $sbTopBody.length ? $sbTopBody.length : 0;

    var navbarH = 0;
    var topbarH = 0;

    // Primary Component Heights
    if (Navbar.is(':visible') && !Navbar.hasClass('navbar-fixed-top')) {
        navbarH = Navbar.height()
    }
    if (Topbar.is(':visible')) {
        topbarH = Topbar.height()
    }

    var _setup = function () {
        // Equalize Content Heights
        equalizeHeights()
    };

    var _resizeHandlers = function () {
        $(window).resize(function () {
            resizeMethods.sidebars();
            equalizeHeights();
        });

    };

    var resizeMethods = {

        sidebars: function () {
            if ($('body.sb-top').length) {
                if ($(window).width() < 900 && !Body.hasClass('sb-top-mobile')) {
                    Body.addClass('sb-top-mobile')
                } else if ($(window).width() > 900) {
                    Body.removeClass('sb-top-mobile')
                }
                return
            }
            if ($(window).width() < 1080 && !Body.hasClass('mobile-view')) {
                Body.removeClass('sb-r-o').addClass('mobile-view sb-l-m sb-r-c sb-l-disable-animation')
            } else if ($(window).width() > 1080) {
                Body.removeClass('mobile-view sb-l-disable-animation')
            }
        }

    };

    var equalizeHeights = function () {
        var $body = $('body');
        $body.height('inherit');
        var bodyH = $body.height();
        var sidebarH = $('#sidebar_left').height();
        var contentH = $('#content_wrapper').outerHeight();
        var cHeight = contentH;

        if (sidebarH > contentH) {
            cHeight = sidebarH
        }
        if (cHeight < bodyH) {
            cHeight = bodyH
        }
        setTimeout(function () { Body.css('height', cHeight) }, 300)
    };

    // SideMenu Functions
    var runSideMenu = function (options) {
        if (!$('body.sb-l-o').length && !$('body.sb-l-m').length && !$('body.sb-l-c').length) {
            Body.addClass(options.sbl)
        }
        if (!$('body.sb-r-o').length && !$('body.sb-r-c').length) {
            Body.addClass(options.sbr)
        }

        if (sidebarTop) {
            Body.removeClass('sb-l-c sb-l-m sb-l-o sb-r-c sb-r-o mobile-view')
        }

        if (sidebarTop && $(window).width() < 900) {
            Body.removeClass('sb-r-o').addClass('mobile-view sb-l-m sb-r-c')
        } else if ($(window).width() < 1080) {
            Body.addClass('sb-top-mobile').removeClass('sb-top-collapsed')
        }

        var $nanoAffix = $('.nano.affix');
        if ($nanoAffix.length) {
            $nanoAffix.nanoScroller({
                preventPageScrolling: true
            })
        }

        var sidebarLeftToggle = function () {
            // If sidebar is set to Horizontal we return
            if ($('body.sb-top').length) {
                return
            }

            if (Body.hasClass('sb-l-c') && options.collapse === 'sb-l-m') {
                Body.removeClass('sb-l-c')
            }

            Body.toggleClass(options.collapse).removeClass('sb-r-o').addClass('sb-r-c');

            $(document).trigger('ad.sbl.toggle')
        };

        var sidebarMiniToggle = function (e) {
            e.preventDefault();
            if ($('body.sb-top').length) {
                return
            }
            Body.addClass('sb-l-c');

            if (!Body.hasClass('mobile-view')) {
                setTimeout(function () {
                    Body.toggleClass('sb-l-m sb-l-o')
                }, 300)
            }
            $(document).trigger('ad.sbc.toggle')
        };

        var sidebarAuthorToggle = function (e) {
            e.preventDefault();
            if ($('body.sb-top').length) {
                return
            }
            var authorWidget = $('#sidebar_left').find('.author-widget');
            if (authorWidget.is(':visible')) {
                authorWidget.toggleClass('menu-widget-open')
            }
            $('.menu-widget').toggleClass('menu-widget-open').slideToggle('fast');

            $(document).trigger('ad.sbauthor.toggle')
        };

        $('#toggle_sidemenu_l').on('click', sidebarLeftToggle);
        $('.sidebar-toggle-mini').on('click', sidebarMiniToggle);
        $('.sidebar-menu-toggle').on('click', sidebarAuthorToggle);

        $('.sidebar-menu li a.accordion-toggle').on('click', function (e) {
            e.preventDefault();

            if ($('body').hasClass('sb-l-m') && !$(this).parents('ul.sub-nav').length) {
                return
            }

            if (!$(this).parents('ul.sub-nav').length) {
                if ($(window).width() > 900) {
                    if ($('body.sb-top').length) {
                        return
                    }
                }

                $('a.accordion-toggle.menu-open').next('ul').slideUp('fast', 'swing', function () {
                    $(this).attr('style', '').prev().removeClass('menu-open')
                })
            } else {
                var activeMenu = $(this).next('ul.sub-nav');
                var siblingMenu = $(this).parent().siblings('li')
                    .children('a.accordion-toggle.menu-open').next('ul.sub-nav');

                activeMenu.slideUp('fast', 'swing', function () {
                    $(this).attr('style', '').prev().removeClass('menu-open')
                });
                siblingMenu.slideUp('fast', 'swing', function () {
                    $(this).attr('style', '').prev().removeClass('menu-open')
                })
            }

            if (!$(this).hasClass('menu-open')) {
                $(this).next('ul').slideToggle('fast', 'swing', function () {
                    $(this).attr('style', '').prev().toggleClass('menu-open')
                })
            }

            $(document).trigger('ad.sbmenu.toggle')
        })
    };

    var runHeader = function () {
        $('.navbar-search').on('click', function (e) {
            // alert('hi')
            var This = $(this);
            var searchForm = This.find('input');
            var searchRemove = This.find('.search-remove');

            if ($('body.mobile-view').length || $('body.sb-top-mobile').length) {
                // Open search bar and add closing icon if one isn't found
                This.addClass('search-open');
                if (!searchRemove.length) {
                    This.append('<div class="search-remove"></div>')
                }

                // Fadein remove btn and focus search input on animation complete
                setTimeout(function () {
                    This.find('.search-remove').fadeIn();
                    searchForm.focus().one('keydown', function () {
                        $(this).val('')
                    })
                }, 250);

                // If remove icon clicked close search bar
                if ($(e.target).attr('class') === 'search-remove') {
                    This.removeClass('search-open').find('.search-remove').remove()
                }
            }
        });

        $('.dropdown-menu').on('click', function (e) {
            e.stopPropagation();
            var Target = $(e.target);
            var TargetGroup = Target.parents('.btn-group');
            var SiblingGroup = Target.parents('.dropdown-menu').find('.btn-group');

            // closes all open multiselect menus. Creates Toggle like functionality
            if (Target.hasClass('multiselect') || Target.parent().hasClass('multiselect')) {
                SiblingGroup.removeClass('open');
                TargetGroup.addClass('open')
            } else {
                SiblingGroup.removeClass('open')
            }
        });

        // Sliding Topbar Metro Menu
        var menu = $('#topbar-dropmenu');
        var items = menu.find('.metro-tile');
        var metroBG = $('.metro-modal');

        // Toggle menu and active class on icon click
        $('.topbar-menu-toggle').on('click', function () {
            // If dropmenu is using alternate style we don't show modal
            if (menu.hasClass('alt')) {
                // Toggle menu and active class on icon click
                menu.slideToggle(230).toggleClass('topbar-menu-open');
                metroBG.fadeIn()
            } else {
                menu.slideToggle(230).toggleClass('topbar-menu-open');
                $(items).addClass('animated animated-short fadeInDown').css('opacity', 1);

                // Create Modal for hover effect
                if (!metroBG.length) {
                    metroBG = $('<div class="metro-modal"></div>').appendTo('body')
                }
                setTimeout(function () {
                    metroBG.fadeIn()
                }, 380)
            }
        });

        // If modal is clicked close menu
        $('body').on('click', '.metro-modal', function () {
            metroBG.fadeOut('fast');
            setTimeout(function () {
                menu.slideToggle(150).toggleClass('topbar-menu-open')
            }, 250)
        })
    };

    // Update Variables Helper Function
    var _refreshVariables = function () {
        Body = $('body');
        Navbar = $('.navbar');
        Topbar = $('#topbar');
        var $bodySbTop = $('body.sb-top');
        sidebarTop = $bodySbTop.length ? $bodySbTop.length : 0;

        navbarH = 0;
        topbarH = 0;
        if (Navbar.is(':visible') && !Navbar.hasClass('navbar-fixed-top')) {
            navbarH = Navbar.height()
        }
        if (Topbar.is(':visible')) {
            topbarH = Topbar.height()
        }
    };

    return {
        init: function (options) {
            // Set Default Options
            var defaults = {
                sbl: 'sb-l-o', // sidebar left open onload
                sbr: 'sb-r-c', // sidebar right closed onload
                sbState: 'save', // Enable localstorage for sidebar states

                collapse: 'sb-l-m', // sidebar left collapse style
                siblingRope: true
                // Setting this true will reopen the left sidebar
                // when the right sidebar is closed
            };

            // Extend Default Options.
            var _options = $.extend({}, defaults, options);

            // This is a redundant on .ready incase the script was moved to
            // the header or was stripped of its original ready function
            $(function () {
                // Run Setup and Helper Utilities
                _refreshVariables();
                _resizeHandlers();
                _setup();
                // Run Core Functions
                runHeader();
                runSideMenu(_options);
                Form.renderElements($('body'));

                // 处理菜单选中
                var menu = $('#content').data('menu');
                if (menu) {
                    $('li#' + menu).addClass('active')
                }
            })
        },
        refreshVariables: _refreshVariables

    }
}());

(function(undefined) {
    'use strict';

    var registerIfCondHelper = function(hbs) {
        hbs.registerHelper('ifCond', function(v1, operator, v2, options) {
            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        });

        hbs.registerHelper('ctx', function(v1, operator){
            return g.ctx + v1;
        })
    };

    this.Handlebars && registerIfCondHelper(this.Handlebars);
}).call(this);
