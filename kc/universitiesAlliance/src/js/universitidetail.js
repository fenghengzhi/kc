/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.universitidetailService = universitidetailService();

    function universitidetailService() {
        var universitidetailService = {};


        universitidetailService.id = commonService.getSearchParm('id');

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
                url: configService.RESTFUL_SERVICE_BASE_URL + 'universities/get/college',
                that: $('#content')[0],
                loadingColor: '#5f8bc9',
                urlData: {
                    id: universitidetailService.id
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var data = data.rsData[0];
                        // var newDate = new Date();
                        // newDate.setTime(data.startTime);
                        // console.log(data)
                        var teachersImageHTML='';
                        if(data.teachersImage){
                            teachersImageHTML=`<img src="${data.teachersImage}" alt="img">`;
                        }
                        var HTML =
                            `<div class="universities">
                                    <div class="details">
                                        <div class="logo">
                                            <h2>${data.name} <span>Hainan University</span></h2>
                                        </div>
                                        <p><img src="${data.image}" alt="logo">
                                            ${data.brief}
                                        </p>
                                    </div>
                        
                                </div>
                                <div class="message">
                                    <div class="left">
                                        <div class="con message-1">
                                            <p>创办时间 </p>
                                            <p>所属地区 </p>
                                            <p>学校类型 </p>
                                            <p>属性 </p>
                                        </div>
                                        <div class="con con-1 message-2">
                                            <p>${data.startTime}</p>
                                            <p>${data.location}</p>
                                            <p>${data.schoolType}</p>
                                            <p>${data.schoolAttr}</p>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="con message-3">
                                            <p>主管部门 </p>
                                            <p>类别 </p>
                                            <p>知名校友 </p>
                                            <p>学校官网 </p>
                                        </div>
                                        <div class="con con-1 message-4">
                                            <p>${data.competentDepartments}</p>
                                            <p>${data.category}</p>
                                            <p>${data.schoolmate || '&nbsp;'}</p>
                                            <p>${data.schoolLink}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="history">
                                    <div class="line">
                                        <span>历史沿革</span>
                                    </div>
                                    <div class="state">
                                        <div class="history-con">
                                          ${data.development}
                                        </div>
                                        <img src="${data.developmentImage}" alt="img">
                                    </div>
                                </div>
                                <div class="faculty">
                                    <div class="line">
                                        <span>师资力量</span>
                                    </div>
                                    <div class="state">
                                        <p>
                                            ${data.teachers}
                                        </p>
                                        ${teachersImageHTML}
                                    </div>
                                </div>`;
                        $('.main').append(HTML);
                    }
                }
            })
        }


        return universitidetailService;
    }
})(window, jQuery);
