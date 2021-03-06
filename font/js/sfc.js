       var nowusermsg = {
            uid:111,         //用户id 
            openid:111,
            phone:111,   //用户的手机号 
            lyxx:""   // 存储需要用到路由的值 
        }
         // 禁用效果 
         $(document.body).css({
            "overflow-x":"hidden",
            "overflow-y":"hidden"
          });
    
    $(function(){
        // 后台给的先调用下 这段js 
        getOpenid(function(openid){
            nowusermsg.uid = localCache("uid-kongbatong");
            nowusermsg.openid = localCache("openid-kongbatong");
            nowusermsg.phone = localCache("mobile-kongbatong");
            nowusermsg.openid = openid;
            if(null == nowusermsg.uid || "" == nowusermsg.uid) {
                register("http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/Register_content.html");   //返回注册登录页面
            } else {
                // initData(nowusermsg.uid); //加载页面数据
                getPassenger();
                getVowner();
                paymentpage(nowusermsg.uid);
                // 获取到Uid后，乘客页添加滑动效果 
                hdpassengerNode();
                // 给车主页添加无限滚动效果
                hdvownperNode();
                // 全部乘客行程添加滑动效果
                hdrunpassenger();
                // 处理全部车主页
                hdrunvowner();
                // 处理支付页
                hdpaymentzy();
                hactive();
                formcontrol();
                created();
            }
        },location.search);
            // 先记录一下当前页面地址在跳转
            // http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/Register_content.html
           

        // 初始化时设置默认值 
        $(".dqcsval").text($(".xcspanleft").text());
        //给滑动元素获取高度 
        //乘客页的高度 
        $(".cylx").height($(document.body).height()-$(".passenger .select").height()-$(".header").height());
        //车主页的高度 
        //这里容易出问题，最后在改改 
        $(".vonpondclxc").height($(document.body).height()-$(".passenger .select").height()-$(".header").height());
        //全部行程页 乘客页的高度 
        $(".runpassenger").height($(document.body).height()-$(".header").height());
        //全部行程页 车主页的高度 
        $(".runvowner").height($(document.body).height()-$(".header").height());
        //支付页 
        $(".paymentzy").height($(document.body).height()-$(".header").height());
        //解决一些页面内容太多无法滑动的问题 
        $(".details").height($(document.body).height()-$(".header").height());
        
        $("#searchxincheng").height($(document.body).height()-$(".header").height());
        //让筛选页也可以滑动 
        $(".runscreen").height($(document.body).height()-$(".header").height());


        // 无需id值，直接取全部数据 
        getqbVowner();
        getqbPassenger();
       
        // 当 hash变化时切换显示
    // 页面初始化时就执行这些数据 
    $(".searchtime #datetime").datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        locale: moment.locale('zh-CN'),
        // 目前之前的时间都不能选
        minDate: false
        });

    // 给导航条绑定切换
    var hpassengerpd = 1;
   $(".hpassenger").bind("touch click",function(){

         $(".runluyouaa").hide();
        hpassengerpd++;
       if(hpassengerpd%2===0){
        $("#hpassengericon").attr("class","glyphicon glyphicon-triangle-top");
       }else {
        $("#hpassengericon").attr("class","glyphicon glyphicon-triangle-bottom"); 
       }
       $(".hvowner").slideToggle("normal");
   })
   // 给导航条绑定事件 
   var hrunxuzval = 1;
    $(".hrun").bind("touch click",function(){
        hrunxuzval ++;
        if(hrunxuzval%2===0){
            $(".hrunoneicon").attr('class',"glyphicon glyphicon-triangle-top hrunoneicon");
        }else {
            $(".hrunoneicon").attr('class',"glyphicon glyphicon-triangle-bottom hrunoneicon");
        }
        $(".runluyouaa").slideToggle("normal");
    })
        
    
    // 给返回添加返回事件 
    $(".rscsxsjofhu").bind("touch click",function(){
        rscsxsjofhu();
    })

        
        // 点击id可以选择城市 
        $("#cityselect").bind("touch click",function(){
            cityselect();
        })
        if(cityselectval.nowcity==""){
            $(".acityselect").text("常州市");
        }
        

        //goods.js页面的数据 
        $("#idxinxi").append("<P>请稍等</P>");
        //点击提价时 

        //支付模块的功能 
        $("#gaodesubmit").bind("touch click",function(e){
           paymentModular.payment();
        })

        //搜索功能的实现 
        $("#citysearch").focus(function(){
           
        })
        $("#citysearch").blur(function(){
             $("#citysearch").val("");
        })

        //修改样式 
        $("#ctxz").css("display","none");
        
        window.onhashchange = hashChange;



        //另外js的初始化数据 
        createlival();
        //绑定时间函数 
        setTimeWheel();
        //这里的问题 
        $("#chufadi").bind("focus",function(){
            inchufadi();
        })
        //这里的问题 
        $("#address").bind("focus",function(){
            inaddress();
        })
        $("#containersearchtime").bind("focus",function(){
            containersearchtime();
        })
        $("#searchsetdate").bind("focus",function(){
            containersearchtime();
        })

        $(".dqcsval").text(cityselectval.nowcity);
        
        $("#inxcbody").blur(function(){
            $("#inxcbody").val("");
        })
        $("#inxcbody").focus(function(){
            var lctionhash = window.location.hash;
            $("#inxcbody").val("");
            if(lctionhash==="#s"){
                window.location.hash  = "#sxxwz";
            }
            if(lctionhash==="#m"){
                window.location.hash  = "#mxxwz";
            }
        })
        
        // 初始化条件 
            $("#chufadi").val("");
            $("#address").val("");
            $("#containersearchtime").val("");
            $("#searchsetdate").val("");

        //  时间选择页的操作   
        
        $(".timequx").bind("touch click",function(){
            timequxfunction();
        })
        
        $(".timeqr").bind("touch click",function(){
            timeqrfunction();
        })


        //定位市默认选择常州颜色，但是不在地图上点击
        removeacive();
        $(".ullish").addClass("ulliactive");
        cszhi(".ullish");

        $(".hpassenger").css("color","#e39f7a");
    // 页面点击路由颜色设置 
        $(".hpassenger").bind("touch click",function(){
            hashlycolorsz();
            $(".hpassenger").css("color","#e39f7a");
        })
        $("#ddxq").bind("touch click",function(){
            hashlycolorsz();
            $("#ddxq").css("color","#e39f7a");
            $("#ddxq a").css("color","#e39f7a");
        })
        $(".hrun").bind("touch click",function(){
            hashlycolorsz();
            $(".hrun").css("color","#e39f7a");
        })

// 绑定事件都放在这里面 
        
