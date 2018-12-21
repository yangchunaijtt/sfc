     

    /* 已经合并了 */

    /* 定位存储的字符串 */
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

    var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom:10,//级别
        center: [119.9,31.7],//中心点坐标
    });

    $(function(){
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


    /* 输入提示功能 */
        // 获取输入提示信息


        /* 例：新闻大厦 :  e.lnglat;119.954495,31.78059
                P: 31.780507
                R: 119.95466199999998
            lat: 31.780507
            lng: 119.954662
        
        */


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
        
    

   
         
    
      
    
   

  
         
