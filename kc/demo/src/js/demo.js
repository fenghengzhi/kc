/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.demoService = demoService();

    function demoService() {
        var demoService = {};

        $(function () {
            allclick();
            // area();
            // field();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

            $('#addDomain').on('click', function () {
                var data = huForm.getFormData($('.domainAdd1'));
                if (data.domain1) {
                    var tagtext = domainData[data.domain1];
                    data.domain2 && (tagtext+= '>' + domainData[data.domain2]);
                    data.domain3 && (tagtext+= '>' + domainData[data.domain3]);
                    data.domain4 && (tagtext+= '>' + domainData[data.domain4]);
                    var tagdata = huForm.getFormData($('#tag'));
                    if (tagdata.tag) {
                        var isSame = false;
                        for (var i = 0; i < tagdata.tag.length; i++) {
                            if (tagdata.tag[i] == tagtext) {
                                isSame = true;
                            }
                        }
                        if (isSame) {
                            toastr.info('该领域已选择')
                        } else {
                            tagdata.tag.push(tagtext)
                        }

                    } else {
                        tagdata.tag = [];
                        tagdata.tag.push(tagtext)
                    }
                    huForm.setFormData($('#tag'), tagdata);
                } else {
                    toastr.info('请选择')
                }
            });
            $('#addDomain2').on('click', function () {
                var tagtext = huForm.getFormData($('.domainAdd2')).domain5;
                if(tagtext){
                    var tagdata = huForm.getFormData($('#tag'));
                    if (tagdata.tag) {
                        var isSame = false;
                        for (var i = 0; i < tagdata.tag.length; i++) {
                            if (tagdata.tag[i] == tagtext) {
                                isSame = true;
                            }
                        }
                        if (isSame) {
                            toastr.info('该领域已选择')
                        } else {
                            tagdata.tag.push(tagtext)
                        }

                    } else {
                        tagdata.tag = [];
                        tagdata.tag.push(tagtext)
                    }
                    huForm.setFormData($('#tag'), tagdata);
                    $('.domainAdd2').find('input').val('');
                }else{
                    toastr.info('请输入')
                }

            });
            $('#otherDomain').on('click', function () {
                $('.domainAdd1').addClass('hide');
                $('.domainAdd2').removeClass('hide');
            });
            $('#backToDomain').on('click', function () {
                $('.domainAdd1').removeClass('hide');
                $('.domainAdd2').addClass('hide');
            });

            $('#getDateVal').on('click',function () {
                var data = huForm.getFormData($('.time'));
                console.log(data)
            })
        }



        //三级地址
        // function area() {
        //     for (var i = 0; i < provinceList.length; i++) {
        //         $('.hu-select[name=province]').find('ul').append('<li hu-data-value="' + provinceList[i].id + '">' + provinceList[i].province + '</li>')
        //     }
        // }
        //
        //
        //
        //
        //
        // //技术领域
        // var domainarr = _.toPairs(domainData);
        //
        // function field() {
        //     var domain1 = _.filter(domainarr, function (o) {
        //         return o[0].length == 1
        //     });
        //     for(var i=0;i<domain1.length;i++){
        //         $('.hu-select[name=domain1]').find('ul').append('<li hu-data-value="' + domain1[i][0] + '">' + domain1[i][1] + '</li>')
        //     }
        //
        // }


        return demoService;
    }
})(window, jQuery);
