   /*  var myDate = new Date();
    var time = myDate.getDate().toString()+myDate.getHours().toString()+myDate.getMinutes().toString();
    console.log(time); */
    
    $(function(){
        // 当 hash变化时切换显示
        window.onhashchange = hashChange;
        created();
        hactive();
        getPassenger();
        getVowner();
        formcontrol();
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
        $("#gaodesubmit").bind("touch click",function(e){
            // 当点击提交时，把获取到的值给他们 
            console.log(location.hash);
            gaode.formattedAddress = $("#chufadi").val();       
            gaode.Destination = $("#address").val();

            /* 判断一下目的地是否为空  */
            if($("#chufadi").val() == ""){
                $("#chufadi").attr("placeholder","请稍做等待！")
                return false;
            }
            if($("#address").val() == "" ){
                $("#address").attr("placeholder","不能为空！")
                return false;
            }
            if($("#containersearchtime").val()==""){
                $("#containersearchtime").attr("placeholder","请选择出现时间");
                return false;
            }
            
            $(".xcspanleft").text($(".acityselect").text());
        })

        /* 搜索功能的实现 */
        $("#citysearch").focus(function(){
            console.log("1111") 
        })
        $("#citysearch").blur(function(){
             $("#citysearch").val("");
        })
    })

    /* 选择城市的初始化函数 */
    let cityselectval = {
        nowcity:"",  
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


    // 全局静态 数据
    let sfcsj = {
        passenger:{},  //乘客的数据
        vowner:{},       // 车主的数据
        passengerUrl:"https://www.easy-mock.com/mock/5bff7c57ec952807e8183f94/example/passenger",
        // 乘客数据的地址 
        vownerUrl:"https://www.easy-mock.com/mock/5bff7c57ec952807e8183f94/example/vowner",
        // 乘客数据的div
        passengerDiv:`
            <div class="cylx-cy clearfix" id="passengerDiv">
                <a href="#details" id="aPassengerDiv" class="clearfix">
                <div class="cylx-cyheader">
                <span class="bt">常用</span>
                <div class="time">
                    <span class="hours">07</span>
                    <span class="mao clearfix"> : </span>
                    <span class="minti">50</span>
                </div>
                </div>
                <div class="cylx-cycenter clearfix">
                    <div id="cylx-departure">常州市新北区万达</div>
                    <span class="glyphicon glyphicon-arrow-right cycicon"></span>
                    <div id="cylx-Destination">常州市汽车总站</div>
                </div>
            </a>
            </div>
        
        `,
        // 车主数据的 div 
        vownerDiv:`
        <a href="#details" id="avownerDiv" class="clearfix">
            <div class="circle clearfix" id="vownerDiv">
           
            <div class="left vownerleft clearfix">
                <div class="time">
                    <span class="data">14号</span>
                    <div class="rq">
                        <span class="hours">14</span>
                        <span class="mao">:</span>
                        <span class="minti">35</span>
                    </div>
                </div>
                <div class="mdd clearfix">
                    <div class="cfd">新北市万达广场</div>
                    <span class="glyphicon glyphicon-arrow-right mdd-icon"></span>
                    <div class="df">新北区市政府</div>
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
        <a href="#details" id="arunpassengerDiv" class="clearfix">
            <div class="left runpassengerleft  clearfix">
                <div class="time">
                    <span class="data">14号</span>
                    <div class="rq">
                        <span class="hours">14</span>
                        <span class="mao">:</span>
                        <span class="minti">35</span>
                    </div>
                </div>
                <div class="mdd clearfix">
                    <div class="cfd">新北市万达广场</div>
                    <span class="glyphicon glyphicon-arrow-right mdd-icon"></span>
                    <div class="df">新北区市政府</div>
                </div>
            </div>
            </a>
            <div class="right clearfix">
                <form action="">
                    <input type="submit" class="ricon left btn btn-success" value="抢单">
                </form>
            </div>
        </div>
        `,
        //全部行程中车主
        runvownerDiv:`
        <div class="circle clearfix" id="runvownerDiv">
        <a href="#details" id="arunvownerDiv" class="clearfix">
            <div class="left runvownerleft  clearfix" >
                <div class="time">
                    <span class="data">14号</span>
                    <div class="rq">
                        <span class="hours">14</span>
                        <span class="mao">:</span>
                        <span class="minti">35</span>
                    </div>
                </div>
                <div class="mdd clearfix">
                    <div class="cfd">新北市万达广场</div>
                    <span class="glyphicon glyphicon-arrow-right mdd-icon"></span>
                    <div class="df">新北区市政府</div>
                </div>
            </div>
        </a>
        <div class="right clearfix">
            <form action="">
                <input type="submit" class="ricon left btn btn-primary " value="拼单">
            </form>
        </div>
        </div> 
        `
    }

    

    /*让时间绑定切换到页面的事件 */
    function formcontrol(){
        /* 一共四个按钮
            绑定事件
        */
        $("#pformcontrolsr").bind("focus",function(){
            hashChange("#details?a=p");
        });
        $("#pformcontrolsc").bind("focus",function(){
            hashChange("#details?a=p");
        })  
        $("#vformcontrolsr").bind("focus",function(){
            hashChange("#details?b=v");
        });
        $("#vformcontrolsc").bind("focus",function(){
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
    }
    //切换路由的初始化方法
    function hashcreate(){
        $(".passenger").hide();
        $(".vowner").hide();
        $(".run").hide();
        $(".details").hide();
        $("#searchcity").hide();
        $("#searchxincheng").hide();
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
        if(locationHash=="#details?a=3" || locationHash=="#details?a=1" || locationHash=="#details?a=0"
        || locationHash=="#details?a=2" || locationHash=="?nowcity=常州#details?a=p"){
            locationHash = "#details";
        }else if(locationHash=="#details?b=3" || locationHash=="#details?b=1" || locationHash=="#details?b=0"
        || locationHash=="#details?b=2"){
            locationHash = "#details";
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
     
    //获取乘客数据进行渲染
    function getPassenger(){
        $.ajax({
             url: sfcsj.passengerUrl,
            type: 'GET',
             success: function (data) {
                sfcsj.passenger = data;
                setPassenger(data);
            }
           });
    }

    // 获取车主端的数据并进行渲染
    function getVowner(){
        $.ajax({
            url: sfcsj.vownerUrl,
           type: 'GET',
            success: function (data) {
                sfcsj.vowner = data ;
               setVowner(data);
           }
        });
    }

    // 乘客页  对数据渲染到页面的 函数 
    function  setPassenger(data){
        let passengerData = data.data.data;
        // 先判断状态码 
        if(data.data.errno===0){ //为0才可以进行操作
            for(var i = 0 ;i<passengerData.length;i++){
                /* 乘客页中  行程的变化 */
                $("#passengerNode").append(sfcsj.passengerDiv);
                // 改变div的编号
                var idpassengerDiv = "passengerDiv"+i;
                $("#passengerDiv").attr("id",idpassengerDiv);

                // 改变a标签的编号
                var aPassengerDivsj = "#details?"+"a="+i;
                $("#aPassengerDiv").attr("href",aPassengerDivsj);
                var idaPassengerDiv = "aPassengerDiv"+i;
                $("#aPassengerDiv").attr("id",idaPassengerDiv);

                /* 
                    全部行程中 值的变化
                */

                $("#runpassengerNode").append(sfcsj.runpassengerDiv);
                var runaPassengerDivsj = "#details?"+"a="+i;
                $("#arunpassengerDiv").attr("href",runaPassengerDivsj);
                var runidaPassengerDiv = "arunpassengerDiv"+i;
                $("#arunpassengerDiv").attr("id",runidaPassengerDiv);
                // console.log(runaPassengerDivsj);
            }
        }
    }

    // 车主页  对数据渲染到页面的 函数 
    function  setVowner(data){
        var vownerData = data.data.data;
        // 先判断状态码 
        if(data.data.errno===0){ //为0才可以进行操作
            for(var i = 0 ;i<vownerData.length;i++){
                $("#vownperNode").append(sfcsj.vownerDiv);
                // 车主是?b=xxxx
                var avownperNodesj = "#details?"+"b="+i;
                $("#avownerDiv").attr("href",avownperNodesj);
                var idaPassengerDiv = "aPassengerDiv"+i;
                $("#avownerDiv").attr("id",idaPassengerDiv);

                /* 
                    全部行程中的车主
                    #arunvownerDiv
                */
                $("#runvownerNode").append(sfcsj.runvownerDiv);
                var arunvownerDivsj = "#details?"+"b="+i;
                $("#arunvownerDiv").attr("href",arunvownerDivsj);
                var idarunvownerDiv = "arunvownerDiv"+i;
                $("#arunvownerDiv").attr("id",idarunvownerDiv);
            }
        }
    }

    
    /* 选择城市页 函数 searchcity */
    function cityselect(){
      cityselectval.nowcity =   $(".acityselect").text();
      window.location.search = "?nowcity="+cityselectval.nowcity;
      searchcity();
    }
    








    /* 地图API页面处理逻辑 */
         
    /* 定位存储的字符串 */
   
    var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom:10,//级别
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
            $(".searchp0").bind("touch click",function(){  touchchuli(result.tips[0])     });
            $(".searchp1").bind("touch click",function(){  touchchuli(result.tips[1])      });
            $(".searchp2").bind("touch click",function(){  touchchuli(result.tips[2])    });
            $(".searchp3").bind("touch click",function(){  touchchuli(result.tips[3])     });
            $(".searchp4").bind("touch click",function(){  touchchuli(result.tips[4])     });
            $(".searchp5").bind("touch click",function(){  touchchuli(result.tips[5])     });
            $(".searchp6").bind("touch click",function(){  touchchuli(result.tips[6])     });
            $(".searchp7").bind("touch click",function(){  touchchuli(result.tips[7])     });
            $(".searchp8").bind("touch click",function(){  touchchuli(result.tips[8])     });
            $(".searchp9").bind("touch click",function(){  touchchuli(result.tips[9])     });
          
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
            $("#mmdjwd").val(result.location);
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
        cosole.log("获取失败");
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

   



