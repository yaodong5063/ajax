const ajax={
    obj:{
        //默认
        url:null,  //地址
        type:'get',  //类型，默认get
        dataType: 'text',  //返回类型,默认text
        data:{},   //传值，默认空
        async: true, //同步异步设置，默认异步
        timeout: 10000, //超时时间
        contentType:'application/x-www-form-urlencoded',  //设置头
        withCredentials:false,   //同源策略，默认false，true必须指定域名
        beforeSend(XMLHttpRequest) {}
    },
    xhr:null,
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
            
            
            
            xhr.onreadystatechange=function(){
                //接受请求
                if (xhr.readyState == 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        resolve(xhr.response);
                    } else {
                        reject(new Error(xhr.statusText));
                    }
                }
            } 
            xhr.open('get',url,async);  
            if(!!o.beforeSend){
                //设置头
                o.beforeSend(xhr)
            }
            xhr.responseType=dataType;  //设置类型
            xhr.timeout=timeout;  //设置超时时间
            xhr.withCredentials=withCredentials;   //设置同源策略,true需指定域名
            xhr.setRequestHeader('Content-Type', contentType);  //设置接收头
            
            xhr.send();  //发送请求
            xhr.ontimeout=function(e){
                //超时处理
                reject(e);
            };
            this.xhr=xhr;  //存储xhr

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
        xhr.open('post',url,async);  //open
        if(!!o.beforeSend){
            //设置头
            o.beforeSend(xhr)
        }

        xhr.responseType=dataType;  //设置类型
        xhr.timeout=timeout;//设置超时时间
        xhr.withCredentials=withCredentials;//设置同源策略,true需指定域名
        
        xhr.setRequestHeader('Content-Type', contentType);//设置接收头
        
        xhr.send(u);  //发送请求
        xhr.ontimeout=function(e){
            //超时处理
            reject(e);
        };
        
       this.xhr=xhr;  //存储
      }.bind(this))
    },
    upload(obj){
        //简单的图片上传
        return new Promise(function(resolve,reject){
            let xhr,o;

            xhr = new XMLHttpRequest();
            o=Object.assign(this.obj,obj)
            xhr.withCredentials = false;
            xhr.open('POST', o.url);
           
            xhr.onreadystatechange=function(){
    
                if (xhr.readyState == 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        resolve(xhr.response);
                        
                    } else {
                        reject(new Error(xhr.statusText));
                        
                    }
                }
            } 
            xhr.timeout=timeout;//设置超时时间
            
            xhr.send(o.formData);  //发送请求
            xhr.ontimeout=function(e){
                //超时处理
                reject(e);
            };
            
           this.xhr=xhr;  //存储
        }.bind(this))
        
    },
    abort(cb){
       //中断
       this.xhr.abort();
       if(!!cb){
         cb();
       };
       return this;
    }
};
ajax.get({
    url:'http://api.coinmerit.com/project/ProjectCurrency',
    dataType: 'json',
    data:{
        conversion:'USD'
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

let a=ajax;  //存储ajax对象，为后续中断准备，如不需要直接ajax.post即可
a.post({
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
    timeout: 1000,
    beforeSend(XMLHttpRequest) {
        XMLHttpRequest.setRequestHeader('CoinMerit-LANG', 'cn');
   },
}).then(function(data){
    console.log(data)
},function(err){
    console.log(err);

});
// a.abort(function(){
//     alert('中断了ajax请求')
// });
// console.log(a);
