/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.expertService = expertService();

    function expertService() {
        let expertService = {};

        $(function () {
            allclick();
            commonService.initQuery(init);
            getInfo2();
        });

        function init() {

            getInfo();
        }

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }

        let pageSize = 4;

        function getInfo() {
            let pageNo = parseInt(commonService.getQuery('pageNo'), 10) || 1;
            let queryCondition = filterService.getQueryCondition();
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'popular/science/list/expert',
                that: $('#content')[0],
                postData: {
                    queryCondition
                },
                urlData: {
                    pageNo,
                    pageSize
                },
                success: function (data) {
                    console.log(data);

                    setInfo(data, pageNo);
                }
            })

        }

        function setInfo(data, pageNo) {
            let html = '';
            for (let d of data.rsData) {
                html +=
                    `<div class="list-demand-1">
                        <a href="expertdetail.html?id=${d.id}"><img src="${d.photo||`../resources/expert/${d.memberId}.jpg`}" alt=""></a>
                        <div class="match">
                            <h3><a href="expertdetail.html?id=${d.id}">${d.name} </a><span>${d.technicalTitle || d.honor }</span></h3>
                            <div style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 22px">${d.description}</div>
                            <p>服务方式: ${d.serviceType?`<span class="btn1">${d.serviceType}</span>`:''}</p>
                            <p>专业领域: ${d.domain?`<span class="btn2">${d.domain}</span>`:''}</p>
                        </div>
                    </div>`;
            }
            $('#demand-list').html(html);
            let total = Math.ceil(data.rsCount / pageSize);
            // console.log(total);
            gentPage(pageNo, total);

        }

        function gentPage(current, total) {
            let config = {
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
                    commonService.setQuery('pageNo',pageNo)


                }
            };
            new huPagination(config);
        }
        function getInfo2() {
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'popular/science/list/expert',
                // that: $('#content')[0],
                postData: {
                    queryCondition:'[{"field":"status","condition":"eq","relation":"and","vList":["1"]}]',
                    queryOrder:'[{"orderField":"readNum","orderType":"desc"}]'
                },
                urlData: {
                    pageNo:1,
                    pageSize:4
                },
                success: function (data) {
                    console.log(data);
                    setInfo2(data);
                }
            })
        }

        function setInfo2(data, pageNo) {
            let html = '<h2>热门专家</h2>';
            for (let d of data.rsData) {
                html +=
                    `<div class="list-expert-1">
                    <a href="expertdetail.html?id=${d.id}"><img src="${d.photo || `../resources/expert/${d.memberId}.jpg`}" alt=""></a>
                    <div class="hot">
                        <a href="expertdetail.html?id=${d.id}"><h3>${d.name}</h3></a>
                        <p>职称: <span>${d.technicalTitle}</span></p>
                        <p>专业领域: <span>${d.domain}</span></p>
                        <p>服务方式: <span>${d.serviceType}</span></p>
                    </div>
                </div>`;
            }
            $('.con-list-expert').html(html);

        }


        return expertService;
    }
})(window, jQuery);