// 始发地 目的地 点击后 赋值并给下一页
        $("#searchxincheng .xzli1").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli1").text();
            xzlichuli(textval);
        })
        $("#searchxincheng .xzli2").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli2").text();
            xzlichuli(textval);
        })
        $("#searchxincheng .xzli3").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli3").text();
            xzlichuli(textval);
        })
        $("#searchxincheng .xzli4").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli4").text();
            xzlichuli(textval);
        })
        $("#searchxincheng .xzli5").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli5").text();
            xzlichuli(textval);
        })
        $("#searchxincheng .xzli6").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli6").text();
            xzlichuli(textval);  
        })
        $("#searchxincheng .xzli7").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli7").text();
            xzlichuli(textval);
        })
        $("#searchxincheng .xzli8").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli8").text();
            xzlichuli(textval);
        })
        $("#searchxincheng .xzli9").bind("touch click",function(){  
            var  textval =  $("#searchxincheng .xzli9").text();
            xzlichuli(textval)    
        })
        $("#searchxincheng .xzli10").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli10").text();
            xzlichuli(textval);
        })
    // 点击取消，页面跳为地图页面 
        $(".xcqx").bind("touch click",function(){
            window.location.hash = "#details";
        })
    // 选择目的地 
            // 输入框 
            var valjson = {
                "background":"#f2f2f2",
                "color":"#555"
            };
            $(".rsdcsoipt").bind("blur",function(){
                $(".rsdcsdlo").css(valjson);
                $(".rsdcsdlt").css(valjson);
                $(".rsdcsdltr").css(valjson);
                $(".rsdcsdlf").css(valjson);
                $(".rsdcsdlfi").css(valjson);
                runscreenv.mdd = $(".rsdcsoipt").val();

            })
            var rsdcsdloval = {
                "background":"#ff4a39",
                "color":"#fff"
            }
            var rsdcsdlvllet ={
                 one:1,
                 two:1,
                 three:1,
                 four:1,
                 five:1
             }
            $(".rsdcsdlo").bind("touch click",function(){
                rsdcsdlvllet.one+=1;
                if(rsdcsdlvllet.one%2 ===0){
                    runscreenv.mdd = $(".rsdcsdlo").text();
                    rsdcsdlovalhs();
                    $(".rsdcsdlo").css(rsdcsdloval);
                }else {
                    runscreenv.mdd = "";
                    $(".rsdcsdlo").css(valjson);
                }
            })
            $(".rsdcsdlt").bind("touch click",function(){
                rsdcsdlvllet.two+=1;
                if(rsdcsdlvllet.two%2 ===0){
                    runscreenv.mdd = $(".rsdcsdlt").text();
                    rsdcsdlovalhs();
                    $(".rsdcsdlt").css(rsdcsdloval);
                }else {
                    runscreenv.mdd = "";
                    $(".rsdcsdlt").css(valjson);
                }
                
            })
            $(".rsdcsdltr").bind("touch click",function(){
                rsdcsdlvllet.three+=1;
                if(rsdcsdlvllet.three%2 ===0){
                    runscreenv.mdd = $(".rsdcsdltr").text();
                    rsdcsdlovalhs();
                    $(".rsdcsdltr").css(rsdcsdloval);
                }else {
                    runscreenv.mdd = "";
                    $(".rsdcsdltr").css(valjson);
                }
               
            })
            $(".rsdcsdlf").bind("touch click",function(){
                rsdcsdlvllet.four+=1;
                if(rsdcsdlvllet.four%2 ===0){
                    runscreenv.mdd = $(".rsdcsdlf").text();
                    rsdcsdlovalhs();
                    $(".rsdcsdlf").css(rsdcsdloval);
                }else {
                    runscreenv.mdd = "";
                    $(".rsdcsdlf").css(valjson);
                }
            })
            $(".rsdcsdlfi").bind("touch click",function(){
                rsdcsdlvllet.five+=1;
                if(rsdcsdlvllet.five%2 ===0){
                    runscreenv.mdd = $(".rsdcsdlfi").text();
                    rsdcsdlovalhs();
                    $(".rsdcsdlfi").css(rsdcsdloval);
                }else {
                    runscreenv.mdd = "";
                    $(".rsdcsdlfi").css(valjson);
                }
            })
    })

