let changeBt = document.getElementById("changeBt");
let cbox = document.getElementById("changeBox");

let changeClassInfo = {};
let changeTemplateInfo = {};
let changeWxInfo = {};

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
            form.val("changeClForm", changeInfo);
        })
    } else if (changeBt.innerText.indexOf('模板') >= 0) {
        layui.use(['layer', 'table', 'form'], function () {
            var layer = layui.layer;
            var table = layui.table;
            var form = layui.form;

            let checkStatus = table.checkStatus('idTest');

            if(checkStatus.data.length < 1) {
                layer.msg("请至少选择一个有效模板");
                return;
            }
            if(checkStatus.data.length > 1) {
                layer.msg("每次只能修改一个有效模板");
                return;
            }

            changeTemplateInfo = checkStatus.data[0];
            
            let changeInfo = {
                name: changeTemplateInfo.name,
                sum: changeTemplateInfo.sum,
                endDate: changeTemplateInfo.end,
            }

            cbox.style.display = 'block';
            form.val("changeTeForm", changeInfo);
        })
    } else if (changeBt.innerText.indexOf('公众号') >= 0) {
        layui.use(['layer', 'table', 'form'], function () {
            var layer = layui.layer;
            var table = layui.table;
            var form = layui.form;

            let checkStatus = table.checkStatus('idTest');

            if(checkStatus.data.length < 1) {
                layer.msg("请至少选择一个有效公众号信息");
                return;
            }
            if(checkStatus.data.length > 1) {
                layer.msg("每次只能修改一个有效公众号信息");
                return;
            }

            changeWxInfo = checkStatus.data[0];
            console.log(changeWxInfo);

            cbox.style.display = 'block';
            form.val("changeWxForm", changeWxInfo);
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

        newInfo = form.val("changeTeForm");
        for (let key in newInfo) {
            if (!newInfo[key]) {
                layer.msg("有必填数据为空");
                validate = false;
                return
            }
        }
        validate = true;
        layer.msg("成功修改原公开id为 " + changeWxInfo.wxid + " 的公众号信息")
    })

    if (validate) {
        reloadTable();
    }
}