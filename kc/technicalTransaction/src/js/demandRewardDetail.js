/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';
    
    window.demandRewardDetailService = demandRewardDetailService();

    function demandRewardDetailService() {
        var demandRewardDetailService = {};

        demandRewardDetailService.id=commonService.getSearchParm('id');

        $(function () {
            allclick();
            getData();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

            //点击tab
            $('.tab-title').on('click', 'span', function () {
                $('.' + $(this).attr("id")).removeClass('hide').siblings('.tab-box').addClass('hide');
                if ($(this).attr('id') == 'tab-describe') {
                    $('.passAll').addClass('hide');
                    $('.tab-title').find('p').animate({'left': '0px'}, 200)
                } else if ($(this).attr('id') == 'tab-bidding') {
                    $('.passAll').addClass('hide');
                    $('.tab-title').find('p').animate({'left': '182px'}, 200)
                }else{
                    $('.passAll').removeClass('hide');
                    $('.tab-title').find('p').animate({'left': '91px'}, 200)
                }
            })

        }

        function getData() {
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/get/require',
                that: $('.main')[0],
                postData: {},
                urlData: {
                    id: demandRewardDetailService.id,
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var data = data.rsData[0];
                        var download;
                        console.log(data);
                        $('.tab-describe').html(data.content);
                        if(data.attachment && data.attachment!='[]'){
                            download='<a src="'+data.attachment+'" class="hu-btn btn-primary btn-md">下载</a>';
                        }else{
                            download='<button disabled class="hu-btn btn-primary btn-md">下载</button>';
                        }
                        // var endTime=
                        var endTime = data.endTime;
                        var newDate = new Date();
                        newDate.setTime(endTime);
                        endTime=newDate.toJSON().substr(0,10);
                        var startTime = data.startTime;
                        var newDate = new Date();
                        newDate.setTime(startTime);
                        startTime=newDate.toJSON().substr(0,10);
                        var html=`<div class="info-serviceProvider">
                                        <img src="http://101.226.6.177:8089/require_image/default.png" alt="user">
                                        <p>${data.counterpartyName?data.counterpartyName:''}</p>
                                    </div>
                                    <div class="info-con">
                                        <div class="info-con-title">${data.title}</div>
                                        <div class="info-con-imessage">
                                            <div>
                                                <p id="countDown"> <span> &nbsp;</span></p>
                                                <span>剩余时间</span>
                                            </div>
                                            <div>
                                                <p>${data.budget}<span></span></p>
                                                <span>投资预算</span>
                                            </div>
                                            <!--<div>-->
                                                <!--<p>0<span>人</span></p>-->
                                                <!--<span>参与人数</span>-->
                                            <!--</div>-->
                                        </div>
                                        <div class="info-con-btn">
                                            <button class="hu-btn btn-primary btn-md">我要投标</button>
                                        </div>
                                    </div>
                                    <div class="info-describe">
                                        <div class="info-describe-endTime">
                                            <p>截止时间:</p>
                                            <p>${endTime}</p>
                                        </div>
                                        <div class="info-describe-startTime">
                                            <p>开始时间:</p>
                                            <p>${startTime}</p>
                                        </div>
                                        <div class="info-describe-part">
                                            <p>领域分类:</p>
                                            <p>${domainData[data.domain] || ''}</p>
                                        </div>
                                        <div class="info-describe-describe">
                                            <p>简单表述:</p>
                                            <p></p>
                                        </div>
                                        <div class="info-describe-accessory">
                                            <p>附件下载:</p>
                                            ${download}
                                        </div>
                                    </div>`
                        $('.main-info').html(html);

                        var timer=setInterval(function () {
                            // var EndTime = new Date('2017/09/20 00:00:00');
                            var NowTime = new Date();
                            var t = data.endTime - NowTime.getTime();
                            if(t>0){
                                var d = Math.floor(t / 1000 / 60 / 60 / 24);
                                var h = Math.floor(t / 1000 / 60 / 60 % 24);
                                var m = Math.floor(t / 1000 / 60 % 60);
                                var s = Math.floor(t / 1000 % 60);
                                $('#countDown').html(d+'<span>天</span>'+h+'<span>小时</span>'+m+'<span>分钟</span>'+s+'<span>秒</span>')
                            }else{
                                $('#countDown').html('已结束');
                                clearInterval(timer);
                            }

                        }, 1000);
                    }
                }
            })
        }


        return demandRewardDetailService;
    }
})(window, jQuery);
