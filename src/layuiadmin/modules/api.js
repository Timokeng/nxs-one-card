const req = {
    get:(url, suc, data = null, async = true)=>{
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                suc(JSON.parse(this.responseText));
            }
        }

        if(data) {
            for(let key in data) {
                params = params + `${key}=${data[key]}&`
            }
            params = params.slice(0, params.length - 1);
            url = url + '?' + params;
        }

        xhr.open("GET", url, async);
        xhr.send();
    },

    post:(url, suc, data = null, async = true)=>{
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                suc(JSON.parse(this.responseText));
            }
        }
        
        xhr.open("POST", url, async);
        xhr.send(JSON.stringify(data));
    },
}