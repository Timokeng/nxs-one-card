let timeout = undefined;

function getCode() {
    let phone = document.getElementById('phone').value;
    let dom = document.getElementById("getCode");

    if(timeout) {
        msg('每次发送验证码虚间隔60S');
        return;
    }

    if (Number(phone) == NaN || phone.length != 11) {
        msg("请输入有效手机号");
        return;
    }

    dom.className = 'layui-btn getCode disabled';
    
    timeout = setTimeout(()=>{
        dom.className = 'layui-btn getCode';
        timeout = null;
    }, 60000)

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

            window.location = '/rcc/views/index.html'
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