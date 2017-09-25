/**
 * Created by cc on 2017/8/29
 */
    $(document).ready(function(){
		$(".cc_tab li").on("click",function(){   //tab切换
			var _index=$(this).index();
			$(this).addClass("on").siblings().removeClass("on");
			$(this).parent(".cc_tab").next(".cc_tabF").find(".cc_tabC").eq(_index).show().siblings(".cc_tabC").hide();
		})
		
		$(".cc_tabs a").on("click",function(){   //tab切换
			var _index=$(this).index();
			$(this).addClass("on").siblings().removeClass("on");
			$(this).parent(".cc_tabs").next(".cc_tabsF").find(".cc_tabsC").eq(_index).show().siblings(".cc_tabsC").hide();
		})
		
		$(".search_con div a").click(function(){   //搜索
			$(this).addClass("on").siblings().removeClass("on");
		})
		
		$(".cc_info_select p").click(function(){
			$(this).parent().toggleClass("on").find("ul").toggle();
		})
				
		$(".cc_info_select ul li").click(function(){
			var _html=$(this).html();
			$(this).parents("ul").hide().prev("p").html(_html).parents(".cc_info_select").removeClass("on");
		})
		
		$(".cc_checkbox").click(function(){
			$(this).addClass("on").siblings(".cc_checkbox").removeClass("on");
		})
		
		$(".cc_radio").click(function(){
			$(this).toggleClass("on");
		})
		
		$(".cc_inputfile input").on("change",function(){
		    var filePath=$(this).val();
		    if(filePath.indexOf("jpg")!=-1 || filePath.indexOf("png")!=-1){
		        //$(".cc_inputfile .tips").html("").hide();
		        var arr=filePath.split('\\');
		        var fileName=arr[arr.length-1];
		        $(".cc_inputfile p").html(fileName);
		    }else{
		        $(".cc_inputfile p").html("");
		        //$(".cc_inputfile .tips").html("您未上传文件，或者您上传文件类型有误！").show();
		        return false 
		    }
		})
		
		$(".zhengce_tab a").click(function(){
			var _index=$(this).index();
			$(this).addClass("on").siblings().removeClass("on");
			$(".zhengce_tabc .noticeR").eq(_index).show().siblings().hide();
		})
		
		
			


	$(".floatdiv div").hover(function(){
		$(this).find("img").hide().siblings().show();
	},function(){
		$(this).find("img").show().siblings().hide();
	})
	
	$("#backtop").click(function(){
		document.documentElement.scrollTop = document.body.scrollTop =0;
	})
		
	window.onscroll = function(){ 
    	var t2 = document.documentElement.scrollTop || document.body.scrollTop;  
		if(t2>0){
			$("#backtop").show();
		}else{
			$("#backtop").hide();
		}
	}
	
})
