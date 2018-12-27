   /*  var myDate = new Date();
    var time = myDate.getDate().toString()+myDate.getHours().toString()+myDate.getMinutes().toString();
    console.log(time); */

      /* 时间控件函数 */
       /*  var date = new Date(); */
       var nowusermsg = {
            uid:111,         /* 用户id */
            openid:"",
        }

    $(function(){
        // 当 hash变化时切换显示
    /* 页面初始化时就执行这些数据 */
    $(".searchtime #datetime").datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        locale: moment.locale('zh-CN'),
    /*  startDate: new Date() */   //目前之前的时间都不能选
        minDate: false, // 最小日期，如'2018/08/15'，则14号及14号前的日期都不可选
    
        });
        
    
        /* 后台给的先调用下 这段js */
        getOpenid(function(openid){
            nowusermsg.uid = localCache("uid-kongbatong");
        console.log(nowusermsg.uid);
            getPassenger();
            getVowner();
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
            $(".acityselect").text("常州");
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
            console.log("1111") 
        })
        $("#citysearch").blur(function(){
             $("#citysearch").val("");
        })

        /* 修改样式 */
        $("#ctxz").css("display","none");
        
        window.onhashchange = hashChange;
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
                    <div id="cylx-departure" class="psgdeparture">常州市新北区万达</div>
                    <span class="glyphicon glyphicon-arrow-right cycicon"></span>
                    <div id="cylx-Destination"  class="psgdestination">常州市汽车总站</div>
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
           
            </div>
            </a>
        
        `,
        // 全部行程中乘客 
        runpassengerDiv:`
        <div class="circle clearfix" id="runpassengerDiv">
        <a href="#showdata" id="arunpassengerDiv" class="clearfix">
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
                </div>
            </div>
            </a>
            <div class="right clearfix">
                <button  class="ricon left btn btn-success " id="paymentbutton"
                onclick="paymentbutton()">抢单</button>
            </div>
        </div>
        `,
        //全部行程中车主
        runvownerDiv:`
        <div class="circle clearfix" id="runvownerDiv">
        <a href="#ownshowdata" id="arunvownerDiv"  target="_blank"  class="clearfix">
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
        `
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
    }
    
    // 切换路由的方法
    function hashChange(hashzhi){
        var locationHash = location.hash;
        //console.log(hashzhi);
        if(hashzhi=="#details?a=p" || hashzhi=="#details?b=v"){
            locationHash="#details";
            window.location.hash= hashzhi;
            $("#address").val("");
        }
        
       // console.log(locationHash);
        // 处理一下参数
        // #details?a=3
        console.log(locationHash);
        var val1 = locationHash.split("?");
        /* console.log(val1); */

        /* 判断参数 */
        if(val1[0]=="#ownshowdata"){
            openxq();
        }
        
        if(locationHash=="#passenger"){
            hashcreate();
            $(".passenger").show();
        }else if(locationHash=="#vowner"){
            hashcreate();
            $(".vowner").show();
        }else if(locationHash=="#run"){
            hashcreate();
            $(".run").show();
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
            console.log("111");
        }else if(locationHash=="#ddxq"){
            hashcreate();
            $(".paymentzy").show();
        }else if(val1[0]=="#payment"){
            hashcreate();
            $(".pdetails").show();
        }
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
                dateRange:"month",      /* 日期范围，默认取一个月之内的 */
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
                dateRange:"month",      /* 日期范围，默认取一个月之内的 */
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
            /* 
                全部行程中 值的变化
            */

                $("#runpassengerNode").append(sfcsj.runpassengerDiv);
                var runaPassengerDivsj = "#showdata?"+"id="+passengerData[i].id+"&uid="+nowusermsg.uid;
                $("#arunpassengerDiv").attr("href",runaPassengerDivsj);
                var runidaPassengerDiv = "arunpassengerDiv"+i;
                
                $("#arunpassengerDiv").attr("id",runidaPassengerDiv);
            /* 全部行程中的数据的操作 */
                setPassengerqbval(i,passengerData);
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
        }
    /* <a href="#showdata" id="arunpassengerDiv" class="clearfix"> */
    /* 对全部行程中乘客数据的渲染 */
        function setPassengerqbval(i,passengerData){
            var sj = passengerData[i].departureTime.split(" ");
            console.log(sj)
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
        console.log(vownerData);
        // 先判断状态码 
        if(data.result>0){ //为0才可以进行操作
            for(var i = 0 ;i<vownerData.length;i++){
                $("#vownperNode").append(sfcsj.vownerDiv);
                // 车主是?b=xxxx
                var avownperNodesj = "./font/html/xq.html#ownshowdata?"+"id="+vownerData[i].id+"&uid="+nowusermsg.uid;;
                $("#avownerDiv").attr("href",avownperNodesj);
                var idaPassengerDiv = "aPassengerDiv"+i;
                $("#avownerDiv").attr("id",idaPassengerDiv);
            /* 车主页的行程 */
                setVownercz(i,vownerData);
                /* 
                    全部行程中的车主
                    #arunvownerDiv
                */
                /* 
                    #ownshowdata?c = 0  全部行程中车主的数据
                */
                $("#runvownerNode").append(sfcsj.runvownerDiv);
                var arunvownerDivsj = "./font/html/xq.html#ownshowdata?"+"id="+vownerData[i].id+"&uid="+nowusermsg.uid;;
                $("#arunvownerDiv").attr("href",arunvownerDivsj);
                var idarunvownerDiv = "arunvownerDiv"+i;
                $("#arunvownerDiv").attr("id",idarunvownerDiv);
            /* 全部行程页的车主信息 */
                setqbVowner(i,vownerData);
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
            searchval = searchcityval.citysfdmmd+keywords;
          }
          var autoComplete = new AMap.Autocomplete(autoOptions);
         
          autoComplete.search(searchval, function(status, result) {
            // 搜索成功时，result即是对应的匹配数据
           /*  var node = new PrettyJSON.view.Node({
                el: document.querySelector("#input-info"),
                data: result
            }); */
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
                touchchuli(result.tips[0])     });
            $(".searchp1").bind("touch click",function(){ 
                fabuxiaoxi.mmddata = result.tips[1];
                 touchchuli(result.tips[1])      });
            $(".searchp2").bind("touch click",function(){ 
                fabuxiaoxi.mmddata = result.tips[2];
                touchchuli(result.tips[2])    });
            $(".searchp3").bind("touch click",function(){  
                fabuxiaoxi.mmddata = result.tips[3];
                touchchuli(result.tips[3])     });
            $(".searchp4").bind("touch click",function(){
                fabuxiaoxi.mmddata =result.tips[4]; 
                 touchchuli(result.tips[4])     });
            $(".searchp5").bind("touch click",function(){ 
                fabuxiaoxi.mmddata = result.tips[5]; 
                touchchuli(result.tips[5])     });
            $(".searchp6").bind("touch click",function(){ 
                fabuxiaoxi.mmddata =result.tips[6]; 
                touchchuli(result.tips[6])     });
            $(".searchp7").bind("touch click",function(){ 
                fabuxiaoxi.mmddata = result.tips[7];
                 touchchuli(result.tips[7])     });
            $(".searchp8").bind("touch click",function(){ 
                fabuxiaoxi.mmddata = result.tips[8];
                 touchchuli(result.tips[8])     });
            $(".searchp9").bind("touch click",function(){  
                fabuxiaoxi.mmddata = result.tips[9];
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
                fabuxiaoxi.cfddata = result;

            }else{
                onError(result)
            }
        });
    });


    function onComplete(data) {
        console.log(data,"定位成功");
        /* 定位成功后，把成功函数获取到的值给successdata， */
        gaode.successdata = data;
        $("#idxinxi").empty();
        $("#idxinxi").append("<P>定位成功</P>");
        $("#chufadi").val(data.formattedAddress);
    }
    //解析定位错误信息
    function onError(data) {
        /* 失败后把失败的值给他 */
        /* data.message:失败原因 */
        console.log("获取失败");
        gaode.errordata = data ;
    } 


    // 根据点击获取坐标点 和 位置
        
        let geocoder,marker;
        function regeoCode() {
            let dingweiszcity = $(".acityselect").text();
           /*  console.log(dingweiszcity); */
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
           /*  console.log(qjposition); */
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
        payment:function(){
             // 当点击提交时，把获取到的值给他们 
             console.log(location.hash);
             gaode.formattedAddress = $("#chufadi").val();       
             gaode.Destination = $("#address").val();
 
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
                 $("#containersearchtime").attr("placeholder","请选择出现时间！");
                 paymentModular.states = 0;
                 return false;
             }
             $(".xcspanleft").text($(".acityselect").text());

             
            var departure = $("#departure").val();
            /* 出发地的所有信息 */
            var cfddata = fabuxiaoxi.cfddata;
            /* 目的地所有信息 */
             var mdata = fabuxiaoxi.mmddata;
            console.log("出发地",cfddata);
            console.log("目的地",mdata);
            
            let lyhash  = window.location.hash;
            var valzhi  = lyhash.split("?");
           
            var   pushType ="";

            if(locationqjval.val=="a=p"){   /* b=c是车主 */
               pushType = "Passenger";  /* 判断是车主 还是乘客发布的 */
            }
            
            if(locationqjval.val=="b=v"){ /* a=p 是乘客 */
                pushType = "Driver";  /* 判断是车主 还是乘客发布的 */
            }
            console.log(locationqjval.val);
           console.log("pushtype值",pushType);
            let departureTime = $("#containersearchtime").val(); /* 到达时间 */
            $.ajax({
                type:"post",
                url:"http://qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/saveMadeFROrders.asp",
                data:{
                    uid	:nowusermsg.uid,        /* 用户id  */
                    departure:cfddata.name,   /* 出发地 */
                    dLng :cfddata.location.lng,    /* 出发地经度 */
                    dLat: cfddata.location.lat,   /* 出发地纬度 */
                    arrival:mdata.name,     /* 目的地 */
                    arrivalTime:departureTime,      /* 到达时间问题 */
                    aLng:mdata.location.lng,    /* 目的地经度 */
                    aLat:mdata.location.lat,  /* 目的地纬度 */
                    departureTime:departureTime,    /* 发布时间问题后解决*/
                    pushType:pushType,        /* 发布类型 */
                },
                success:function(data){
                    console.log("获取成功的数据",data);
                },
                error:function(data){
                    console.log("失败的原因",data);
                }
            })
        },


    }


