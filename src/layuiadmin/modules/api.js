const baseUrl = 'http://192.168.1.18/rcc_pay/commonApi';

const req = {
    get:(url, suc, data = null, async = true)=>{
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                suc(JSON.parse(this.responseText));
            }
        }

        if(data) {
            let params = '?';
            for(let key in data) {
                params = params + `${key}=${data[key]}&`
            }
            params = params.slice(0, params.length - 1);
            url = url + params;
        }

        xhr.open("GET", url, async);
        // xhr.withCredentials = true;
        xhr.send();
    },

    post:(url, suc, data = null)=>{
        layui.use("jquery",function(){
            var $ = layui.$;

            $.post(
                url, 
                data, 
                function (res) {
                    suc(res);
                }, 
                "json"
            );
        })
    },
}


const api = {
    getCode: (data, suc) => req.post(baseUrl + '/sendSms', suc, data),
    login: (data, suc) => req.post(baseUrl + '/login', suc, data)
}