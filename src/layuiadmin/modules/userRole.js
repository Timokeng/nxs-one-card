// 对登录状态做判断
if (!sessionStorage.getItem("sid")) {
    goLogin();
} else {
    let id = sessionStorage.getItem("typeid");
    let username = sessionStorage.getItem("username");

    document.getElementById("index-username-box").innerHTML = username;

    api.role.getDetail({id}, (res)=>{
        if(res.code === '000') {
            let menu = res.result.menu_auth.split(',');
            let navs = document.getElementById('navs-main');

            menu.forEach(item => {
                let index = Number(item) - 1;
                navs.children[index].style.display = 'block';
            })
        }
    })
}

function goLogin() {
    sessionStorage.clear();

    window.location = 'http://test.rcc.ynwrkj.com/rcc/views/user/login2.html';
    
}

function goOut() {
    let id = sessionStorage.getItem('userid');

    api.out({id}, (res)=>{
        goLogin();
    })
}