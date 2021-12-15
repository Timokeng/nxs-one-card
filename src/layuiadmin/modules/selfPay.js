const sbox = document.getElementById("selfBox");

let selfData = {};

function handleSelfPay() {
    clearForm("selfPayForm");

    layui.use(['layer', 'table', 'form'], function () {
        var layer = layui.layer;
        var table = layui.table;
        var form = layui.form;

        let checkStatus = table.checkStatus('idTest');

        if (checkStatus.data.length < 1) {
            layer.msg("请至少选择一个学生");
            return;
        }
        if (checkStatus.data.length > 1) {
            layer.msg("每次只能修改一个学生");
            return;
        }

        selfData = {};

        api.student.getDetail({ id: checkStatus.data[0].id }, async (res) => {
            if (res.code === "000") {
                getTemplateList(res.result.school_id);

                let changeInfo = {
                    id: res.result.id,
                    school: res.result.school_id,
                    name: res.result.name,
                };

                selfData = {
                    student_id: res.result.id,
                    name: res.result.name,
                    school_id: res.result.school_id,
                    grade_id: res.result.grade_id,
                    class_id: res.result.class_id,
                    idnumber: res.result.idnumber,
                    item_id: '',
                    remark: '',
                    amt: ''
                }

                form.val("selfPayForm", changeInfo);
                cbox.style.display = 'none';
                abox.style.display = "none";
                sbox.style.display = "block";
            } else {
                layer.msg(res.msg);
            }
        })

    })
}

function getTemplateList(school) {
    let reqData = {
        item_name: "",
        item_no: "",
        school_id: school,
        page: '1',
        epage: '1000'
    }

    api.template.getList(reqData, (res) => {
        layui.use(['form', 'layer'], function () {
            let form = layui.form,
                layer = layui.layer;

            if (res.code === '000') {
                let selects = document.getElementById("template");

                selects.innerHTML = '<option value=""></option';

                res.rows.list.forEach(item => {
                    let option = document.createElement("option");

                    option.value = item.id;
                    option.innerHTML = item.item_name;

                    selects.appendChild(option);
                });

                form.render("select");
            } else {
                layer.msg(res.msg)
            }
        })
    })
}

function setSelfPay() {
    let selfInfo = {};
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        selfInfo = form.val("selfPayForm");
        for (let key in selfInfo) {
            if (!selfInfo[key]) {
                layer.msg("有必填数据为空");
                return
            }
        }

        selfData.item_id = selfInfo.template;
        selfData.remark = selfInfo.remark;
        selfData.amt = selfInfo.amt;

        api.template.selfPay(selfData, (res) => {
            layer.msg(res.msg);
            if(res.code === '000') {
                sbox.style.display = 'none'
            }
        })
    })
}