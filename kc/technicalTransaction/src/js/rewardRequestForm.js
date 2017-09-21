/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.rewardRequestFormService = rewardRequestFormService();

    function rewardRequestFormService() {
        var rewardRequestFormService = {};

        $(function () {
            allclick();
            initTimer();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

            //点击下一页
            $('#nextpage').click(function () {
                var isPass = commonService.checkData($('.main-form1'));
                if (isPass) {
                    $('.main-form1').addClass('hide');
                    $('.main-form2').removeClass('hide');
                }
            });
            $('#back').click(function () {
                $('.main-form1').removeClass('hide');
                $('.main-form2').addClass('hide');
            });
            $('#submit').click(function () {
                var isPass = commonService.checkData($('.main-form1'));
                if (isPass) {
                    var data=huForm.getFormData($('.main-form'));
                    console.log(data);
                }
            });


        }

        function initTimer() {
            flatpickr("#timer", {
                minDate: "today",
                locale: "zh", mode: 'range', onChange: function (selectedDates, dateStr, instance) {
                    $('#startTime').val(instance.maxRangeDate.valueOf());
                    $('#endTime').val(instance.minRangeDate.valueOf());
                }
            });
        }


        return rewardRequestFormService;
    }
})(window, jQuery);
