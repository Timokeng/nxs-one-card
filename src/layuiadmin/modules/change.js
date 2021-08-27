let changeBt = document.getElementById("changeBt");
let cbox = document.getElementById("changeBox");

let changeClassInfo = {};
let changeTemplateInfo = {};
let changeWxInfo = {};
let changeUserInfo

changeBt.addEventListener("click", function () {
    if (changeBt.innerText.indexOf('班级') >= 0) {
        // 数据预处理
        let onlyClass = classData.filter(function (item) {
            return item.leaf;
        })

        layui.use(['dtree', 'layer', 'form'], function () {
            var dtree = layui.dtree;
            var layer = layui.layer;
            var form = layui.form;

            // 有效性判断
            if (onlyClass.length < 1) {
                layer.msg("请至少选择一个有效班级信息");
                return;
            }
            if (onlyClass.length > 1) {
                layer.msg("每次只能修改一个有效班级信息");
                return;
            }

            // 解析数据，通过班级id倒推出年级id和学校id
            let changeClassId = onlyClass[0].nodeId;

            let len = changeClassId.length,
                grid = changeClassId.slice(0, len - 1),
                scid = changeClassId.slice(0, len - 2);

            let clnode = onlyClass[0],
                grnode = dtree.getParam("demoTree", grid),
                scnode = dtree.getParam("demoTree", scid);

            changeClassInfo = {
                class: {
                    name: clnode.context,
                    id: clnode.nodeId,
                },
                grade: {
                    name: grnode.context,
                    id: grnode.nodeId,
                },
                school: {
                    name: scnode.context,
                    id: scnode.nodeId,
                },
            };
            changeClassInfo.totalName = changeClassInfo.school.name + " " + changeClassInfo.grade.name + " " + changeClassInfo.class.name;

            let changeInfo = {
                school: changeClassInfo.school.name,
                grade: changeClassInfo.grade.name,
                class: changeClassInfo.class.name,
            }

            cbox.style.display = 'block';
            abox.style.display = "none";
            form.val("changeClForm", changeInfo);
        })
    } else if (changeBt.innerText.indexOf('模板') >= 0) {
        layui.use(['layer', 'table', 'form'], function () {
            var layer = layui.layer;
            var table = layui.table;
            var form = layui.form;

            let checkStatus = table.checkStatus('idTest');

            if (checkStatus.data.length < 1) {
                layer.msg("请至少选择一个有效模板");
                return;
            }
            if (checkStatus.data.length > 1) {
                layer.msg("每次只能修改一个有效模板");
                return;
            }

            // 初始化缴费模板的细节设置功能
            detailDataTo = -1;
            detailData = [];
            pb.innerHTML = '';

            changeTemplateInfo = checkStatus.data[0];
            // 这里要写一段数据写入，把明细部分数据写入detailData

            let changeInfo = {
                name: changeTemplateInfo.name,
                sum: changeTemplateInfo.sum,
                endDate: changeTemplateInfo.end,
            }

            cbox.style.display = 'block';
            abox.style.display = "none";
            form.val("changeTeForm", changeInfo);
        })
    } else if (changeBt.innerText.indexOf('公众号') >= 0) {
        layui.use(['layer', 'table', 'form'], function () {
            var layer = layui.layer;
            var table = layui.table;
            var form = layui.form;

            let checkStatus = table.checkStatus('idTest');

            if (checkStatus.data.length < 1) {
                layer.msg("请至少选择一个有效公众号信息");
                return;
            }
            if (checkStatus.data.length > 1) {
                layer.msg("每次只能修改一个有效公众号信息");
                return;
            }

            changeWxInfo = checkStatus.data[0];
            changeWxInfo.school = changeWxInfo.schoolid;

            cbox.style.display = 'block';
            form.val("changeWxForm", changeWxInfo);
        })
    } else if (changeBt.innerText.indexOf('用户') >= 0) {
        layui.use(['layer', 'table', 'form'], function () {
            var layer = layui.layer;
            var table = layui.table;
            var form = layui.form;

            let checkStatus = table.checkStatus('idTest');

            if (checkStatus.data.length < 1) {
                layer.msg("请至少选择一个有效使用者信息");
                return;
            }
            if (checkStatus.data.length > 1) {
                layer.msg("每次只能修改一个有效使用者信息");
                return;
            }

            changeUserInfo = checkStatus.data[0];

            cbox.style.display = 'block';
            abox.style.display = "none";
            form.val("changeUserForm", changeUserInfo);
        })
    } else if (changeBt.innerText.indexOf('角色') >= 0) {
        layui.use(['layer', 'table', 'form'], function () {
            var layer = layui.layer;
            var table = layui.table;
            var form = layui.form;

            let checkStatus = table.checkStatus('idTest');

            if (checkStatus.data.length < 1) {
                layer.msg("请至少选择一个有效角色信息");
                return;
            }
            if (checkStatus.data.length > 1) {
                layer.msg("每次只能修改一个有效角色信息");
                return;
            }

            changeInfo = checkStatus.data[0];

            // 打卡changeBox，关闭addBox
            cbox.style.display = 'block';
            abox.style.display = "none";

            // 把需要显示的值写入表单
            form.val("changeRoleForm", changeInfo);

            setHasNavs(changeInfo.navsId)
        })
    } else if (changeBt.innerText.indexOf('学校') >= 0) {
        layui.use(['layer', 'table', 'form'], function () {
            var layer = layui.layer;
            var table = layui.table;
            var form = layui.form;

            let checkStatus = table.checkStatus('idTest');

            if (checkStatus.data.length < 1) {
                layer.msg("请至少选择一个有效学校信息");
                return;
            }
            if (checkStatus.data.length > 1) {
                layer.msg("每次只能修改一个有效学校信息");
                return;
            }

            changeInfo = checkStatus.data[0];

            changeInfo.area = changeInfo.areaid;

            // 打卡changeBox，关闭addBox
            cbox.style.display = 'block';
            abox.style.display = "none";

            // 把需要显示的值写入表单
            form.val("changeSchoolForm", changeInfo);
        })
    }
})


