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
 * @author jiuhua.xu
 * @version 1.0
 */
'use strict';

var Datatables2 = function () {

    var tableOptions; // main options
    var dataTable; // datatable object
    var table; // actual table jquery object
    var tableInitialized = false;
    var ajaxParams = {}; // set filter mode
    var self;

    return {
        init: function (options) {
            self = this;
            options = $.extend(true, {
                src: "", // actual table
                loadingMessage: '加载中...',
                dataTable: {
                    dom: 'rt<"bottom"ip>',
                    searching: false,
                    serverSide: true,
                    ajax: {
                        url: '',
                        type: 'POST',
                        timeout: 20000,
                        showLoadingTip: false,
                        dataType: 'json',
                        contentType: 'application/json',
                        data: function (data) {
                            console.log(data);
                            if (ajaxParams) {
                                data['params'] = ajaxParams;
                            }
                            return JSON.stringify(data);
                        },
                        dataSrc: function (res) {
                            console.log(res);
                            return res.data;
                        }
                    },
                    drawCallback: function (oSettings) {
                        if (tableInitialized === false) {
                            tableInitialized = true;
                            table.show();
                        }

                        if (tableOptions.onDataLoad) {
                            tableOptions.onDataLoad.call(undefined, self);
                        }
                    }
                }
            }, options);
            tableOptions = options;
            table = $(options.src);
            dataTable = table.DataTable(options.dataTable);
        }
    }

};