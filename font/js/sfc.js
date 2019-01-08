    /* 时间控件函数 */
       /*  var date = new Date(); */
       var nowusermsg = {
            uid:111,         /* 用户id */
            openid:111,
            phone:111,  /* 用户的手机号 */
            lyxx:"",   /* 存储需要用到路由的值 */
        }
         /* 禁用效果 */
         $(document.body).css({
            "overflow-x":"hidden",
            "overflow-y":"hidden"
          });
     
    $(function(){
/* 给滑动元素获取高度 */
        /* 乘客页的高度 */
        $(".cylx").outerHeight($(document.body).outerHeight()-$(".passenger .select").outerHeight()-$(".header").outerHeight());
        /* 车主页的高度 */
        /* 这里容易出问题，最后在改改 */
        $(".vonpondclxc").outerHeight($(document.body).outerHeight()-$(".passenger .select").outerHeight()-$(".header").outerHeight());
        /* 全部行程页 乘客页的高度 */
        $(".runpassenger").outerHeight($(document.body).outerHeight()-$(".header").outerHeight());
        /* 全部行程页 车主页的高度 */
        $(".runvowner").outerHeight($(document.body).outerHeight()-$(".header").outerHeight());
        /* 支付页 */
        $(".paymentzy").outerHeight($(document.body).outerHeight()-$(".header").outerHeight());
    /* 解决一些页面内容太多无法滑动的问题 */
        $(".details").outerHeight($(document.body).outerHeight()-$(".header").outerHeight());
        
        $("#searchxincheng").outerHeight($(document.body).outerHeight()-$(".header").outerHeight());
        /* 让筛选页也可以滑动 */
        $(".runscreen").outerHeight($(document.body).outerHeight()-$(".header").outerHeight());

        
        /* 无需id值，直接取全部数据 */
        getqbVowner();
        getqbPassenger();
       
        // 当 hash变化时切换显示
    /* 页面初始化时就执行这些数据 */
    $(".searchtime #datetime").datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        locale: moment.locale('zh-CN'),
    /*  startDate: new Date() */   //目前之前的时间都不能选
        minDate: false, // 最小日期，如'2018/08/15'，则14号及14号前的日期都不可选
    
        });

    /* 给导航条绑定切换*/
    let hpassengerpd = 1;
   $(".hpassenger").bind("touch click",function(){
         $(".runluyouaa").hide();
        hpassengerpd++;
       if(hpassengerpd%2===0){
        $("#hpassengericon").attr("class","glyphicon glyphicon-chevron-up");
        $(".hpassengerxsaaa").css("color","#0094FF");
       }else {
        $("#hpassengericon").attr("class","glyphicon glyphicon-chevron-down"); 
        $(".hpassengerxsaaa").css("color","#555");
       }
       $(".hvowner").slideToggle("normal");
   })
   /* 给导航条绑定事件 */
   let hrunxuzval = 1;
    $(".hrun").bind("touch click",function(){
        hrunxuzval ++;
        if(hrunxuzval%2===0){
            $(".hrunoneicon").attr('class',"glyphicon glyphicon-triangle-bottom hrunoneicon");
        }else {
            $(".hrunoneicon").attr('class',"glyphicon glyphicon-triangle-top hrunoneicon");
        }
        $(".runluyouaa").slideToggle("normal");
    })
        
        /* 后台给的先调用下 这段js */
        getOpenid(function(openid){
            nowusermsg.uid = localCache("uid-kongbatong");
            nowusermsg.openid = localCache("openid-kongbatong");
            nowusermsg.phone = localCache("mobile-kongbatong");
        console.log(nowusermsg.uid,localCache("openid-kongbatong"),nowusermsg.openid,nowusermsg.phone);
            getPassenger();
            getVowner();
            paymentpage(nowusermsg.uid);
            /* 获取到Uid后，乘客页添加滑动效果 */
            hdpassengerNode();
            /* 给车主页添加无限滚动效果 */
            hdvownperNode();
            /* 全部乘客行程添加滑动效果 */
            hdrunpassenger();
            /* 处理全部车主页 */
            hdrunvowner();
            /* 处理支付页 */
            hdpaymentzy();

        nowusermsg.openid = openid;
        if(null == nowusermsg.uid || "" == nowusermsg.uid) {
                    register("http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/Register_content.html");   //返回注册登录页面
                } else {
                    // initData(nowusermsg.uid); //加载页面数据
                    created();
                    hactive();
                    formcontrol();
                }
            },location.search);
            /* 先记录一下当前页面地址在跳转 */
            /* http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/Register_content.html
                记录在本地
            */
        function register(val){
            var nowhref = window.location.href;
            localCache("page",nowhref);     /* 存储在本地的地址 */
            window.location.href = "Register_content.html";		/* 发送给他的地址 */	
        }  

        /* 点击id可以选择城市 */
        $("#cityselect").bind("touch click",function(){
            cityselect();
        })
        if(cityselectval.nowcity==""){
            $(".acityselect").text("常州市");
        }
        

        /* goods.js页面的数据 */
        $("#idxinxi").append("<P>请稍等</P>");
        /* 点击提价时 */

        /* 支付模块的功能 */
        $("#gaodesubmit").bind("touch click",function(e){
           paymentModular.payment();
        })

        /* 搜索功能的实现 */
        $("#citysearch").focus(function(){
           
        })
        $("#citysearch").blur(function(){
             $("#citysearch").val("");
        })

        /* 修改样式 */
        $("#ctxz").css("display","none");
        
        window.onhashchange = hashChange;



        /* 另外js的初始化数据 */
        createlival();
        /* 绑定时间函数 */
        setTimeWheel();
        /* 这里的问题 */
        $("#chufadi").bind("focus",function(){
            inchufadi();
        })
        /* 这里的问题 */
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
            /* 初始化条件 */
            $("#chufadi").val("");
            $("#address").val("");


        /*  时间选择页的操作 */  
        
        $(".timequx").bind("touch click",function(){
            timequxfunction();
        })
        
        $(".timeqr").bind("touch click",function(){
            timeqrfunction();
        })
    })

    /* 选择城市的初始化函数 */
    let cityselectval = {
        nowcity:"",  
    }

    /* 存储乘客和车主的路由值 */
    let locationqjval = {
        val:"",     /* 存储是车主还是乘客的路由值 */
    }

    /* goods.js页面的数据合并 */
    let gaode = {
        successdata:{}, // 成功的对象
        errordata:{},   // 失败存储的对象
        successposition:{},  // 成功得到的postion 对象
        formattedAddress:"", // 定位得到的地址  始发地
        Destination:"",        // 目的地   
        citysearchval:"",   // input 搜索的值 
        citysearchSearchval:{},    //搜索得到的结果
        citysearchSearchtips:[],   //搜索得到的数组结果
        dingweicity:"",  /* 搜索定位城市需要的城市名 */
    }
    let localdiz = {
        nowSignin:"http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/Register_content.html",      /* 登录地址 */
    }
    /* 发布消息接受 */

    let fabuxiaoxi = {
        cfddata:{}, /* 存储出发地数据的地方 */
        mmddata:{}, /* 存储目的地数据的地方 */
        cfdcity:"", /* 存储出发地的城市 */
        mddcity:"", /* 存储目的地的城市 */
        splitmddcity:"",    /* 需要进行切的值 */
        dwsj:"",        /* 定位得到的数据 */
    };

    /* 点击得到的的数据 */
    let clickresult = {
        result:{}
    }
    // 全局静态 数据
    let sfcsj = {
        passenger:{},  //乘客的数据
        vowner:{},       // 车主的数据
        passengerUrl:"http://qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/queryPageMadeFROrders.asp",
        // 乘客数据的地址 
        vownerUrl:"http://qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/queryPageMadeFROrders.asp",
        // 乘客数据的div
        
        passengerDiv:`
            <div class="cylx-cy clearfix" id="passengerDiv">
                <a href="#showdata" id="aPassengerDiv" target="_blank" class="clearfix">
                <div class="cylx-cyheader">
                <span class="bt">常用</span>
                <div class="time">
                    <span class="hours" id="psghours"></span>
                </div>
                </div>
                <div class="cylx-cycenter clearfix">
                    <div id="cylx-departure" class="psgdeparture"></div>
                    <span class="glyphicon glyphicon-arrow-right cycicon"></span>
                    <div id="cylx-Destination"  class="psgdestination"></div>
                </div>
                <div class="cydstate clearfix">
                    <span class="cydstates">订单情况:</span>
                    <div class="cydstated" id="cydstatedzt"></div>
                </div>
            </a>
            </div>
        
        `,
        // 车主数据的 div 
        vownerDiv:`
        <a href="#showdata" id="avownerDiv"  target="_blank"  class="clearfix">
            <div class="circle clearfix" id="vownerDiv">
                <div class="left vownerleft clearfix">
                    <div class="time">
                        <span class="data" id="vdata"></span>
                        <div class="rq">
                            <span class="hours" id="vdhours"></span>
                        </div>
                    </div>
                    <div class="mdd clearfix">
                        <div class="cfd" id="vdcfd"></div>
                        <span class="glyphicon glyphicon-arrow-right mdd-icon"></span>
                        <div class="df" id="vdf"></div>
                    </div>
                </div>
                <div class="right clearfix">
                    <span class="ricon left glyphicon glyphicon-menu-right"></span>
                </div>
                <div class="cydstate clearfix">
                    <span class="cydstates">订单情况:</span>
                    <div class="cydstated" id="cirstatedzt"></div>
                </div>
            </div>
            </a>
        
        `,
        // 全部行程中乘客 
        runpassengerDiv:`
        <div class="circle clearfix" id="runpassengerDiv">
        <a href="#showdata" id="arunpassengerDiv" class="arunpassengerDivclass clearfix">
            <div class="left runpassengerleft  clearfix">
                <div class="time">
                    <span class="data" id="rpsgdata"></span>
                    <div class="rq">
                        <span class="hours" id="rpsghours"></span>
                    </div>
                </div>
                <div class="mdd clearfix">
                    <div class="cfd" id="rpsgcfd"></div>
                    <span class="glyphicon glyphicon-arrow-right mdd-icon"></span>
                    <div class="df" id="rpsgdf"></div>
                    <div class="runpassengerDivuid" style="display:none" id="idrunpassengerDivuid"></div>
                </div>
            </div>
            </a>
            <div class="right clearfix">
                <button  class="ricon left btn btn-success " id="paymentbutton">抢单</button>
            </div>
        </div>
        `,
        //全部行程中车主
        runvownerDiv:`
        <div class="circle clearfix" id="runvownerDiv">
        
        <a href="#ownshowdata" id="arunvownerDiv"  target="_blank"  class="arunvownerDivclass clearfix">
            <div class="left runvownerleft  clearfix" >
                <div class="time">
                    <span class="data" id="rvdata">14号</span>
                    <div class="rq">
                        <span class="hours" id="rvdhours"></span>
                    </div>
                </div>
                <div class="mdd clearfix">
                    <div class="cfd" id="rvdcfd"></div>
                    <span class="glyphicon glyphicon-arrow-right mdd-icon"></span>
                    <div class="df" id="rvdf"></div>
                </div>
            </div>
            <div class="right clearfix">
                <input type="submit" class="ricon left btn btn-primary " value="查看">
            </div>
            </a>
        </div> 
        `,
        /* 支付页的模板 */
        paymentpage:`
        <a href="#payment" class="aqkpayment clearfix" id="pmaqkpayment">
            <div class="paymentbody clearfix">
                <div class="paydate clearfix">
                    <span class="paydateicon">订单时间:</span>
                    <div class="paytime" id="pmpaytime">
                        
                    </div>
                </div>
                <div class="paymoney clearfix">
                    <div class="pmsl">支付金额:</div>
                    <div class="payyiyuan" id="pmpayyiyuan"></div>
                </div>
                <div class="paystate">
                    <span class="payszfjg">支付结果:</span>
                    <span class="payssuc" id="pmpayssuc"></span>
                </div>
            </div>
        </a>
        `,
    }


    /*让时间绑定切换到页面的事件 */
    function formcontrol(){
        /* 一共四个按钮
            绑定事件
        */
        $("#pformcontrolsr").bind("focus",function(){
            locationqjval.val = "a=p";
            hashChange("#details?a=p");
            
        });
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
        /* 点击了，先隐藏，在进行效果展示 */
    }
    
    // 切换路由的方法
    function hashChange(hashzhi){
        var locationHash = location.hash;
         // 处理一下参数
        // #details?a=3
        var val1 = locationHash.split("?");
        if(val1[0]=="#passenger" || locationHash =="#passenger" ){
            $(".runluyouaa").hide();
            $(".hrunoneicon").attr('class',"glyphicon glyphicon-triangle-bottom hrunoneicon");
            hashcreate();
            $(".passenger").show();
        }
        
        /* 不是那个路由的，默认隐藏那个效果 */
        $("#hpassengericon").attr("class","glyphicon glyphicon-chevron-down"); 
        $(".hpassengerxsaaa").css("color","#555");

        /* run路由 */
        if(val1[0]=="#run"){
            /* 路由为 run 时 默认取值 */
            /* 为run时，请求数据 */
            hashcreate();
            $(".run").show();
            $(".runvowner").hide();
            $(".runscreen").hide();
            $(".runpassenger").show();
            if(val1[1]=="diver"){
                $(".runpassenger").hide();
                $(".runscreen").hide();
                $(".runvowner").show();
               /*  getqbVowner(); */
            }else if(val1[1]=="passger"){
                $(".runvowner").hide();
                $(".runscreen").hide();
                $(".runpassenger").show();
                /* getqbPassenger(); */
            }else if(val1[1]=="passgeran" || val1[1]=="diveran"){
               
                $(".runvowner").hide();
                $(".runpassenger").hide();
                runscjwfbsxddcsh();
                $(".runscreen").show();
                val1[1]==="passgeran"?nowusermsg.lyxx = "passgeran":nowusermsg.lyxx = "diveran";
                console.log(nowusermsg.lyxx);
            }
        }else{
            /* 不是run则 隐藏导航栏 */
            $(".runluyouaa").hide();
            $(".hrunoneicon").attr('class',"glyphicon glyphicon-triangle-bottom hrunoneicon");
        }

        if(hashzhi=="#details?a=p" || hashzhi=="#details?b=v"){
            locationHash="#details";
            window.location.hash= hashzhi;
            $("#address").val("");
        }
        
        /* 判断参数 */
        if(val1[0]=="#ownshowdata"){
            openxq();
        }
        $(".hvowner").hide();
         if(val1[0]=="#vowner" ||locationHash=="#vowner"){
            hashcreate();
            $(".vowner").show();
        }else if(locationHash=="#details"){
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
            /* 处理支付详情页 */
            passengercli();
            hashcreate();
            $(".pdetails").show();
        }
    }
    
