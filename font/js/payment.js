
     /* 支付button的实现 */
     /* 以后多个就这样实现 */
    function paymentbutton(){
        
        /* 连接BeeCloud appId、 title、 amount、
         out_trade_no、 BeeCloud appSecret, 然后计算连接后的字符串的32位MD5 
         appId：dbf34cab-2454-4f97-88f0-0a7e34aa426e
        appSecret: 9712e23a-8802-47c6-ac9f-67b4b37ba75e

         */
        BC.err = function(data) {
            //注册错误信息接受
            showMessage1btn(data["ERROR"],"",0);
        }

        var appId  =  "dbf34cab-2454-4f97-88f0-0a7e34aa426e";
        var appSecret  = "9712e23a-8802-47c6-ac9f-67b4b37ba75e";
        var out_trade_notime =  new Date().getTime();
        var title = "光大国旅的订单";
        var amount = 100;
        var sign = md5(appId+title+amount+out_trade_notime+appSecret);
        /**
        * 需要支付时调用BC.click接口传入参数
        */
        BC.click({
            //"return_url" : "http://qckj.czgdly.com/bus/MobileWeb/WxWeb/myTickets_content.html",
            "instant_channel" : "wx",
            "debug" : true,
            "need_ali_guide" : true,
            "use_app" : true,
            "title" : title, //商品名
            "amount" :amount,  //总价（分）
            "out_trade_no" : out_trade_notime, //自定义订单号
            "sign" : sign, //商品信息hash值，含义和生成方式见下文
            "openid" : "cs",
            "optional" : {} //可选，自定义webhook的optional回调参数
        },
        {
            wxJsapiFinish : function(res) {
                //jsapi接口调用完成后
                //showMessage1btn(JSON.stringify(res),"",0);
                switch(res.err_msg){
                    case "get_brand_wcpay_request:ok":
                        showMessage1btn("支付成功！如需退单，请提前发班时间24小时退定！","Back()",1);
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
        * click调用错误返回：默认行为console.log(err)
        */
        BC.err = function(err) {
            //alert(JSON.stringify(err))
            //err 为object, 例 ｛”ERROR“ : "xxxx"｝;
            showMessage1btn(err.ERROR,"",0);
        }
    }



    /* 打开详情页函数 */
    function  openxq(){
        /* window.open("http://google.com/",'新开googleWin',"fullscreen=1"); */
        console.log("1111");
    }