//所有资源加载成功在执行地图定位 
    window.onload = function(){
        // 定位功能  
        AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, //是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
                buttonPosition:'RB',     //定位按钮的停靠位置
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true  //定位成功后是否自动调整地图视野到定位点
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status,result){
                if(status=='complete'){
                    onComplete(result)
                    //定位时绑定到出发地的函数的值上 
                    //fabuxiaoxi.cfddata = result; 
                }else{
                    onError(result);
                }
            });
        });

    }

    function register(val){
        var nowhref = window.location.href;
        localCache("page",nowhref);     // 存储在本地的地址
        window.location.href = "Register_content.html";		// 发送给他的地址 	
    }  

    function hashlycolorsz(){
        // #e39f7a 
        $(".hpassenger").css("color","#555");
        $("#ddxq").css("color","#555");
        $(".hrun").css("color","#555");
        $("#ddxq a").css("color","#555");
    }
    // 选择城市的初始化函数 
    var cityselectval = {
        nowcity:""
    }

    // 存储乘客和车主的路由值 
    var locationqjval = {
        val:""   // 存储是车主还是乘客的路由值 
    }

    // goods.js页面的数据合并 
    var gaode = {
        successdata:{}, // 成功的对象
        errordata:{},   // 失败存储的对象
        successposition:{},  // 成功得到的postion 对象
        formattedAddress:"", // 定位得到的地址  始发地
        Destination:"",        // 目的地   
        citysearchval:"",   // input 搜索的值 
        citysearchSearchval:{},    //搜索得到的结果
        citysearchSearchtips:[],   //搜索得到的数组结果
        dingweicity:""  // 搜索定位城市需要的城市名 
    }
    var localdiz = {
        nowSignin:"http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/Register_content.html"      // 登录地址 
    }
    // 发布消息接受 

    var fabuxiaoxi = {
        cfddata:"", // 存储出发地数据的地方 
        mmddata:"", // 存储目的地数据的地方 
        cfdcity:"", // 存储出发地的城市 
        mddcity:"", // 存储目的地的城市 
        splitmddcity:"",    // 需要进行切的值 
        dwsj:""     // 定位得到的数据 
    };

    // 点击得到的的数据 
    var clickresult = {
        result:{}
    }
    // 全局静态 数据
    var sfcsj = {
        passenger:{},  //乘客的数据
        vowner:{},       // 车主的数据
        passengerUrl:"../madeFreeRideOrders/queryPageMadeFROrders.asp",
        // 乘客数据的地址 
        vownerUrl:"../madeFreeRideOrders/queryPageMadeFROrders.asp",
        // 乘客数据的div
        
        passengerDiv:"<div class='cylx-cy clearfix' id='passengerDiv'><a href='#showdata' id='aPassengerDiv'  target='_parent' class='clearfix'><div class='cylx-cyheader'><span class='bt'>常用</span><div class='time'><span class='hours' id='psghours'></span></div></div><div class='cylx-cycenter clearfix'><div id='cylx-departure' class='psgdeparture'></div><span class='glyphicon glyphicon-arrow-right cycicon'></span><div id='cylx-Destination'  class='psgdestination'></div></div><div class='cydstate clearfix'><span class='cydstates'>订单情况:</span><div class='cydstated' id='cydstatedzt'></div></div></a></div>",
        // 车主数据的 div 
        vownerDiv:"<a href='#showdata' id='avownerDiv'   target='_parent'  class='clearfix'><div class='circle clearfix' id='vownerDiv'><div class='left vownerleft clearfix'><div class='time'><span class='data' id='vdata'></span><div class='rq'><span class='hours' id='vdhours'></span></div></div><div class='mdd clearfix'><div class='cfd' id='vdcfd'></div><span class='glyphicon glyphicon-arrow-right mdd-icon'></span><div class='df' id='vdf'></div></div></div><div class='right clearfix'><span class='ricon left glyphicon glyphicon-menu-right'></span></div><div class='cydstate clearfix'><span class='cydstates'>订单情况:</span><div class='cydstated' id='cirstatedzt'></div></div></div> </a>",
        // 全部行程中乘客 
        runpassengerDiv:"<div class='circle clearfix' id='runpassengerDiv'><a href='javascript:;' id='arunpassengerDiv'  target='_parent' class='arunpassengerDivclass clearfix'><div class='left runpassengerleft  clearfix'><div class='time'><span class='data' id='rpsgdata'></span><div class='rq'><span class='hours' id='rpsghours'></span></div></div><div class='mdd clearfix'><div class='cfd' id='rpsgcfd'></div><span class='glyphicon glyphicon-arrow-right mdd-icon'></span><div class='df' id='rpsgdf'></div><div class='runpassengerDivuid' style='display:none' id='idrunpassengerDivuid'></div> </div></div></a><div class='right clearfix'><button  class='ricon left btn btn-success ' id='paymentbutton'>查看</button></div></div>",
        //全部行程中车主
        runvownerDiv:"<div class='circle clearfix' id='runvownerDiv'><a href='#ownshowdata' id='arunvownerDiv'   target='_parent'  class='arunvownerDivclass clearfix'><div class='left runvownerleft  clearfix' ><div class='time'><span class='data' id='rvdata'>14号</span><div class='rq'><span class='hours' id='rvdhours'></span></div></div><div class='mdd clearfix'><div class='cfd' id='rvdcfd'></div><span class='glyphicon glyphicon-arrow-right mdd-icon'></span><div class='df' id='rvdf'></div></div></div><input type='submit' class='ricon left btn btn-primary ' value='查看' style='margin-top:22px;'></div></a></div>",
        // 支付页的模板 
        paymentpage:"<a href='#payment' class='aqkpayment clearfix' id='pmaqkpayment'><div class='paymentbody clearfix'><div class='paydate clearfix'><span class='paydateicon'>订单时间:</span><div class='paytime' id='pmpaytime'></div></div><div class='paymoney clearfix'><div class='pmsl'>支付金额:</div><div class='payyiyuan' id='pmpayyiyuan'></div></div><div class='paystate'><span class='payszfjg'>支付结果:</span><span class='payssuc' id='pmpayssuc'></span></div></div></a>"
    }

    //让时间绑定切换到页面的事件 
    function formcontrol(){
        // 一共四个按钮
        $("#pformcontrolsr").bind("focus",function(){
            locationqjval.val = "a=p";
            hashChange("#details?a=p");
        });
        // 两个a标签 
        $("#sbutnaone").bind("touch click",function(){
            locationqjval.val = "a=p";
            hashChange("#details?a=p");
        });

        $("#sbuttonatwo").bind("touch click",function(){
            locationqjval.val = "b=v";
            hashChange("#details?b=v");
        })
        

        $("#pformcontrolsc").bind("focus",function(){
            locationqjval.val = "a=p";
            hashChange("#details?a=p");
            
        })  
        $("#vformcontrolsr").bind("focus",function(){
            locationqjval.val = "b=v";
            hashChange("#details?b=v");
            
        });
        $("#vformcontrolsc").bind("focus",function(){
            locationqjval.val = "b=v";
            hashChange("#details?b=v");
        });
    }
    
    // 默认页面显示
    function created(){
        $(".passenger").show();
        $(".vowner").hide();
        $(".run").hide();
        $(".details").hide();
        $("#searchcity").hide();
        $("#searchxincheng").hide();
        $(".showsjdata").hide();
        $(".paymentzy").hide();
        $(".pdetails").hide();
    }
    //切换路由的初始化方法
    function hashcreate(){
        $(".passenger").hide();
        $(".vowner").hide();
        $(".run").hide();
        $(".details").hide();
        $("#searchcity").hide();
        $("#searchxincheng").hide();
        $(".showsjdata").hide();
        $(".paymentzy").hide();
        $(".pdetails").hide();
        // 点击了，先隐藏，在进行效果展示 
    }
    // 切换路由的方法
    function hashChange(hashzhi){
        var locationHash = location.hash;
         // 处理一下参数
        // #details?a=3
        var val1 = locationHash.split("?");
        if(hashzhi=="#details?a=p" || hashzhi=="#details?b=v"){
            locationHash="#details";
            window.location.hash= hashzhi;
            $("#address").val("");
        }else {
            $("#idsearchvalshow").empty();
            if(val1[0]=="#passenger" || locationHash =="#passenger" ){
                $(".runluyouaa").hide();
                $(".hrunoneicon").attr('class',"glyphicon glyphicon-triangle-bottom hrunoneicon");
                hashcreate();
                $(".passenger").show();
            }
            
            // 不是那个路由的，默认隐藏那个效果 
            $("#hpassengericon").attr("class","glyphicon glyphicon-triangle-bottom"); 
    
            // run路由 
            if(val1[0]=="#run"|| locationHash=="#run"){
                // 路由为 run 时 默认取值 
                // 为run时，请求数据 
                hashcreate();
                $(".run").show();
                $(".runvowner").hide();
                $(".runscreen").hide();
                
                $(".runpassenger").show();
                if(val1[1]=="diver"){
                    $(".runpassenger").hide();
                    $(".runscreen").hide();
                    $(".runvowner").show();
                   //  getqbVowner(); 
                }else if(val1[1]=="passger"){
                    $(".runvowner").hide();
                    $(".runscreen").hide();
                    $(".runpassenger").show();
                    // getqbPassenger(); 
                }else if(val1[1]=="passgeran" || val1[1]=="diveran"){
                   
                    $(".runvowner").hide();
                    $(".runpassenger").hide();
                    runscjwfbsxddcsh();
                    $(".runscreen").show();
                    val1[1]==="passgeran"?nowusermsg.lyxx = "passgeran":nowusermsg.lyxx = "diveran";
                }
            }else{
                // 不是run则 隐藏导航栏 
                $(".runluyouaa").hide();
                $(".hrunoneicon").attr('class',"glyphicon glyphicon-triangle-bottom hrunoneicon");
            }

            // 判断参数 
            if(val1[0]=="#ownshowdata"){
                openxq();
            }
            $(".hvowner").hide();
             if(val1[0]=="#vowner" ||locationHash=="#vowner"){
                hashcreate();
                $(".vowner").show();
            }else if(locationHash==="#details"|| val1[0]==="#details"){
                $("#ctxz").css("display","block");
                hashcreate();
                $(".details").show();
            }else if(locationHash == "#searchcity"){
                hashcreate();
                $("#searchcity").show();
            }else if(locationHash =="#s" || locationHash =="#m"|| locationHash =="#time" ||
                locationHash == "#xxwz" ||locationHash == "#sxxwz"||locationHash == "#mxxwz" ){
                hashcreate();
                $("#searchxincheng").show();
                if(locationHash =="#s"){
                    searchcfdhide();
                    $("#searchxincheng .nowcheckcity").show();
                    $("#searchxincheng .searchcfd").show();
                }else if(locationHash =="#m"){
                    searchcfdhide();
                    $("#searchxincheng .nowcheckcity").show();
                    $("#searchxincheng .searchcfd").show();
                }else if(locationHash =="#time"){
                    searchcfdhide();
                    $("#searchxincheng .nowcheckcity").hide();
                    $("#searchxincheng .searchtime").show();
                    $("#datetime").val("");
                }else if(locationHash == "#xxwz"||locationHash == "#sxxwz"||locationHash == "#mxxwz"){
                    searchcfdhide();
                    $("#searchxincheng .searchweizhi").show();
                    $("#searchxincheng .nowcheckcity").show();
                }
            }else if(locationHash =="#showdata"){
                
            }else if(locationHash=="#ddxq"){
                hashcreate();
                $(".paymentzy").show();
            }else if(val1[0]=="#payment"){
                // 处理支付详情页 
                passengercli();
                hashcreate();
                $(".pdetails").show();
            }
        }
    }
    
