// 对登录状态做判断
if (!sessionStorage.getItem("sid")) {
    goLogin();
}

function goLogin() {
    if(window.location.indexOf('index.html') != -1){
        window.location = './user/login2.html';
    } else {
        window.location = '../user/login2.html';
    }
}