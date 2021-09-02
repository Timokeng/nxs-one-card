// 对登录状态做判断
if (!sessionStorage.getItem("sid")) {
    window.location = './user/login2.html';
}