// 打开详情页函数 
        function  openxq(){
            // 暂时没发挥作用 
        }    

    function searchcfdhide(){
        $("#searchxincheng .searchcfd").hide();
        $("#searchxincheng .searchweizhi").hide();
        $("#searchxincheng .searchtime").hide();
    }
    //header 中 ctive 的选择
    function hactive(){
        $(".htoggleone").bind("touch click",function(){
            removeActive();
            $(".htoggleone").addClass("hactive");
        })
        $(".htoggletwo").bind(" touch click",function(){
            removeActive();
            $(".htoggletwo").addClass("hactive");
        })
        $(".htogglethree").bind(" touch click",function(){
            // 把我的行程隐藏 
            $(".hvowner").hide();
            removeActive();
        })
        function removeActive(){
            $(".htoggleone").removeClass("hactive");
            $(".htoggletwo").removeClass("hactive");
            $(".htogglethree").removeClass("hactive");
            
        };
       
    }
    
    

    // 获取数据的地方 
    //获取乘客数据进行渲染
    function getPassenger(){
        $.ajax({
             url: sfcsj.passengerUrl,
            type: 'post',
            data:{
                cur:1,  // 默认取第一页 
                pushType:"Passenger",   // 乘客 
                uid:nowusermsg.uid, // id号 
                dateRange:"",      // 日期范围，默认取一个月之内的 
                arCity:"",      // 到达城市 
                dpCity:""      // 出发城市 
            },
             success: function (data) {
                sfcsj.passenger = data;
                // 获取成功，但是数据暂时为空 
                // setPassenger() 处理 乘客端数据的函数
                setPassenger(data);
            }
           });
    }

    // 获取车主端的数据并进行渲染
    function getVowner(){
        $.ajax({
            url: sfcsj.vownerUrl,
            type: 'post',
            data:{
                cur:1,  // 默认取第一页 
                pushType:"Driver",   // 车主身份
                uid:nowusermsg.uid, // id号 
                dateRange:"",      // 日期范围，默认取一个月之内的 
                arCity:"",      // 到达城市 
                dpCity:""      // 出发城市 
            },
            success: function (data) {
                sfcsj.vowner = data ;
                // 获取成功，但是数据暂时为空 
                
                // setVowner() 处理车主端的数据 
               setVowner(data);
           }
        });
    }

    // 全部行程中的数据 
    var qbxcvalsj = {
        passenger:{}, // 乘客数据 
        vowner:{}  // 车主数据 
    }
    // 全部行程中的乘客 
    function getqbPassenger(){
        $.ajax({
            url: sfcsj.passengerUrl,
           type: 'post',
           data:{
               cur:1,  // 默认取第一页 
               pushType:"Passenger",   // 乘客 
               uid:"",  // id号   默认为空就是取全部的数据
               dateRange:"",      
               arCity:"",      // 到达城市 
               dpCity:""     // 出发城市 
           },
            success: function (data) {
                qbxcvalsj.passenger = data;
               
               // setPassenger() 处理 乘客端数据的函数
               setqbPassenger(data);
           }
          });
    }
        // 处理全部行程中乘客的信息 
            function setqbPassenger(data){
             var passengerData = data.obj.frOrders;
                if(data.result>0){ //为0才可以进行操作
                    for(var i = 0 ;i<passengerData.length;i++){
                            // 全部行程中的数据的操作 
                        if(passengerData[i].state > -1){
                            $("#runpassengerNode").append(sfcsj.runpassengerDiv);

                            // 全部行程中的uid应该不是本地的uid，而是ajax时的uid 
                            var runidaPassengerDiv = "arunpassengerDiv"+i;
                            
                            $("#arunpassengerDiv").attr("id",runidaPassengerDiv);
                            setPassengerqbval(i,passengerData);
                        }
                    }
                }
            }

    // 全部行程中的车主数据  
    function getqbVowner(){
        $.ajax({
            url: sfcsj.vownerUrl,
           type: 'post',
           data:{
               cur:1,  // 默认取第一页 
               pushType:"Driver",   // 乘客 
               uid:"",  // id号   默认为空就是取全部的数据
               dateRange:"",      // 日期范围，取全部的 
               arCity:"",      // 到达城市 
               dpCity:""      // 出发城市 
           },
            success: function (data) {
               qbxcvalsj.vowner = data;
               // 获取成功，但是数据暂时为空 
               
               // setPassenger() 处理 乘客端数据的函数
               setqbVowneraa(data);
           }
          });
    }
        // 处理全部行程中车主的信息 
            function setqbVowneraa(data){
                var vownerData = data.obj.frOrders;
                // 先判断状态码 
                if(data.result>0){ //为0才可以进行操作
                  
                    for(var i = 0 ;i<vownerData.length;i++){
                        if(vownerData[i].state > -1){
                            $("#runvownerNode").append(sfcsj.runvownerDiv);
                            var arunvownerDivsj = "./font/html/xq.html#ownshowdata?"+"id="+vownerData[i].id+"&uid="+nowusermsg.uid+"&sf=run";
                            $("#arunvownerDiv").attr("href",arunvownerDivsj);
                            var idarunvownerDiv = "arunvownerDiv"+i;
                            $("#arunvownerDiv").attr("id",idarunvownerDiv);
                            setqbVowner(i,vownerData); 
                        }
                    }
                }
            }

    // 乘客页  对数据渲染到页面的 函数 
    function  setPassenger(data){
        var passengerData = data.obj.frOrders;
        // 先判断状态码 
        if(data.result>0){ //为0才可以进行操作
            for(var i = 0 ;i<passengerData.length;i++){
             // 乘客页中  行程的变化 
                $("#passengerNode").append(sfcsj.passengerDiv);
                // 改变div的编号
                var idpassengerDiv = "passengerDiv"+i;
                $("#passengerDiv").attr("id",idpassengerDiv);

                // 改变a标签的编号
                var aPassengerDivsj ="./font/html/xq.html#ownshowdata?"+"id="+passengerData[i].id+"&uid="+nowusermsg.uid;
                $("#aPassengerDiv").attr("href",aPassengerDivsj);
               
                var idaPassengerDiv = "aPassengerDiv"+i;
                $("#aPassengerDiv").attr("id",idaPassengerDiv);
                
                // 对乘客页数据的渲染操作 
                    setPassengerval(i,passengerData);
            }
        }
    }
    // 对乘客页书记的渲染操作函数 
        function setPassengerval(i,passengerData){
        // 先获取，在修改 
            // 操作时间 
            $("#psghours").text(passengerData[i].departureTime);
            var psghours = "psghours"+i;
            $("#psghours").attr("id",psghours);
            //  操作出发地 
            $(".psgdeparture").text(passengerData[i].departure);
            var psgdeparture = "psgdeparture"+i;
            $(".psgdeparture").attr("class",psgdeparture);
            // 操作目的地 
            $(".psgdestination").text(passengerData[i].arrival);
            var psgdestination = "psgdestination"+i;
            $(".psgdestination").attr("class",psgdestination);
            // 乘客页状态的判断显示 
                if(passengerData[i].state === -1){
                    $("#cydstatedzt").text("失效");
                    var cydstatedzt = "cydstatedzt"+i;
                    $("#cydstatedzt").attr("id",cydstatedzt);
                }else if(passengerData[i].state === 0){
                    $("#cydstatedzt").text("发布");
                    var cydstatedzt = "cydstatedzt"+i;
                    $("#cydstatedzt").attr("id",cydstatedzt);
                    var cydstatedztcl = "#"+cydstatedzt;
                    $(cydstatedztcl).css('color',"#5cb85c");
                }else  if(passengerData[i].state === 1){
                    $("#cydstatedzt").text("结束");
                    var cydstatedzt = "cydstatedzt"+i;
                    $("#cydstatedzt").attr("id",cydstatedzt);
                    var cydstatedztcl = "#"+cydstatedzt;
                    $(cydstatedztcl).css('color',"#f0ad4e");
                }else {
                    $("#cydstatedzt").text("未知情况");
                    var cydstatedzt = "cydstatedzt"+i;
                    $("#cydstatedzt").attr("id",cydstatedzt);
                    var cydstatedztcl = "#"+cydstatedzt;
                    $(cydstatedztcl).css('color',"#d9534f");
                }
            
        }

    // 对全部行程中乘客数据的渲染 
        function setPassengerqbval(i,passengerData){
            // 给他动态添加点击事件 
                var oclickid = passengerData[i].id;

                var paymentbuttonsh = "paymentbutton("+passengerData[i].id+","+passengerData[i].uid+")";
                $("#paymentbutton").attr("onclick",paymentbuttonsh);
                var paymentbutton = "paymentbutton"+ passengerData[i].id;
                $("#paymentbutton").attr("id",paymentbutton);
            //切分数据 
                var sj = passengerData[i].departureTime.split(" ");

            // 这是数据的发布者的id号 
           // 对uid号进行操作 
                $(".runpassengerDivuid").text(passengerData[i].uid);
                var runpassengerDivuid  = "runpassengerDivuid"+passengerData[i].uid;
                $(".runpassengerDivuid").attr("class",runpassengerDivuid);
            // 对号数的操作 
                $("#rpsgdata").text(sj[0]);
                var rpsgdata  = "rpsgdata"+i;
                $("#rpsgdata").attr("id",rpsgdata);
            // 对细分时间的操作 
                $("#rpsghours").text(sj[1]);
                var rpsghours  = "rpsghours"+i;
                $("#rpsghours").attr("id",rpsghours);
            // 对出发地的操作 
                $("#rpsgcfd").text(passengerData[i].departure);
                var rpsgcfd  = "rpsgcfd"+i;
                $("#rpsgcfd").attr("id",rpsgcfd);
            // 对目的地的操作 
                $("#rpsgdf").text(passengerData[i].arrival);
                var rpsgdf  = "rpsgdf"+i;
                $("#rpsgdf").attr("id",rpsgdf);
        }
    // 车主页  对数据渲染到页面的 函数 
    function  setVowner(data){
        var vownerData = data.obj.frOrders;
    
        // 先判断状态码 
        if(data.result>0){ //为0才可以进行操作
            if(data.obj===""){
                return false;
            }else{
                for(var i = 0 ;i<vownerData.length;i++){
                    $("#vownperNode").append(sfcsj.vownerDiv);
                    // 车主是?b=xxxx
                    var avownperNodesj = "./font/html/xq.html#ownshowdata?"+"id="+vownerData[i].id+"&uid="+nowusermsg.uid;;
                    $("#avownerDiv").attr("href",avownperNodesj);
                    var idaPassengerDiv = "aPassengerDiv"+i;
                    $("#avownerDiv").attr("id",idaPassengerDiv);
                // 车主页的行程 
                        setVownercz(i,vownerData);
                }
            }
            
        }
    }
    // 车主页的信息 
        function setVownercz(i,vownerData){
            var sj = vownerData[i].departureTime.split(" ");
            // 大的时间的操作 
                $("#vdata").text(sj[0]);
                var vdata = "vdata"+i;
                $("#vdata").attr("id",vdata);
            // 细分的时间的操作 
                $("#vdhours").text(sj[1]);
                var vdhours = "vdhours"+i;
                $("#vdhours").attr("id",vdhours);
            // 出发地的操作
                $("#vdcfd").text(vownerData[i].departure);
                var vdcfd = "vdcfd"+i;
                $("#vdcfd").attr("id",vdcfd);
            // 目的地的操作 
                $("#vdf").text(vownerData[i].arrival);
                var vdf = "vdf"+i;
                $("#vdf").attr("id",vdf);
            // 车主页状态的操作 
               //  #cirstatedzt 
                if(vownerData[i].state === -1){
                    $("#cirstatedzt").text("失效");
                    var cirstatedzt = "cirstatedzt"+i;
                    $("#cirstatedzt").attr("id",cirstatedzt);
                }else if(vownerData[i].state === 0){
                    $("#cirstatedzt").text("发布");
                    var cirstatedzt = "cirstatedzt"+i;
                    $("#cirstatedzt").attr("id",cirstatedzt);
                    var cirstatedztcl = "#"+cirstatedzt;
                    $(cirstatedztcl).css('color',"#5cb85c");
                }else  if(vownerData[i].state === 1){
                    $("#cirstatedzt").text("结束");
                    var cirstatedzt = "cirstatedzt"+i;
                    $("#cirstatedzt").attr("id",cirstatedzt);
                    var cirstatedztcl = "#"+cirstatedzt;
                    $(cirstatedztcl).css('color',"#f0ad4e");
                }else {
                    $("#cirstatedzt").text("未知情况");
                    var cirstatedzt = "cirstatedzt"+i;
                    $("#cirstatedzt").attr("id",cirstatedzt);
                    var cirstatedztcl = "#"+cirstatedzt;
                    $(cirstatedztcl).css('color',"#d9534f");
                }
                
        }
    // 全部行程页的车主信息 
        function setqbVowner(i,vownerData){
            var sj = vownerData[i].departureTime.split(" ");
            // 全部行程中大的时间 
                $("#rvdata").text(sj[0]);
                var rvdata = "rvdata"+i;
                $("#rvdata").attr("id",rvdata);
            // 全部行程中小的时间 
                $("#rvdhours").text(sj[1]);
                var rvdhours = "rvdhours"+i;
                $("#rvdhours").attr("id",rvdhours);
            // 全部行程总的出发地 
                $("#rvdcfd").text(vownerData[i].departure);
                var rvdcfd = "rvdcfd"+i;
                $("#rvdcfd").attr("id",rvdcfd);
            // 全部行程中的目的地 
                $("#rvdf").text(vownerData[i].arrival);
                var rvdf = "rvdf"+i;
                $("#rvdf").attr("id",rvdf);
        }
    

    // 选择城市页 函数 searchcity 
    function cityselect(){
      cityselectval.nowcity =   $(".acityselect").text();
      
      searchcity();
    }
    
    // 地图API页面处理逻辑 
         
     // 定位存储的字符串 
   
    var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom:14,//级别
        center: [119.9,31.7]//中心点坐标

    });

        // 城市出来地址 
        // 推荐功能的实现 
    function autoInput(val){ 
    
        var keywords = document.getElementById("citysearch").value;
        
        AMap.plugin('AMap.Autocomplete', function(){
                var autoOptions = {
                    city:"常州市"
                }
          // 实例化Autocomplete
          var searchval = $(".acityselect").text()+keywords;
          if(val!=undefined){
            if(searchcityval.citysfdmmd===""){
                searchval = $(".acityselect").text()+keywords;
            }else {
                searchval = searchcityval.citysfdmmd+keywords;
            }
          }
            
          var autoComplete = new AMap.Autocomplete(autoOptions);
         
          autoComplete.search(searchval, function(status, result) {
            // 搜索成功时，result即是对应的匹配数据
            var template = "<p class='searchp'></p>";
            gaode.citysearchSearchval = result;
            gaode.citysearchSearchtips = result.tips;
            $("#idsearchvalshow").empty();
            for(var i = 0;i<gaode.citysearchSearchtips.length;i++){
               
                $("#idsearchvalshow").append(template);
                $("#idsearchvalshow .searchp").text(result.tips[i].name);
                $("#idsearchvalshow .searchp").attr("class","searchp"+i);
                var classsearchp = ".searchp"+i;
                
            }
            // 点击搜索时出来的值 
            // 定位maker实现的代码 
            $(".searchp0").bind("touch click",function(){  
                fabuxiaoxi.mmddata = result.tips[0];
                fabuxiaoxi.mddcity =  $(".acityselect").text();
                touchchuli(result.tips[0]);
             });
            $(".searchp1").bind("touch click",function(){ 
                fabuxiaoxi.mmddata = result.tips[1];
                fabuxiaoxi.mddcity =  $(".acityselect").text();
                 touchchuli(result.tips[1])      });
            $(".searchp2").bind("touch click",function(){ 
                fabuxiaoxi.mmddata = result.tips[2];
                fabuxiaoxi.mddcity =  $(".acityselect").text();
                touchchuli(result.tips[2])    });
            $(".searchp3").bind("touch click",function(){  
                fabuxiaoxi.mmddata = result.tips[3];
                fabuxiaoxi.mddcity =  $(".acityselect").text();
                touchchuli(result.tips[3])     });
            $(".searchp4").bind("touch click",function(){
                fabuxiaoxi.mmddata =result.tips[4]; 
                fabuxiaoxi.mddcity =  $(".acityselect").text();
                 touchchuli(result.tips[4])     });
            $(".searchp5").bind("touch click",function(){ 
                fabuxiaoxi.mmddata = result.tips[5]; 
                fabuxiaoxi.mddcity =  $(".acityselect").text();
                touchchuli(result.tips[5])     });
            $(".searchp6").bind("touch click",function(){ 
                fabuxiaoxi.mmddata =result.tips[6]; 
                fabuxiaoxi.mddcity =  $(".acityselect").text();
                touchchuli(result.tips[6])     });
            $(".searchp7").bind("touch click",function(){ 
                fabuxiaoxi.mmddata = result.tips[7];
                fabuxiaoxi.mddcity =  $(".acityselect").text();
                 touchchuli(result.tips[7])     });
            $(".searchp8").bind("touch click",function(){ 
                fabuxiaoxi.mmddata = result.tips[8];
                fabuxiaoxi.mddcity =  $(".acityselect").text();
                 touchchuli(result.tips[8])     });
            $(".searchp9").bind("touch click",function(){  
                fabuxiaoxi.mmddata = result.tips[9];
                fabuxiaoxi.mddcity =  $(".acityselect").text();
                touchchuli(result.tips[9])     });
          
          })
        })
      }
      
      autoInput();
     

      // 绑定信息 
      document.getElementById("citysearch").oninput = autoInput;

      // 点击处理函数  公用的 
      function touchchuli(result){
          // 首先清空所有 
        $("#idsearchvalshow").empty();
        if(result.location==""){
            $("#idxinxi").empty();
            $("#idxinxi").append("<P>查询出错</P>");
            $("#address").val("查询出错，请重新查找！")
            maponbh(false);
        }else {
            // {P: 31.774645, R: 119.97328400000004, lng: 119.973284, lat: 31.774645} 
           
            maponbh(result.location);
            clickresult.result= result;
            // 这里的问题 
        }
     }

