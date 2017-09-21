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
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transformation/list/supplier',
                that: $('#content')[0],
                postData: {},
                urlData: {
                    supplierType: 11,
                    pageSize:3,
                    pageNo:1
                },
                success: function (data) {
                    if(data&&data.rsData&&data.rsData.length){
                        var html='';
                        for(var val of data.rsData){
                            html+=`<a href="IPRDetails.html?id=${val.id}" class="assessment-box">
                                        <div style="width: 305px;height: 250px;background: url(${val.logo})center no-repeat;background-size: 305px auto">
                                        
                                        </div>
                                        <!--<img style="width: 305px;height: 250px" src="${val.logo}" alt="LOGO">-->
                                        <div>
                                            <p>${val.name}</p>
                                            <span title="${val.brief}">${val.brief.length<30?val.brief:val.brief.substr(0,30)+'...'}</span>
                                        </div>
                                    </a>`
                        }
                        $('.assessment-con').html(html)
                    }

                }
            })
        }


        return indexService;
    }
})(window, jQuery);
