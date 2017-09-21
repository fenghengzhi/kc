/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.popularhomeService = popularhomeService();

    function popularhomeService() {
        let popularhomeService = {};

        $(function () {
            allclick();
            getData();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

            $(".video-img").mouseover(function () {
                $(".video-img h2").css("display","block")
            })
        }

        function getData() {
            hieknjs.kgLoader({
                type:1,
                url:configService.RESTFUL_SERVICE_BASE_URL +'popular/science/list/base',
                that:$('.setting')[0],
                urlData:{
                    pageSize:8
                },
                success: function (data) {
                    if(data && data.rsData && data.rsData.length){
                        var data = data.rsData;
                        for(var i = 0;i < data.length;i ++ ){
                            var brief=data[i].brief
                            if(brief.length>50){
                                brief=data[i].brief.substr(0,40)+'...';
                            }
                            var html =
                                `<div class="img-page">
                                    <!--图片背景-->
                                    <div style="background-image: url(${data[i].photo})" class="wrap wrap1">
                                        ${data[i].name}
                                    </div>
                                    <!--下面详情-->
                                    <a href="basedetail.html?id=${data[i].id}" class="bg-img">
                                        <p>${brief}
                                        </p>
                                    </a>
                                </div>`;
                            $(".setting .tab-bg .tab-img").append(html);
                        }
                    }

                    $('.tab-img').slick({
                        infinite: true,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        autoplay: true,
                        autoplaySpeed: 2000,
                        arrows:true,
                        dots:true
                    });
                }
            });

            hieknjs.kgLoader({
                type:1,
                url:configService.RESTFUL_SERVICE_BASE_URL +'popular/science/list/video',
                that:$('.setting')[0],
                urlData:{
                    pageNo:1,
                    pageSize:3
                },
                success: function (data) {
                    if(data && data.rsData && data.rsData.length){
                        var data = data.rsData;
                        for(var i = 0;i < data.length;i ++ ){

                            var html =
                                `<a href="popularVideoDetails.html?id=${data[i].id}" class="video-img" style="overflow: hidden"><img src="${data[i].image?`../resources/popular_science_video/${data[i].image}`:'http://placehold.it/327x327'}" alt="">
                                   <h2>${data[i].title}</h2> 
                                </a>`;
                            $(".setting .video-bg").append(html);
                        }
                    }

                }
            });

            hieknjs.kgLoader({
                type:1,
                url:configService.RESTFUL_SERVICE_BASE_URL +'popular/science/list/expert',
                that:$('.setting')[0],
                urlData:{
                    pageNo:1,
                    pageSize:3
                },
                success: function (data) {
                    if(data && data.rsData && data.rsData.length){
                        var data = data.rsData;
                        for(var i = 0;i < data.length;i ++ ){
                            var html =
                                `<a href="expertdetail.html?id=${data[i].id}" class="experts1">
                                    <img src="${data[i].photo||`http://img.kechuang.cn/u${data[i].memberId}.jpg?imageMogr2/thumbnail/150x150&time=1504690694632`}" alt="">
                                    <div class="head">
                                        <h3>${data[i].name}</h3>
                                        <h3>${data[i].technicalTitle}</h3>
                                        <h3>${data[i].serviceType}</h3>
                                    </div>
                                </a>`;
                            $(".setting .experts-bg").append(html);
                        }
                    }

                }
            });

            hieknjs.kgLoader({
                type:1,
                url:configService.RESTFUL_SERVICE_BASE_URL +'popular/science/list/project',
                that:$('.setting')[0],
                urlData:{
                    pageNo:1,
                    pageSize:4
                },
                success: function (data) {
                    if(data && data.rsData && data.rsData.length){
                        var data = data.rsData;
                        for(var i = 0;i < data.length;i ++ ){
                            var html =
                                `<a href="specialdetail.html?id=${data[i].id}" class="one">
                                    <div class="round">
                                        <img src="../images/icon-list.png" alt="">
                                    </div>
                                    <p><wbr>${data[i].name}</p>
                                </a>`;
                            $(".setting .special-bg .special-left").append(html);
                        }
                    }

                }
            });
        }

        return popularhomeService;
    }
})(window, jQuery);
