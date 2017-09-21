/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.outcomeBiddingService = outcomeBiddingService();

    function outcomeBiddingService() {
        var outcomeBiddingService = {};


        $(function () {
            addValue();
            allclick();
            moreFilter();
            commonService.initQuery(getData);
        });

        function addValue() {
            $('.filter-line.endTime li').each(function () {
                switch($(this).text()){
                    case '5天内':
                        $(this).attr('value',`${moment().subtract(5, 'days').format('YYYY-MM-DD')},${moment().add(10,'years').format('YYYY-MM-DD')}`);break;
                    case '10天内':
                        $(this).attr('value',`${moment().subtract(10, 'days').format('YYYY-MM-DD')},${moment().add(10,'years').format('YYYY-MM-DD')}`);break;
                    case '1个月内':
                        $(this).attr('value',`${moment().subtract(1, 'months').format('YYYY-MM-DD')},${moment().add(10,'years').format('YYYY-MM-DD')}`);break;
                    case '3个月内':
                        $(this).attr('value',`${moment().subtract(3, 'months').format('YYYY-MM-DD')},${moment().add(10,'years').format('YYYY-MM-DD')}`);break;
                    case '3个月以上':
                        $(this).attr('value',`${moment().subtract(3, 'months').format('YYYY-MM-DD')},${moment().subtract(10, 'years').format('YYYY-MM-DD')}`);break;
                }
            })
        }

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

            //点击筛选项
            $('.filter').on('click', 'li', function () {
                let $this = $(this);
                $this.addClass('selected').siblings('li').removeClass('selected');
                let querys = {};
                let name = $this.parents('.filter-line').attr('name');
                let value = ($this.text() === '全部') ? void(0) : $(this).text();
                querys[name] = value;
                querys.pageNo = void(0);
                commonService.setQuerys(querys);
            });

            $('.filter .filter-line').each(function () {
                let value = commonService.getQuery($(this).attr('name'));
                if (value) {
                    $(this).find('li').filter(function () {
                        return $(this).text() === value;
                    }).addClass('selected').siblings('li').removeClass('selected');
                }
            });

            //点击更多
            $('.filter').on('click','.more-filter',function () {
                if($(this).closest('.filter-line').height()>20){
                    $(this).closest('.filter-line').animate({'height':'16px'},200)
                    $(this).find("i").removeClass('rotate')
                }else{
                    var h=$(this).siblings('ul').eq(0).height();
                    $(this).closest('.filter-line').animate({'height':h+'px'},200)
                    $(this).find("i").addClass('rotate')
                }
            });

            //点击项目
            $('.main-con').on('click','.hu-card',function () {
                window.open('outcomeBiddingDetail.html?id='+$(this).attr('id'));
            })



        }

        function moreFilter () {
            $('.filter-line').find('ul').each(function (i,e) {
                if($(this).height()>30){
                    $(this).closest('.filter-con').append('<div class="more-filter">更多<i class="icon more hufont ic-navigate-next"></i></div>')
                }
            })
        }

        outcomeBiddingService.getQueryCondition = function () {
            let queryCondition = [];
            $('.filter .filter-line').each(function () {
                let _this = $(this);
                let name = _this.attr('name');
                let selected = _this.find('li.selected');
                let value = selected.text() === '全部' ? void(0) : (selected.attr('value') || selected.text());
                let JSON_value = _this.attr('JSON-value');
                if (value || JSON_value) {
                    queryCondition.push({
                        field: name,
                        condition: _this.attr('condition') || "eq",
                        relation: _this.attr('relation') || "and",
                        vList: JSON_value ? JSON.parse(JSON_value) : value.split(',')
                    });
                }
            });
            return JSON.stringify(queryCondition);
        }

        function getData() {
            outcomeBiddingService.pageNo = parseInt(commonService.getQuery('pageNo')) || 1;
            let queryCondition = JSON.parse(outcomeBiddingService.getQueryCondition());
            queryCondition.push({"field":"status","condition":"eq","relation":"and","vList":[1]})
            queryCondition=JSON.stringify(queryCondition);
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/list/achievement',
                that: $('.main')[0],
                postData: {
                    queryCondition
                },
                urlData: {
                    pageNo: outcomeBiddingService.pageNo,
                    pageSize: 9
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        outcomeBiddingService.pageNum=Math.ceil(data.rsCount/9);
                        gentPage();
                        var data = data.rsData;
                        var html = '';
                        for (var val of data) {
                            var province=_.find(provinceList, function(o) { return o.id == val.province }).province
                            var city=_.find(cityList, function(o) { return o.id == val.city }).city
                            var location=province+city;
                            var timestamp = val.endTime;
                            var newDate = new Date();
                            newDate.setTime(timestamp);
                            var endtime=newDate.toJSON().substring(0,10);
                            html += `<div class="hu-card card-shadow main-card" id="${val.id}">
                                        <div class="hu-card-body">
                                            <p class="card-title" title="${val.title}">${val.title}</p>
                                            <div class="card-info1">
                                                <p class="lingyu">领域：<span>机械</span></p>
                                                <p><img src="../images/address.svg" alt="address"><span>${location}</span></p>
                                            </div>
                                            <div class="card-info2">
                                                <div class="money">
                                                    <p><span>${val.budget}</span></p>
                                                    <p>金额</p>
                                                </div>
                                                <!--<div class="people">-->
                                                    <!--<p><span>115</span>人</p>-->
                                                    <!--<p>参与</p>-->
                                                <!--</div>-->
                                                <div class="time">
                                                    <p><span>${endtime}</span></p>
                                                    <p>截止时间</p>
                                                </div>
                                            </div>
                                            <div class="card-want">
                                                我要竞价
                                            </div>
                                        </div>
                                    </div>`
                        }
                        $('.main-con').html(html);
                    }else{
                        $('.main-con').html('<div style="display: flex;justify-content: center;align-content: center;width: 100%;"><img style="display: flex;width: 200px;height: 200px;margin: 50px auto 200px" src="../images/icon-no-data.svg"></div>');
                        $('#page').empty();
                    }
                }
            })
        }

        //分页器
        function gentPage() {
            var config = {
                data: {
                    id: 4
                },
                selector: '#page',
                total: outcomeBiddingService.pageNum,
                showNum: 5,
                current: outcomeBiddingService.pageNo,
                prevNextEnable: false,
                prevNextMultiEnable: true,
                startEndEnable: true,
                callback: function (event, pageNo, data) {
                    outcomeBiddingService.pageNo=pageNo;
                    commonService.setQuery('pageNo', pageNo);
                    getData();
                }
            };
            new huPagination(config);
        }


        return outcomeBiddingService;
    }
})(window, jQuery);
