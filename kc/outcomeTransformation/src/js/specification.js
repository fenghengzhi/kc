/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.specificationService = specificationService();

    function specificationService() {
        var specificationService = {};

        specificationService.id=commonService.getSearchParm('id')||'cn200910144612';

        $(function () {
            allclick();
            getData();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })
        }

        function getData() {

            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL2 + 'patent/get',
                that: $('.main')[0],
                urlData: {
                    id: specificationService.id,
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        console.log(data);
                        var patent=data.rsData[0].patent;
                        var legal=data.rsData[0].legal.patent_legal_status || {legal_status:0,lapse_date:''};
                        console.log(data);
                        var mainNameHTML=`
                                            <!--<div class="main-name">-->
                                                <h3>${patent.title.original}</h3>
                                                <div class="main-name-left">
                                                    <div class="left">
                                                        <p>申请号 : <span>${patent.application_number}</span></p>
                                                        <p>${['','空开','授权','失信'][legal.legal_status] +':'} <span>${legal.lapse_date}</span></p>
                                                    </div>
                                                    <!--<div class="cent">-->
                                                        <!--<p>综合评分 : <span>★★☆</span></p>-->
                                                        <!--<p>权利评分 : <span>★★☆</span></p>-->
                                                    <!--</div>-->
                                                    <!--<div class="right">-->
                                                        <!--<p>技术评分 : <span>★★</span></p>-->
                                                        <!--<p>市场评分 : <span>☆</span></p>-->
                                                    <!--</div>-->
                                                </div>
                                            <!--</div>-->
                                            `
                        $('.main-name').html(mainNameHTML);
                    }
                }
            });

        }


        return specificationService;
    }
})(window, jQuery);
