/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.IPRDetailsService = IPRDetailsService();

    function IPRDetailsService() {
        var IPRDetailsService = {};
        IPRDetailsService.id=commonService.getSearchParm('id');

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
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transformation/get/supplier',
                that: $('.main')[0],
                postData: {
                },
                urlData: {
                    id: IPRDetailsService.id
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var data=data.rsData[0];
                        var html=`<div class="main-part1">
                                    <div class="main-part1-header">全球知识产权</div>
                                    <div class="main-part1-con">
                                        <!--<div class="con-left"><img src="http://img.kechuang.cn/u${data.memberId}.jpg?imageMogr2/thumbnail/1200x120&time=1504774799220" alt=""></div>-->
                                        <div class="con-mid">
                                            <div class="title">${data.name}</div>
                                            <div class="lines">
                                                <!--<div class="line">服务价格：<span>￥4500.00</span></div>-->
                                                <!--<div class="line">服务商：泰斗知识产权</div>-->
                                                <!--<div class="line">服务类型：专利服务</div>-->
                                                <div class="line">地址：${data.address?data.address:''}</div>
                                                <div class="line">网址：${data.url?data.url:''}</div>
                                                <div class="line">联系电话：${data.contactsTel?data.contactsTel:''}</div>
                                            </div>
                                        </div>
                                        <div class="con-right">
                                            <!--<a class="hu-btn btn-primary-outline">立即咨询</a>-->
                                            <!--<a class="hu-btn btn-primary">申请服务</a>-->
                                        </div>
                                    </div>
                                </div>
                                    <div class="main-part2">
                                        <div class="main-part2-header">服务描述</div>
                                        <div class="main-part2-con">
                                            ${data.domain?data.domain:''}
                                            ${data.aptitude?data.aptitude:''}
                                            <br>
                                            ${data.content?data.content:''}
                                        </div>
                                    </div>`
                        $('.main').html(html);
                    }else{
                        $('.main-con').html('<div style="display: flex;justify-content: center;align-content: center;width: 100%;"><img style="display: flex;width: 200px;height: 200px;margin: 50px auto 200px" src="../images/icon-no-data.svg"></div>');
                    }
                }
            })
        }


        return IPRDetailsService;
    }
})(window, jQuery);
