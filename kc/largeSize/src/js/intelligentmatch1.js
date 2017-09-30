/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.intelligentmatch1Service = intelligentmatch1Service();

    function intelligentmatch1Service() {
        var intelligentmatch1Service = {};
        intelligentmatch1Service.willOpen = true;
        $(function () {
            allclick();
            $(window).on('resize',function(){
                console.log('test');
                var a=$('body').width()/1920;
                $('.main').css('transform',`translate(${-1920*(1-a)/2}px,${-1080*(1-a)/2}px) scale(${a})`);
                $('#modal').css('transform',` scale(${a})`);
            });
            $(window).trigger('resize')
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

            $(".cent h4").on("click", function () {
                var isSame = false;
                var that = $(this);
                $('.right div').find('span').each(function () {
                    if ($(this).text() == that.text()) {
                        isSame = true;
                        toastr.info('已添加')
                    }
                });

                if (!isSame) {
                    $(".right div").append(`<span>${$(this).text()}</span>`)
                }
            });
            $(".one").click(function () {
                $(".top .one img").css('display', 'block');
                $(".top .two img").css('display', 'none')
            });
            $(".two").click(function () {
                $(".top .two img").css('display', 'block');
                $(".top .one img").css('display', 'none');
            });
            $('.btn').click(function () {
                var a = {
                    content: $('#modal'),
                    title: '',
                    area: ['1920px', '1080px'],
                    shade: [0.8, '#393D49'],
                    closeBtn: 0,
                    anim: 5,
                    scrollbar: false
                };

                if (intelligentmatch1Service.willOpen) {
                    intelligentmatch1Service.willOpen = false;
                    $('.btn').addClass('move');
                    setTimeout(function () {
                        $('.btn').removeClass('move');
                        toastr.box(a);
                        intelligentmatch1Service.willOpen = true;
                    }, 3000)
                }


            });
            $(".close").click(function () {
                console.log(1);
                layer.closeAll();
            });


            setInterval(function () {
                var EndTime = new Date('2017/10/20 00:00:00');
                var NowTime = new Date();
                var t = EndTime - NowTime.getTime();
                var d = Math.floor(t / 1000 / 60 / 60 / 24);
                var h = Math.floor(t / 1000 / 60 / 60 % 24);
                var m = Math.floor(t / 1000 / 60 % 60);
                var s = Math.floor(t / 1000 % 60);

                $('.t_d').text(d);
                $('.t_h').text(h);
                $('.t_m').text(m);
                $('.t_s').text(s);
            }, 1000);
        }


        return intelligentmatch1Service;
    }
})(window, jQuery);