//  定位功能函数 
    function onComplete(data) {
        // 解决之道 
        // 把定位得到的数据格式 改成 点击时 数据的格式 

        // 定位成功后，把成功函数获取到的值给successdata， 
        gaode.successdata = data;
        $("#idxinxi").empty();
        $("#idxinxi").append("<P>定位成功</P>");
        // 先隐藏起来，等后面看需求，解解决出发地的问题 
         $("#chufadi").val(data.formattedAddress);
         fabuxiaoxi.dwsj = data; 
         // 定义成功后，切换路由到首页         
        
    }
    //解析定位错误信息
    function onError(data) {
        showMessage1btn("定位失败,刷新按钮在试","",0)
        gaode.errordata = data ;
    } 


    // 根据点击获取坐标点 和 位置
        
        var geocoder,marker;
        function regeoCode() {
            var dingweiszcity = $(".acityselect").text();

            if(!geocoder){
                geocoder = new AMap.Geocoder({
                    city: dingweiszcity, //城市设为北京，默认：“全国”
                    radius: 1000 //范围，默认：500
                });
            }
            var lnglat  = document.getElementById('lnglat').value.split(',');
             if(!marker){
                marker = new AMap.Marker({
                    position: {P: 31.780507,
                    R: 119.95466199999998,
                 lat: 31.780507,
                    lng: 119.954662}
                });
                map.add(marker);
            }
            marker.setPosition(lnglat);
            
            geocoder.getAddress(lnglat, function(status, result) {
                if (status === 'complete'&&result.regeocode) {
                    var address = result.regeocode.formattedAddress;
                    document.getElementById('address').value = address;

                }else{alert(JSON.stringify(result))}
            });
        }
        // 判断 
            map.on('click',function(e){
                setdtCeneter(e.lnglat);
                document.getElementById('lnglat').value = e.lnglat;
                regeoCode();
                $("#idxinxi").empty();
                $("#idsearchvalshow").empty();
                $("#idxinxi").append("<P>选择成功</P>");
        })

        document.getElementById('lnglat').onkeydown = function(e) {
            if (e.keyCode === 13) {
                regeoCode();
                return false;
            }
            return true;
        };    

        // 查询点击时标点 
        function maponbh(jbelnglat){
            setdtCeneter(jbelnglat)
            if(jbelnglat==false){
                document.getElementById('lnglat').value = {};
                regeoCode();
            }
            $("#idxinxi").empty();
            document.getElementById('lnglat').value = jbelnglat;
            regeoCode();
            $("#idxinxi").append("<P>找到地址</P>");
        }

        // 设置中心点函数 
        // 设置地图中心点 
        function setdtCeneter(qjposition){
            //var position = new AMap.LngLat(116, 39);  // 标准写法
            // 简写
           
             var position = [qjposition.R, qjposition.P]; 
             map.setCenter(position); 
            // 获取地图中心点
            var currentCenter = map.getCenter(); 
        }


   
     // 提交功能模块的实现 
     var paymentModular = {
         // 初始化数据 
         states:0,  // 
        // 初始化函数 
        successdata:{},
        errdata:{},
        payment:function(){
             // 当点击提交时，把获取到的值给他们 
             
             gaode.formattedAddress = $("#chufadi").val();       
             gaode.Destination = $("#address").val();
            // 判断一下目的地是否为空  
             if($("#chufadi").val() == ""){
                 $("#chufadi").attr("placeholder","请稍做等待！");
                 paymentModular.states = 0;
                 return false;
             }  
             if($("#address").val() == "" ){
                 $("#address").attr("placeholder","不能为空！");
                 paymentModular.states = 0;
                 return false;
             }
            if($("#containersearchtime").val() == ""){
                 $("#containersearchtime").attr("placeholder","请选择出发时间！");
                 paymentModular.states = 0;
                 return false;
             }
             if($("#searchsetdate").val()==""){
                $("#searchsetdate").attr("placeholder","请选择期望到达时间！");
                paymentModular.states = 0;
                return false;
             }

             $(".xcspanleft").text($(".acityselect").text());

            //出发地的所有信息 
            var cfddata = fabuxiaoxi.cfddata;
            // 目的地所有信息 
             var mdata = fabuxiaoxi.mmddata;

            var lyhash  = window.location.hash;
            var valzhi  = lyhash.split("?");
            var   pushType ="";
            
            if(locationqjval.val=="a=p"){   // b=c是车主 
               pushType = "Passenger";  // 判断是车主 还是乘客发布的 
            }
            
            if(locationqjval.val=="b=v"){ // a=p 是乘客 
                pushType = "Driver";  // 判断是车主 还是乘客发布的 
            }
            var departureTime = $("#containersearchtime").val(); // 出发时间 
            var arrivalTime = $("#searchsetdate").val();     // 到达时间 
            
        // 处理定位功能的数据 
            var dLng = "";
            var dLat = "";
            var departure = "";
            // 先判断出发地cfddata 
            if(cfddata!==""){
                dLng = cfddata.location.lng;
                dLat = cfddata.location.lat;
                departure = cfddata.name;
            }
            
            if(fabuxiaoxi.dwsj!==""){
                dLng = fabuxiaoxi.dwsj.position.lng;
                dLat = fabuxiaoxi.dwsj.position.lat;
                fabuxiaoxi.cfdcity = fabuxiaoxi.dwsj.addressComponent.city;
                departure = fabuxiaoxi.dwsj.formattedAddress;
            }
           
            var successdattsxx = "";
            if(nowusermsg.uid === undefined  ){
                successdattsxx = "读取账号出错,请重新登录!";
            }else if(departure === undefined || dLat === undefined || fabuxiaoxi.cfdcity.trim() === undefined
            || dLng === undefined ){
                if(dLat === undefined || dLng === undefined ){
                    successdattsxx = "始发地不能选市,请选择具体地名!";
                }else{
                    successdattsxx = "始发地出错,请重新选择!";
                }
            }else if(arrivalTime === undefined || departureTime === undefined ){
                successdattsxx = "选择时间出错,请重新选择!";
            }else if(mdata.name === undefined || mdata.location.lng === undefined || 
                mdata.location.lat=== undefined  || fabuxiaoxi.mddcity.trim() === undefined){
                    if(mdata.location.lng === undefined || mdata.location.lat=== undefined ){
                        successdattsxx = "目的地不能选市,请选择具体地名!";
                    }else{
                        successdattsxx = "目的地出错,请重新选择!";
                    }
            }else if(pushType === undefined){
                successdattsxx = "身份出错,请重新点击!";
            }
            
            $.ajax({
                type:"post",
                url:"http://qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/saveMadeFROrders.asp",
                data:{
                    uid	:nowusermsg.uid,        // 用户id  
                    departure:departure.trim(),   // 出发地 
                    dLng :dLng ,    // 出发地经度 
                    dLat: dLat,   // 出发地纬度 
                    arrival:mdata.name.trim(),     // 目的地 
                    arrivalTime:arrivalTime,      // 到达时间问题 
                    aLng:mdata.location.lng,    // 目的地经度 
                    aLat:mdata.location.lat,  // 目的地纬度 
                    departureTime:departureTime,    // 出发时间问题后解决
                    pushType:pushType,        // 发布类型 
                    arCity:fabuxiaoxi.mddcity.trim(),      // 到达城市 
                    dpCity:fabuxiaoxi.cfdcity.trim(),      // 出发城市 
                },
                success:function(data){
                   
                    if(data.result ===  -1 ){
                        showMessage1btn(successdattsxx,"",0);
                        return false;
                    }else {
                        $("#containersearchtime").val("");
                        $("#searchsetdate").val("");
    
                        // 用完要把用过的值初始化 
                        fabuxiaoxi.dwsj = "";   // 定位的初始化 
                        fabuxiaoxi.cfdcity =""; // 城市至为空 
                        fabuxiaoxi.mddcity = "";    // 置空 
                        fabuxiaoxi.cfddata = "";    // 置空 
                        fabuxiaoxi.mmddata = "";    // 置空 
                        
                        showMessage1btn("发布成功!","",0);
                    // 提交的元素 
                        // 数据成功后，在重新请求下页面,刷新数据，把刚刚取到的数据放在页面上给用户观看。
                        window.location.href = "http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/sfc.html";   
                    }
                },
                error:function(data){
                    // 用完要把用过的值初始化 
                    fabuxiaoxi.dwsj = "";       // 定位的初始化 
                    fabuxiaoxi.cfdcity ="";     // 城市至为空 
                    fabuxiaoxi.mddcity = "";    // 置空 
                    fabuxiaoxi.cfddata = "";    // 置空 
                    fabuxiaoxi.mmddata = "";    // 置空 
                    
                    showMessage1btn("发布失败,请刷新重试!","",0)
                }
            })
        }
    }


