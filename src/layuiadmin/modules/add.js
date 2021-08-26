const addBt = document.getElementById("addBt");
let abox = document.getElementById("addBox");

addBt.addEventListener("click", function () {
    abox.style.display = "block";
    cbox.style.display = "none";

    // 重置数据
    if (addBt.innerText.indexOf("模板") != -1) {
        pb.innerHTML = "";
        detailData = [];
        detailDataTo = -1;
        document.getElementById("addSum").value = '';
    }

    if (addBt.innerText.indexOf("角色") != -1) {
        clearForm("addRoleForm");
        setHasNavs([]);
        navs = '';
        navsId = [];
    }

    if (addBt.innerText.indexOf("用户") != -1) {
        clearForm("addUserForm");
    }

    if (addBt.innerText.indexOf("学校") != -1) {
        clearForm("addSchoolForm");
    }
})

// 新增学生
function addSt() {
    let validate = false;
    let addInfo = {};
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        addInfo = form.val("addStForm");
        for (let key in addInfo) {
            if (!addInfo[key]) {
                layer.msg("有必填数据为空");
                validate = false;
                return
            }
        }
        if (addInfo.pid.length != 18) {
            layer.msg("请输入有效身份证号码");
            validate = false;
            return;
        }
        validate = true;
        layer.msg("成功添加 " + addInfo.name + " 的相关信息")
        console.log(addInfo);
    });
    if (validate) {
        reloadTable();
    }
}

// 新增班级
function addCl() {
    let validate = false;
    let addInfo = {};
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        addInfo = form.val("addClForm");
        for (let key in addInfo) {
            if (!addInfo[key]) {
                layer.msg("有必填数据为空");
                validate = false;
                return
            }
        }
        validate = true;
        layer.msg("成功添加 " + addInfo.school + addInfo.grade + addInfo.class + " 的班级")
        console.log(addInfo);
    });
    if (validate) {
        reloadTree();
    }
}

// 新增模板
function addTe() {
    let validate = false;
    let addInfo = {};
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        addInfo = form.val("addTeForm");
        for (let key in addInfo) {
            if (!addInfo[key]) {
                layer.msg("有必填数据为空");
                validate = false;
                return
            }
        }
        validate = true;
        layer.msg("成功添加 " + addInfo.name + " 模板")
        console.log(addInfo);
    });
    if (validate) {
        reloadTable();
    }
}

// 新增微信公众号
function addWx() {
    let validate = false;
    let addInfo = {};
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        addInfo = form.val("addWxForm");
        for (let key in addInfo) {
            if (!addInfo[key]) {
                layer.msg("有必填数据为空");
                validate = false;
                return
            }
        }
        validate = true;
        layer.msg("成功添加公开ID为 " + addInfo.wxid + " 的微信公众号信息")
        console.log(addInfo);
    });
    if (validate) {
        reloadTable();
    }
}

// 新增用户
function addUser() {
    let validate = false;
    let addInfo = {};
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        addInfo = form.val("addUserForm");
        for (let key in addInfo) {
            if (!addInfo[key]) {
                layer.msg("有必填数据为空");
                return
            }
            if (key == 'phone' && addInfo[key].length != 11) {
                layer.msg("请输入有效手机号");
                return
            }
        }

        validate = true;

        let data = {
            type_id: addInfo.role,
            username: addInfo.name,
            phone: addInfo.phone
        }

        api.user.add(data, function (res) {
            if (res.code == '000') {
                setTimeout(() => {
                    abox.style.display = 'none';
                    reloadTable();
                }, 500);
                layer.msg("成功添加名为 " + addInfo.name + " 的用户信息");
            } else {
                layer.msg(res.msg);
            }
        })
    });
}

// 新增角色
function addRole() {
    let validate = false;
    let addInfo = {};
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        addInfo = form.val("addRoleForm");
        if (addInfo.name == '') {
            layer.msg("角色名不能为空");
            return;
        }

        if (navsId.length < 1) {
            layer.msg("角色未配置菜单权限");
            return;
        }

        validate = true;

        // 数据预处理
        let data = {
            type_name: addInfo.name,
            menu_auth: navsId
        }

        api.role.add(data, function (res) {
            if (res.code == '000') {
                setTimeout(() => {
                    abox.style.display = 'none';
                    reloadTable();
                }, 500);
                layer.msg("成功添加名为 " + addInfo.name + " 的角色信息")
            } else {
                layer.msg(res.msg);
            }
        })
    });
}

// 新增学校
function addSc() {
    let validate = false;
    let addInfo = {};
    layui.use(['form', 'layer'], async function () {
        var form = layui.form;
        var layer = layui.layer;

        addInfo = form.val("addSchoolForm");
        for (let key in addInfo) {
            if (!addInfo[key]) {
                layer.msg("有必填数据为空");
                validate = false;
                return
            }
        }
        validate = true;

        let point = await getPoint(addInfo.name, '昭通市');

        let reqData = {
            areaid: addInfo.area,
            schoolname: addInfo.name,
            address: addInfo.address,
            longitude: point.lng,
            latitude: point.lat
        }

        api.school.add(reqData, function (res) {
            if (res.code == "000") {
                setTimeout(() => {
                    abox.style.display = 'none';
                    reloadTable();
                }, 500);
                layer.msg("成功添加名为 " + addInfo.name + " 的学校信息")
            } else {
                layer.msg(res.msg)
            }
        })
    });
}


function clearForm(str) {
    layui.use('form', function () {
        let form = layui.form;

        let data =  form.val(str);

        for(let key in data) {
            data[key] = '';
        }

        form.val(str, data);
    })
}