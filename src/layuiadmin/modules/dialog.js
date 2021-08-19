let dlb = document.getElementById("dialong-box");
let dla = document.getElementById("dialog-article");
let dlt = document.getElementById("dialog-tree-fuc-box");
let dld = document.getElementById("dialog-detail-fuc-box");
let dls = document.getElementById("dialog-set-detail-box");
let ma = document.getElementsByClassName("main-article")[0];

const bb = document.getElementById("bindBt");
const db = document.getElementById("detailBt");

let detailDataTo = -1;

dlb.addEventListener("click", function (e) {
    closeDialog();
})

dla.addEventListener("click", function (e) {
    e.stopPropagation();
})

if (bb) {
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
        if (validate) {
            dlb.style.display = 'flex';
            for (let i = 0; i < dla.children.length; i++) {
                dla.children[i].style.display = 'none';
            }
            dlt.style.display = 'flex';
        }
    });
}

if (db) {
    db.addEventListener("click", function () {
        let checkStatus = {},
            validate = false;
        titleName = '';
        layui.use(['layer', 'table'], function () {
            var layer = layui.layer;
            var table = layui.table;

            checkStatus = table.checkStatus('idTest');

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
        if (validate) {
            dlb.style.display = 'flex';
            for (let i = 0; i < dla.children.length; i++) {
                dla.children[i].style.display = 'none';
            }
            dld.style.display = 'block';
            dld.getElementsByClassName("title")[0].innerHTML = titleName;
        }
    })
}


// num用于判断是新增模板，还是修改模板
function handleSetDetail(num) {
    dlb.style.display = 'flex';
    for (let i = 0; i < dla.children.length; i++) {
        dla.children[i].style.display = 'none';
    }
    dls.style.display = 'block';
    ma.style.overflow = 'hidden';
    if(detailDataTo == -1 && detailData.length > 0) {
        rewriteDetailProject();
    }
    if(pb.children.length < 1) {
        addDetailProject();
    }
    detailDataTo = num;
}


function closeDialog() {
    dlb.style.display = 'none';
    ma.style.overflow = 'auto';
}