/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.universitihomeService = universitihomeService();

    function universitihomeService() {
        var universitihomeService = {};
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

        };
        function getData() {
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'universities/list/college',
                that: $('#content')[0],
                loadingColor: '#5f8bc9',
                urlData: {
                    pageNo: 1,
                    pageSize: 3
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var data = data.rsData;
                        var newDate = new Date();

                        for (var i = 0; i < data.length; i++) {
                            var brief=data[i].brief.substr(0,47)+'...';
                            newDate.setTime(data[i].publishTime);
                            // console.log(newDate.toLocaleDateString())
                            var html =
                                `<a href="universitidetail.html?id=${data[i].id}" class="universities">
                                 <img src="${data[i].image}" alt="logo">
                                <div class="cursor">
                                    <h3>${data[i].name}</h3>
                                    <p>${brief}</p>
                                </div>
                                </a>`;
                            $(".content1 .alliance-member .tb_universities").append(html);
                        }
                    }
                }
            });

            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'universities/list/meeting',
                that: $('#content')[0],
                loadingColor: '#5f8bc9',
                urlData: {
                    pageNo: 1,
                    pageSize: 3
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var data = data.rsData;
                        var newDate = new Date();
                        for (var i = 0; i < data.length; i++) {
                            newDate.setTime(data[i].publishTime);
                            // console.log(newDate.toLocaleDateString())
                            var html =
                                `<a href="conferencedetail.html?id=${data[i].id}" class="universities city-img">
                                    <img src="${data[i].image}" alt="img">
                                    <div class="meeting">
                                        <h4 title="${data[i].title}">${data[i].title}</h4>
                                        <h3>${data[i].universityName} <span>${newDate.toLocaleDateString()}</span></h3>
                                    </div>
                                </a>`;
                            $(".content1 .recommend-meeting .tb_meeting").append(html);
                        }
                    }
                }
            });

            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'universities/list/startup',
                that: $('#content')[0],
                loadingColor: '#5f8bc9',
                urlData: {
                    pageNo: 1,
                    pageSize: 6
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var data = data.rsData[0].rsData;
                        // console.log(data)
                        for (var i = 0; i < data.length; i++) {
                            var html =
                                `<a href="###}" class="universities city-img startup" >
                                        <h3>${data[i].title}</h3>
                                        <p>${data[i].brief}</p>
                                </a>`;
                            $(".content2 .alliance-member .tb_startup").append(html);
                        }
                    }
                }
            });

            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'universities/list/science',
                that: $('#content')[0],
                loadingColor: '#5f8bc9',
                urlData: {
                    pageSize: 6,
                    pageNo: 1
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var data = data.rsData;
                        for (var i = 0; i < data.length; i++) {
                            var html =
                                `<div class="universities city-img">
                                    <div class="meeting">
                                        <a href="academicdetail.html?id=${data[i].id}">《${data[i].title}》</a>
                                    </div>
                                </div>`;
                            $(".content2 .recommend-meeting .tb_science").append(html);
                        }
                    }
                }
            })
        }


        return universitihomeService;
    }


})(window, jQuery);
