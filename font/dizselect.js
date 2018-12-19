
    $(function(){
        createlival();
        $("#chufadi").bind("focus",function(){
            inchufadi();
        })
        $("#address").bind("focus",function(){
            inaddress();
        })
    })

    let searchcityval = {
        searchval:"",  /* ？nocity后面的值 */
        selectval:"",  /* 选择的值 */
        dijival:{},  /* 点击事件发生后，所选城市的经纬度参数 */
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
        })
        $(".ullish").bind("touch click",function(){
            removeacive();
            $(".ullish").addClass("ulliactive");
            cszhi(".ullish");
            zhidimaker(".ullish");
        })
        $(".ullisz").bind("touch click",function(){
            removeacive();
            $(".ullisz").addClass("ulliactive");
            cszhi(".ullisz");
            zhidimaker(".ullisz");
        })
        $(".ullinj").bind("touch click",function(){
            removeacive();
            $(".ullinj").addClass("ulliactive");
            cszhi(".ullinj");
            zhidimaker(".ullinj");
        })  
        $(".ullint").bind("touch click",function(){
            removeacive();
            $(".ullint").addClass("ulliactive");
            cszhi(".ullint");
            zhidimaker(".ullinnt");
        })
        $(".ulliyz").bind("touch click",function(){
            removeacive();
            $(".ulliyz").addClass("ulliactive");
            cszhi(".ulliyz");
            zhidimaker(".ulliyz");
        })
        $(".ullitz").bind("touch click",function(){
            removeacive();
            $(".ullitz").addClass("ulliactive");
            cszhi(".ullitz");
            zhidimaker(".ullitz");
        })
        $(".ullizjg").bind("touch click",function(){
            removeacive();
            $(".ullizjg").addClass("ulliactive");
            cszhi(".ullizjg");
            zhidimaker(".ullizjg");
        })
        $(".ullics").bind("touch click",function(){
            removeacive();
            $(".ullics").addClass("ulliactive");
            cszhi(".ullics");
            zhidimaker(".ullics");
        })
        $(".nowcityval div").bind("touch click",function(){
            removeacive();
            $(".ullics").addClass("ulliactive");
            cszhi(".ullics");
            zhidimaker(".ullics");
        })
    }



    /* 进入input时chufadi  出发地时 进入可以自动选择的页面 */
    function inchufadi(){
        console.log("1111");
    }
     /* 进入input时address  目的地时 进入可以自动选择的页面 */
     function inaddress(){
        console.log("2222");
     }

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