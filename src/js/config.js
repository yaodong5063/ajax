const ajax={
    obj:{
        //默认
        url:'',  //地址
        type:'get',  //类型，默认get
        dataType: 'text',  //返回类型,默认text
        data:{},   //传值，默认空
        async: true, //同步异步设置，默认异步
        timeout: 10000, //超时时间
        contentType:'application/x-www-form-urlencoded',  //设置头
        withCredentials:false,   //同源策略，默认false，true必须指定域名
        beforeSend(XMLHttpRequest) {}
    },
    get(obj={}){
        //get方法 
          return new Promise(function(resolve,reject){
            const xhr=new XMLHttpRequest(),
            o=Object.assign(this.obj,obj),
            {data,async,dataType,withCredentials,timeout,contentType}=o;
            let u='';
            for(let key in data){
                console.log(key)
                if(!key) break;
                u+=`${key}=${data[key]}`;
            }
            let url=`${o.url}${!!u?o.url.includes('?')?'&':'?':''}${u}`;
            
            xhr.open('get',url,async);
            
            xhr.onreadystatechange=function(){
                console.log(xhr);
                if (xhr.readyState == 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        resolve(xhr.response);
                    } else {
                        reject(new Error(xhr.statusText));
                    }
                }
            } 
            if(!!o.beforeSend){
                o.beforeSend(xhr)
            }
            xhr.responseType=dataType;
            xhr.timeout=timeout;
            xhr.withCredentials=withCredentials;
            xhr.setRequestHeader('Content-Type', contentType);
            xhr.send();
            xhr.ontimeout=function(e){
                reject(e);
            };

          }.bind(this));
           
        
    

      
    },
    post(obj={}){
      //post方法
      return new Promise(function(resolve,reject){
        const xhr=new XMLHttpRequest(),
        o=Object.assign(this.obj,obj),
        {data,async,dataType,withCredentials,timeout,contentType,url}=o;
        let u=null,
            num=0;
        for(let key in data){
            console.log(key)
            if(!key) break;
            u+=`${!!num?'&':''}${key}=${data[key]}`;

            num++;
        }
        
        xhr.onreadystatechange=function(){
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    resolve(xhr.response);
                } else {
                    reject(new Error(xhr.statusText));
                }
            }
        } 
        xhr.open('post',url,async);
        if(!!o.beforeSend){
            o.beforeSend(xhr)
        }
        xhr.responseType=dataType;
        xhr.timeout=timeout;
        xhr.withCredentials=withCredentials;
        
        xhr.setRequestHeader('Content-Type', contentType);
        console.log(data);
        xhr.send(u);
        xhr.ontimeout=function(e){
            reject(e);
        };



      }.bind(this))
    },
    abort(){
        //中断
    }
};
// ajax.get({
//     url:'http://api.coinmerit.com/project/ProjectCurrency',
//     dataType: 'json',
//     data:{
//         conversion:'USD'
//     },
//     async: true,
//     timeout: 1000,
//     beforeSend(XMLHttpRequest) {
//         XMLHttpRequest.setRequestHeader('CoinMerit-LANG', 'cn');
//    },
// }).then(function(data){
//     console.log(data)
// },function(err){
//     console.log(err);

// });
ajax.post({
    url:'http://api.coinmerit.com/currencies',
    dataType: 'json',
    data:{
        type: '',
        per_page: 100,
        page: 1,
        order_by: '',
        order: '',
        start_market_cap: '',
        end_market_cap: '',
        start_price: '',
        end_price: '',
        start_volume: '',
        end_volume: '',
        conversion: '',
        openId: '',
    },
    async: true,
    timeout: 1000,
    beforeSend(XMLHttpRequest) {
        XMLHttpRequest.setRequestHeader('CoinMerit-LANG', 'cn');
   },
}).then(function(data){
    console.log(data)
},function(err){
    console.log(err);

});
