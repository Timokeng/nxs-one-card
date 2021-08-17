let dlb = document.getElementById("dialong-box");
let dla = document.getElementById("dialog-article");
let dlt = document.getElementById("dialog-tree-fuc-box");
let dld = document.getElementById("dialog-detail-fuc-box");

const bb = document.getElementById("bindBt");
const db = document.getElementById("detailBt");

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
        dlt.style.display = 'flex';
        dld.style.display = 'none';
    }
});

db.addEventListener("click", function() {
    let checkStatus = {},
        validate = false;
        titleName = '';
    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;

        checkStatus = table.checkStatus('idTest');
        console.log(checkStatus);

        if (checkStatus.data.length < 1) {
            layer.msg('请至少选择一个模板');
            return;
        } else if (checkStatus.data.length > 1) {
            layer.msg('每次只能查看一个模板的费用明细');
            return;
        }
        titleName = checkStatus.data[0].name + "明细";
        validate = true;
    })
    if(validate) {
        dlb.style.display = 'flex';
        dlt.style.display = 'none'
        dld.style.display = 'block';
        dld.getElementsByClassName("title")[0].innerHTML = titleName;
    }
})

dlb.addEventListener("click", function (e) {
    dlb.style.display = 'none';
})

dla.addEventListener("click", function (e) {
    e.stopPropagation();
})