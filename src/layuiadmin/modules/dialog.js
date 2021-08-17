let dlb = document.getElementById("dialong-box");
let dla = document.getElementById("dialog-article");
const bb = document.getElementById("bindBt");

bb.addEventListener("click", function () {
    let checkStatus = {},
        validate = false;
    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;

        checkStatus = table.checkStatus('idTest')

        if (checkStatus.data.length < 1) {
            layer.msg('请至少选择一个模板');
            return;
        } else if (checkStatus.data.length > 1) {
            layer.msg('每次只能配置一个模板');
            return;
        }
        validate = true;
    })
    if(validate) {
        dlb.style.display = 'flex';
    }
});

dlb.addEventListener("click", function (e) {
    dlb.style.display = 'none';
})

dla.addEventListener("click", function (e) {
    e.stopPropagation();
})