/* 打开详情页函数 */
        function  openxq(){
            /* 暂时没发挥作用 */
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
            removeActive();
            $(".htogglethree").addClass("hactive");
        })
        function removeActive(){
            $(".htoggleone").removeClass("hactive");
            $(".htoggletwo").removeClass("hactive");
            $(".htogglethree").removeClass("hactive");
            
        };
       
    }
    
    

    /* 获取数据的地方 */
    //获取乘客数据进行渲染
    function getPassenger(){
        $.ajax({
             url: sfcsj.passengerUrl,
            type: 'post',
            data:{
                cur:1,  /* 默认取第一页 */
                pushType:"Passenger",   /* 乘客 */
                uid:nowusermsg.uid, /* id号 */
                dateRange:"",      /* 日期范围，默认取一个月之内的 */
                arCity:"",      /* 到达城市 */
                dpCity:"",      /* 出发城市 */
            },
             success: function (data) {
                sfcsj.passenger = data;
                /* 获取成功，但是数据暂时为空 */
                console.log("乘客的数据",data);
                /* setPassenger() 处理 乘客端数据的函数*/
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
                cur:1,  /* 默认取第一页 */
                pushType:"Driver",   /* 车主身份*/
                uid:nowusermsg.uid, /* id号 */
                dateRange:"",      /* 日期范围，默认取一个月之内的 */
                arCity:"",      /* 到达城市 */
                dpCity:"",      /* 出发城市 */
            },
            success: function (data) {
                sfcsj.vowner = data ;
                /* 获取成功，但是数据暂时为空 */
                console.log("车主",data);
                /* setVowner() 处理车主端的数据 */
               setVowner(data);
           }
        });
    }

    /* 全部行程中的数据 */
    let qbxcvalsj = {
        passenger:{}, /* 乘客数据 */
        vowner:{},  /* 车主数据 */
    }
    /* 全部行程中的乘客 */
    function getqbPassenger(){
        $.ajax({
            url: sfcsj.passengerUrl,
           type: 'post',
           data:{
               cur:1,  /* 默认取第一页 */
               pushType:"Passenger",   /* 乘客 */
               uid:"",  /* id号   默认为空就是取全部的数据*/
               dateRange:"",      
               arCity:"",      /* 到达城市 */
               dpCity:"",      /* 出发城市 */
           },
            success: function (data) {
                qbxcvalsj.passenger = data;
               console.log("全部乘客的数据",data);
               /* setPassenger() 处理 乘客端数据的函数*/
               setqbPassenger(data);
           }
          });
    }
        /* 处理全部行程中乘客的信息 */
            function setqbPassenger(data){
                let passengerData = data.obj.frOrders;
                if(data.result>0){ //为0才可以进行操作
                    $("#runpassengerNode").empty();
                    for(var i = 0 ;i<passengerData.length;i++){
                            /* 全部行程中的数据的操作 */
                        if(passengerData[i].state > -1){
                            /* 
                                全部行程中 值的变化
                            */
                            $("#runpassengerNode").append(sfcsj.runpassengerDiv);

                            /* 全部行程中的uid应该不是本地的uid，而是ajax时的uid */

                            var runaPassengerDivsj = "#showdata?"+"id="+passengerData[i].id+"&uid="+nowusermsg.uid;
                            $("#arunpassengerDiv").attr("href",runaPassengerDivsj);
                            var runidaPassengerDiv = "arunpassengerDiv"+i;
                            
                            $("#arunpassengerDiv").attr("id",runidaPassengerDiv);
                            setPassengerqbval(i,passengerData);
                        }
                    }
                }
            }

    /* 全部行程中的车主数据  */
    function getqbVowner(){
        $.ajax({
            url: sfcsj.vownerUrl,
           type: 'post',
           data:{
               cur:1,  /* 默认取第一页 */
               pushType:"Driver",   /* 乘客 */
               uid:"",  /* id号   默认为空就是取全部的数据*/
               dateRange:"",      /* 日期范围，取全部的 */
               arCity:"",      /* 到达城市 */
               dpCity:"",      /* 出发城市 */
           },
            success: function (data) {
               qbxcvalsj.vowner = data;
               /* 获取成功，但是数据暂时为空 */
               console.log("全部车主的数据",data);
               /* setPassenger() 处理 乘客端数据的函数*/
               setqbVowneraa(data);
           }
          });
    }
        /* 处理全部行程中车主的信息 */
            function setqbVowneraa(data){
                var vownerData = data.obj.frOrders;
                // 先判断状态码 
                if(data.result>0){ //为0才可以进行操作
                    $("#runvownerNode").empty();
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
        let passengerData = data.obj.frOrders;
        // 先判断状态码 
        if(data.result>0){ //为0才可以进行操作
            for(var i = 0 ;i<passengerData.length;i++){
             /* 乘客页中  行程的变化 */
                $("#passengerNode").append(sfcsj.passengerDiv);
                // 改变div的编号
                var idpassengerDiv = "passengerDiv"+i;
                $("#passengerDiv").attr("id",idpassengerDiv);

                // 改变a标签的编号
                var aPassengerDivsj ="./font/html/xq.html#ownshowdata?"+"id="+passengerData[i].id+"&uid="+nowusermsg.uid;
                $("#aPassengerDiv").attr("href",aPassengerDivsj);
               
                var idaPassengerDiv = "aPassengerDiv"+i;
                $("#aPassengerDiv").attr("id",idaPassengerDiv);
                
                /* 对乘客页数据的渲染操作 */
                    setPassengerval(i,passengerData);
            }
        }
    }
    /* 对乘客页书记的渲染操作函数 */
        function setPassengerval(i,passengerData){
        /* 先获取，在修改 */
            /* 操作时间 */
            $("#psghours").text(passengerData[i].departureTime);
            var psghours = "psghours"+i;
            $("#psghours").attr("id",psghours);
            /* 操作出发地 */
            $(".psgdeparture").text(passengerData[i].departure);
            var psgdeparture = "psgdeparture"+i;
            $(".psgdeparture").attr("class",psgdeparture);
            /* 操作目的地 */
            $(".psgdestination").text(passengerData[i].arrival);
            var psgdestination = "psgdestination"+i;
            $(".psgdestination").attr("class",psgdestination);
            /* 乘客页状态的判断显示 */
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

    /* 对全部行程中乘客数据的渲染 */
        function setPassengerqbval(i,passengerData){
            /* 给他动态添加点击事件 */
                var oclickid = passengerData[i].id;

                /* 点击时还要传用户的uid，
                uid和当前uid不一样，没有点击取消订单的权限。
                uid的当前uid一样，拥有点击取消叮当的权限。 */

                var paymentbuttonsh = "paymentbutton("+passengerData[i].id+","+passengerData[i].uid+")";
                $("#paymentbutton").attr("onclick",paymentbuttonsh);
                var paymentbutton = "paymentbutton"+ passengerData[i].id;
                $("#paymentbutton").attr("id",paymentbutton);
            /*切分数据 */
                var sj = passengerData[i].departureTime.split(" ");

            /* 这是数据的发布者的id号 */
           /* 对uid号进行操作 */
                $(".runpassengerDivuid").text(passengerData[i].uid);
                var runpassengerDivuid  = "runpassengerDivuid"+passengerData[i].uid;
                $(".runpassengerDivuid").attr("class",runpassengerDivuid);
            /* 对号数的操作 */
                $("#rpsgdata").text(sj[0]);
                var rpsgdata  = "rpsgdata"+i;
                $("#rpsgdata").attr("id",rpsgdata);
            /* 对细分时间的操作 */
                $("#rpsghours").text(sj[1]);
                var rpsghours  = "rpsghours"+i;
                $("#rpsghours").attr("id",rpsghours);
            /* 对出发地的操作 */
                $("#rpsgcfd").text(passengerData[i].departure);
                var rpsgcfd  = "rpsgcfd"+i;
                $("#rpsgcfd").attr("id",rpsgcfd);
            /* 对目的地的操作 */
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
                /* 车主页的行程 */
                        setVownercz(i,vownerData);
                }
            }
            
        }
    }
    /* 车主页的信息 */
        function setVownercz(i,vownerData){
            var sj = vownerData[i].departureTime.split(" ");
            /* 大的时间的操作 */
                $("#vdata").text(sj[0]);
                var vdata = "vdata"+i;
                $("#vdata").attr("id",vdata);
            /* 细分的时间的操作 */
                $("#vdhours").text(sj[1]);
                var vdhours = "vdhours"+i;
                $("#vdhours").attr("id",vdhours);
            /* 出发地的操作*/
                $("#vdcfd").text(vownerData[i].departure);
                var vdcfd = "vdcfd"+i;
                $("#vdcfd").attr("id",vdcfd);
            /* 目的地的操作 */
                $("#vdf").text(vownerData[i].arrival);
                var vdf = "vdf"+i;
                $("#vdf").attr("id",vdf);
            /* 车主页状态的操作 */
               /*  #cirstatedzt */
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
    /* 全部行程页的车主信息 */
        function setqbVowner(i,vownerData){
            var sj = vownerData[i].departureTime.split(" ");
            /* 全部行程中大的时间 */
                $("#rvdata").text(sj[0]);
                var rvdata = "rvdata"+i;
                $("#rvdata").attr("id",rvdata);
            /* 全部行程中小的时间 */
                $("#rvdhours").text(sj[1]);
                var rvdhours = "rvdhours"+i;
                $("#rvdhours").attr("id",rvdhours);
            /* 全部行程总的出发地 */
                $("#rvdcfd").text(vownerData[i].departure);
                var rvdcfd = "rvdcfd"+i;
                $("#rvdcfd").attr("id",rvdcfd);
            /* 全部行程中的目的地 */
                $("#rvdf").text(vownerData[i].arrival);
                var rvdf = "rvdf"+i;
                $("#rvdf").attr("id",rvdf);
        }
    

    /* 选择城市页 函数 searchcity */
    function cityselect(){
      cityselectval.nowcity =   $(".acityselect").text();
      /* 这个导致的bug */
      /* window.location.search = "?nowcity="+cityselectval.nowcity; */
      searchcity();
    }
    
    /* 地图API页面处理逻辑 */
         
    /* 定位存储的字符串 */
   
    var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom:14,//级别
        center: [119.9,31.7],//中心点坐标

    });

        /* 城市出来地址 */
        /* 推荐功能的实现 */
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
            /* 定位maker实现的代码 */
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
     

      /* 绑定信息 */
      document.getElementById("citysearch").oninput = autoInput;

      /* 点击处理函数  公用的 */
      function touchchuli(result){
          /* 首先清空所有 */
        $("#idsearchvalshow").empty();
        if(result.location==""){
            $("#idxinxi").empty();
            $("#idxinxi").append("<P>查询出错</P>");
            $("#address").val("查询出错，请重新查找！")
            maponbh(false);
        }else {
            /* {P: 31.774645, R: 119.97328400000004, lng: 119.973284, lat: 31.774645} */
           
            maponbh(result.location);
            clickresult.result= result;
            /* 这里的问题 */
        }
     }

     
    //定位功能 
    AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：5s
            buttonPosition:'RB',    //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status,result){
            if(status=='complete'){
                onComplete(result)
                /* 定位时绑定到出发地的函数的值上 */
                /* fabuxiaoxi.cfddata = result; */
            }else{
                onError(result);
            }
        });
    });


    function onComplete(data) {
        /* 解决之道 */
        /* 把定位得到的数据格式 改成 点击时 数据的格式 */

        /* 定位成功后，把成功函数获取到的值给successdata， */
        gaode.successdata = data;
        $("#idxinxi").empty();
        $("#idxinxi").append("<P>定位成功</P>");
        /* 先隐藏起来，等后面看需求，解解决出发地的问题 */
        /* $("#chufadi").val(data.formattedAddress);
        fabuxiaoxi.cfddata = data; */
    }
    //解析定位错误信息
    function onError(data) {
        /* 失败后把失败的值给他 */
        /* data.message:失败原因 */
        console.log("定位失败");
        gaode.errordata = data ;
    } 


    // 根据点击获取坐标点 和 位置
        
        let geocoder,marker;
        function regeoCode() {
            let dingweiszcity = $(".acityselect").text();

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
        /* 判断 */
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

        /* 查询点击时标点 */
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

        /* 设置中心点函数 */
        /* 设置地图中心点 */
        function setdtCeneter(qjposition){
            //var position = new AMap.LngLat(116, 39);  // 标准写法
            // 简写
           
             var position = [qjposition.R, qjposition.P]; 
             map.setCenter(position); 
            // 获取地图中心点
            var currentCenter = map.getCenter(); 
        }


   
     /* 提交功能模块的实现 */
     let paymentModular = {
         /* 初始化数据 */
         states:0,  /* 
         0默认代表未成功，填写的地址为空，
         1代表成功，
         2：未成功，支付问题*/
        /* 初始化函数 */
        successdata:{},
        errdata:{},
        payment:function(){
             // 当点击提交时，把获取到的值给他们 
             
             gaode.formattedAddress = $("#chufadi").val();       
             gaode.Destination = $("#address").val();
            
             console.log("发布",fabuxiaoxi);

             /* 判断一下目的地是否为空  */
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

             
            var departure = $("#departure").val();
            /* 出发地的所有信息 */
            var cfddata = fabuxiaoxi.cfddata;
            /* 目的地所有信息 */
             var mdata = fabuxiaoxi.mmddata;
            /* 多一层判断，解决城市定位问题 */
            if(!fabuxiaoxi.cfddata.district){
                fabuxiaoxi.cfddata.district = "";
            }
            let lyhash  = window.location.hash;
            var valzhi  = lyhash.split("?");
             console.log("所有信息",fabuxiaoxi,"出发地信息",cfddata,"目的地信息",cfddata);
            
            var   pushType ="";
            
            if(locationqjval.val=="a=p"){   /* b=c是车主 */
               pushType = "Passenger";  /* 判断是车主 还是乘客发布的 */
            }
            
            if(locationqjval.val=="b=v"){ /* a=p 是乘客 */
                pushType = "Driver";  /* 判断是车主 还是乘客发布的 */
            }
            let departureTime = $("#containersearchtime").val(); /* 出发时间 */
            let arrivalTime = $("#searchsetdate").val();     /* 到达时间 */
            console.log(departureTime,pushType,arrivalTime);
            $.ajax({
                type:"post",
                url:"http://qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/saveMadeFROrders.asp",
                data:{
                    uid	:nowusermsg.uid,        /* 用户id  */
                    departure:cfddata.name,   /* 出发地 */
                    dLng :cfddata.location.lng,    /* 出发地经度 */
                    dLat: cfddata.location.lat,   /* 出发地纬度 */
                    arrival:mdata.name,     /* 目的地 */
                    arrivalTime:arrivalTime,      /* 到达时间问题 */
                    aLng:mdata.location.lng,    /* 目的地经度 */
                    aLat:mdata.location.lat,  /* 目的地纬度 */
                    departureTime:departureTime,    /* 出发时间问题后解决*/
                    pushType:pushType,        /* 发布类型 */
                    arCity:mdata.district,      /* 到达城市 */
                    dpCity:cfddata.district,      /* 出发城市 */
                },
                success:function(data){
                    $("#containersearchtime").val("");
                    $("#searchsetdate").val("");
                    /* 初始化定位得到的值 */
                    fabuxiaoxi.dwsj ={};
                    console.log("获取成功的数据",data);
                /* 提交的元素 */
                    window.location.hash = "#passenger";
                },
                error:function(data){
                    console.log("失败的原因",data);
                }
            })
        },
    }


/* 支付页逻辑的实现 */
    /* 存储获取到的支付页的信息，供支付详情页掉欧阳 */
    let paymentpageval = {
        result:{},  /* 数据 */
    }
   
    function paymentpage(uid){
        console.log("用户的uid",uid);
        /* uid         用户id
            dateRange   日期范围（"today","weekday","month"） */
        $.ajax({
            type:"post",
            url:"http://qckj.czgdly.com/bus/MobileWeb/madeFROViewPayments/queryPageMadeFROVPayments.asp",
            data:{
                cur:1, /* 查看页码 */
                uid:uid,
                dateRange:"",  /* 查看日期，查看所有 */
            },
            success:function(data){
                console.log("支付表成功的数据",data);
                paymentpageval.result = data ;
               if(data.result>0){
                    for(var jj = 0 ;jj<data.obj.froViewPayments.length;jj++){
                        $(".phdiconfyq").append(sfcsj.paymentpage);
                    /* 处理支付页面的数据 */
                        paymentpcl(jj,data);
                    }
               }
                 
            },
            error:function(data){
                console.log("支付表失败的原因",data);
            }
        })
    }
    /* 支付成功处理的页面的数据 */
    /*    <a href="#payment" class="aqkpayment clearfix" id="pmaqkpayment"> */ 
    function paymentpcl(i,data){
        var sj = data.obj.froViewPayments[i];
        /* 处理点击支付的数据 */
            /* 传递参数 */
            var pmaqkpayment  = "#payment?id="+sj.id;
            $("#pmaqkpayment").attr("href",pmaqkpayment);
            var pmaqkpaymentid = "#pmaqkpayment"+i;
            $("#pmaqkpayment").attr("id",pmaqkpaymentid);
        /* 处理订单时间 */
            $("#pmpaytime").text(sj.payDate);
            var pmpaytime = "pmpaytime"+i;
            $("#pmpaytime").attr("id",pmpaytime);
        /* 处理支付金额 */
            $("#pmpayyiyuan").text(sj.payPrice);
            var pmpayyiyuan = "pmpayyiyuan"+i;
            $("#pmpayyiyuan").attr("id",pmpayyiyuan);
        /* 处理支付结果 */
            var jg = "";   /* 处理结果 */
            /* 支付状态只有 -1 和 1 两个状态 */
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


/* 点击路由时 读取信息 */
    /* "#payment?id=1 */
    function passengercli(){
        var winhash = window.location.hash;
       
        var sjone = winhash.split("?");
        var sjid = sjone[1].split("="); /* id  1 */
        var sjval = sjid[1];    /* 1,2,3 */
        if(sjid===""){
            return false;
        }else {
            for(var a  = 0; a < paymentpageval.result.obj.froViewPayments.length;a++){
                if(sjval == paymentpageval.result.obj.froViewPayments[a].id ){
                   
                    passengerclival(paymentpageval.result.obj.froViewPayments[a]);
                }
            }
        }
    }
    /* 具体填充的函数 */
        function passengerclival(val){
            /* 付款号： */
                $("#pdfkh").text(val.vpNo);
            /* 支付价格 */
                $("#pdzfjo").text(val.payPrice);
            /* 支付情况 */
                var zfqk = "成功";
                var jg = "";   /* 处理结果 */
                /* 支付状态只有 -1 和 1 两个状态 */
                if(val.payState === 1){
                    jg ="成功"
                }else if (val.payState === -1){
                    jg ="失败"
                }else {
                    jg = "出现问题";
                }
                $("#pdzfqk").text(jg);
            /* 支付类型 */
                $("#pdzflx").text(val.payType);
            /* 支付日期 */
                $("#pdzfrq").text(val.payDate);
            
            /* 订单退款 有的话则赋值  没有的话 保持原来的值 */
                if(val.refundNo === ""){
                    /* 退款订单情况 */
                        $("#pdddtk").text("已查看，不能退款");
                    /* 退款单号 */
                        $("#pdtkdh").text("无");
                    /* 退款价格 */
                        $("#pdtkjg").text("0.00");
                    /* 退款日期 */
                        $("#pdttime").text("无");
                }else {
            /* 有的话则赋值 */
                   /* 订单情况 */
                   $("#pdddtk").text("已退款,注意查收");
                   /* 退款单号 */
                       $("#pdtkdh").text(val.refundNo);
                   /* 退款价格 */
                       $("#pdtkjg").text(val.refundPrice);
                   /* 退款日期 */
                       $("#pdttime").text(val.refundDate);
                }
        }
