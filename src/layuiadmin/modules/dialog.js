let dlb = document.getElementById("dialog-box");
let dla = document.getElementById("dialog-article");
let dlt = document.getElementById("dialog-tree-fuc-box");
let dld = document.getElementById("dialog-detail-fuc-box");
let dls = document.getElementById("dialog-set-detail-box");
let ma = document.getElementsByClassName("main-article")[0];

const db = document.getElementById("detailBt");

let detailDataTo = -1;

dlb.addEventListener("click", function (e) {
    closeDialog();
})

dla.addEventListener("click", function (e) {
    e.stopPropagation();
})

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
            ma.style.overflow = 'hidden';
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
    if (detailDataTo == -1 && detailData.length > 0) {
        rewriteDetailProject();
    }
    if (pb.children.length < 1) {
        addDetailProject();
    }
    detailDataTo = num;
}


function handleSetNav(num) {
    dlb.style.display = 'flex';
    dlt.style.display = 'flex';
    ma.style.overflow = 'hidden';
}

function handlePaymentDetail() {
    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;

        let checkStatus = {},
            validate = false,
            titleName = '';


        checkStatus = table.checkStatus('idTest');

        if (checkStatus.data.length < 1) {
            layer.msg('请至少选择一条记录');
            return;
        } else if (checkStatus.data.length > 1) {
            layer.msg('每次只能查看一个记录的缴费明细');
            return;
        }
        titleName = "订单编号为 " + checkStatus.data[0].order_id + " 的缴费记录的缴费明细";
        validate = true;


        if (validate) {
            let ddt = document.getElementById("dialog-detai-table");

            ddt.getElementsByClassName('title')[0].innerHTML = titleName;

            let reqData = {
                order_id: checkStatus.data[0].order_id,
                page: '1',
                epage: '100'
            }

            api.list.getDetail(reqData, (res) => {
                if (res.code === '000') {
                    table.render({
                        elem: '#detail-list'
                        , id: 'detail-table'
                        , height: 530
                        , data: res.rows
                        , page: true
                        , cols: [[ //表头
                            // { checkbox: true, width: "5%" }
                            { field: 'id', title: 'ID', width: "10%", minWidth: 60 }
                            , { field: 'item_name', title: '缴费模板', width: "30%", minWidth: 60 }
                            , { field: 'item_id', title: '缴费模板ID', width: "30%", minWidth: 200 }
                            , { field: 'amt', title: '金额', width: "30%", minWidth: 200 }
                        ]]
                    });
                } else {
                    layer.msg(res.msg);
                }
            })


            dlb.style.display = 'flex';
            ma.style.overflow = 'hidden';
        }

    })
}


function handleConfigUserPower() {
    let checkStatus = {},
        validate = false;

    layui.use(['layer', 'table'], function () {
        var layer = layui.layer;
        var table = layui.table;

        checkStatus = table.checkStatus('idTest')

        console.log()

        if (checkStatus.data[0].role == '1') {
            layer.msg('超级管理员默认拥有所有学校权限，不需配置');
            return;
        }

        if (checkStatus.data.length < 1) {
            layer.msg('请至少选择一个用户');
            return;
        } else if (checkStatus.data.length > 1) {
            layer.msg('每次只能配置一个用户');
            return;
        }
        validate = true;
    })

    if (validate) {
        user = checkStatus.data[0];

        if (user.power) {
            setTree2(user.power.split(','));
        } else {
            setTree2([]);
        }


        dlb.style.display = 'flex';
        ma.style.overflow = 'hidden';
        for (let i = 0; i < dla.children.length; i++) {
            dla.children[i].style.display = 'none';
        }
        dlt.style.display = 'flex';
    }
}


function handleConfigTemGr() {
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
        temp = checkStatus.data[0];

        console.log(temp);

        getGrTree(temp.school);

        setTimeout(() => {
            if (temp.grade) {
                setGr2(temp.grade.split(','));
            } else {
                setGr2([]);
            }

            dlb.style.display = 'flex';
            ma.style.overflow = 'hidden';
            for (let i = 0; i < dla.children.length; i++) {
                dla.children[i].style.display = 'none';
            }
            dlt.style.display = 'flex';
        }, 500)
    }
}

function handlePayType(num) {
    clearForm('payType');
    payTypeTo = num;
    dlb.style.display = 'flex';
    ma.style.overflow = 'hidden';
}

function closeDialog() {
    dlb.style.display = 'none';
    ma.style.overflow = 'auto';
}