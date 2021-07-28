let changeBt = document.getElementById("changeBt");
let cbox = document.getElementById("changeBox");

let changeClassInfo = {};

changeBt.addEventListener("click", function () {
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
            }
        };

        let changeInfo = {
            school: changeClassInfo.school.name,
            grade: changeClassInfo.grade.name,
            class: changeClassInfo.class.name,
        }

        cbox.style.display = 'block';
        form.val("changeClForm", changeInfo);
    })
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
        layer.msg("成功修改原 " + changeClassInfo.school.name + " " + changeClassInfo.grade.name + " " + changeClassInfo.class.name + " 的班级信息")
    })

    if(validate) {
        reloadTree();
    }
}