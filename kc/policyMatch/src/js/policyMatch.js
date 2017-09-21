/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.policyMatchService = policyMatchService();

    function policyMatchService() {
        var policyMatchService = {};

        $(function () {
            allclick();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })
            $('.main-btn>.hu-btn').click(getData);
        }

        function getData() {
            let postData = huForm.getFormData($('.main-select'));
            console.log(postData);
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'policy/match',
                // that: $('#content')[0],
                postData,
                urlData: {
                    pageNo: 1,
                    pageSize: 10
                },
                success: function (data) {
                    console.log(data);
                    let html='';
                    if(!(data.rsData.length>0)){
                        html=`<div style="text-align: center"><img style="width: 100px;" src="../images/icon-no-data.svg" alt=""></div>`
                        $('.main-result-box>ul').html(html);
                        return;
                    }
                    for(let d of data.rsData){
                        html+=`<li>
                        <a title="${d.title}" href="policyMatchDetail.html?id=${d.id}" class="title">${d.title}</a>
                        <span class="time">${moment(d.publishTime).format('YYYY.MM.DD')}</span>
                    </li>`;
                    }
                    $('.main-result-box>ul').html(html);

                    // let total = Math.ceil(data.rsCount / pageSize);
                    // // console.log(total);
                    // gentPage(pageNo, total);
                }
            })
        }

        return policyMatchService;
    }
})(window, jQuery);
