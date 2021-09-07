function getCode() {
    let phone = document.getElementById('phone').value;

    if (Number(phone) == NaN || phone.length != 11) {
        msg("请输入有效手机号");
        return;
    }

    // layui.use("jquery",function(){
    //     var $ = layui.$;
    //     $.post('http://192.168.1.18/rcc_pay/commonApi/sendSms', {
    //         phone:phone
    //     }, function (data) {
    //             }, "json");
    // })

    api.getCode({phone}, function(res) {
        if(res.code == "000") {
            msg("短信验证码已发送");
        } else {
            msg(res.msg);
        }
    })
}

function login() {
    let phone = document.getElementById('phone').value;
    let code = document.getElementById('LAY-user-login-password').value;

    api.login({ phone, code }, function (res) {
        if (res.code == '000') {
            sessionStorage.setItem('userid', res.result.id);
            sessionStorage.setItem('username', res.result.username);
            sessionStorage.setItem('sid', res.result.sid);
            sessionStorage.setItem('typeid', res.result.type_id);

            window.location = '/nxs-one-card/src/views/index.html'
        } else {
            msg(res.msg);
        }
    })
}

function msg(str) {
    layui.use(['layer'], function () {
        var layer = layui.layer;

        layer.msg(str);
    })
}