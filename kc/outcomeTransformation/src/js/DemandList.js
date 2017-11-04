/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.DemandListService = DemandListService();

    DemandListService.id = commonService.getSearchParm('id');
    
    function DemandListService() {
        var DemandListService = {timer: []};

        $(function () {
            allclick();
            getData1();
            commonService.initQuery(init);
            tab();
        });

        function init() {
            for(let timer of DemandListService.timer){
                clearInterval(timer);
            }
            DemandListService.timer=[];
            getInfo();
        }
        
        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }

        function tab() {



            //filter中的选中变色。
            $('.server').on('click', 'li', function () {
                $(this).addClass('sele-color').siblings().removeClass('sele-color');
            });
            $('.field').on('click', 'li', function () {
                $(this).addClass('sele-color').siblings().removeClass('sele-color');
            });
            $('.profes').on('click', 'li', function () {
                $(this).addClass('sele-color').siblings().removeClass('sele-color');
            });
            $('.time').on('click', 'li', function () {
                $(this).addClass('sele-color').siblings().removeClass('sele-color');
            });



        }

        function getData1() {
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transformation/recommend/require',
                that: $('.right .img-div')[0],
                postData: {},
                urlData: {
                    pageNo:1,
                    pageSize:5
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var data = data.rsData;
                        console.log(data);
                        $('.right .img-div').empty();
                        for (var i = 0; i < data.length; i++) {
                            var listHTML =
                                `<a href="DemandDetail.html?id=${data[i].id}" class="im">
                                    <img src="${data[i].image||'../images/outcomeTransformation-demand 220x158.png'}" alt="" style="background-color: #cccccc;margin-top:0;">
                                    <div class="keepout">${data[i].title}</div>
                                </a>`;

                            $('.right .img-div').append(listHTML)

                        }
                        // gentPage();
                    }

                }
            })
        }

        function getInfo() {
            let queryCondition = filterService.getQueryCondition();

            let pageNo = parseInt(commonService.getQuery('pageNo'), 10) || 1;
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transformation/list/require',
                that: $('.left .lists')[0],
                postData: {
                    queryCondition
                },
                urlData: {
                    pageNo:pageNo,
                    pageSize:5
                },
                success: function (data) {
                    // console.log(data);

                    setInfo(data, pageNo);
                }
            });
        }

        let pageSize = 4;

        function setInfo(data, pageNo) {
            let html = '';
            if (!data.rsCount) {
                html = `<img src="../images/icon-no-data.svg" style="width: 102px;margin:100px auto;display:block;" alt="">`
                $('.left .lists').html(html);
            } else {
                for (let d of data.rsData) {
                    html +=
                        `<div class="con">
                                <div class="img">
                                    <img src="${d.image||'../images/outcomeTransformation-demand 220x158.png'}" alt="" style="background-color: #cccccc;">
                                </div>
                                <div class="clm">
                                    <a href="DemandDetail.html?id=${d.id}" class="list-title">
                                        <h4 title="${d.title}">${d.title.length<30 ? d.title : d.title.substr(0,30)+'...'}</h4>
                                    </a>
                                    <div class="detail">
                                        <ul style="margin-bottom:12px;" class="clearfix">
                                            <li style="width: 180px;">
                                                <div class="det1"><i></i>${d.tag||"暂无数据"}</div>
                                            </li>
                                            <li>
                                                <div class="det2"><i></i>预算&nbsp;<span>${d.budget}</span></div>
                                            </li>
                                        </ul>
                                        <ul style="margin-bottom:16px;" class="clearfix">
                                            <li style="width: 180px;">
                                                <div class="det3"><i></i><span>${_.find(provinceList,function (o) {return o.id==d.province}).province} ${_.find(cityList,function (o) {return o.id==d.city}).city} ${(_.find(countyList,function (o) {return o.id==d.county}) || {county:''}).county}</span></div>
                                            </li>
                                            <li>
                                           <div class="det4">
                                                <i></i>距结束
                                                <div class="time">
                                                    <span class="t_d">00天</span>
                                                    <span class="t_h">00时</span>
                                                    <span class="t_m">00分</span>
                                                    <span class="t_s">00秒</span>
                                                </div>
                                            </div>
                                        </li>
                                        </ul>
                                    </div>
                                    <div class="btn">
                                        <a href="DemandDetail.html?id=${d.id}" class="hu-btn btn-primary btn-sm" style="min-width: 60px;padding:0 12px;">查看详情
                                        </a>
                                    </div>
                                </div>
                            </div>`;
                }
                html += `<div id="page"></div>`;
                $('.left .lists').html(html);
                DemandListService.timer.push(setInterval(function () {
                    for (var i=0;i<data.rsData.length;i++) {
                        // var EndTime = new Date('2017/09/20 00:00:00');
                        var NowTime = new Date();
                        var t = data.rsData[i].expirationTime - NowTime.getTime();
                        var d = Math.floor(t / 1000 / 60 / 60 / 24);
                        var h = Math.floor(t / 1000 / 60 / 60 % 24);
                        var m = Math.floor(t / 1000 / 60 % 60);
                        var s = Math.floor(t / 1000 % 60);

                        $('.t_d').eq(i).text(d + "天");
                        $('.t_h').eq(i).text(h + "时");
                        $('.t_m').eq(i).text(m + "分");
                        $('.t_s').eq(i).text(s + "秒");
                    }
                }, 1000));


                let total = Math.ceil(data.rsCount / 5);
                gentPage(pageNo, total);

            }
        }
        function gentPage(current,total) {
            var config = {
                data: {
                    id: 4
                },
                selector: '#page',
                total: total,
                showNum: 5,
                current: current,
                prevNextEnable: false,
                prevNextMultiEnable: true,
                startEndEnable: true,
                callback: function (event, pageNo, data) {
                    commonService.setQuery('pageNo', pageNo);
                }
            };
            new huPagination(config);
        };
        return DemandListService;
    }
})(window, jQuery);
