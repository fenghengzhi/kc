/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.indexService = indexService();

    function indexService() {
        var indexService = {};

        $(function () {
            allclick();
            getData();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

            $('.main-con-box').on('click','.append-box1 .main-item-box',function () {
                var url='outcomeBiddingDetail.html?id='+$(this).attr('id');
                window.open(url);
            })

        }

        function getData() {
            //竞拍成果
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/list/achievement',
                that: $('.main-con-box')[0],
                postData: {
                    queryCondition:'[{"field":"status","condition":"eq","relation":"and","vList":[1]}]'
                },
                urlData: {
                    pageNo: 1,
                    pageSize: 4
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var data = data.rsData;
                        var html = '';
                        for (var val of data) {
                            var location=_.find(provinceList, function(o) { return o.id == val.province }).province+_.find(cityList, function(o) { return o.id == val.city }).city;
                            html += `<div class="main-item-box" id="${val.id}">
                                        <p class="item-box-name">${val.title}</p>
                                        <div class="item-box-text">
                                            <p>竞拍底价：<span class="price">${val.budget}</span></p>
                                            <p>地址：<span>${location}</span></p>
                                        </div>
                                    </div>`
                        }
                        $('.append-box1').html(html);
                    }else{
                        $('.append-box1').html('<div style="    background-color: #f8f8f8;width: 100%;height: 364px;display: flex;align-items: center;justify-content: center"><img src="../images/icon-no-data.svg" alt="暂无数据"></div>');
                    }
                }
            });

            //悬赏需求
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/list/require',
                that: $('.main-con-box')[0],
                postData: {
                    queryCondition:'[{"field":"status","condition":"eq","relation":"and","vList":[1]}]'
                    },
                urlData: {
                    pageNo: 1,
                    pageSize: 4
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var data = data.rsData;
                        var html = '';
                        for (var val of data) {
                            var location=_.find(provinceList, function(o) { return o.id == val.province }).province+_.find(cityList, function(o) { return o.id == val.city }).city;
                            html += `<div class="main-item-box" id="${val.id}">
                                        <p class="item-box-name">${val.title}</p>
                                        <div class="item-box-text">
                                            <p>竞拍底价：<span class="price">${val.budget}</span></p>
                                            <p>地址：<span>${location}</span></p>
                                        </div>
                                    </div>`
                        }
                        $('.append-box2').html(html);
                    }
                }
            })

            //交易展示
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/list/require',
                that: $('.main-con-box')[0],
                postData: {
                    queryCondition:'[{"field":"status","condition":"eq","relation":"and","vList":[2]}]'
                },
                urlData: {
                    pageNo: 1,
                    pageSize: 4
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var data = data.rsData;
                        var html = '';
                        for (var val of data) {var location=_.find(provinceList, function(o) { return o.id == val.province }).province+_.find(cityList, function(o) { return o.id == val.city }).city;
                            html += `<div class="main-item-box">
                                        <p class="item-box-name">${val.title}</p>
                                        <div class="item-box-text">
                                            <p>竞拍底价：<span class="price">${val.budget}</span></p>
                                            <p>所在地：<span>${location}</span></p>
                                        </div>
                                    </div>`
                        }
                        $('.append-box3').html(html);
                    }
                }
            })

            //统计
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/get/stat',
                that: $('.main-con-box')[0],
                postData: {
                },
                urlData: {
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var data = data.rsData[0];
                        $('#count1').text(data.achievementCount);
                        $('#count2').text(data.requireCount);
                        $('#count3').text(data.achievementFinishCount);
                        $('#count4').text(data.requireFinishCount);
                        $('#count5').text(data.moneyCount+'万');
                    }
                }
            })
        }


        return indexService;
    }
})(window, jQuery);
