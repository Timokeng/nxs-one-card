const addBt = document.getElementById("addBt");
let abox = document.getElementById("addBox");
let addInfo = {};

addBt.addEventListener("click", function(){
    abox.style.display = "block";
})

// 新增学生
function addSt() {
    let validate = false;
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        addInfo = form.val("addStForm");
        for(let key in addInfo) {
            if(!addInfo[key]) {
                layer.msg("有必填数据为空");
                validate = false;
                return
            }
        }
        if(addInfo.pid.length != 18) {
            layer.msg("请输入有效身份证号码");
            validate = false;
            return;
        }
        validate = true;
        layer.msg("成功添加 " + addInfo.name + " 的相关信息")
        console.log(addInfo);
    });
    if(validate){
        reloadTable();
    }
}

// 新增班级
function addCl() {
    let validate = false;
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        addInfo = form.val("addClForm");
        for(let key in addInfo) {
            if(!addInfo[key]) {
                layer.msg("有必填数据为空");
                validate = false;
                return
            }
        }
        validate = true;
        layer.msg("成功添加 " + addInfo.school + addInfo.grade + addInfo.class + " 的班级")
        console.log(addInfo);
    });
    if(validate){
        reloadTree();
    }
}

// 新增模板
function addTe() {
    let validate = false;
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        addInfo = form.val("addTeForm");
        for(let key in addInfo) {
            if(!addInfo[key]) {
                layer.msg("有必填数据为空");
                validate = false;
                return
            }
        }
        validate = true;
        layer.msg("成功添加 " + addInfo.name + " 模板")
        console.log(addInfo);
    });
    if(validate){
        reloadTable();
    }
}