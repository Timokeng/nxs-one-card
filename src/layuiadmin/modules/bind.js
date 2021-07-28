const bindBt = document.getElementById("bindBt");

bindBt.addEventListener("click", function () {
    // 数据预处理
    let onlyClass = classData.filter(function (item) {
        return item.leaf;
    });
    let templates = []; 

    layui.use(['table', 'layer'], function () {
        var table = layui.table;
        var layer = layui.layer;

        templates = table.checkStatus('idTest');

        // 有效性判断
        if(onlyClass.length < 1) {
            layer.msg("请至少选择一个有效班级");
            return;
        }
        if(templates.data.length < 1) {
            layer.msg("请至少选择一个有效缴费模板");
            return;
        }

        // 调用接口（暂无），上传需要绑定的班级和所选模板
        layer.msg("成功为 " + onlyClass.length + "个班级 绑定了选中的 " + templates.data.length + " 个模板")
    })
})