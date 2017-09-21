/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.resourcesharingHomeService = resourcesharingHomeService();

    function resourcesharingHomeService() {
        var resourcesharingHomeService = {};

        $(function () {
            allclick();
            getData();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })
        }

        function getData() {
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transformation/list/supplier',
                that: $('.main')[0],
                postData: {},
                urlData: {
                    pageNo: 1,
                    pageSize: 4,
                    supplierType: 10
                },
                success: function (data) {
                    console.log(data.rsData[0]);
                    if (data && data.rsData && data.rsData.length) {
                        var html = '';
                        for (var val of data.rsData) {
                            html += `<div class="retrievaln-img commonality-img">
                                        <img src="${val.logo}" alt="LOGO">
                                        <a href="../resourceSharing/techSearchList.html"><h2 title="${val.name}">${val.name}</h2></a>
                                        <p title="${val.brief}">${val.brief.length < 50 ? val.brief : val.brief.substr(0, 50) + '...'}</p>
                                    </div>`
                        }
                        $('#searchNew').html(html);
                    }
                }
            })

        }


        return resourcesharingHomeService;
    }
})(window, jQuery);
