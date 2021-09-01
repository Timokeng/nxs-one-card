// 对登录状态做判断
if (!sessionStorage.getItem("sid")) {
    window.location = '/nxs-one-card/src/views/user/login2.html';
}