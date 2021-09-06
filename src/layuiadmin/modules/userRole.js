// 对登录状态做判断
if (!sessionStorage.getItem("sid")) {
    goLogin();
} else {
    let id = sessionStorage.getItem("typeid");
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

function goLogin(from) {
    if(!from){
        window.location = './user/login2.html';
    } else {
        window.location = '../user/login2.html';
    }
}