   $(function(){
        createlival();
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
        
    })

    let searchcityval = {
        searchval:"",  /* ？nocity后面的值 */
        selectval:"",  /* 选择的值 */
        dijival:{},  /* 点击事件发生后，所选城市的经纬度参数 */
        citysfdmmd:"",  /* 在始发地目的地页 进行搜索的后面判断的值 */
        /* 进入搜索时，autoInputsun函数的模板 */
        autoInputsuntmp:`
            <div class="tjheader clearfix" id="tjheaderid">
                <div class="icon">
                    <span class="glyphicon glyphicon-send iconone"></span>
                </div>
                <div class="show-weizhi clearfix">
                    <p class="dizi">
                        副食品大楼(县直街)
                    </p>
                    <p class="jtdz">
                        江苏省常州市钟楼区荷花池街道延陵西路157号
                    </p>
                </div>
            </div>
        `,           
    }
    
    /* 给当前城市赋值的 */
    function searchcity() {
        searchcityval.searchval =   window.location.search ;
        
        $(".nowcity .nowcityval div").text(cityselectval.nowcity);
    }


    /* 给li绑定事件，
    当点击时，获取值，并上传回去 */
    function createlival(){
        function removeacive(){
            $(".ulliwx").removeClass("ulliactive");
            $(".ullish").removeClass("ulliactive");
            $(".ullisz").removeClass("ulliactive");
            $(".ullinj").removeClass("ulliactive");
            $(".ulliyz").removeClass("ulliactive");
            $(".ullitz").removeClass("ulliactive");
            $(".ullizjg").removeClass("ulliactive");
            $(".ullint").removeClass("ulliactive");
            $(".ullics").removeClass("ulliactive");
        }
        function cszhi(val){
            var lival = $(val).text();
            cityselectval.nowcity = lival;
            $(".nowcity .nowcityval div").text(lival);
            window.location.hash= "#details";
            $(".acityselect").text(cityselectval.nowcity);
        }
        /* 点击之后在指定地方花maker */
        function zhidimaker(val){
            var lival = $(val).text();
           
            AMap.plugin('AMap.Geocoder', function() {
                var geocoder = new AMap.Geocoder({
                  // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                  city: lival,
                })
              
                geocoder.getLocation(lival, function(status, result) {
                  if (status === 'complete' && result.info === 'OK') {
                    // result中对应详细地理坐标信息
                    
                    /* 获取到了指定的指标值 */
                    searchcityval.dijival = result.geocodes[0].location;
                    /* 在获取到的地方花个maker */
                    maponbh(searchcityval.dijival);
                    setdtCeneter([searchcityval.dijival.R,searchcityval.dijival.P]);

                  }
                })
              })
        }

        $(".ulliwx").bind("touch click",function(){
            removeacive();
            $(".ulliwx").addClass("ulliactive");
            cszhi(".ulliwx");
            zhidimaker(".ulliwx");
            $(".xcspanleft").text($(".acityselect").text());
            $(".dqcsval").text($(".acityselect").text());
            
        })
        $(".ullish").bind("touch click",function(){
            removeacive();
            $(".ullish").addClass("ulliactive");
            cszhi(".ullish");
            zhidimaker(".ullish");
            $(".xcspanleft").text($(".acityselect").text());
            $(".dqcsval").text($(".acityselect").text());
        })
        $(".ullisz").bind("touch click",function(){
            removeacive();
            $(".ullisz").addClass("ulliactive");
            cszhi(".ullisz");
            zhidimaker(".ullisz");
            $(".xcspanleft").text($(".acityselect").text());
            $(".dqcsval").text($(".acityselect").text());
        })
        $(".ullinj").bind("touch click",function(){
            removeacive();
            $(".ullinj").addClass("ulliactive");
            cszhi(".ullinj");
            zhidimaker(".ullinj");
            $(".xcspanleft").text($(".acityselect").text());
            $(".dqcsval").text($(".acityselect").text());
        })  
        $(".ullint").bind("touch click",function(){
            removeacive();
            $(".ullint").addClass("ulliactive");
            cszhi(".ullint");
            zhidimaker(".ullinnt");
            $(".xcspanleft").text($(".acityselect").text());
            $(".dqcsval").text($(".acityselect").text());
        })
        $(".ulliyz").bind("touch click",function(){
            removeacive();
            $(".ulliyz").addClass("ulliactive");
            cszhi(".ulliyz");
            zhidimaker(".ulliyz");
            $(".xcspanleft").text($(".acityselect").text());
            $(".dqcsval").text($(".acityselect").text());
        })
        $(".ullitz").bind("touch click",function(){
            removeacive();
            $(".ullitz").addClass("ulliactive");
            cszhi(".ullitz");
            zhidimaker(".ullitz");
            $(".xcspanleft").text($(".acityselect").text());
            $(".dqcsval").text($(".acityselect").text());
        })
        $(".ullizjg").bind("touch click",function(){
            removeacive();
            $(".ullizjg").addClass("ulliactive");
            cszhi(".ullizjg");
            zhidimaker(".ullizjg");
            $(".xcspanleft").text($(".acityselect").text());
            $(".dqcsval").text($(".acityselect").text());
        })
        $(".ullics").bind("touch click",function(){
            removeacive();
            $(".ullics").addClass("ulliactive");
            cszhi(".ullics");
            zhidimaker(".ullics");
            $(".xcspanleft").text($(".acityselect").text());
            $(".dqcsval").text($(".acityselect").text());
        })
        $(".nowcityval div").bind("touch click",function(){
            removeacive();
            $(".ullics").addClass("ulliactive");
            cszhi(".ullics");
            zhidimaker(".ullics");
            $(".xcspanleft").text($(".acityselect").text());
            $(".dqcsval").text($(".acityselect").text());
            
        })
    }



    /* 进入input时chufadi  出发地时 进入可以自动选择的页面 */
    function inchufadi(){
        window.location.hash = "#s";
    }
     /* 进入input时address  目的地时 进入可以自动选择的页面 */
     function inaddress(){
        window.location.hash = "#m";
     }

    /* time处理地方 */
     /* 选择出发时间 */
     function containersearchtime(){
        window.location.hash = "#time";
        $(".form_datetime").datetimepicker({
            format: "dd MM yyyy - hh:ii",
            autoclose: true,
            todayBtn: true,
            startDate: "2018-12-20 00:00",
            minuteStep: 10
        });
     }

     /* 始发地 目的地 点击后 赋值并给下一页*/
         
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
            xzlichuli(textval);
            
        })
        $("#searchxincheng .xzli10").bind("touch click",function(){
            
            var  textval =  $("#searchxincheng .xzli10").text();
         
            xzlichuli(textval);
             
        })
        function xzlichuli (textval){
            
            var locationhash = window.location.hash;
            $(".xcspanleft").text(textval);
            searchcityval.citysfdmmd =  textval ;
            $(".dqcsval").text(textval);
            cityselectval.nowcity = textval;
            $(".acityselect").text(textval);
            $("#inxcbody").val(textval);
            autoInputsun();
            if(locationhash=="#s"){
                window.location.hash = "#sxxwz";
            }else if (locationhash=="#m"){
                window.location.hash = "#mxxwz";
            }
            
        }
     

     /* 点击取消，页面跳为地图页面 */
     $(".xcqx").bind("touch click",function(){
         window.location.hash = "#details";
     })


     /* 点击搜索功能的函数 */
     let  autoInputsunval = {
         result:{},   /*  autoInputsun的返回值result返回给需要的数据 */
         cfdresult:{},
         mddresult:{},
     }
     function autoInputsun(){

        var keywords = document.getElementById("inxcbody").value;
       
        AMap.plugin('AMap.Autocomplete', function(){
                var autoOptions = {
                    city:"常州"
                }
          // 实例化Autocomplete
        
          var searchval = $(".xcspanleft").text()+keywords;
          if(keywords==""||keywords==undefined){
            searchval=$(".xcspanleft").text();
          }
          var autoComplete = new AMap.Autocomplete(autoOptions);
          
          autoComplete.search(searchval, function(status,result) {
            // 搜索成功时，result即是对应的匹配数据
           /*  var node = new PrettyJSON.view.Node({
                el: document.querySelector("#input-info"),
                data: result
            }); */
            
            
            
            if(window.location.hash =="#sxxwz"){
                autoInputsunval.cfdresult = result;
              
            }
            if(window.location.hash =="#mxxwz"){
                
                autoInputsunval.mddresult = result;
                
            }
            $(".searchweizhi").empty();
            for(var j = 0; j<result.tips.length;j++){
                autosunnode(j,result);
            }
            
          })
        })
     }

     function autosunnode(i,result){
         /* 名字操作上去 */
        $(".searchweizhi").append(searchcityval.autoInputsuntmp);
        var tjheader = "tjheader"+i;
        $(".tjheader").attr("class",tjheader);
        var dizi ="."+tjheader+"  .dizi";
        var jtdz ="."+tjheader+" .jtdz";
        $(dizi).text(result.tips[i].name);
        var jtdzval =result.tips[i].district+result.tips[i].address;
        $(jtdz).text(jtdzval);
        /* DOM创建出来再绑定事件 */
        tjhbind();
       
     }
      /* 城市地点选择页初始化详细信息 */
     

     /* 点击搜索功能的实现 */
     document.getElementById("inxcbody").oninput = autoInputsun;
     document.getElementById("inxcbody").onchange = autoInputsun;
     document.getElementById("inxcbody").propertychange = autoInputsun;
     


     /* 点击返回选择城市页 */
        $(".xcheader").bind("touch click ",function(){
            window.location.hash = "#s";
        })

    
     /* 选择城市后返回并把数据填上在表单是上 */
     function tjhbind(){
        $(".tjheader0").bind("touch click",function(){
            xxwzclick(0);
            touchchuli(autoInputsunval.result.tips[0]); 
        })
        $(".tjheader1").bind("touch click",function(){
            xxwzclick(1);
            touchchuli(autoInputsunval.result.tips[1]); 
        })
        $(".tjheader2").bind("touch click",function(){
            xxwzclick(2);
            touchchuli(autoInputsunval.result.tips[2]);  
        })
        $(".tjheader3").bind("touch click",function(){
            xxwzclick(3);
            touchchuli(autoInputsunval.result.tips[3]); 
        })
        $(".tjheader4").bind("touch click",function(){
            xxwzclick(4);
            touchchuli(autoInputsunval.result.tips[4]); 
        })
        $(".tjheader5").bind("touch click",function(){
            xxwzclick(5);
            touchchuli(autoInputsunval.result.tips[5]); 
        })
        $(".tjheader6").bind("touch click",function(){
            xxwzclick(6);
            touchchuli(autoInputsunval.result.tips[6]); 
        })
        $(".tjheader7").bind("touch click",function(){
            xxwzclick(7);
            touchchuli(autoInputsunval.result.tips[7]); 
        })
        $(".tjheader8").bind("touch click",function(){
            xxwzclick(8);
            touchchuli(autoInputsunval.result.tips[8]); 
        })
        $(".tjheader9").bind("touch click",function(){
            xxwzclick(9);
            touchchuli(autoInputsunval.result.tips[9]); 
        })
     }
        
        /* 点击时，要判断他是始发地  还是目的地 */
        /* 
            数据格式：{}
        */
        function xxwzclick(i){
           
            /* var result = autoInputsunval.result;
            var tips = autoInputsunval.result.tips;  */ 
          
            var locationhash = window.location.hash;
           
            /* 出发地  始发地 */
            if(locationhash=="#mxxwz"){
                let result = autoInputsunval.mddresult;
                let tipstwo = autoInputsunval.mddresult.tips;  
                /* 点击时，目的地的数据 */
                fabuxiaoxi.mmddata =  autoInputsunval.mddresult.tips[i];
                /* 目的地 目的地经纬度 */
                $("#address").val(tipstwo[i].name);
                $("#mmdjwd").val(tipstwo[i].location);
               
            }
            if(locationhash=="#sxxwz"){
                let result = autoInputsunval.cfdresult;
                let tipsone = autoInputsunval.cfdresult.tips;  
                /*  #sxxwz 出发地 经纬度信息*/
                fabuxiaoxi.cfddata  = autoInputsunval.cfdresult.tips[i];
                $("#chufadi").val(tipsone[i].name);
                $(".lnglat").val(tipsone[i].location);
                locationhash = "#details";
                
            }
             
            window.location.hash = "#details";
        }

    /*  时间选择页的操作 */  
      
        $(".timequx").bind("touch click",function(){
            $("#datetime").val("");
            window.location.hash = "#details";
        })
        $(".timeqr").bind("touch click",function(){
            $("#containersearchtime").val($("#datetime").val());
            $("#datetime").val("");
            window.location.hash = "#details";
        })



