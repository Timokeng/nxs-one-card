let changeBt = document.getElementById("changeBt");
let cbox = document.getElementById("changeBox");

let changeClassInfo = {};
let changeTemplateInfo = {};
let changeWxInfo = {};
let changeUserInfo = {};

changeBt.addEventListener("click", function () {
    if (changeBt.innerText.indexOf('班级') >= 0) {
        // 数据预处理
        let onlyClass = classData.filter(function (item) {
            return item.level === '3';
        })

        layui.use(['dtree', 'layer', 'form'], async function () {
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

            // let grade = '', school = '';

            // classData.forEach(item => {
            //     if(item.nodeId === onlyClass.parentId) {
            //         grade = 'G' + item.nodeId.charAt(item.nodeId.length - 1);
            //         school = item.parentId;
            //     }
            // });
            let classId = onlyClass[0].nodeId.slice(1);

            api.class.getDetail({ id: classId }, (res) => {
                if (res.code === '000') {
                    let data = {
                        id: res.result.id,
                        school: res.result.school_id,
                        grade: res.result.grade_id,
                        class: res.result.class_name,
                        classNo: res.result.class_no
                    }

                    getGrList(res.result.school_id, 1);

                    setTimeout(() => {
                        form.val("changeClForm", data);

                        cbox.style.display = 'block';
                        abox.style.display = "none";
                    }, 500);
                } else {
                    layer.msg(res.msg);
                }
            })

        })
    } else if (changeBt.innerText.indexOf('年级') >= 0) {
        // 数据预处理
        let onlyGrade = gradeData.filter(function (item) {
            return item.level === '2';
        })

        layui.use(['dtree', 'layer', 'form'], async function () {
            var dtree = layui.dtree;
            var layer = layui.layer;
            var form = layui.form;

            // 有效性判断
            if (onlyGrade.length < 1) {
                layer.msg("请至少选择一个有效年级");
                return;
            }
            if (onlyGrade.length > 1) {
                layer.msg("每次只能修改一个有效年级");
                return;
            }

            // let grade = '', school = '';

            // classData.forEach(item => {
            //     if(item.nodeId === onlyClass.parentId) {
            //         grade = 'G' + item.nodeId.charAt(item.nodeId.length - 1);
            //         school = item.parentId;
            //     }
            // });
            let gradeId = onlyGrade[0].nodeId.slice(1);

            api.grade.getDetail({ id: gradeId }, (res) => {
                if (res.code === '000') {
                    let data = {
                        id: res.result.id,
                        school: res.result.school_id,
                        grade: res.result.grade_name,
                        gradeNo: res.result.grade_no
                    }

                    form.val("changeGrForm", data);
                    cbox.style.display = 'block';
                    abox.style.display = "none";
                } else {
                    layer.msg(res.msg);
                }
            })
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
            // 这个数据还是假的
            if (changeTemplateInfo.detail) {
                changeTemplateInfo.detail.split(",").forEach((item, index, arr) => {
                    let one = {
                        name: item,
                        sum: Number(changeTemplateInfo.sum) / arr.length
                    }

                    detailData.push(one);
                })
            }

            let changeInfo = {
                id: changeTemplateInfo.id,
                name: changeTemplateInfo.name,
                sum: changeTemplateInfo.sum,
                school: changeTemplateInfo.school,
                grade: changeTemplateInfo.grade,
                templateNo: changeTemplateInfo.templateNo
            }

            form.val("changeTeForm", changeInfo)
            cbox.style.display = 'block';
            abox.style.display = "none";
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
            payTypeArr = changeWxInfo.pay_type ? changeWxInfo.pay_type.split(",") : [];
            changeWxInfo.payType = changeWxInfo.pay_type_str;

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
            changeInfo.pArea = changeInfo.areapid;

            getAreaList(changeInfo.pArea, 1);

            setTimeout(() => {
                // 打卡changeBox，关闭addBox
                cbox.style.display = 'block';
                abox.style.display = "none";

                // 把需要显示的值写入表单
                form.val("changeSchoolForm", changeInfo);
            }, 500);
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

        let reqData = {
            id: newInfo.id,
            school_id: newInfo.school,
            grade_id: newInfo.grade,
            class_name: newInfo.class,
            class_no: newInfo.classNo
        }

        api.class.change(reqData, (res) => {
            if (res.code === '000') {
                layer.msg("成功修改原 " + newInfo.id + " 的班级信息");
                setTimeout(() => {
                    cbox.style.display = "none";
                    reloadTree();
                }, 500);
            } else {
                layer.msg(res.msg);
            }
        })
    })
}

function changeGr() {
    let newInfo = {};
    let validate = false;
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        newInfo = form.val("changeGrForm");
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
            grade_no: newInfo.gradeNo,
            grade_name: newInfo.grade,
        }

        api.grade.change(reqData, (res) => {
            if (res.code === '000') {
                layer.msg("成功修改原 " + newInfo.id + " 的年级信息");
                setTimeout(() => {
                    cbox.style.display = "none";
                    reloadTree();
                }, 500);
            } else {
                layer.msg(res.msg);
            }
        })
    })
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

        let detail = detailData.map(item => {
            return item.name;
        })

        let reqData = {
            id: newInfo.id,
            school_id: newInfo.school,
            // grade_no: newInfo.grade,
            item_name: newInfo.name,
            item_no: newInfo.templateNo,
            amt: newInfo.sum,
            remark: detail
        }

        api.template.change(reqData, function (res) {
            if (res.code == '000') {
                layer.msg("成功修改原id为 " + newInfo.id + " 的缴费模板")
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
            mchid: newInfo.mchid,
            pay_type: payTypeArr,
            token: newInfo.token
        }

        api.wx.change(reqData, function (res) {
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
                layer.msg("成功修改原ID为 " + newInfo.id + " 的角色信息");
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