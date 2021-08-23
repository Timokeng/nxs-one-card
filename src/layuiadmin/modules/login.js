function getCode() {
    let phone = document.getElementById('phone').value;

    if(Number(phone) == NaN || phone.length != 11) {
        msg("请输入有效手机号");
        return;
    }
    
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

    api.login({phone, code}, function(res) {
        if(res.code == '000') {

        } else {
            msg(res.msg);
        }
    })
}

function msg(str) {
    layui.use(['layer'], function() {
        var layer = layui.layer;

        layer.msg(str);
    })
}