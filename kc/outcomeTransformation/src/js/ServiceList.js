/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.ServiceListService = ServiceListService();

    function ServiceListService() {
        var ServiceListService = {};
        ServiceListService.apply = function (supplierId, supplierName) {
            $('#applyBox *[name]').val('');
            $('#supplierId').val(supplierId);
            $('#supplierName').val(supplierName);
            $('#supplierName2').val(supplierName);

            toastr.box({content: $('#applyBox'), closeBtn: 0, title: false, zIndex: 1, area: ['auto', 'auto']});
        }
        ServiceListService.submit = function () {
            let applyBox = $('#applyBox');
            if (commonService.checkData(applyBox)) {
                console.log(huForm.getFormData(applyBox));
                let bean = JSON.stringify(huForm.getFormData(applyBox));
                // let bean = huForm.getFormData(applyBox);
                hieknjs.kgLoader({
                    type: 1,
                    url: configService.RESTFUL_SERVICE_BASE_URL + 'transformation/add/service',
                    // that: $('#content')[0],
                    postData: {
                        bean
                    },
                    urlData: {},
                    success: function (data) {
                        console.log(data);
                        layer.closeAll();
                        toastr.info('申请成功');
                    }
                })
            }
        }
        $(function () {
            allclick();
            getInfo();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }

        function getInfo() {
            for (let supplierType of [1, 3, 2, 4, 5, 7, 8, 9]) {

                hieknjs.kgLoader({
                    type: 0,
                    url: configService.RESTFUL_SERVICE_BASE_URL + 'transformation/list/supplier',
                    // that: $('#content')[0],
                    postData: {},
                    urlData: {
                        supplierType,
                        pageNo: 1,
                        pageSize: 3
                    },
                    success: function (data) {
                        let html = '';
                        if (data && data.rsData && data.rsData.length) {
                            for (let d of data.rsData) {
                                html += `<div class="carousel-part">
                                <div class="top-part">
                                    <!--<div class="company-logo"><img style="margin:0 auto;width: 40px;height: 40px;" src="http://img.kechuang.cn/u${d.memberId}.jpg?imageMogr2/thumbnail/120x120&time=1504774799220" alt=""></div>-->
                                    <div class="top-part-mat">
                                        <div class="part-logo">
                                       <img src="../images/icon-company.svg" alt="">
                                        </div>
                                        <!--<a href="ServerDetail.html?id=${d.id}" class="part-title">${d.name}</a>-->
                                        <a class="part-title">${d.name}</a>
                                    </div>
                                    <div class="company-infor">${d.contactsTel ? d.contactsTel : '&nbsp'}</div>
                                    <div class="position">${d.address ? d.address : '&nbsp'}</div>
                                </div>
                                <div class="bottom-part">
                                    <div class="top-part-mat clearfix">
                                        <div class="part-logo"><img src="../images/icon-content.svg" alt=""></div>
                                        <div class="part-title">服务内容</div>
                                    </div>
                                    <div class="detail-information">
                                        <p style="margin-bottom:10px;">${d.domain ? d.domain.split(',')[0] : '&nbsp'}</p>
                                        <p style="margin-bottom:11px;">${d.domain ? d.domain.split(',')[1] : '&nbsp'}</p>
                                        <p style="margin-bottom:20px;">${d.domain ? d.domain.split(',')[2] : '&nbsp'}</p>
                                    </div>
                                    <div class="btn">
                                        <button class="hu-btn btn-primary btn-sm" onclick="ServiceListService.apply('${d.id}','${d.name}')">申请服务</button>
                                    </div>
                                </div>
                            </div>`;
                            }
                            $(`#patent-bx${supplierType} .carousel-list`).html(html);
                        } else {
                            $(`#patent-bx${supplierType} .carousel-list`).html('<img style="width: 200px;height: 200px;margin: 50px 330px 200px" src="../images/icon-no-data.svg">');
                        }

                    }
                })


            }


        }


        return ServiceListService;
    }
})(window, jQuery);