// 支付页逻辑的实现 
    // 存储获取到的支付页的信息，供支付详情页掉欧阳 
 var paymentpageval = {
        result:{},  // 数据 
        chisu:0    // 计算用户支付了几次 
    }
    // paymentpage(nowusermsg.uid,paymentbttsj.FROID,qmguid,); 
    function paymentpage(uid){
        
        
        $.ajax({
            type:"post",
            url:"http://qckj.czgdly.com/bus/MobileWeb/madeFROViewPayments/queryPageMadeFROVPayments.asp",
            data:{
                cur:1, // 查看页码 
                uid:uid,
                dateRange:"",  // 查看日期，查看所有 
            },
            success:function(data){
                
                paymentpageval.result = data ;
               if(data.result>0){
                    for(var jj = 0 ;jj<data.obj.froViewPayments.length;jj++){
                        paymentpageval.chisu++;
                        $(".phdiconfyq").append(sfcsj.paymentpage);
                    // 处理支付页面的数据 
                        paymentpcl(jj,data);
                    }
               }
            },
            error:function(data){
            
            }
        })
    }
    // 支付成功处理的页面的数据 
    //    <a href="#payment" class="aqkpayment clearfix" id="pmaqkpayment">  
    function paymentpcl(i,data){
        var sj = data.obj.froViewPayments[i];
        // 处理点击支付的数据 
            // 传递参数 
            var pmaqkpayment  = "#payment?id="+sj.id+"&froid="+sj.froid+"&puid="+sj.puid;
            $("#pmaqkpayment").attr("href",pmaqkpayment);
            var pmaqkpaymentid = "#pmaqkpayment"+i;
            $("#pmaqkpayment").attr("id",pmaqkpaymentid);
        // 处理订单时间 
            $("#pmpaytime").text(sj.payDate);
            var pmpaytime = "pmpaytime"+i;
            $("#pmpaytime").attr("id",pmpaytime);
        // 处理支付金额 
            $("#pmpayyiyuan").text(sj.payPrice);
            var pmpayyiyuan = "pmpayyiyuan"+i;
            $("#pmpayyiyuan").attr("id",pmpayyiyuan);
        // 处理支付结果 
            var jg = "";   // 处理结果 
            // 支付状态只有 -1 和 1 两个状态 
            if(sj.payState === 1){
                jg ="成功"
            }else if (sj.payState === -1){
                jg ="失败"
            }else {
                jg = "出现问题";
            }
            $("#pmpayssuc").text(jg);
            var pmpayssuc = "pmpayssuc"+i;
            $("#pmpayssuc").attr("id",pmpayssuc);
    }   

