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
      
    })

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

    /* 选择城市的初始化函数 */
    let cityselectval = {
        nowcity:"",  
    }
    /* 选择城市页 函数 searchcity */
    function cityselect(){
      cityselectval.nowcity =   $(".acityselect").text();
      window.location.search = "?nowcity="+cityselectval.nowcity;
      searchcity();
    }
    



   

