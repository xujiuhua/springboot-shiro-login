
/**
 * 物料组选择器
 * @author jiuhua.xu
 * @version 1.0
 */
var MaterialGroupDialog = function () {
    var self = this;
    /**
     * 默认配置
     */
    var default_options = {
        // 多选配置
        multiple: true,
        choices: []
    };

    var materialGroupChoiceTree;

    var tree_setting = {
        check: {
            chkboxType: {"Y": "", "N": ""},
            enable: true //单选
        },
        view: {
            showLine: true
        },
        dataLoad: function (materialGroupDataRes) {
            // 重新对获取的数据进行选中处理
            var choices = self.options.choices;
            if (choices && choices.length > 0
                && materialGroupDataRes && materialGroupDataRes.length > 0) {
                var datas = [];
                var len = materialGroupDataRes.length;
                for (var i = 0; i < len; i++) {
                    var dataRes = materialGroupDataRes[i];
                    $.each(choices, function (coi, choiceData) {
                        if (dataRes.id == '00' + choiceData.id) {
                            dataRes.checked = true;
                            dataRes.open = true;
                        }
                    });
                    datas.push(dataRes);
                }
                return datas;
            }
            return materialGroupDataRes;
        },
        callback: {}
    };

    var _initTree = function ($treeDom) {

        if (!self.options.multiple) {
            tree_setting.check.chkStyle = 'radio';
        }

        materialGroupChoiceTree = $treeDom.initZtree({
            service: g.ctx + 'tree/rest/materialGroup'
        }, tree_setting);
    };

    var _openDialog = function () {
        var callbackFunc = self.options.callback;

        parent.layer.open({
            type: 1,
            isOutAnim: false,
            shade: 0.3,
            closeBtn: false,
            area: ['250px', '400px'],
            title: '愉悦家纺',
            content: '<ul class="ztree br-a" id="choice_dialog_material_group" style="height:300px;overflow:auto;"></ul>',
            success: function (layero, index) {

                var treeDom = parent.$(layero).find('#choice_dialog_material_group');

                _initTree(treeDom);
            },
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                var nodes = materialGroupChoiceTree.getCheckedNodes(true);

                var chooseDatas = [];

                $.each(nodes, function (i, node) {
                    chooseDatas.push(node.data);
                });

                callbackFunc && callbackFunc(chooseDatas);
                parent.layer.close(index);
            }
        });
    };

    return {
        open: function (options) {
            self.options = $.extend({}, default_options, options);
            _openDialog();
        }
    }
};

/**
 * 工作场地组选择器
 * @author jiuhua.xu
 * @version 1.0
 */
var WorkplaceGroupDialog = function () {
    var self = this;
    /**
     * 默认配置
     */
    var default_options = {
        // 多选配置
        multiple: true,
        choices: []
    };

    var workplaceGroupChoiceTree;

    var tree_setting = {
        check: {
            chkboxType: {"Y": "", "N": ""},
            enable: true //单选
        },
        view: {
            showLine: true
        },
        dataLoad: function (allDataRes) {
            // 重新对获取的数据进行选中处理
            var choices = self.options.choices;
            if (choices && choices.length > 0
                && allDataRes && allDataRes.length > 0) {
                var datas = [];
                var len = allDataRes.length;
                for (var i = 0; i < len; i++) {
                    var dataRes = allDataRes[i];
                    $.each(choices, function (coi, choiceData) {
                        if (dataRes.id == choiceData.id) {
                            dataRes.checked = true;
                            dataRes.open = true;
                        }
                    });
                    datas.push(dataRes);
                }
                return datas;
            }
            return allDataRes;
        },
        callback: {}
    };

    var _initTree = function ($treeDom) {

        if (!self.options.multiple) {
            tree_setting.check.chkStyle = 'radio';
            tree_setting.check.radioType = 'all';
        }

        workplaceGroupChoiceTree = $treeDom.initZtree({
            service: g.ctx + 'quality/main/rest/workPlace/tree'
        }, tree_setting);
    };

    var _openDialog = function () {
        var callbackFunc = self.options.callback;

        parent.layer.open({
            type: 1,
            isOutAnim: false,
            shade: 0.3,
            closeBtn: false,
            area: ['250px', '400px'],
            title: '愉悦家纺',
            content: '<ul class="ztree br-a" id="choice_dialog_workplace_group" style="height:300px;overflow:auto;"></ul>',
            success: function (layero, index) {

                var treeDom = parent.$(layero).find('#choice_dialog_workplace_group');

                _initTree(treeDom);
            },
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                var nodes = workplaceGroupChoiceTree.getCheckedNodes(true);

                var chooseDatas = [];

                $.each(nodes, function (i, node) {
                    chooseDatas.push(node.data);
                });

                callbackFunc && callbackFunc(chooseDatas);
                parent.layer.close(index);
            }
        });
    };

    return {
        open: function (options) {
            self.options = $.extend({}, default_options, options);
            _openDialog();
        }
    }
};

var InspectTypeDialog = function () {
    var self = this;
    /**
     * 默认配置
     */
    var default_options = {
        // 多选配置
        multiple: true,
        choices: []
    };

    var inspectTypeChoiceTree;

    var tree_setting = {
        check: {
            chkboxType: {"Y": "", "N": ""},
            enable: true //单选
        },
        view: {
            showLine: true
        },
        dataLoad: function (allDataRes) {
            // 重新对获取的数据进行选中处理
            var choices = self.options.choices;
            if (choices && choices.length > 0
                && allDataRes && allDataRes.length > 0) {
                var datas = [];
                var len = allDataRes.length;
                for (var i = 0; i < len; i++) {
                    var dataRes = allDataRes[i];
                    $.each(choices, function (coi, choiceData) {
                        if (dataRes.id == '00' + choiceData.id) {
                            dataRes.checked = true;
                            dataRes.open = true;
                        }
                    });
                    datas.push(dataRes);
                }
                return datas;
            }
            return allDataRes;
        },
        callback: {}
    };

    var _initTree = function ($treeDom) {

        if (!self.options.multiple) {
            tree_setting.check.chkStyle = 'radio';
            tree_setting.check.radioType = 'all';
        }

        inspectTypeChoiceTree = $treeDom.initZtree({
            service: g.ctx + 'tree/rest/inspectType'
        }, tree_setting);
    };

    var _openDialog = function () {
        var callbackFunc = self.options.callback;

        parent.layer.open({
            type: 1,
            isOutAnim: false,
            shade: 0.3,
            closeBtn: false,
            area: ['250px', '400px'],
            title: '愉悦家纺',
            content: '<ul class="ztree br-a" id="choice_dialog_inspect_type" style="height:300px;overflow:auto;"></ul>',
            success: function (layero, index) {

                var treeDom = parent.$(layero).find('#choice_dialog_inspect_type');

                _initTree(treeDom);
            },
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                var nodes = inspectTypeChoiceTree.getCheckedNodes(true);

                var chooseDatas = [];

                $.each(nodes, function (i, node) {
                    chooseDatas.push(node.data);
                });

                callbackFunc && callbackFunc(chooseDatas);
                parent.layer.close(index);
            }
        });
    };

    return {
        open: function (options) {
            self.options = $.extend({}, default_options, options);
            _openDialog();
        }
    }
};