// 点击路由时 读取信息 
    // "#payment?id=1 
    function passengercli(){
        var winhash = window.location.hash;
       
        var sjone = winhash.split("?");
        var sjid = sjone[1].split("&"); // id  1 
        var sjval = sjid[0].split("=");
        var sjvalzhi= sjval[1];            // 1,2,3 
       
        if(sjvalzhi===""){
            return false;
        }else {
            // 循环发送得到的数据，比较下，id相同，则把数据添加进去。 
            for(var a  = 0; a < paymentpageval.result.obj.froViewPayments.length;a++){
                if(sjvalzhi== paymentpageval.result.obj.froViewPayments[a].id ){
                    passengerclival(paymentpageval.result.obj.froViewPayments[a]);
                }
            }
        }
    }
    // 具体填充的函数 
        function passengerclival(val){
            
            $(".pdetlsdadlook").empty();
            // 付款
                $("#pdfkh").text(val.vpNo);
            // 支付价格 
                $("#pdzfjo").text(val.payPrice);
            // 支付情况 
                var zfqk = "成功";
                var jg = "";   // 处理结果 
                // 支付状态只有 -1 和 1 两个状态 
                if(val.payState === 1){
                    jg ="成功"
                }else if (val.payState === -1){
                    jg ="失败"
                }else {
                    jg = "出现问题";
                }
                $("#pdzfqk").text(jg);
            // 支付类型 
                $("#pdzflx").text(val.payType);
            // 支付日期 
                $("#pdzfrq").text(val.payDate);
            // 填充 
                if(val.payState === 1){
                    $(".pdetlsdadlook").append("<div class='clearfix' style='height: 56px;'><button class='lookpaydan btn btn-success'>查看行程页面</button><div class='lookpaydxx' style='display:none;'></div></div>");
                    // 点击查看页面功能
                   
                    $(".lookpaydan").bind("touch click",function(){
                        var jwxx = "#ownshowdata?id="+val.froid+"&uid="+val.puid+"&sf=run";
                        var wlgref = "http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/font/html/xq.html"+jwxx;
                        window.location.href = wlgref ;
                    })
                }else {
                    $(".pdetlsdadlook").empty();
                }
        }