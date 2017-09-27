window.onload=function(){

    //================================================================菜单插入结构==============================================///

    var htmla=[];
    $.ajax({
        url:"json/nav.json",
        dataType:"json",
        async:true,
        type:"get",
        success:function(data){
            var items=data;
            for(var i=0;i<items.length;i++){
                htmla[i]=''; //清undefined
                htmla[i]+='<div class="popup" attr="'+i+'">'+   //记录下标
                    '<div class="ponav">'+
                    '<div class="ponavv">'+
                    '<ul>'+
                    '<li><a class="ponavact" href="'+items[i].itemsTop[0].itemsTopLink+'">'+items[i].itemsTop[0].itemsTopTitle+'</a><i class="ponavacts">></i></li>';
                for(var j=1;j<items[i].itemsTop.length;j++){
                    htmla[i]+='<li><a href="'+items[i].itemsTop[j].itemsTopLink+'">'+items[i].itemsTop[j].itemsTopTitle+'</a><i>></i></li>';
                }
                htmla[i]+= '</ul>'+
                    '</div>'+
                    '<div class="pocon">';
                for(var k=0;k<items[i].subContent.length-1;k++){
                    htmla[i]+=
                        '<dl>'+
                        '<dt><i>></i><a href="'+items[i].subContent[k].subTitleLink+'">'+items[i].subContent[k].subTitle+'</a></dt>';
                    htmla[i]+='<dd>';
                    for(var l=0;l<items[i].subContent[k].subOps.length;l++) {
                        htmla[i] += '<a href="' + items[i].subContent[k].subOps[l].subOLink + '">' + items[i].subContent[k].subOps[l].subOp + '</a>';
                    }
                    htmla[i]+='</dd>'+
                        '</dl>';
                }
                htmla[i]+='<dl>'+  //清除最后一行dd的下划线
                    '<dt><i>></i><a href="'+items[i].subContent[items[i].subContent.length-1].subTitleLink+'">'+items[i].subContent[items[i].subContent.length-1].subTitle+'</a></dt>'+
                    '<dd class="ddnone">';
                for(var o=0;o<items[i].subContent[items[i].subContent.length-1].subOps.length;o++) {
                    htmla[i] += '<a href="' + items[i].subContent[items[i].subContent.length-1].subOps[o].subOLink + '">'+items[i].subContent[items[i].subContent.length-1].subOps[o].subOp + '</a>';
                }
                htmla[i]+='</dd>'+
                    '</dl>'+
                    '</div>'+
                    '</div>'+
                    '<div class="poadver">';
                if(items[i].itemImg){
                    htmla[i]+='<i></i>';
                    for(var m=0;m<(items[i].itemImg.length)-2;m++){
                        htmla[i]+='<a href="'+items[i].itemImg[m].itemImgLink+'">'+items[i].itemImg[m].itemImgTitle+'</a>';
                    }
                    for(var n=(items[i].itemImg.length)-2;n<items[i].itemImg.length;n++){
                        htmla[i]+='<a href="'+items[i].itemImg[n].itemImgLink+'">'+items[i].itemImg[n].itemImgTitle+'</a>';
                    }
                }
                htmla[i]+='</div>';
            }
        }
    });

    //==========================================================菜单悬停事件委派===================================================//

    var timer1;
    var timer2;
    var timer3;
    // $('.wrap').append(htmla[0]);
    // $('.wrap').children('.popup').animate({'opacity':1},200);

    var oLi=$('.banav>ul').children('li');
    $(oLi).hover(function(){
        $(this).addClass('atc').siblings().removeClass('atc');
        var num=$(this).index();
        timer1=setTimeout(function(){
            $('.wrap').append(htmla[num]);
            $('.wrap').children('.popup').animate({'opacity':1},100);
        },100);
    },function(){
        $(oLi).removeClass('atc');
        timer2=setTimeout(function(){
            $('.wrap').children('.popup').animate({'opacity':0},100);
            $('.wrap').children('.popup').remove();
        },100);
        clearTimeout(timer1);
    });
    $(document).on("mouseover",".popup",function(event){
        clearTimeout(timer2);
        $(oLi).eq($(this).attr("attr")).addClass('atc');
    });
    $(document).on("mouseout",".popup",function(event){
        $(oLi).eq($(this).attr("attr")).removeClass('atc');
        timer2=setTimeout(function(){
            $('.wrap').children('.popup').animate({'opacity':0},100);
            $('.wrap').children('.popup').remove();
        },100);
    });

    $('.navv').hover(function(){
        $('.isp').css({transition:'all 0.6s',transform:'rotate(180deg)'},600);
    },function(){
        $('.isp').css({transition:'all 0.6s',transform:'rotate(360deg)'},600);
    });

    //==================================================详情页城市选择====================================================//

    $.ajax({
        url:"json/city.json",
        dataType:"json",
        async:true,
        type:"get",
        success:function(data){
            var citys=data;
            var nump;
            var numc;
            function provinceAddtion(){  //填入省
                for(var i=0;i<citys.length;i++){
                    $('.loaclcity>tbody>tr').append('<td></td>');
                }
                $('.loaclcity td').each(function(i,elm){
                    $(this).text(citys[i].name);
                    provincelevel($(this));
                });
            }
            function cityAddtion(y){   //填入市
                for(var j=0;j<citys[y].cities.length;j++){
                    $('.loaclcity>tbody>tr').append('<td></td>');
                }
                $('.loaclcity td').each(function(i,elm){
                    $(this).text(citys[y].cities[i].name);
                    citylevel($(this));
                });
            }
            function circlesAddtion(y,yy){   //填入区
                for(var j=0;j<citys[y].cities[yy].counties.length;j++){
                    $('.loaclcity>tbody>tr').append('<td></td>');
                }
                $('.loaclcity td').each(function(i,elm){
                    $(this).text(citys[y].cities[yy].counties[i].name);
                    circleslevel($(this));
                });
            }
            provinceAddtion();   //初期默认插入省列表
            function provincelevel(x){      //点击省触发json判断对应城市列表
                x.click(function(){
                    nump=$(this).index();
                    $('.locationtab li:eq(0)').text(x.text()).removeClass('localliatc');
                    $('.locationtab li:eq(1)').removeClass('loacllidisable');
                    $('.locationtab li:eq(1)').addClass('localliatc');
                    $('.loaclcity>tbody>tr').children().remove();
                    cityAddtion(nump);
                });
            }
            function citylevel(xx){           //点击市触发json判断对应区列表
                xx.click(function(){
                    numc=$(this).index();
                    $('.locationtab li:eq(1)').text(xx.text()).removeClass('localliatc');
                    $('.locationtab li:eq(2)').removeClass('loacllidisable');
                    $('.locationtab li:eq(2)').addClass('localliatc');
                    $('.loaclcity>tbody>tr').children().remove();
                    circlesAddtion(nump,numc);
                });
            }
            function circleslevel(xxx){    //点击区返回值并关闭菜单
                xxx.click(function(){
                    $('.locationtab li:eq(2)').text(xxx.text());
                    $('.alocation').text($('.locationtab li:eq(0)').text()+$('.locationtab li:eq(1)').text()+$('.locationtab li:eq(2)').text());
                    $('.alocation').append('<i>');
                    $('.alocation>i').text('◇');
                    $('.location').removeClass('localactive');
                    $('.alocation').removeClass('alocation2');
                });
            }
            $('.locationtab li').click(function(){    //电击之前标签页刷新原先列表
                $(this).addClass('localliatc').siblings().removeClass('localliatc');
                if($(this).index()==0){$('.loaclcity>tbody>tr').children().remove();provinceAddtion();}
                if($(this).index()==1){$('.loaclcity>tbody>tr').children().remove();cityAddtion(nump)}
                if($(this).index()==2){$('.loaclcity>tbody>tr').children().remove();circlesAddtion(nump,numc)}
            });
        }
    });

    //==========================================================点击插入城市选择窗口===========================================================//


    $.fn.stayShow($('.alocation'),$('.location'),'alocation2','localactive','location'); //调用原型悬停显示菜单函数

    $('.localcl').click(function(){
        if($('.localcl').next().hasClass('localcw')){
            $('.localcl>i').css({transition:'all 0.6s',transform:'rotate(360deg)'},600);
            $('.localcl').next().removeClass('localcw')
        }else{
            $('.localcl>i').css({transition:'all 0.6s',transform:'rotate(180deg)'},600);
            $('.localcl').next().addClass('localcw')
        }
    });


    //======================================================================head区发货选择城市=====================================================================//

    $.fn.stayShow($('.sendto'),$('.address01'),'tableact','headatc','address01'); //调用原型悬停显示菜单函数
    $(document).on("click","td",function(event){  //点击返回城市
        $('.sendto>a').text($(this).text());
        timer3=setTimeout(function(){
            $('.sendto>i').css({transition:'all 0.6s',transform:'rotate(360deg)'},600);
            $('.address01').removeClass('headatc');
            $('.sendto').removeClass('tableact');
        },200);
    });


    //================================================左侧导航条============================================================//

    $(window).scroll(function(){
        if($(window).scrollTop()>1400) {
            $('.guide').slideDown();
        }else{
            $('.guide').slideUp();
        }
        $('.gl1').each(function() {
            var gap = $(this).offset().top - $(window).scrollTop();
            if (gap >= -570 && gap < 230) {
                $('.guide a').eq($(this).attr("attr")).addClass('a2').parents('li').siblings().children('a').removeClass('a2');
            }
        });
    });

    $('.guide li').click(function(){
        var dist=0;
        switch($(this).index()){
            case 0:dist=1730;break;
            case 1:dist=2492;break;
            case 2:dist=3239;break;
            case 3:dist=3840;break;
            case 4:dist=4443;break;
            case 5:dist=5190;break;
            case 6:dist=5792;break;
            case 7:dist=6393;break;
            case 8:dist=6996;break;
            case 9:dist=7743;break;
            case 10:dist=8345;break;
            case 11:dist=8942;break;
        }
        $('html,body').animate({"scrollTop":dist},500);
    });
    //=================================================右侧功能条==========================================================//

    $('.rightside li').hover(function(){
        $(this).children('p').animate({"right":30},200);
        $(this).children('a').css("background-color","#c81623");
    },function(){
        var that=$(this);
        $(this).children('p').animate({"right":-45},200);
        timer1=setTimeout(function(){
            that.children('a').css("background-color","#666");
        },300);
    });


    $(document).on("click",".backtop",function(event){
        $('html,body').animate({"scrollTop":0},500);
    });

    //=====================================================你喜欢一闪动画=============================================================//

    $(window).scroll(function(){
        if($(window).scrollTop()>500) {
            $('.youliketiao').animate({"left":845},200);
        }
    });

    //=================================================banner轮播图/选项卡/详情页轮播/小图片预览===================================================//

    $('.bannerp').tabImgMoving();
    $('#f1').tabImgsimple();
    $('.recommend').tabImgMovingButtonly();
    $('.picreview').tabImg();

    //================================================放大镜==========================================================================================//

    var oSpan=$('.box1 span');
    $('.box1').mousemove(function(ev){
        oSpan.removeClass('hide');
        $('.box2').removeClass('hide');
        var l=ev.clientX-$(this).offset().left-oSpan.width()/2;
        var t=ev.clientY-$(this).offset().top-oSpan.height()/2;
        if(l<0){l=0;}
        if(t<0){t=0;}
        var max_l=$(this).width()-oSpan.width();
        var max_t=$(this).height()-oSpan.height();
        if(l>max_l){l=max_l;}
        if(t>max_t){t=max_t;}
        oSpan.css({'left':l,'top':t});
        $('.box2 img').css({'left':-l*1.777,'top':-t*1.777});
    });
    $('.box1').mouseleave(function(ev) {
        oSpan.addClass('hide');
        $('.box2').addClass('hide');
    });

    //===============================================其他型号选项卡======================================================================================//
    var cardinform=[
        {
            "cardname":"迪兰（Dataland）DEVIL RX580 8G 1411-1439/8000MHz 8GB/256-bit GDDR5 DX12独立游戏显卡",
            "cardprice":"3599.00",
            "cardpic":[
                {
                    "url":"images/a1.jpg"
                },
                {
                    "url":"images/a2.jpg"
                },
                {
                    "url":"images/a3.jpg"
                },
                {
                    "url":"images/a4.jpg"
                },
                {
                    "url":"images/a5.jpg"
                },
                {
                    "url":"images/a6.jpg"
                },
                {
                    "url":"images/a7.jpg"
                }
            ]
        },
        {
            "cardname":"迪兰（Dataland）RX 580 8G X-Serial 战神 1355-1380/8000MHz 8GB/256-bit GDDR5 DX12 独立显卡 VR游戏显卡",
            "cardprice":"3499.00",
            "cardpic":[
                {
                    "url":"images/b1.jpg"
                },
                {
                    "url":"images/b2.jpg"
                },
                {
                    "url":"images/b3.jpg"
                },
                {
                    "url":"images/b4.jpg"
                },
                {
                    "url":"images/b5.jpg"
                },
                {
                    "url":"images/b6.jpg"
                }
            ]
        },
        {
            "cardname":"迪兰（Dataland）RX 580 8G X-Serial 1340-1355/8000MHz 8GB/256-bit GDDR5 DX12独立游戏显卡",
            "cardprice":"3499.00",
            "cardpic":[
                {
                    "url":"images/c1.jpg"
                },
                {
                    "url":"images/c2x.jpg"
                },
                {
                    "url":"images/c3x.jpg"
                },
                {
                    "url":"images/c4x.jpg"
                },
                {
                    "url":"images/c5.jpg"
                },
                {
                    "url":"images/c6.jpg"
                }
            ]
        },
        {
            "cardname":"迪兰（Dataland）RX 580 4G X-Serial 战神 1340-1350/7000MHz 4GB/256-bit GDDR5 DX12 独立显卡 VR游戏显卡",
            "cardprice":"2799.00",
            "cardpic":[
                {
                    "url":"images/d1.jpg"
                },
                {
                    "url":"images/d2.jpg"
                },
                {
                    "url":"images/d3.jpg"
                },
                {
                    "url":"images/d4.jpg"
                },
                {
                    "url":"images/d5.jpg"
                },
                {
                    "url":"images/d6.jpg"
                }
            ]
        },
        {
            "cardname":"迪兰（Dataland）RX 570 4G X-Serial 战将 1244-1270/7000MHz 4GB/256-bit GDDR5 DX12独立游戏显卡",
            "cardprice":"2799.00",
            "cardpic":[
                {
                    "url":"images/e1.jpg"
                },
                {
                    "url":"images/e2.jpg"
                },
                {
                    "url":"images/e3.jpg"
                },
                {
                    "url":"images/e4.jpg"
                },
                {
                    "url":"images/e5.jpg"
                },
                {
                    "url":"images/e6.jpg"
                }
            ]
        },
        {
            "cardname":"迪兰（Dataland）RX 560 4G X-Serial 战神 1313/7000MHz 4GB/128-bit GDDR5 DX12独立游戏显卡",
            "cardprice":"999.00",
            "cardpic":[
                {
                    "url":"images/f1.jpg"
                },
                {
                    "url":"images/f2.jpg"
                },
                {
                    "url":"images/f3.jpg"
                },
                {
                    "url":"images/f4.jpg"
                },
                {
                    "url":"images/f5.jpg"
                },
                {
                    "url":"images/f6.jpg"
                }
            ]
        },
        {
            "cardname":"迪兰（Dataland）RX 560 2G X-Serial 战将 1180/7000MHz 2GB/128-bit GDDR5 DX12独立游戏显卡",
            "cardprice":"799.00",
            "cardpic":[
                {
                    "url":"images/g1.jpg"
                },
                {
                    "url":"images/g2.jpg"
                },
                {
                    "url":"images/g3.jpg"
                },
                {
                    "url":"images/g4.jpg"
                },
                {
                    "url":"images/g5.jpg"
                },
                {
                    "url":"images/g6.jpg"
                }
            ]
        },
        {
            "cardname":"迪兰（Dataland）RX 460 4G X-Serial 1236/7000MHz 4GB/128-bit GDDR5 DX12 独立显卡 游戏显卡",
            "cardprice":"999.00",
            "cardpic":[
                {
                    "url":"images/h1.jpg"
                },
                {
                    "url":"images/h2.jpg"
                },
                {
                    "url":"images/h3.jpg"
                },
                {
                    "url":"images/h4.jpg"
                },
                {
                    "url":"images/h5.jpg"
                },
                {
                    "url":"images/h6.jpg"
                },
                {
                    "url":"images/h7.jpg"
                },
                {
                    "url":"images/h8.jpg"
                }
            ]
        },
        {
            "cardname":"迪兰（Dataland）RX 460 酷能4G 1212/7000MHz 4G/128-bit GDDR5 DX12 独立显卡 游戏显卡",
            "cardprice":"899.00",
            "cardpic":[
                {
                    "url":"images/i1.jpg"
                },
                {
                    "url":"images/i2.jpg"
                },
                {
                    "url":"images/i3.jpg"
                },
                {
                    "url":"images/i4.jpg"
                },
                {
                    "url":"images/i5.jpg"
                },
                {
                    "url":"images/i6.jpg"
                }
            ]
        },
        {
            "cardname":"迪兰（Dataland）RX 460 酷能2G 1212/7000MHz 2G/128-bit GDDR5 DX12 独立显卡 游戏显卡",
            "cardprice":"799.00",
            "cardpic":[
                {
                    "url":"images/j1.jpg"
                },
                {
                    "url":"images/j2.jpg"
                },
                {
                    "url":"images/j3.jpg"
                },
                {
                    "url":"images/j4.jpg"
                },
                {
                    "url":"images/j5.jpg"
                },
                {
                    "url":"images/j6.jpg"
                },
                {
                    "url":"images/j7.jpg"
                }
            ]
        }
    ];
    //下窗口归零使用距离量
    $('.selectOptions li').click(function(){
        $(this).children('a').addClass('cardact');
        $(this).siblings().children('a').removeClass('cardact');
        $('.olrance>ol').css("left","0");
        $('.detailContentRight h3').text(cardinform[$(this).index()].cardname);
        $('.price h2').html('<i>￥</i>'+cardinform[$(this).index()].cardprice);
        $('.box1>ul').children().remove();
        $('.box2>ul').children().remove();
        $('.olrance>ol').children().remove();
        var htmlcard="";
        for(var i=0;i<cardinform[$(this).index()].cardpic.length;i++){
            htmlcard+="<li><img src="+cardinform[$(this).index()].cardpic[i].url+"/></li>";
        }
        $('.box1>ul').append(htmlcard);
        $('.box2>ul').append(htmlcard);
        $('.olrance>ol').append(htmlcard);
        $('.box1>ul li').eq(0).show().siblings().hide();
        $('.bigzoom>ul li').eq(0).show().siblings().hide();
        $('.olrance>ol li').eq(0).addClass('liact').siblings().removeClass('liact');
    });
    //=================================================数量增加=============================================================//

    $('.plus').click(function(){
        var tem=1+parseInt($('.amount').val());
        $('.amount').val(tem);
        if(parseInt($('.amount').val())!=0){
            $('.reduce').removeAttr("disabled");
        }
    });
    $('.reduce').click(function(){
        if($('.amount').val()>0){
            var tem=-1+parseInt($('.amount').val());
            $('.amount').val(tem);
            if(parseInt($('.amount').val())==0){
                $('.reduce').attr("disabled","true");
            }
        }
    });

    //=================================================结算=======================================//

    function motalwindow(){
        $("<div>").appendTo($('body')).addClass("modal");
        return function(){
            $('.modal').remove();
        };
    }
    function alertwindow(xx,fn){  //点击active按钮时启动点击事件
        var mo=motalwindow();
        var alert_div=$("<div>").appendTo($('body')).addClass("alertbox");
        alert_div.html(
            '<h3>'+xx+'<span>x</span></h3>'+
            '<p id="text"></p>'+
            '<button type="button" class="c10sub">OK</button>');
        var s_w=$(window).width();//计算当前窗口宽度
        var s_h=$(window).height();//计算当前窗口高度
        var box_w=alert_div.outerWidth(); //盒子外部宽高
        var box_h=alert_div.outerHeight();
        var l=(s_w-box_w)/2;//计算当前div宽度一半，窗口减去当前div宽度一半就是当前div定位点x坐标
        var t=(s_h-box_h)/2;//计算当前div高度一半，窗口减去当前div高度一半就是当前div定位点y坐标
        alert_div.css({"left":l,"top":t});
        var h33=alert_div.children('h3');
        alert_div.drag_jq(h33);
        var text=alert_div.children('p');
        text.text(fn);
        $('span').click(function(){
            mo();
            alert_div.remove();
        });
        $('button').click(function(){
            mo();
            alert_div.remove();
        });
    }

    $('.addto').click(function () {
        alertwindow('已成功添加至购物车！',$('.detailContentRight>h3').text()+"     单价："+$('.price h2').text()+"    数量："+$('.amount').val());
    });

    //=========================================================================head区其他菜单显示=========================================================//

    $.fn.stayShow($('.activea02'),$('.address02'),'tableactt','headatc','address02');
    $.fn.stayShow($('.activea03'),$('.address03'),'tableactt','headatc','address03');
    $.fn.stayShow($('.activea04'),$('.address04'),'tableactt','headatc','address04');
    $.fn.stayShow($('.activea05'),$('.address05'),'tableactt','headatc','address05');
    $.fn.stayShow($('.activea06'),$('.address06'),'tableactt','headatc','address06');

    //========================================================================详情页nav下拉菜单==================================//

    $.fn.stayShow($('.detailNavLeftaSp'),$('.detailDD'),'detailNavLeftaSp2','detailDD2','detailDD');

    //==========================================================12格下滑菜单================================================================//

    $('.bannericlisp').click(function(){
        $('.tripart').animate({top:25},500,"linear");
        $('.banneric>ul').animate({top:-40},500,"linear");
        $('.bannericgang').css("background","#c81623");
        tripartsel();
    });
    $('.banneric>.tripart span').click(function(){
        $('.tripart').animate({top:208},500,"linear");
        $('.banneric>ul').animate({top:0},500,"linear");
        $('.bannericgang').css("background","transparent");
    });

    function tripartsel(){
        $('.bannericlisp').hover(function(){
            var timer1;
            $(this).children('.bannericgang').show();
            $(this).siblings().children('.bannericgang').hide();
            $('.tripselect ul').eq($(this).index()).addClass('tripact').siblings().removeClass('tripact');
            $('.tripselect li').hover(function(){
                clearTimeout(timer1);
                $(this).addClass('tripact1').siblings().removeClass('tripact1');
                $('.content li').eq($(this).attr("attr")).addClass('tripact2').siblings().removeClass('tripact2');
            },function(){
                $(this).removeClass('tripact1');
            })
        },function(){
            timer1=setTimeout(function(){
                $(this).children('.bannericgang').hide();
            },200);
        });
    }












};
