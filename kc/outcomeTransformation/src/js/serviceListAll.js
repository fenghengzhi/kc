/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.serviceListAllService = serviceListAllService();


    function serviceListAllService() {
        var serviceListAllService = {};
        serviceListAllService.apply = function (supplierId, supplierName) {
            $('#applyBox *[name]').val('');
            $('#supplierId').val(supplierId);
            $('#supplierName').val(supplierName);

            toastr.box({content: $('#applyBox'), closeBtn: 0, title: false, zIndex: 1, area: ['auto', 'auto']});
        }
        serviceListAllService.submit = function () {
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
            commonService.initQuery(getInfo);
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }

        let pageSize = 9;

        function getInfo() {
            let supplierType = commonService.getSearchParm('supplierType');
            let pageNo = parseInt(commonService.getQuery('pageNo'), 10) || 1;
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transformation/list/supplier',
                // that: $('#content')[0],
                postData: {},
                urlData: {
                    supplierType,
                    pageNo,
                    pageSize
                },
                success: function (data) {
                    console.log(supplierType, data);
                    let html = '';
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
                                        <p style="margin-bottom:10px;">${d.domain ? d.domain.split(',')[0] : '&nbsp;'}</p>
                                        <p style="margin-bottom:11px;">${d.domain ? d.domain.split(',')[1] : '&nbsp;'}</p>
                                        <p style="margin-bottom:20px;">${d.domain ? d.domain.split(',')[2] : '&nbsp;'}</p>
                                    </div>
                                    <div class="btn">
                                        <button class="hu-btn btn-primary btn-sm" onclick="serviceListAllService.apply('${d.id}','${d.name}')">申请服务</button>
                                    </div>
                                </div>
                            </div>`;
                    }
                    $(`#patent-bx1 .carousel-list`).html(html);
                    $('#patent1 > div > div > h5').text((['', '专利代理', '金融服务', '成果转化', '法律服务', '专业学会', '科研设备', '人才培训', '管理咨询', '其他服务', '4', '5'])[supplierType]);
                    let total = Math.ceil(data.rsCount / pageSize);
                    // console.log(total);
                    gentPage(pageNo, total);
                }
            })
        }

        function gentPage(current, total) {
            let config = {
                data: {
                    id: 4
                },
                selector: '#page',
                total: total,
                showNum: 5,
                current: current,
                prevNextEnable: false,
                prevNextMultiEnable: true,
                startEndEnable: true,
                callback: function (event, pageNo, data) {
                    commonService.setQuery('pageNo', pageNo)


                }
            };
            new huPagination(config);
        }

        return serviceListAllService;
    }
})(window, jQuery);
