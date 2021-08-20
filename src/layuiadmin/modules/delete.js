let deleteBt = document.getElementById("deleteBt");

deleteBt.addEventListener("click", function () {
    if (deleteBt.innerText.indexOf('班级') >= 0) {
        layui.use('layer', function () {
            var layer = layui.layer;

            if (classData.length < 1) {
                layer.msg("请至少选择一个有效班级");
                return;
            }

            // 对班级信息数据做预处理，只留下班级
            let onlyClass = classData.filter(function (item) {
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
    } else if (deleteBt.innerText.indexOf('模板') >= 0) { 
        let checkStatus = {},
            validate = false;
        layui.use(['layer', 'table'], function () {
            var layer = layui.layer;
            var table = layui.table;

            checkStatus = table.checkStatus('idTest')
            
            if(checkStatus.data.length < 1) {
                layer.msg('请至少选择一个有效模板');
                return;
            }
            validate = true;

            layer.open({
                type: 1,
                content: '确定删除选中的 ' + checkStatus.data.length + '个模板吗？',
                skin: 'delete-confirm',
                area: ['300px', '200px'],
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    console.log('确定删除');
                    reloadTable();
                    layer.close(index);
                },
                btn2: function (index, layero) {
                    console.log('取消删除');
                    layer.close(index);
                },
            });
        })
    } else if (deleteBt.innerText.indexOf('公众号') >= 0) {
        let checkStatus = {},
            validate = false;
        layui.use(['layer', 'table'], function () {
            var layer = layui.layer;
            var table = layui.table;

            checkStatus = table.checkStatus('idTest')
            
            if(checkStatus.data.length < 1) {
                layer.msg('请至少选择一个有效公众号信息');
                return;
            }
            validate = true;

            layer.open({
                type: 1,
                content: '确定删除选中的 ' + checkStatus.data.length + '个公众号信息吗？',
                skin: 'delete-confirm',
                area: ['300px', '200px'],
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    console.log('确定删除');
                    reloadTable();
                    layer.close(index);
                },
                btn2: function (index, layero) {
                    console.log('取消删除');
                    layer.close(index);
                },
            });
        })
    } else if (deleteBt.innerText.indexOf('用户') >= 0) {
        let checkStatus = {},
            validate = false;
        layui.use(['layer', 'table'], function () {
            var layer = layui.layer;
            var table = layui.table;

            checkStatus = table.checkStatus('idTest')
            
            if(checkStatus.data.length < 1) {
                layer.msg('请至少选择一个有用户信息');
                return;
            }
            validate = true;

            layer.open({
                type: 1,
                content: '确定删除选中的 ' + checkStatus.data.length + '个使用者信息吗？',
                skin: 'delete-confirm',
                area: ['300px', '200px'],
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    console.log('确定删除');
                    reloadTable();
                    layer.close(index);
                },
                btn2: function (index, layero) {
                    console.log('取消删除');
                    layer.close(index);
                },
            });
        })
    } else if (deleteBt.innerText.indexOf('角色') >= 0) {
        let checkStatus = {},
            validate = false;
        layui.use(['layer', 'table'], function () {
            var layer = layui.layer;
            var table = layui.table;

            checkStatus = table.checkStatus('idTest')
            
            if(checkStatus.data.length < 1) {
                layer.msg('请至少选择一个角色信息');
                return;
            }
            validate = true;

            layer.open({
                type: 1,
                content: '确定删除选中的 ' + checkStatus.data.length + '个使用者信息吗？',
                skin: 'delete-confirm',
                area: ['300px', '200px'],
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    console.log('确定删除');
                    reloadTable();
                    layer.close(index);
                },
                btn2: function (index, layero) {
                    console.log('取消删除');
                    layer.close(index);
                },
            });
        })
    } else if (deleteBt.innerText.indexOf('学校') >= 0) {
        let checkStatus = {},
            validate = false;
        layui.use(['layer', 'table'], function () {
            var layer = layui.layer;
            var table = layui.table;

            checkStatus = table.checkStatus('idTest')
            
            if(checkStatus.data.length < 1) {
                layer.msg('请至少选择一个学校信息');
                return;
            }
            validate = true;

            layer.open({
                type: 1,
                content: '确定删除选中的 ' + checkStatus.data.length + '个学校信息吗？',
                skin: 'delete-confirm',
                area: ['300px', '200px'],
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    console.log('确定删除');
                    reloadTable();
                    layer.close(index);
                },
                btn2: function (index, layero) {
                    console.log('取消删除');
                    layer.close(index);
                },
            });
        })
    }
})