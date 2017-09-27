/**
 * Created by tianhong on 7/8/2017.
 */
;(function($){
    $.fn.extend({
        drag_jq:function(title){  //拖拽封装函数，自带边界限制
            title=title||this;  //在each外面判断传参是为了将实例的整体导入给title而不是单个this指向的某个元素
            $(this).each(function(i){  //如果是对象集合所有元素都能使用
                var that=$(this);
                console.log($(this).eq(i));
                title.eq(i).mousedown(function(eva){
                    var s_w=$(window).width();
                    var s_h=$(window).height();
                    var cl=eva.clientX-that.position().left;
                    var ct=eva.clientY-that.position().top;
                    that.animate({'opacity':0.6},500);
                    $(document).mousemove(function(ev){
                        var l=ev.clientX-cl;
                        var t=ev.clientY-ct;
                        if(t<0){t=0;}
                        if(l<0){l=0;}
                        if(t>s_h-that.outerHeight()){t=s_h-that.outerHeight();}
                        if(l>s_w-that.outerWidth()){l=s_w-that.outerWidth();}
                        that.css('left',l);
                        that.css('top',t);
                    });
                    $(document).mouseup(function(){
                        $(document).off('mousemove');
                        $(document).off('mouseup');
                        that.animate({'opacity':1},500);
                    });
                    return false;//阻止元素的默认行为[防止文字被矿选]
                });
                //}
            });
            return this; //为了链式结构
        },  //里面是对象，不能用；


        tabImgMoving:function(obj){ //移动轮播图封装函数
            var def={
                'autoplay':'true',
                'time':1000
            };
            var n_opt= $.extend(def,obj); //合并两个配置对象集合
            return this.each(function(){
                var that=$(this);
                var butL=that.find('.leftbutton');
                var butR=that.find('.rightbutton');
                var aUl=that.find('ul');
                var aBtn=that.find('ol li'); //默认按钮olli，默认图片ulli
                var imgLi=that.find('ul li');
                var i=0;
                var timer;
                aBtn.click(function(){
                    var n=$(this).index();
                    i=n;
                    $(this).addClass('ac').siblings().removeClass('ac');
                    var m=aUl.children('li').eq(0).attr("attr");
                    var gap=n-m;
                    if(gap>0){
                        for(var i=0;i<gap;i++){
                            aUl.animate({marginLeft:gap*'-730'},400/gap,function () {
                                aUl.children('li').eq(0).appendTo(aUl);    //循环次数下时间缩短；
                                aUl.css('marginLeft','0px');
                            });
                        }
                    }else{
                        for(var j=0;j<(-gap);j++){
                            aUl.css('marginLeft','-730px');
                            aUl.children('li').eq(imgLi.length-1).prependTo(aUl);
                            aUl.animate({marginLeft:"0px"},400/(-gap));
                        }
                    }
                });
                butR.click(function(){
                    aUl.animate({marginLeft:'-730px'},400,function () {
                        aUl.children('li').eq(0).appendTo(aUl);
                        aUl.css('marginLeft','0px');
                    });
                    i=aUl.children('li').eq(1).attr("attr");
                    aBtn.eq(i).addClass('ac').siblings().removeClass('ac');
                });
                butL.click(function(){
                    aUl.css('marginLeft','-730px');
                    aUl.children('li').eq(imgLi.length-1).prependTo(aUl);
                    aUl.animate({marginLeft:"0px"},400);
                    i=aUl.children('li').eq(0).attr("attr");
                    aBtn.eq(i).addClass('ac').siblings().removeClass('ac');
                });
                if(n_opt.autoplay){
                    function run(){
                        timer=setInterval(function(){
                            aUl.animate({marginLeft:'-730px'},400,function () {
                                aUl.children('li').eq(0).appendTo(aUl);
                                aUl.css('marginLeft','0px');
                                i=aUl.children('li').eq(0).attr("attr");
                                aBtn.eq(i).addClass('ac').siblings().removeClass('ac');
                            });
                        },n_opt.time);
                    }
                }
                run();
                that.hover(function(){
                    clearInterval(timer);
                },function(){
                    run();
                })
            });
        },

        tabImgsimple:function(obj){ //移动轮播图封装函数
            var def={
                'autoplay':'true',
                'time':1000
            };
            var n_opt= $.extend(def,obj); //合并两个配置对象集合
            return this.each(function(){
                var that=$(this);
                var aUl=that.find('.contentcenter');
                var aBtn=that.find('.clonav li>a'); //默认按钮olli，默认图片ulli
                var imgLi=that.find('.clof1inner');
                var i=0;
                aBtn.mouseover(function(){
                    var n=$(this).parent().index();
                    i=n;
                    $(this).addClass('actt').parent().siblings().children('a').removeClass('actt');
                    var m=aUl.children('.clof1inner').eq(0).attr("attr");
                    var gap=n-m;
                    if(gap>0){
                        for(var i=0;i<gap;i++){
                            aUl.animate({marginLeft:gap*'-1210'},400/gap,function () {
                                aUl.children('.clof1inner').eq(0).appendTo(aUl);    //循环次数下时间缩短；
                                aUl.css('marginLeft','0px');
                            });
                        }
                    }else{
                        for(var j=0;j<(-gap);j++){
                            aUl.css('marginLeft','-1210px');
                            aUl.children('.clof1inner').eq(imgLi.length-1).prependTo(aUl);
                            aUl.animate({marginLeft:"0px"},400/(-gap));
                        }
                    }
                });
            });
        },

        tabImgMovingButtonly:function(obj){ //移动轮播图封装函数,用于详情页推荐栏
            var def={
                'autoplay':'true',
                'time':2000
            };
            var n_opt= $.extend(def,obj); //合并两个配置对象集合
            return this.each(function(){
                var that=$(this);
                var butL=that.find('.butttonback2');
                var butR=that.find('.butttonback');
                var aUl=that.find('ul');
                var imgLi=that.find('ul li');
                var timer;
                butR.click(function(){
                    aUl.animate({marginLeft:'-155'},400,function () {
                        $('.recommedtao>ul li').eq(0).appendTo(aUl);
                        aUl.css('marginLeft','0px');
                        if(aUl.children('li').eq(0).attr("attr")>7){
                            $('.itime').text(2);
                        }else{
                            $('.itime').text(1);
                        }
                    });
                });
                butL.click(function(){
                    aUl.css('marginLeft','-155px');
                    aUl.children('li').eq(imgLi.length-1).prependTo(aUl);
                    aUl.animate({marginLeft:"0px"},400);
                    if(aUl.children('li').eq(0).attr("attr")>7){
                        $('.itime').text(2);
                    }else{
                        $('.itime').text(1);
                    }
                });
                if(n_opt.autoplay){
                    function run(){
                        timer=setInterval(function(){
                            aUl.animate({marginLeft:'-155px'},800,function () {
                                aUl.children('li').eq(0).appendTo(aUl);
                                aUl.css('marginLeft','0px');
                                i=aUl.children('li').eq(0).attr("attr");
                            });
                            if(aUl.children('li').eq(0).attr("attr")>7){
                                $('.itime').text(2);
                            }else{
                                $('.itime').text(1);
                            }
                        },n_opt.time);
                    }
                }
                run();
                that.hover(function(){
                    clearInterval(timer);
                },function(){
                    run();
                })
            });
        },

        tabImg:function(obj){
            var def={
                'autoplay':'true',
                'time':1000
            };
            var n_opt= $.extend(def,obj); //合并两个配置对象集合
            return this.each(function(){
                var that=$(this);
                var aOl=that.find('ol');
                var aBtn=that.find('ol li'); //默认按钮olli，默认图片ulli
                var i=0;
                var btnleft=that.find('.leftbu');
                var btnright=that.find('.rightbu');
                var dis=0;
                $('.box1>ul li').eq(0).show().siblings().hide();
                $('.bigzoom>ul li').eq(0).show().siblings().hide();
                aBtn.eq(0).addClass('liact').siblings().removeClass('liact');
                btnright.click(function(){
                    if(parseInt(aOl.css('left'))>'-76'*($('.bigzoom>ul li').length-5)){
                        dis++;
                        aOl.animate({"left":'-76'*dis},400);
                    }
                });
                btnleft.click(function(){
                    if(parseInt(aOl.css('left'))<0){
                        dis--;
                        aOl.animate({"left":'-76'*dis},400);
                    }
                });
                $(document).on("mouseover",".olrance li",function(event){
                    var n=$(this).index();
                    i=n;
                    $(this).addClass('liact').siblings().removeClass('liact');
                    $('.box1>ul li').eq(n).show().siblings().hide();
                    $('.bigzoom>ul li').eq(n).show().siblings().hide();
                });
                $('.selectOptions li').click(function(){
                    dis=0;
                });
            });
        },

        drag_jq:function(title){
            title=title||this;  //在each外面判断传参是为了将实例的整体导入给title而不是单个this指向的某个元素
            $(this).each(function(i){  //如果是对象集合所有元素都能使用
                var that=$(this);
                console.log($(this).eq(i));
                title.eq(i).mousedown(function(eva){
                    var s_w=$(window).width();
                    var s_h=$(window).height();
                    var cl=eva.clientX-that.position().left;
                    var ct=eva.clientY-that.position().top;
                    that.animate({'opacity':0.6},500);
                    $(document).mousemove(function(ev){
                        var l=ev.clientX-cl;
                        var t=ev.clientY-ct;
                        if(t<0){t=0;}
                        if(l<0){l=0;}
                        if(t>s_h-that.outerHeight()){t=s_h-that.outerHeight();}
                        if(l>s_w-that.outerWidth()){l=s_w-that.outerWidth();}
                        that.css('left',l);
                        that.css('top',t);
                    });
                    $(document).mouseup(function(){
                        $(document).off('mousemove');
                        $(document).off('mouseup');
                        that.animate({'opacity':1},500);
                    });
                    return false;//阻止元素的默认行为[防止文字被矿选]
                });
                //}
            });
            return this; //为了链式结构
        },  //里面是对象，不能用；


        stayShow:function(father,son,fatherClass,sonClass,sonClassName){  //定时器悬停菜单显示封装原型函数
            var timer3;
            father.hover(function(){
                father.children('i').css({transition:'all 0.6s',transform:'rotate(180deg)'},600);
                father.addClass(fatherClass);
                son.addClass(sonClass);
            },function(){
                father.removeClass(fatherClass);
                timer3=setTimeout(function(){
                    father.children('i').css({transition:'all 0.6s',transform:'rotate(360deg)'},600);
                    son.removeClass(sonClass);
                    father.removeClass(fatherClass);
                    return false;
                },200);
            });
            $(document).on("mouseover","."+sonClassName,function(event){
                clearTimeout(timer3);
                father.addClass(fatherClass);
            });
            $(document).on("mouseout","."+sonClassName,function(event){
                timer3=setTimeout(function(){
                    father.children('i').css({transition:'all 0.6s',transform:'rotate(360deg)'},600);
                    son.removeClass(sonClass);
                    father.removeClass(fatherClass);
                    return false;
                },200);
            });
        }
    });

})(jQuery);