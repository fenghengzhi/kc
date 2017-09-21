(function ($) {
    'use strict';

    function alertDialog(msg) {
        if (top.hieknjs && top.hieknjs.addAlertDialog) {
            top.hieknjs.addAlertDialog(msg);
        } else {
            window.console && window.console.log(msg);
        }
    }

    window.hieknjs = window.hieknjs || {};
    window.hieknjs.alertDialog = alertDialog;
    window.hieknjs.kgLoader = function (options) {

        function dealSendData(sendData) {
            var jsonSendData = {};
            if (sendData.indexOf('?') > -1 && sendData.indexOf('?') < sendData.indexOf('&')) {
                var pre = sendData.substring(0, sendData.indexOf('?'));
                pre.split('&').forEach(function (param) {
                    param = param.split('=');
                    jsonSendData[param[0]] = param[1];
                });
                var middle = sendData.substring(sendData.indexOf('?') + 1);
                if (sendData.indexOf('&params={') > 0) {
                    middle = sendData.substring(sendData.indexOf('?') + 1, sendData.indexOf('&params={'));
                    jsonSendData.params = sendData.substring(sendData.indexOf('&params={') + '&params='.length);
                }
                middle.split('&').forEach(function (param) {
                    param = param.split('=');
                    jsonSendData[param[0]] = param[1];
                });
            } else {
                var pre2 = sendData.substring(0, sendData.indexOf('&params='));
                pre2.split('&').forEach(function (param) {
                    param = param.split('=');
                    jsonSendData[param[0]] = param[1];
                });
                sendData = sendData.substring(sendData.indexOf('&params=') + '&params='.length);
                jsonSendData.params = sendData;
            }
            if (jsonSendData.params) {
                try {
                    var jsonSendDataPost = JSON.parse(jsonSendData.params);
                    for (var k in jsonSendDataPost) {
                        jsonSendData[k] = jsonSendDataPost[k];
                    }
                } catch (e) {
                    $.noop();
                }
            }
            return jsonSendData;
        }

        function changeAjaxObj(that, bool) {
            if (that) {
                if (that.tagName == 'INPUT' || that.tagName == 'BUTTON') {
                    $(that).prop('disabled', bool);
                } else if (that.tagName == 'A') {
                    $(that).find('.ajax-loading').remove();
                    if (bool) {
                        $(that).children().addClass('hide');
                        $(that).append('<i class="fa fa-spinner fa-spin fa-fw ajax-loading"></i>');
                    } else {
                        $(that).children().removeClass('hide');
                    }
                } else {
                    $(that).find('.ajax-loading').remove();
                    if (bool) {
                        var out = '';
                        if (that.tagName == 'UL') {
                            out = $('<li class="ajax-loading"></li>');
                            $(that).html(out.append('<div style="position: relative;padding:100px 0;"><div class="loading"><i class="fa fa-spinner fa-spin"></i></div></div>'));
                        } else if (that.tagName == 'BODY' || $(that).hasClass('sys-dialog-content') || that.tagName == 'DIV') {

                            $(that).css('position', 'relative');

                            if (option.loadingHTML) {
                                $(that).append('<div class="ajax-loading" style="background-color: rgba(255, 255, 255, .56);width: 100%;  height: 100%;  position: absolute;  top:0;" ><div class="loading"> ' + option.loadingHTML + ' </div></div>');
                            } else {$(that).append('<div class="ajax-loading" style="background-color: rgba(255, 255, 255, .56);width: 100%;  height: 100%;  position: absolute;  top:0;" ><div class="loading" style="position: absolute;top: 50%;left: 50%;margin: -25px 0 0 -25px">' + '<?xml version="1.0" encoding="utf-8"?>'+
                                    '<!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->'+
                                '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'+
                                '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"'+
                                'width="50px" height="50px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">'+
                                    '<style type="text/css">'+
                            '.loading{'+
                                    'stroke-dasharray: 30;'+
                                    'stroke-deshoffset: 0;'+
                                    '-webkit-animation: loading 0.5s linear alternate infinite ;'+
                                    '-moz-animation: loading 1s linear alternate infinite ;'+
                                '}'+

                            '.loading1{'+
                                    'stroke-dasharray: 30;'+
                                    'stroke-deshoffset: 5;'+
                                    '-webkit-animation: loading 0.5s linear 0.09s alternate infinite ;'+
                                    '-moz-animation: loading 1s linear 0.09s alternate infinite ;'+
                                '}'+

                            '.loading2{'+
                                    'stroke-dasharray: 30;'+
                                    'stroke-deshoffset: 10;'+
                                    '-webkit-animation: loading 0.5s linear 0.18s alternate infinite ;'+
                                    '-moz-animation: loading 1s linear 0.18s alternate infinite ;'+
                                '}'+

                            '.loading3{'+
                                    'stroke-dasharray: 30;'+
                                    'stroke-deshoffset: 15;'+
                                    '-webkit-animation: loading 0.5s linear 0.27s alternate infinite ;'+
                                    '-moz-animation: loading 1s linear 0.27s alternate infinite ;'+
                                '}'+

                            '.loading4{'+
                                    'stroke-dasharray: 30;'+
                                    'stroke-deshoffset: 20;'+
                                    '-webkit-animation: loading 0.5s linear 0.36s alternate infinite ;'+
                                    '-moz-animation: loading 1s linear 0.36s alternate infinite ;'+
                                '}'+


                            '@-webkit-keyframes loading{'+
                                    '0%{stroke-dashoffset:30;}'+
                                    '50%{stroke-dashoffset:20;}'+
                                    '100%{stroke-dashoffset:10;}'+
                                '}'+

                            '@-moz-keyframes loading{'+
                                    '0%{stroke-dashoffset:0;}'+
                                    '50%{stroke-dashoffset:7;}'+
                                    '100%{stroke-dashoffset:0;}'+
                                '}'+
                            '</style>'+
                                '<path stroke=' + option.loadingColor + ' stroke-width="5" class="loading" d="M5,25v-20M5,25v20"/>'+
                                '<path stroke=' + option.loadingColor + ' stroke-width="5" class="loading1" d="M15,25v-20M15,25v20"/>'+
                                '<path stroke=' + option.loadingColor + ' stroke-width="5" class="loading2" d="M25,25v-20M25,25v20"/>'+
                                '<path stroke=' + option.loadingColor + ' stroke-width="5" class="loading3" d="M35,25v-20M35,25v20"/>'+
                                '<path stroke=' + option.loadingColor + ' stroke-width="5" class="loading4" d="M45,25v-20M45,25v20"/>'+
                            '</svg>'+
                               '</div></div>');
                            }
                        }
                    }
                }
            }
        }

        function short(no) {
            $('.rect' + no).eq(0).stop().animate({height: 24, top: 18}, 1200, function () {
                console.log(1);
                long(no);
            })
        }

        function long(no) {
            $('.rect' + no).eq(0).stop().animate({height: 60, top: 0}, 1200, function () {
                short(no);
            })
        }

        function dealJsonCallback(data) {
            if (typeof(data) == 'string') {
                data = JSON.parse(data);
            }
            if (data.code) {
                if (data.code == 200) {
                    if (!data.data && data.data != 0) {
                        return true;
                    }
                    if (data.data.length == 0) {
                        return true;
                    }
                    return data.data;
                } else {
                    window.hieknjs.config.ajaxConfig.hideToast ? '' : window.hieknjs.alertDialog(data.msg);
                    return false;
                }
            } else {
                return data;
            }
        }

        function unParam(str) {
            var rs = {};
            str.split('&').forEach(function (param) {
                if (param.indexOf('[') > 0 && param.indexOf('[') < param.indexOf('=')) {
                    var keyFalse = param.substring(0, param.indexOf('='));
                    var keyTrue = param.substring(0, param.indexOf('['));
                    var val = param.substring(param.indexOf('=') + 1);
                    dealParam(keyFalse, keyTrue, val, rs);
                } else {
                    param = param.split('=');
                    rs[param[0]] = param[1];
                }
            });
            return rs;
        }

        function dealParam(str2, key, val, rs) {
            var k = key;
            var t = rs;
            var a = str2.substring(str2.indexOf('[') + 1, str2.indexOf(']'));
            var r = str2.substring(str2.indexOf(']') + 1);
            if (a && !$.isNumeric(a)) {
                if ($.isArray(rs)) {
                    if (rs.length <= key) {
                        rs.push({});
                    }
                    k = a;
                    t = rs[key];
                } else {
                    if (!rs[key]) {
                        rs[key] = {};
                    }
                    k = a;
                    t = rs[key];
                }
            } else {
                if ($.isArray(rs)) {
                    if (!rs[key]) {
                        rs[key] = [];
                    }
                    k = a;
                    t = rs[key];
                } else {
                    if (!rs[key]) {
                        rs[key] = [];
                    }
                    k = a;
                    t = rs[key];
                }
            }
            if (r.indexOf('[') == 0) {
                dealParam(r, k, val, t);
            } else {
                if (a && !$.isNumeric(a)) {
                    t[a] = val;
                } else {
                    if (!a) {
                        t.push(val);
                    } else {
                        t[a] = val;
                    }
                }
            }
        }


        var defaultOptions = {
            type: 0,
            url: '',
            success: $.noop,
            headers: null,
            that: null,
            ifModified: true,
            crossDomain: true,
            cache: false,
            loadingHTML: false,
            loadingColor: '#5f8bc9',
            willShowLoading: true,
            complete: function (data) {
                changeAjaxObj(that, false);
                if (complete) {
                    complete(data);
                }
            }
        };
        var option = $.extend({}, defaultOptions, options);
        var that = option.that;
        var params = option.params || option.data;
        if (option.willShowLoading) {
            changeAjaxObj(that, true);
        }
        var crossDomain = options.crossDomain || false;
        option.error = function (XMLHttpRequest, textStatus, errorThrown) {
            if (options.error) {
                if (typeof options.error == 'function') {
                    options.error = [options.error];
                }
                for (var i in options.error) {
                    options.error[i](XMLHttpRequest, textStatus, errorThrown);
                }
            }
        };
        option.complete = function (data) {
            changeAjaxObj(that, false);
            if (options.complete) {
                options.complete(data);
            }
        };
        option.statusCode = option.statusCode || {
                404: options.error404 || function () {
                    window.hieknjs.alertDialog('404 service not found');
                }
            };
        if (!crossDomain) {
            if (params) {
                for (var k in params) {
                    if (typeof params[k] == 'object') {
                        params[k] = JSON.stringify(params[k]);
                    }
                }
            }
            option.type = option.type == 0 ? 'GET' : 'POST';

            if (option.urlData) {
                var str = jQuery.param(option.urlData);
                option.url += (option.url.indexOf('?') > 0 ? '' : '?') + str;
            }
            if (option.postData) {
                option.data = option.postData;
            }

            option.contentType='application/x-www-form-urlencoded';

            option.success = function (data, state, XHR) {
                data = dealJsonCallback(data);
                var sendData = decodeURIComponent(this.data);
                var jsonSendData = {};
                if (sendData) {
                    $.extend(jsonSendData, unParam(sendData));
                }
                sendData = 'url=' + this.url;
                if (sendData.indexOf('?') > -1) {
                    var pre = sendData.substring(0, sendData.indexOf('?'));
                    sendData = sendData.substring(sendData.indexOf('?') + 1);
                    $.extend(jsonSendData, unParam(pre), unParam(sendData));
                }
                if (options.success) {
                    options.success(data, state, XHR, jsonSendData);
                }
            };

            return $.ajax(option);
        }
        // else {
        //     if (url.indexOf('&params={') > 0) {
        //         window.hieknjs.alertDialog('请把url中的params作为第一个参数后再次尝试!');
        //         return null;
        //     } else if (!window.hieknjs.config.ajaxConfig.loadService && !options.loadService) {
        //         window.hieknjs.alertDialog('loadService配置错误');
        //     } else {
        //         option.type = 'POST';
        //         option.data = {
        //             type: options.type,
        //             url: options.url,
        //             params: typeof(params) == 'object' ? JSON.stringify(params) : params
        //         };
        //         option.url = options.loadService || window.hieknjs.config.ajaxConfig.loadService;
        //         option.success = function (data, state, XHR) {
        //             data = dealJsonCallback(data);
        //             var sendData = decodeURIComponent(this.data);
        //             sendData = sendData.substring(sendData.indexOf('&') + 1);
        //             var jsonSendData = dealSendData(sendData);
        //             if (options.success) {
        //                 options.success(data, state, XHR, jsonSendData);
        //             }
        //         };
        //         return $.ajax(option);
        //     }
        // }
    };
})(jQuery);