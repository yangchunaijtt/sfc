
    $(function(){
        createlival();
        $("#chufadi").bind("focus",function(){
            inchufadi();
        })
        $("#address").bind("focus",function(){
            inaddress();
        })
        $("#containersearchtime").bind("focus",function(){
            containersearchtime();
        })
        if(cityselectval.nowcity==""){
            cityselectval.nowcity="常州"
        }
        $(".dqcsval").text(cityselectval.nowcity);
        $("#inxcbody").blur(function(){
            $("#inxcbody").val("");
        })
    })

    let searchcityval = {
        searchval:"",  /* ？nocity后面的值 */
        selectval:"",  /* 选择的值 */
        dijival:{},  /* 点击事件发生后，所选城市的经纬度参数 */
        citysfdmmd:"",  /* 在始发地目的地页 进行搜索的后面判断的值 */
        /* 进入搜索时，autoInputsun函数的模板 */
        autoInputsuntmp:`
            <div class="tjheader clearfix">
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
        console.log(searchcityval.searchval);
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
            console.log(lival);
            AMap.plugin('AMap.Geocoder', function() {
                var geocoder = new AMap.Geocoder({
                  // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                  city: lival,
                })
              
                geocoder.getLocation(lival, function(status, result) {
                  if (status === 'complete' && result.info === 'OK') {
                    // result中对应详细地理坐标信息
                    console.log("具体信息",result);
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
     /* 选择出发时间 */
     function containersearchtime(){
        window.location.hash = "#time";
     }

     /* 始发地 目的地 点击后 赋值并给下一页*/
         var  textval = "";
        $("#searchxincheng .xzli1").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli1").text();
            $(".xcspanleft").text(textval);
            searchcityval.citysfdmmd =  textval ;
            $(".dqcsval").text(textval);
            cityselectval.nowcity = textval;
            $(".acityselect").text(textval);
            window.location.hash = "#xxwz";
        })
        $("#searchxincheng .xzli2").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli2").text();
            $(".xcspanleft").text(textval);
            searchcityval.citysfdmmd =  textval;
            $(".dqcsval").text(textval);
            cityselectval.nowcity = textval;
            $(".acityselect").text(textval);
            window.location.hash = "#xxwz";
        })
        $("#searchxincheng .xzli3").bind("touch click",function(){
            
            var  textval =  $("#searchxincheng .xzli3").text();
            $(".xcspanleft").text(textval);
            searchcityval.citysfdmmd =  textval ;
            $(".dqcsval").text(textval);
            cityselectval.nowcity = textval;
            $(".acityselect").text(textval);
            window.location.hash = "#xxwz";
        })
        $("#searchxincheng .xzli4").bind("touch click",function(){
          
            var  textval =  $("#searchxincheng .xzli4").text();
            $(".xcspanleft").text(textval);
            $(".dqcsval").text(textval);
            searchcityval.citysfdmmd =  textval ;
            $(".dqcsval").text(textval);
            cityselectval.nowcity = textval;
            $(".acityselect").text(textval);
            window.location.hash = "#xxwz";
        })
        $("#searchxincheng .xzli5").bind("touch click",function(){
            
            var  textval =  $("#searchxincheng .xzli5").text();
            $(".xcspanleft").text(textval);
            searchcityval.citysfdmmd =  textval ;
            $(".dqcsval").text(textval);
            cityselectval.nowcity = textval;
            $(".acityselect").text(textval);
            window.location.hash = "#xxwz";
        })
        $("#searchxincheng .xzli6").bind("touch click",function(){
           
            var  textval =  $("#searchxincheng .xzli6").text();
            $(".xcspanleft").text(textval);
            searchcityval.citysfdmmd =  textval ;
            $(".dqcsval").text(textval);
            cityselectval.nowcity = textval;
            $(".acityselect").text(textval);
            window.location.hash = "#xxwz";
        })
        $("#searchxincheng .xzli7").bind("touch click",function(){
            
            var  textval =  $("#searchxincheng .xzli7").text();
            $(".xcspanleft").text(textval);
            searchcityval.citysfdmmd =  textval ;
            $(".dqcsval").text(textval);
            cityselectval.nowcity = textval;
            $(".acityselect").text(textval);
            window.location.hash = "#xxwz";
        })
        $("#searchxincheng .xzli8").bind("touch click",function(){
            
            var  textval =  $("#searchxincheng .xzli8").text();
            $(".xcspanleft").text(textval);
            searchcityval.citysfdmmd =  textval ;
            $(".dqcsval").text(textval);
            cityselectval.nowcity = textval;
            $(".acityselect").text(textval);
            window.location.hash = "#xxwz";
        })
        $("#searchxincheng .xzli9").bind("touch click",function(){
            
            var  textval =  $("#searchxincheng .xzli9").text();
            $(".xcspanleft").text(textval);
            searchcityval.citysfdmmd =  textval ;
            $(".dqcsval").text(textval);
            cityselectval.nowcity = textval;
            $(".acityselect").text(textval);
            window.location.hash = "#xxwz";
        })
        $("#searchxincheng .xzli10").bind("touch click",function(){
            
            var  textval =  $("#searchxincheng .xzli10").text();
            $(".xcspanleft").text(textval);
            searchcityval.citysfdmmd =  textval ;
            $(".dqcsval").text(textval);
            cityselectval.nowcity = textval;
            $(".acityselect").text(textval);
            window.location.hash = "#xxwz";
        })

     function sfdmddclick(){
         
     }

     /* 点击取消，页面跳为地图页面 */
     $(".xcqx").bind("touch click",function(){
         window.location.hash = "#details";
     })


     /* 点击搜索功能的函数 */
     function autoInputsun(){

        var keywords = document.getElementById("inxcbody").value;
        var searv = $(".xcspanleft").text();
        AMap.plugin('AMap.Autocomplete', function(){
                var autoOptions = {
                    city:searv
                }
          // 实例化Autocomplete
          var searchval = $(".xcspanleft").text()+keywords;
          console.log(searchval);

          var autoComplete = new AMap.Autocomplete(autoOptions);
         
          autoComplete.search(searchval, function(status, result) {
            // 搜索成功时，result即是对应的匹配数据
           /*  var node = new PrettyJSON.view.Node({
                el: document.querySelector("#input-info"),
                data: result
            }); */
            $(".searchweizhi").empty();
            for(var j = 0; j<result.tips.length;j++){
                autosunnode(j,result);
            }
            console.log(result);
          })
        })
     }

     function autosunnode(i,result){
         /* 名字操作上去 */
        $(".searchweizhi").append(searchcityval.autoInputsuntmp);
        $(".searchweizhi .dizi").text(result.tips[i].name);
        $(".searchweizhi .jtdz").text(result.tips[i].district);
        var dizi = "dizi"+i;
        var   jtdz  ="jtdz"+i;
        $(".searchweizhi .dizi").attr("class",dizi);
        $(".searchweizhi .jtdz").attr("class",jtdz);
     }
     /* 点击搜索功能的实现 */
     document.getElementById("inxcbody").oninput = autoInputsun;


     /* 点击返回选择城市页 */
     $(".xcheader").bind("touch click ",function(){
         window.location.hash = "#s";
     })

     /* 获取?号后面的参数 */

     function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          strs = str.split("&");
          for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
          }
        }
        return theRequest;
    }
     /*  var Request = new Object();
      Request = GetRequest();// var id=Request["id"];  */
      // var 参数1,参数2,参数3,参数N;
      // 参数1 = Request['参数1'];
      // 参数2 = Request['参数2'];
      // 参数3 = Request['参数3'];
      // 参数N = Request['参数N'];