function changeCl() {
    let newInfo = {};
    let validate = false;
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        newInfo = form.val("changeClForm");
        for (let key in newInfo) {
            if (!newInfo[key]) {
                layer.msg("有必填数据为空");
                validate = false;
                return
            }
        }
        validate = true;
        layer.msg("成功修改原 " + changeClassInfo.totalName + " 的班级信息")
    })

    if (validate) {
        reloadTree();
    }
}

function changeTe() {
    let newInfo = {};
    let validate = false;
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        newInfo = form.val("changeTeForm");
        for (let key in newInfo) {
            if (!newInfo[key]) {
                layer.msg("有必填数据为空");
                validate = false;
                return
            }
        }
        validate = true;
        layer.msg("成功修改原 " + changeTemplateInfo.name + " 的模板信息")
    })

    if (validate) {
        reloadTable();
    }
}

function changeWx() {
    let newInfo = {};
    let validate = false;
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        newInfo = form.val("changeWxForm");
        for (let key in newInfo) {
            if (!newInfo[key]) {
                layer.msg("有必填数据为空");
                validate = false;
                return
            }
        }

        validate = true;

        let reqData = {
            id: newInfo.id,
            school_id: newInfo.school,
            wxid: newInfo.wxid,
            token: newInfo.token
        }

        api.wx.change(reqData, function(res) {
            if (res.code == '000') {
                layer.msg("成功修改原id为 " + changeWxInfo.id + " 的公众号信息")
                setTimeout(() => {
                    cbox.style.display = "none";
                    reloadTable();
                }, 500);
            } else {
                layer.msg(res.msg)
            }
        })
    })
}

function changeUser() {
    let newInfo = {};
    let validate = false;
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        newInfo = form.val("changeUserForm");
        for (let key in newInfo) {
            if (!newInfo[key]) {
                layer.msg("有必填数据为空");
                return
            }

            if (key == 'phone' && newInfo[key].length != 11) {
                layer.msg("请输入有效手机号");
                return
            }
        }

        validate = true;

        let reqData = {
            id: newInfo.id,
            username: newInfo.name,
            phone: newInfo.phone,
            type_id: newInfo.role
        }

        api.user.change(reqData, function (res) {
            if (res.code == '000') {
                layer.msg("成功修改原ID为 " + newInfo.id + " 的使用者信息");
                setTimeout(() => {
                    cbox.style.display = "none";
                    reloadTable();
                }, 500);
            } else {
                layer.msg(res.msg)
            }
        });
    })
}

function changeRole() {
    let newInfo = {};
    let validate = false;
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        newInfo = form.val("changeRoleForm");
        for (let key in newInfo) {
            if (key == 'nav') {
                continue;
            }
            if (!newInfo[key]) {
                layer.msg("有必填数据为空");
                validate = false;
                return
            }
        }

        validate = true;

        let data = {
            id: newInfo.id,
            type_name: newInfo.name,
            menu_auth: navsId
        }

        api.role.change(data, function (res) {
            if (res.code == '000') {
                layer.msg("成功修改原ID为 " + newInfo.id + " 的使用者信息");
                setTimeout(() => {
                    cbox.style.display = "none";
                    reloadTable();
                }, 500);
            } else {
                layer.msg(res.msg);
            }
        })
    })
}

function changeSc() {
    let newInfo = {};
    let validate = false;
    layui.use(['form', 'layer'], async function () {
        var form = layui.form;
        var layer = layui.layer;

        newInfo = form.val("changeSchoolForm");
        for (let key in newInfo) {

            if (!newInfo[key]) {
                layer.msg("有必填数据为空");
                validate = false;
                return
            }
        }

        validate = true;

        let point = await getPoint(newInfo.name, '昭通市')

        let data = {
            id: newInfo.id,
            schoolname: newInfo.name,
            areaid: newInfo.area,
            address: newInfo.address,
            longitude: point.lng,
            latitude: point.lat
        }

        api.school.change(data, function (res) {
            if (res.code == '000') {
                layer.msg("成功修改原ID为 " + newInfo.id + " 的学校信息");
                setTimeout(() => {
                    cbox.style.display = "none";
                    reloadTable();
                }, 500);
            } else {
                layer.msg(res.msg);
            }
        })
    })
}