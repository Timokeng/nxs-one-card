const bindBt = document.getElementById("bindBt");
const unboundBt = document.getElementById("unboundBt");

let ubb = document.getElementById("unboundBox");


// 绑定模板按钮
bindBt.addEventListener("click", function () {
    // 数据预处理
    let onlyClass = classData.filter(function (item) {
        return item.leaf;
    });
    let templates = {};

    layui.use(['table', 'layer'], function () {
        var table = layui.table;
        var layer = layui.layer;

        templates = table.checkStatus('idTest');

        // 有效性判断
        if (onlyClass.length < 1) {
            layer.msg("请至少选择一个有效班级");
            return;
        }
        if (templates.data.length < 1) {
            layer.msg("请至少选择一个有效缴费模板");
            return;
        }

        // 调用接口（暂无），上传需要绑定的班级和所选模板
        layer.msg("成功为 " + onlyClass.length + "个班级 绑定了选中的 " + templates.data.length + " 个模板")
    })
})


// 禁用模板按钮
unboundBt.addEventListener("click", function () {
    let title = document.getElementById("headerTitle");

    let onlyClass = classData.filter(function (item) {
        return item.leaf;
    });

    layui.use(['table', 'layer'], function () {
        var table = layui.table;
        var layer = layui.layer;

        // 有效性判断
        if (onlyClass.length < 1) {
            layer.msg("请至少选择一个有效的班级");
            return;
        }
        if (onlyClass.length > 1) {
            layer.msg("每次只能对一个班级的已选模板进行禁用操作");
            return;
        }

        title.innerText = onlyClass[0].context + " 已绑定模板";
        ubb.style.display = 'block';

        let tableDate = [
            { id: 1, name: "2021年下学期高三学费", date: "2021-8-31", end: "2021-9-10", sum: 7000 },
            { id: 2, name: "2021年下学期高三书费", date: "2021-8-31", end: "2021-9-10", sum: 1000 },
            { id: 3, name: "2021年下学期高三住宿费", date: "2021-8-31", end: "2021-9-10", sum: 2000 },
            { id: 4, name: "2021年下学期高二学费", date: "2021-8-31", end: "2021-9-10", sum: 7000 },
            { id: 5, name: "2021年下学期高二书费", date: "2021-8-31", end: "2021-9-10", sum: 800 },
        ]

        table.render({
            elem: '#class-payment-template'
            , id: 'personTable'
            , height: 300
            , data: tableDate
            , page: true //开启分页
            , cols: [[ //表头
                { checkbox: true, width: "5%" }
                , { field: 'id', title: 'ID', width: "10%" }
                , { field: 'name', title: '收费项目', width: "30%", minWidth: 200 }
                , { field: 'date', title: '创建日期', width: "20%", minWidth: 100, sort: true }
                , { field: 'end', title: '结束日期', width: "20%", minWidth: 100, sort: true }
                , { field: 'sum', title: '金额', width: "15%", minWidth: 100 }
            ]]
        });
    })
})

function unTem() {
    let templates = {};

    layui.use(['table', 'layer'], function () {
        var table = layui.table;
        var layer = layui.layer;

        templates = table.checkStatus('personTable');

        if(templates.data.length > 0) {
            layer.msg("已禁用选中的 " + templates.data.length + "个 模板")
        }
    })
}