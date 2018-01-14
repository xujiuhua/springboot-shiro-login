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
 @url:官网API http://www.ztree.me/v3/main.php
 @example
 //ajax请求配置
 var configs={
			 //async : false, // 不使用异步树，默认你需要一次加载所有的树，如果async:fasle不需要配置beforeExpand传参数到后台
			 service: 'url', //url
			 params : {id : '1' , name:'zhangsan' }//请求参数
		}

 //ztree原生配置(查询下级需要监听 beforeExpand 方法)
 var settings ={
			check:{
				enable:true	//是否多选
			},
			view:{
				showLine:false	//是否显示连接线
			},
			callback :{
				//点击展开之前，重新复制查询条件
				beforeExpand : function(treeId,treeNode){
					//1.改变请求参数
					 configs={
						 service: 'url', //url
						 params : {id : treeNode.id , name : treeNode.name }//请求参数
					 }

					//or 2.改变请求参数
					configs.params = {id : treeNode.id , name:treeNode.name }
					ztree.setting.setParams(configs);//重新赋值
				}
			}
		}

 //实例化ztree
 var ztree=$('#id').initZtree(configs,settings);

 //******************************获取值参考**************************************
 //获取提供的JS方法 --单选值获取
 //console.log(ztree.setting.getValue());


 //单选
 //var obj=ztree.getSelectedNodes();
 //console.log(obj[0]);

 //多选
 //var objAll=ztree.getChangeCheckedNodes();

 //for(var i=0;i<objAll.length;i++){
		//	console.log(objAll[i]);
		//}

 */
(function ($) {

    $.fn.extend($.fn, {
        initZtree: function (configs, options) {

            //初始化参数
            var defaults = {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: 'id',//主键
                        pIdKey: 'pid',//上级id
                        rootPId: 0 //表示是根节点
                    }
                }
            };

            //得到最新配置信息
            var opts = $.extend(true, defaults, options || {});
            //console.log(opts);
            //id
            var ztreeId = $(this).attr("id");
            if (!ztreeId) {
                throw new Error('初始化tree失败,未发现tree ID!');
            }

            //异步
            var isAsync = true;
            if (configs.async !== undefined)
                isAsync = configs.async;

            //数据
            var zNodes = [];

            //记录单击的值
            var clickValue;

            //function
            /**
             展开方法
             */
            opts.onExpand = function (event, treeId, treeNode) {
                // console.log('展开');
                //console.log(configs.service);
                //console.log(configs.params);
                if (!treeNode.children && isAsync) {
                    var tree = opts.getTree();
                    opts.queryTree(configs);
                    tree.addNodes(treeNode, zNodes, true);//追加节点
                }
            };
            /**
             * 点击方法, 如果外部设置了  onClick 事件， 则不会出发此函数
             * @param e 点击事件
             * @param treeId 树ID
             * @param treeNode 点击的节点
             */
            opts.onClick = function (e, treeId, treeNode) {
                clickValue = treeNode;
            };
            /**
             * 获取Ztree对象
             * @returns {*} ztree
             */
            opts.getTree = function () {
                return $.fn.zTree.getZTreeObj(ztreeId);
            };
            /**
             * 获取单击的值 如果存在外部 opts 设置了 callback 的点击事件，则无法调用此函数来获取当前的值
             * @returns {*} 当前选择的值
             */
            opts.getValue = function () {
                return clickValue;
            };
            /**
             * 重新赋值
             * @param param 新的设置参数
             */
            opts.setParams = function (param) {
                configs.service = param.service || configs.service;
                configs.params = param.params || configs.params;
            };

            /**
             ajax请求加载数据
             */
            opts.queryTree = function (configs) {
                zNodes = [];
                //请求
                $.ajax({
                    url: configs.service,
                    data: configs.params,
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var result = data;
                        if (typeof data === "string") {//not obj
                            result = $.parseJSON(data);
                        }
                        if(opts.dataLoad){
                           var changeData =  opts.dataLoad(result);
                            opts.getTree().addNodes(null, 0, changeData);
                            zNodes = changeData;
                        } else {
                            opts.getTree().addNodes(null, 0, result);
                            zNodes = result;
                        }
                        opts.dataRead&&opts.dataRead();
                    },
                    error: function () {
                        layer.msg('加载树失败,请重试!');
                    }
                });

            };
            //function end

            if (!opts.callback) {
                //展开
                opts.callback.onExpand = opts.onExpand;
                //点击
                opts.callback.onClick = opts.onClick;
            }

            //console.log(opts.callback);

            //获取ztree数据
            opts.queryTree(configs);

            //实例化ztree
            return $.fn.zTree.init($(this), opts, zNodes);

        }
    });

})(jQuery);