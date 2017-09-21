/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.meetinginformationService = meetinginformationService();

    function meetinginformationService() {
        var meetinginformationService = {};

        $(function () {
            allclick();
            editInit();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

            $(".message").click(function () {
                layer.closeAll();
            });
            $('#tj1').on('click',function () {
                // var data = huForm.getFormData($('#form'));
                // console.log(data);
                var b= commonService.checkData($('#tab-bt1'));
                if(b){
                    var a={
                        content: $('#myModal')
                    };
                    toastr.box(a)
                }
            });

            $('#tj2').on('click',function () {
                // var data = huForm.getFormData($('#form'));
                // console.log(data);
                var b= commonService.checkData($('#tab-bt2'));
                if(b){
                    var a={
                        content: $('#myModal')
                    };
                    toastr.box(a)
                }
            
            });

            $('#tj3').on('click',function () {
                // var data = huForm.getFormData($('#form'));
                // console.log(data);
                var b= commonService.checkData($('#tab-bt3'));
                if(b){
                    var a={
                        content: $('#myModal')
                    };
                    toastr.box(a)
                }
            
            });

            $('#tj1').on('click',function () {
                var data = huForm.getFormData($('#tab-bt1'));
                console.log(data)
            });
            $('#tj2').on('click',function () {
                var data = huForm.getFormData($('#tab-bt2'));
                console.log(data)
            });
            $('#tj3').on('click',function () {
                var data = huForm.getFormData($('#tab-bt3'));
                console.log(data)
            })

        }


        return meetinginformationService;
    }


    function editInit() {
        var toolbarOptions = [
            ['bold', 'italic', 'underline'],

            [{'header': 1}, {'header': 2}],               // custom button values
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent

            [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown

            [{'color': []}],          // dropdown with defaults from theme
            [{'font': []}],
            [{'align': []}],

            ['link', 'image']                                         // remove formatting button
        ];
        var options = {
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: '请输入会议正文',
            theme: 'snow'
        };
        var quill = new Quill('#richTextEdit', options);
        $('#getEditData').on('click', function () {
            var data = $('#richTextEdit').find('.ql-editor').html();
            console.log(data);
        })
    }
    

})(window, jQuery);




