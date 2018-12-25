$(function(){
    /* 点击时  地图上添加一个maker点 并且聚焦 */
   $(".cfdsdmdiv").bind("touch click",function(){
       cfdsdmdivcl("cfd");
   })  
   $(".mddsdmdiv").bind("touch click",function(){
       cfdsdmdivcl("mdd");
   })
   
})



/* 地图的初始化 */
var map = new AMap.Map('sdcontainer', {
    resizeEnable: true,
    zoom:10,//级别
    center: [119.9,31.7],//中心点坐标
});


let paymentvalsj = {
  resultdata:{}
}    


/* 点击时，判断地址，并在地图撒花姑娘 */ 
/* 始发地点击找地址 */
function cfdsdmdivcl(val){
   /* 出发地要 找地址 */
   if(val=="cfd"){
       autocfdsdmdiv($(".cfdsdmdiv").text());
       autocfdiv();
   }else if(val=="mdd"){
       autocfdsdmdiv($(".mddsdmdiv").text());
       autocfdiv();
   }
}
/* 复用的处理函数 */
function autocfdiv(result){
  var sj = result;
  var dw = sj.tips[0].location;
  console.log(dw);
   if(sj.info=="OK"){
       maponbh(dw);
       setdtCeneter([dw.R,dw.P]);
   }
}
/* 根据地址 数据 Location的json地址坐标的 */
function autocfdsdmdiv(val){
   console.log(val);
   AMap.plugin('AMap.Autocomplete', function(){
           var autoOptions = {
               city:"常州"
           }
     // 实例化Autocomplete
     var autoComplete = new AMap.Autocomplete(autoOptions);
     
     autoComplete.search(val, function(status,result) {
       // 搜索成功时，result即是对应的匹配数据
      /*  var node = new PrettyJSON.view.Node({
           el: document.querySelector("#input-info"),
           data: result
       }); */
       /* console.log(searchval,status,result); */
       /* 存储数据 */
       paymentvalsj.resultdata = result;
       autocfdiv(result);
     })
   })
}


/* 别的页面写来的函数 */
    /*   maponbh(dw);
       setdtCeneter([dw.R,dw.P]);
        */
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
    let geocoder,marker;
    function regeoCode() {
        if(!geocoder){
            geocoder = new AMap.Geocoder({
                city: "常州", //城市设为北京，默认：“全国”
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
                
             
            }else{alert(JSON.stringify(result))}
        });
    }
    /* 判断 */
    document.getElementById('lnglat').onkeydown = function(e) {
        if (e.keyCode === 13) {
            regeoCode();
            return false;
        }
        return true;
    }; 