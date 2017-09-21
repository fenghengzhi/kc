/**
 * Created by Lx on 2017/8/9.
 */
(function (window, $) {
    'use strict';

    window.commonService = commonService();

    function commonService() {
        var commonService = {
            initFunction: undefined,
            type: {
                1: '专利代理',
                2: '金融服务',
                4: '法律服务',
                5: '专业协会',
                6: '科研设备',
                10: '技术攻关',
                11: '专家咨询',
                12: '技术提供',
                13: '技术转移'
            }
        };


        $(function () {
            // login();
        });


        commonService.initQuery = function (initFunction) {

            commonService.initFunction = initFunction;
            commonService.initFunction();
            History.Adapter.bind(window, 'statechange', initFunction);
            // window.onstatechange = initFunction;
            // window.onanchorchange = initFunction;
        };
        commonService.getQuery = function (query) {
            let uri = URI(History.getState().hash);
            if (query === true) {
                return uri.query(true);
            }
            return uri.query(true)[query];
        };
        commonService.setQuery = function (query, value) {
            let uri = URI(History.getState().hash);
            if (value) {
                uri.setQuery(query, value).normalizeQuery();
            } else {
                uri.removeQuery(query).normalizeQuery();
            }

            History.pushState({}, null, uri.toString());
            // commonService.initFunction();
        };
        commonService.setQuerys = function (querys) {
            let uri = URI(History.getState().hash);
            for (let query in querys) {
                let value = querys[query];
                if (value) {
                    uri.setQuery(query, value).normalizeQuery();
                } else {
                    uri.removeQuery(query).normalizeQuery();
                }
            }
            History.pushState({}, null, uri.toString());
            // commonService.initFunction();
        };
        commonService.removeQuery = function (query) {
            let uri = URI(History.getState().hash);
            uri.removeQuery(query).normalizeQuery();
            History.pushState({}, null, uri.toString());
        }
        commonService.getSearchParm = function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return decodeURIComponent((r[2]));
            return null;
        };

        commonService.provincechange = function (pid, $item) {
            var cityList2 = _.filter(cityList, {'pid': pid});
            var dataid = $('.hu-select[name=cityId]').find('span').attr('hu-data-id');
            huSelect.rebuildOptions($('.hu-select[name=county]'), []);
            $('.hu-select[name=cityId]').find('span').text('市').attr('hu-data-value', '');
            $('.hu-select[name=county]').find('span').text('区/县').attr('hu-data-value', '');

            if (dataid) {
                $('ul[hu-data-id=' + dataid).empty();
                for (var i = 0; i < cityList2.length; i++) {
                    $('ul[hu-data-id=' + dataid + ']').append('<li hu-data-value="' + cityList2[i].id + '">' + cityList2[i].city + '</li>')
                }
            } else {
                $('.hu-select[name=cityId]').find('ul').empty();
                for (var i = 0; i < cityList2.length; i++) {
                    $('.hu-select[name=cityId]').find('ul').append('<li hu-data-value="' + cityList2[i].id + '">' + cityList2[i].city + '</li>')
                }
            }
        };
        commonService.citychange = function (pid, $item) {
            var countyList2 = _.filter(countyList, function (o) {
                return o.pid == pid
            });
            var dataid = $('.hu-select[name=county]').find('span').attr('hu-data-id');
            $('.hu-select[name=county]').find('span').text('区/县').attr('hu-data-value', '');
            if (dataid) {
                $('ul[hu-data-id=' + dataid).empty();
                for (var i = 0; i < countyList2.length; i++) {
                    $('ul[hu-data-id=' + dataid + ']').append('<li hu-data-value="' + countyList2[i].id + '">' + countyList2[i].county + '</li>')
                }
            } else {
                $('.hu-select[name=county]').find('ul').empty();
                for (var i = 0; i < countyList2.length; i++) {
                    $('.hu-select[name=county]').find('ul').append('<li hu-data-value="' + countyList2[i].id + '">' + countyList2[i].county + '</li>')
                }
            }
        };


        commonService.domain1change = function (val, $item) {
            $('.hu-select[name=domain2]').find('span').text('').attr('hu-data-value', '');
            $('.hu-select[name=domain3]').find('span').text('').attr('hu-data-value', '');
            $('.hu-select[name=domain4]').find('span').text('').attr('hu-data-value', '');

            var data = _.filter(domainarr, function (o) {
                return o[0][0] == val && o[0].length == 3;
            });
            var dataid = $('.hu-select[name=domain2]').find('span').attr('hu-data-id');
            if (dataid) {
                $('ul[hu-data-id=' + dataid).empty();
                for (var i = 0; i < data.length; i++) {
                    $('ul[hu-data-id=' + dataid).append('<li title="' + data[i][1] + '" hu-data-value="' + data[i][0] + '">' + data[i][1] + '</li>')
                }
            } else {
                $('.hu-select[name=domain2]').find('ul').empty();
                for (var i = 0; i < data.length; i++) {
                    $('.hu-select[name=domain2]').find('ul').append('<li title="' + data[i][1] + '" hu-data-value="' + data[i][0] + '">' + data[i][1] + '</li>')
                }
            }
        };
        commonService.domain2change = function (val, $item) {
            $('.hu-select[name=domain3]').find('span').text('').attr('hu-data-value', '');
            $('.hu-select[name=domain4]').find('span').text('').attr('hu-data-value', '');
            var data = _.filter(domainarr, function (o) {
                return o[0].slice(0, 3) == val && o[0].length == 5;
            });
            var dataid = $('.hu-select[name=domain3]').find('span').attr('hu-data-id');
            if (dataid) {
                $('ul[hu-data-id=' + dataid).empty();
                for (var i = 0; i < data.length; i++) {
                    $('ul[hu-data-id=' + dataid).append('<li title="' + data[i][1] + '" hu-data-value="' + data[i][0] + '">' + data[i][1] + '</li>')
                }
            } else {
                $('.hu-select[name=domain3]').find('ul').empty();
                for (var i = 0; i < data.length; i++) {
                    $('.hu-select[name=domain3]').find('ul').append('<li title="' + data[i][1] + '" hu-data-value="' + data[i][0] + '">' + data[i][1] + '</li>')
                }
            }
        };
        commonService.domain3change = function (val, $item) {
            $('.hu-select[name=domain4]').find('span').text('').attr('hu-data-value', '');
            var data = _.filter(domainarr, function (o) {
                return o[0].slice(0, 5) == val && o[0].length == 7;
            });
            var dataid = $('.hu-select[name=domain4]').find('span').attr('hu-data-id');
            if (dataid) {
                $('ul[hu-data-id=' + dataid).empty();
                for (var i = 0; i < data.length; i++) {
                    $('ul[hu-data-id=' + dataid).append('<li title="' + data[i][1] + '" hu-data-value="' + data[i][0] + '">' + data[i][1] + '</li>')
                }
            } else {
                $('.hu-select[name=domain4]').find('ul').empty();
                for (var i = 0; i < data.length; i++) {
                    $('.hu-select[name=domain4]').find('ul').append('<li title="' + data[i][1] + '" hu-data-value="' + data[i][0] + '">' + data[i][1] + '</li>')
                }
            }
        };
        commonService.html2Text = function (html) {
            return $('<div>' + html + '</div>').text();
        };
        commonService.dateGet = function ($item) {
            return $item.val();
        };


        //数据校验
        commonService.checkData = function ($item) {
            var willPass = true;

            layer.closeAll('tips');
            //必填
            $item.find('input[musthave]').each(function (i) {
                if (!$(this).val()) {
                    layer.tips('必填!', $(this), {
                        tips: [2, '#f66'],
                        time: 10000,
                        tipsMore: true
                    });
                    willPass = false;
                }
            });
            $item.find('textarea[musthave]').each(function (i) {
                if (!$(this).val()) {
                    layer.tips('必填!', $(this), {
                        tips: [2, '#f66'],
                        time: 10000,
                        tipsMore: true
                    });
                    willPass = false;
                }
            });
            $item.find('span[musthave]').each(function (i) {
                if (!$(this).attr('hu-data-value')) {
                    layer.tips('必填!', $(this), {
                        tips: [2, '#f66'],
                        time: 10000,
                        tipsMore: true
                    });
                    willPass = false;
                }
            });
            $item.find('label[musthave]').each(function () {
                var name = $(this).find('input').attr('name');
                var data = huForm.getFormData($item);
                data = data[name];
                if (!data || !data.length) {
                    layer.tips('必选!', $item.find('input[name=' + name + ']').eq(-1).closest('label'), {
                        tips: [2, '#f66'],
                        time: 10000,
                        tipsMore: true
                    });
                    willPass = false;
                }
            });


            //身份证
            var idcreg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            $item.find('input[idc]').each(function (i) {
                if ($(this).val() != '' && (!idcreg.test($(this).val()))) {
                    layer.tips('身份证格式不正确 !', $(this), {
                        tips: [2, '#f66'],
                        time: 10000,
                        tipsMore: true
                    });
                    willPass = false;
                }
            });

            //电子邮箱
            var emailreg = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
            $item.find('input[email]').each(function (i) {
                if ($(this).val() != '' && (!emailreg.test($(this).val()))) {
                    layer.tips('邮箱格式不正确 !', $(this), {
                        tips: [2, '#f66'],
                        time: 10000,
                        tipsMore: true
                    });
                    willPass = false;
                }
            });

            //手机号
            var phonereg = /^1[34578]\d{9}$/;
            $item.find('input[phone]').each(function (i) {
                if ($(this).val() != '' && (!phonereg.test($(this).val()))) {
                    layer.tips('手机格式不正确 !', $(this), {
                        tips: [2, '#f66'],
                        time: 10000,
                        tipsMore: true
                    });
                    willPass = false;
                }
            });

            //组织机构代码
            var orgCodereg = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/;
            $item.find('input[orgCode]').each(function (i) {
                if ($(this).val() != '' && (!orgCodereg.test($(this).val()))) {
                    layer.tips('组织机构代码格式不正确 !', $(this), {
                        tips: [2, '#f66'],
                        time: 10000,
                        tipsMore: true
                    });
                    willPass = false;
                }
            });

            //统一社会信用代码
            var creditCodereg = /^[0-9A-Z]{18}$/;
            $item.find('input[creditCode]').each(function (i) {
                if ($(this).val() != '' && (!creditCodereg.test($(this).val()))) {
                    layer.tips('社会信用代码格式不正确 !', $(this), {
                        tips: [2, '#f66'],
                        time: 10000,
                        tipsMore: true
                    });
                    willPass = false;
                }
            });

            // 二选一
            var ishavedata = false;
            $('input[oneof2]').each(function () {
                if ($(this).val() != '') {
                    ishavedata = true;
                }
            });

            if (!ishavedata && $item.find('input[oneof2]').length) {
                $item.find('input[oneof2]').each(function (i) {
                    layer.tips('二选一 !', $(this), {
                        tips: [2, '#f66'],
                        time: 10000,
                        tipsMore: true
                    });
                });
                willPass = false;
            }


            return willPass;

        };

        function login() {
            $('.login').find('.signin a').click(function () {
                window.location.href='http://101.226.6.177:8089/haikou/login?url='+window.location.href;
            });
            $('.login').find('.register a').click(function () {
                window.location.href='http://101.226.6.177:8089/haikou/register?url='+window.location.href;
            });
        }




        return commonService;
    }
})(window, jQuery);


window.toastr = {};
window.toastr.info = function (msg) {
    layer.msg(msg, {
        time: 3000, offset: 'rt'
    })
};
window.toastr.box = function (options) {
    var defaultOptions = {
        title: ' ',
        type: 1,
        area: ['660px', '360px'],
        shadeClose: true,
        cancel: function () {
            layer.closeAll();
        }
    };
    var option = $.extend({}, defaultOptions, options);
    layer.open(option);
};



