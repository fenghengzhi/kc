/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.investServiceDetailsService = investServiceDetailsService();

    function investServiceDetailsService() {
        var investServiceDetailsService = {};

        $(function () {
            allclick();
            getInfo();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }
        function getInfo() {
            let id = commonService.getSearchParm('id');
            console.log(id);
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'innovative/get/competition',
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
            let html = `<div class="main-part1">
            <div class="main-part1-left">
                <img src="${d.bigImage||d.image||"http://placehold.it/382x260"}" alt="">
                <div>目标大赛</div>
            </div>
            <div class="main-part1-right">
                <div class="title1">${moment(d.startTime).format('M月DD')}</div>
                <div class="title2">${d.title}</div>
                <div class="lines">
                    <div class="line"><i style="background-image: url(../images/time.svg);"></i>${moment(d.startTime).format('YYYY-MM-DD')}~${moment(d.endTime).format('YYYY-MM-DD')}
                    </div>
                    <div class="line"><i style="background-image: url(../images/address.svg);"></i>${d.location}</div>
                </div>
                <a href="investServiceSignUp.html?id=${commonService.getSearchParm('id')}" class="hu-btn btn-primary btn-sm">立即报名</a>
            </div>
        </div>
        <div class="main-part2">
            <div class="main-part2-badge">大赛详情</div>
            <div class="activity-introduce" id="article">${d.content}</div>
        </div>`;
            $('.main').html(html);

        }


        return investServiceDetailsService;
    }
})(window, jQuery);
