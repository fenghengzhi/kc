/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.indexItemService = indexItemService();

    function indexItemService() {
        var indexItemService = {};

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

        //高校联盟获取数据
        function getData() {
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'universities/list/college',
                that: $('.main')[0],
                postData: {},
                urlData: {
                    pageNo: 1,
                    pageSize: 4
                },
                success: function (data) {
                    console.log(data.rsData[0]);
                    if (data && data.rsData && data.rsData.length) {
                        var html='';
                        for(var val of data.rsData){
                            html+=`<a href="../universitiesAlliance/universitidetail.html?id=${val.id}" style="background: url(${val.briefImage})center no-repeat;background-size: auto 130px" class="University-img commonality-img">
                                        <h2 title="${val.name}">${val.name}</h2>
                                    </a>`
                        }
                        $('#tab-r1').html(html);
                    }
                }
            })

            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'universities/list/meeting',
                that: $('#tab-r2')[0],
                postData: {},
                urlData: {
                    pageNo: 1,
                    pageSize: 4
                },
                success: function (data) {
                    console.log(data.rsData[0]);
                    if (data && data.rsData && data.rsData.length) {
                        var html='';
                        for(var val of data.rsData){
                            html+=`<a href="../universitiesAlliance/conferencedetail.html?id=${val.id}" style="background: url(${val.image})center no-repeat;background-size: 200px 130px" class="University-img commonality-img">
                                        <h2 title="${val.title}">${val.title}</h2>
                                    </a>`
                        }
                        $('#tab-r2').html(html);
                    }
                }
            })
        }


        return indexItemService;
    }
})(window, jQuery);