/* 支付功能的实现 */
        

     /* 支付button的实现 */
     /* 以后多个就这样实现 */
     let paymentbttsj  = {
         title:"",
         amount:1,
         billno: "FRO",   /* 生成订单号 */
         instant_channel:"wx", /* 订单支付形式 */
         openid:{},  /* openid的存储 */
         usource:"Wx_Kbt",   /* 用户的来源 */
         FROID:111,     /* 发布单号，取当前信息的id值 */
     }

    function paymentbutton(FROID,qmguid){
        /*首先取消所有 */
        
        /* qmguid： 数据的发布者的id号  */
        /* 如果uid一直 ，则不需要付钱，点击时直接看  */
        if(qmguid == nowusermsg.uid){
            showMessage1btn("支付成功！如需退单，请提前发班时间24小时退定！","Back()",1);
            /* 支付成功  可以观看用户的信息 */
            /* 如果一样，直接用本地的id就好 */
            let jwxxone = "#ownshowdata?id="+FROID+"&uid="+nowusermsg.uid+"&sf=run";
            
            let wlgrefone = "http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/font/html/xq.html"+jwxxone;
          
            window.location.href = wlgrefone ;
            
            return ;
        }


        paymentbttsj.title = nowusermsg.uid+"的订单";
        paymentbttsj.FROID = FROID; 
     
         var bSign = "";
         var rand = "";
        for(var i = 0; i < 3; i++){
            var r = Math.floor(Math.random() * 10);
            rand += r;
        }
        /* 生成时间戳 "yyyyMMddhhmmss" 格式*/
        function pad2(n) { return n < 10 ? '0' + n : n };
        function generateTimeReqestNumber() {
            var date = new Date();
            return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
        }
        var sjc = generateTimeReqestNumber();
        paymentbttsj.billno = "FRO";
        paymentbttsj.billno = paymentbttsj.billno + generateTimeReqestNumber() + rand;
        

// 参数
var param = {"title" : paymentbttsj.title,"amount" : paymentbttsj.amount,"outtradeno" : paymentbttsj.billno};

// 地址
/* POST http://qckj.czgdly.com/bus/
common/getBSign-kongbatong.asp 404 (Not Found)*/
var url = "../common/getBSign-kongbatong.asp";

/* sfcsj.passenger 存储着用户的信息 */
        /* openid 需要传入的数据的定义*/
        paymentbttsj.openid = {
            uid:nowusermsg.uid,
            phone:nowusermsg.phone,
            usource:paymentbttsj.usource,
            FROID:paymentbttsj.FROID,
        };
       
$.post(url,param,function(data){
    if (!((typeof (data) == 'object') && data.constructor == Object)) {
        data = eval("(" + data + ")");
    }

    if(data.BSign) {
        bSign = data.BSign;

        BC.err = function(data) {
            //注册错误信息接受
            showMessage1btn(data["ERROR"],"",0);
        }
        
        BC.click({
            //"return_url" : "http://qckj.czgdly.com/bus/MobileWeb/WxWeb/myTickets_content.html",
            "instant_channel" : paymentbttsj.instant_channel,
            "debug" : true,
            "need_ali_guide" : true,
            "use_app" : true,
            "title" : paymentbttsj.title, //商品名
            "amount" : paymentbttsj.amount,  //总价（分）
            "out_trade_no" : paymentbttsj.billno, //自定义订单号
            "sign" : bSign, //商品信息hash值，含义和生成方式见下文
            "openid" : nowusermsg.openid,
            "optional" : paymentbttsj.openid, //可选，自定义webhook的optional回调参数
        },
        {
            wxJsapiFinish : function(res) {
                //jsapi接口调用完成后
                //showMessage1btn(JSON.stringify(res),"",0);
                switch(res.err_msg){
                    case "get_brand_wcpay_request:ok":
                        showMessage1btn("支付成功！如需退单，请提前发班时间24小时退定！","Back()",1);
                        /* 支付成功  可以观看用户的信息 */
                        let jwxx = "#ownshowdata?id="+paymentbttsj.FROID+"&uid="+nowusermsg.uid;
                        
                        let wlgref = "http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/font/html/xq.html"+jwxx;
                      
                        window.location.href = wlgref ;
                        break;
                    case "get_brand_wcpay_request:fail":
                        showMessage1btn("系统出错，请联系我们！","Back()",0);
                        break;
                    case "get_brand_wcpay_request:cancel":
                        showMessage1btn("已取消支付！","Back()",0);
                        break;
                    }
                }
                });
                /**
                * click调用错误返回：默认行为
                */
                BC.err = function(err) {
                    
                    //err 为object, 例 ｛”ERROR“ : "xxxx"｝;
                    showMessage1btn(err.ERROR,"",0);
                }
            }else{
                showMessage1btn("后台参数错误！","",0);
            }
                                            
            // 删除dialog
            clearDialog();
        },"json")
    
    }   
    
    /* 发送成功回调的处理 */
    function getAttach(data){
       
    }


/* 打开详情页函数 */
    function  openxq(){
        /* 暂时没发挥作用 */
    }


    
/*  实现页面滑动到底部加载*/
    /* 滑动需要的全局函数 */
    let infiniteScroll = {
        winHeight:111,  /* 滑动距离顶部的距离 */
    }
    $('body').on("touchstart",function(ev){
        infiniteScroll.winHeight = $(window).scrollTop();
        $('body').on("touchmove",function(ev){
          
        })
    });
    /** 处理获取到值的函数 
     *  当用户滑动时 就判断，
     *   当滚动条距顶部有一定的距离时，就调用读取下一页的页码数据，动态加载在后面。
     * 
     */ 



/* 时间页面的组件 */
    /**
     * 用户点击选择时间时，跳到时间选择页面，
     */
    /* 时间选择所需要的数据 */
    let mobiscroll = {

    }


    