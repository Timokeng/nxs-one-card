let deleteBt = document.getElementById("deleteBt");

deleteBt.addEventListener("click", function () {
    layui.use('layer', function () {
        var layer = layui.layer;

        if (classData.length < 1) {
            layer.msg("请至少选择一个有效班级");
            return;
        }

        // 对班级信息数据做预处理，只留下班级
        let onlyClass = classData.filter(function(item) {
            return item.leaf
        })

        layer.open({
            type: 1,
            content: '确定删除选中的 ' + onlyClass.length + '个班级吗？',
            skin: 'delete-confirm',
            area: ['300px', '200px'],
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                console.log('确定删除');
                reloadTree();
                layer.close(index);
            },
            btn2: function (index, layero) {
                console.log('取消删除');
                layer.close(index);
            },
        });
    })
})