/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.expertdetailService = expertdetailService();

    function expertdetailService() {
        let expertdetailService = {};

        $(function () {
            allclick();
            getInfo();
            getInfo2();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }

        function getInfo() {
            let id = commonService.getSearchParm('id');
            console.log(id);
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'popular/science/get/expert',
                that: $('#content')[0],
                postData: {},
                urlData: {
                    id: id,

                },
                success: function (data) {
                    console.log(data);
                    setInfo(data);
                }
            })
        }

        function setInfo(data) {
            let d = data.rsData[0];
            var institution='';
            d.institution=JSON.parse(d.institution);
            if(d.institution){
                institution=d.institution.join('、')
            }
            let html = `<div class="con-list-demand">
                    <h2>专家详情</h2>
                    <div class="list-demand-1">
                    <img src="${d.photo || `../resources/expert/${d.memberId}.jpg`}" alt="">
                        <div class="match">
                            <h3>${d.name} <span> &nbsp;${d.technicalTitle}</span></h3>
                            <div>
                                <p>专业领域: <span> &nbsp;${d.domain}</span></p>
                                <!--<p>所属机构: <span> &nbsp;${institution}</span></p>-->
                                <p>荣誉头衔: <span> &nbsp;${d.honor}</span></p>
                                <p>服务方式: <span> &nbsp;${d.serviceType}</span></p>
                            </div>
                            <button class="hu-btn btn-primary btn-sm">咨询</button>
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <h2>专家简介</h2>
                    <div id="description" style="white-space: pre-wrap;line-height: normal;">${d.description}</div>
                </div>`;
            $('.detail').html(html);

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
                    pageSize:3
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

        return expertdetailService;
    }
})(window, jQuery);
