/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.academicdetailService = academicdetailService();

    function academicdetailService() {
        var academicdetailService = {};

        academicdetailService.id = commonService.getSearchParm('id');

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
                type:0,
                url:configService.RESTFUL_SERVICE_BASE_URL + "universities/get/science",
                that:$("#content")[0],
                loadingColor:"#5f8bc9",
                urlData:{
                    id:academicdetailService.id
                },
                success:function (data) {
                    if(data && data.rsData &&data.rsData.length){
                        var data = data.rsData[0];
                        console.log(data)
                        var newDate = new Date();
                        newDate.setTime(data.publishTime);
                        var html =
                            ` <div class="top">
                                <h1>${data.title}</h1>
                                <div class="h2">${data.englishTitle}</div>
                                <h3>海南家谱研究现状探析[J].海南大学学报人文社科版,2011,(1) <span>${newDate.toLocaleDateString()}</span></h3>
                            </div>
                            <div class="digest">
                                <div class="h3">
                                    <h3>文章摘要</h3>
                                </div>
                                <div class="message">
                                    <div class="con">
                                        <!--<div><span>DOI： </span><p></p></div>-->
                                        <div><span>中文关键词: </span><p>${data.keyword?data.keyword:''}</p></div>
                                        <div><span>英文关键词: </span><p>${data.englishKeyword?data.englishKeyword:''}</p></div>
                                        <div><span>中文摘要: </span><p>${data.brief?data.brief:''}</p></div>
                                        <div><span>英文摘要: </span><p>${data.englishBrief?data.englishBrief:''}</p></div>
                                        <!--<div><span>基金项目: </span><p>海南省社科联基金项目(HNSK08-11); 海南省教育厅高校科研指导性项目(Hj2008-12)</p></div>-->
                                        <div><span>摘要点击次数: </span><p>${data.briefCount?data.briefCount:'0'}</p></div>
                                        <div><span>全文下载次数: </span><p>${data.contentCount?data.contentCount:'0'}</p></div>
                                    </div>
                                </div>
                            </div>`
                        $(".con").append(html);
                    }
                    
                }
            })
        }
        return academicdetailService;
    }
})(window, jQuery);
