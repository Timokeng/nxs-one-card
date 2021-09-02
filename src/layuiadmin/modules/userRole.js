// 对登录状态做判断
if (!sessionStorage.getItem("sid")) {
    goLogin();
}

function goLogin(from) {
    if(!from){
        window.location = './user/login2.html';
    } else {
        window.location = '../user/login2.html';
    }
}