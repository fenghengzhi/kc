/**
 * Created by cc on 2017/9/22
 */

function mainmenu(indexmenu,submenu,highmenu){
	var menu='<div class="header-part1">';
        menu+='<div class="header-part1-con">';
        menu+='        <ul>';
        menu+='            <li><a href="首页.html">首页</a></li>';
        menu+='            <li><a href="项目简介.html">项目简介</a></li>';
        menu+='            <li><a href="院士谷.html">院士谷</a></li>';
        menu+='            <li><a href="zffw.htm">政府服务</a></li>';
        menu+='            <li><a href="沪琼合作首页.html">沪琼合作</a></li>';
        menu+='            <li><a href="/kc/outcomeTransformation/rightSearch.html">科技成果转化</a></li>';
        menu+='            <li><a href="科创资源共享首页.html">科创资源共享</a></li>';
        menu+='            <li><a href="index.html">大数据开放平台</a></li>';
        menu+='            <li><a href="/kc/popularSciencePlatform/popularhome.html">科普平台</a></li>';
        menu+='            <li><a href="海口今日科创介绍.html">海口今日科创</a></li>';
        menu+='            <li><a href="领导版客户端介绍.html">领导版客户端</a></li>';
        menu+='            <li><a href="影视周开幕式.html">影视周开幕式</a></li>';
        menu+='            <li><a href="/kc/innovativeService/index.html">科创服务</a></li>';
        menu+='        </ul>';
        menu+='        <div class="login">';
        menu+='            <span class="signin"><a href="###href053">登录</a></span>';
        menu+='            <span class="register"><a href="###href054">注册</a></span>';
        menu+='        </div>';
        menu+='    </div>';
        menu+='</div>';
        
        
        menu+='<div class="header-part2">';
        menu+='    <div class="logo">';
        menu+='        <a href="/haikou/首页.html"><img src="../images/logo.png" alt="LOGO"></a>';
        menu+='    </div>';
        menu+='    <ul>';
        
        switch(submenu)
		{
		case 1:
			        
        menu+='        <li><a href="zffw.htm">首页</a></li>';
        menu+='        <li><a href="通知通告.html">通知公告</a></li>';
        menu+='        <li><a href="政策法规.html">政策法规</a></li>';
        menu+='        <li><a href="###href015">在线办理</a></li>';
        menu+='        <li><a href="###href016">权力清单</a></li>';
        menu+='        <li><a href="/kc/policyMatch/policyMatch.html">科技政策匹配</a></li>';
		  break;
		case 2:
		
		menu+='        <li><a href="沪琼合作首页.html">首页</a></li>';
        menu+='        <li><a href="实验室共享.html">实验室共享</a></li>';
        menu+='        <li><a href="/kc/huqionghezuo/technicalliterature.html">科技文献</a></li>';
        menu+='        <li><a href="专家推荐.html">专家推荐</a></li>';
		  break;
		case 3:
		menu+='        <li><a href="###href012">首页</a></li>';
        menu+='        <li><a href="/kc/outcomeTransformation/rightSearch.html">全球知识产权库</a></li>';
        menu+='        <li><a href="/kc/outcomeTransformation/DemandList.html">成果转化开发平台</a></li>';
        menu+='        <li><a href="/kc/outcomeTransformation/rightSearch.html">第三方服务</a></li>';
        menu+='        <li><a href="基金.html">科创基金</a></li>';
        menu+='        <li><a href="###href015">技术交易市场</a></li>';
		  break;
		case 4:
		menu+='        <li><a href="科创资源共享首页.html">首页</a></li>';
        menu+='        <li><a href="共享业务管理.html">共享业务管理</a></li>';
        menu+='        <li><a href="创新载体展现.html">创新载体展示</a></li>';
        menu+='        <li><a href="人才检索.html">人才推荐</a></li>';
        menu+='        <li><a href="仪器共享.html">仪器共享</a></li>';
        menu+='        <li><a href="/kc/resourceSharing/intelligencePeriodical.html">科技情报</a></li>';
        menu+='        <li><a href="/kc/resourceSharing/techSearchList.html">科技查新</a></li>';
        menu+='        <li><a href="###href015">企业信息查询</a></li>';
		  break;
		case 5:
		menu+='        <li><a href="index.html">首页</a></li>';
        menu+='        <li><a href="Analysis.html">分析及建议</a></li>';
        menu+='        <li><a href="###href014">数据沙箱</a></li>';
        menu+='        <li><a href="innovate.html">创新开发平台</a></li>';
        menu+='        <li><a href="laboratory.html">大数据实验室</a></li>';
        menu+='        <li><a href="DataCooperation.html">大数据合作</a></li>';
        menu+='        <li><a href="Contest.html">数据竞塞平台</a></li>';
		  break;
		case 6:
		menu+='        <li><a href="/kc/popularSciencePlatform/popularhome.html">首页</a></li>';
        menu+='        <li><a href="###href013">科普基地</a></li>';
        menu+='        <li><a href="###href014">科普专家</a></li>';
        menu+='        <li><a href="###href015">科普专项</a></li>';
        menu+='        <li><a href="###href015">科普视频</a></li>';
		  break;  
		case 7:
		menu+='        <li><a href="海口今日科创介绍.html">海口今日科创介绍</a></li>';
		menu+='        <li><a href="领导版客户端介绍.html">领导版客户端介绍</a></li>';
        menu+='        <li><a href="影视周开幕式.html">影视周开幕式</a></li>';
		  break;    
		}

        menu+='    </ul>';
        menu+='</div>';
        
        
        
		$(".header").prepend(menu);
	
	
	if(indexmenu>-1){
		$(".header-part1-con").find("ul li").eq(indexmenu).addClass("selected");
	}
	if(highmenu>-1){
		$(".header-part2").find("ul li").eq(highmenu).addClass("selected");
	}
	
	var footer="        <div class=\'footer-top-bg\'>";
footer+="            <div class=\'footer-top\'>";
footer+="                <div class=\'footer-top-info\'>";
footer+="                    <div class=\'footer-top-info1\'>";
footer+="                        <p class=\'footer-title\'>联系我们</p>";
footer+="                        <p>地址：西海岸长滨路东二街市政府新行政办公区18栋</p>";
footer+="                        <p>服务热线：0755 0898-68724653</p>";
footer+="                        <p>传真：0755 0898-68724653</p>";
footer+="                    </div>";
footer+="                    <div class=\'footer-top-info2\'>";
footer+="                        <div class=\'footer-rq\'>";
footer+="                            <div>";
footer+="                                <img src=\'../images/cc/qrcode1.jpg\' alt=\'rq\'>";
footer+="                            </div>";
footer+="                            <div>";
footer+="                                <img src=\'../images/cc/qrcode2.jpg\' alt=\'rq\'>";
footer+="                            </div>";
footer+="                            <div>";
footer+="                                <img src=\'../images/cc/qrcode3.jpg\' alt=\'rq\'>";
footer+="                            </div>";
footer+="                        </div>";
footer+="                        <div class=\'footer-links\'>";
footer+="                            <ul>";
footer+="                                <li><a href=\'###href18\'>网站地图</a></li>";
footer+="                                <li><a href=\'###href19\'>常见问题</a></li>";
footer+="                                <li><a href=\'###href20\'>用户反馈</a></li>";
footer+="                                <li><a href=\'###href21\'>下载中心</a></li>";
footer+="                            </ul>";
footer+="                            <ul>";
footer+="                                <li><a href=\'###href22\'>平台介绍</a></li>";
footer+="                                <li><a href=\'###href23\'>法律声明</a></li>";
footer+="                                <li><a href=\'###href24\'>申请加盟</a></li>";
footer+="                                <li><a href=\'###href25\'>联系我们</a></li>";
footer+="                            </ul>";
footer+="                        </div>";
footer+="                    </div>";
footer+="                </div>";
footer+="                <div class=\'footer-top-otherslinks\'>";
footer+="                    <div class=\'footer-otherslinks-title\'>";
footer+="                        <ul>";
footer+="                            <li class=\'selected\'>政府部门网站</li>";
footer+="                            <li>其他国家、省市级公共服务平台</li>";
footer+="                            <li>企业服务网站</li>";
footer+="                        </ul>";
footer+="                    </div>";
footer+="                    <div class=\'footer-otherslinks-line\'></div>";
footer+="                    <div class=\'footer-otherslinks-links\'>";
footer+="                        <ul>";
footer+="                            <li><a href=\'###href026\'>海口市发展和改革委员会</a></li>";
footer+="                            <li><a href=\'###href027\'>海口市经济贸易和信息化委员会</a></li>";
footer+="                            <li><a href=\'###href028\'>海口市科技创新委员会</a></li>";
footer+="                            <li><a href=\'###href029\'>海口市财政委员会</a></li>";
footer+="                            <li><a href=\'###href030\'>海口市市场监督管理局（知识产权局）</a></li>";
footer+="                            <li><a href=\'###href031\'>海口市卫生和计划生育委员会</a></li>";
footer+="                            <li><a href=\'###href032\'>海口市投资推广署</a></li>";
footer+="                            <li><a href=\'###href033\'>海口市教育局</a></li>";
footer+="                            <li><a href=\'###href034\'>海口国家高技术产业创新中心</a></li>";
footer+="                        </ul>";
footer+="                    </div>";
footer+="                    <div class=\'hide footer-otherslinks-links\'>";
footer+="                        <ul>";
footer+="                            <li><a href=\'###href035\'>linkname01</a></li>";
footer+="                            <li><a href=\'###href036\'>linkname02</a></li>";
footer+="                            <li><a href=\'###href037\'>linkname03</a></li>";
footer+="                            <li><a href=\'###href038\'>linkname04</a></li>";
footer+="                            <li><a href=\'###href039\'>linkname05</a></li>";
footer+="                            <li><a href=\'###href040\'>linkname06</a></li>";
footer+="                            <li><a href=\'###href041\'>linkname07</a></li>";
footer+="                            <li><a href=\'###href042\'>linkname08</a></li>";
footer+="                            <li><a href=\'###href043\'>linkname09</a></li>";
footer+="                        </ul>";
footer+="                    </div>";
footer+="                    <div class=\'hide footer-otherslinks-links\'>";
footer+="                        <ul>";
footer+="                            <li><a href=\'###href044\'>linkname10</a></li>";
footer+="                            <li><a href=\'###href045\'>linkname11</a></li>";
footer+="                            <li><a href=\'###href046\'>linkname12</a></li>";
footer+="                            <li><a href=\'###href047\'>linkname13</a></li>";
footer+="                            <li><a href=\'###href048\'>linkname14</a></li>";
footer+="                            <li><a href=\'###href049\'>linkname15</a></li>";
footer+="                            <li><a href=\'###href050\'>linkname16</a></li>";
footer+="                            <li><a href=\'###href051\'>linkname17</a></li>";
footer+="                            <li><a href=\'###href052\'>linkname18</a></li>";
footer+="                        </ul>";
footer+="                    </div>";
footer+="";
footer+="                </div>";
footer+="            </div>";
footer+="        </div>";
footer+="        <div class=\'footer-bottom-bg\'>";
footer+="            <div class=\'footer-bottom\'>";
footer+="                <span>&copy;&nbsp;海口市科学技术工业信息化局主办&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;琼ICP备140655535号-2</span>";
footer+="            </div>";
footer+="        </div>";

$(".footer").html(footer);

	
	}

