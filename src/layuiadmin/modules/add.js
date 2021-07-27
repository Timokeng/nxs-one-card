const addBt = document.getElementById("addBt");
let abox = document.getElementById("addBox");
let addInfo = {};

addBt.addEventListener("click", function(){
    abox.style.display = "block";
})

function addSt() {
    let validate = true;
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
        reLoadTable();
    }
}