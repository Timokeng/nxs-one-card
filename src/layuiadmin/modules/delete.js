let deleteBt = document.getElementById("deleteBt");

deleteBt.addEventListener("click", function () {
    if (deleteBt.innerText.indexOf('班级') >= 0) {
        layui.use('layer', function () {
            var layer = layui.layer;

            if (classData.length < 1) {
                layer.msg("请至少选择一个有效班级");
                return;
            }

            let arr = [];

            // 对班级信息数据做预处理，只留下班级
            classData.forEach(function (item) {
                if(item.level === '3') {
                    arr.push(item.nodeId.slice(1));
                }
            })


            layer.open({
                type: 1,
                content: '确定删除选中的 ' + arr.length + '个班级吗？',
                skin: 'delete-confirm',
                area: ['300px', '200px'],
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    console.log('确定删除');

                    api.class.delete({id: arr}, (res)=>{
                        if(res.code === '000'){
                            layer.msg(res.msg)
                            reloadTree();
                        } else {
                            layer.msg(res.msg)
                        }
                    })

                    layer.close(index);
                },
                btn2: function (index, layero) {
                    console.log('取消删除');
                    layer.close(index);
                },
            });
        })
    } else if (deleteBt.innerText.indexOf('年级') >= 0) {
        layui.use('layer', function () {
            var layer = layui.layer;

            if (gradeData.length < 1) {
                layer.msg("请至少选择一个有效年级");
                return;
            }

            let arr = [];

            // 对年级信息数据做预处理，只留下年级
            gradeData.forEach(function (item) {
                if(item.level === '2') {
                    arr.push(item.nodeId.slice(1));
                }
            })


            layer.open({
                type: 1,
                content: '确定删除选中的 ' + arr.length + '个年级吗？',
                skin: 'delete-confirm',
                area: ['300px', '200px'],
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    console.log('确定删除');

                    api.grade.delete({id: arr}, (res)=>{
                        if(res.code === '000'){
                            layer.msg(res.msg)
                            reloadTree();
                        } else {
                            layer.msg(res.msg)
                        }
                    })

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

            if (checkStatus.data.length < 1) {
                layer.msg('请至少选择一个有效模板');
                return;
            }
            validate = true;

            let arr = checkStatus.data.map(item => {
                return item.id
            })

            layer.open({
                type: 1,
                content: '确定删除选中的 ' + checkStatus.data.length + '个模板吗？',
                skin: 'delete-confirm',
                area: ['300px', '200px'],
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    console.log('确定删除');
                    api.template.delete({ id: arr }, function (res) {
                        if (res.code == "000") {
                            
                                reloadTable();

                        } else {
                            layer.msg(res.msg);
                        }
                    })
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

            if (checkStatus.data.length < 1) {
                layer.msg('请至少选择一个有效公众号信息');
                return;
            }
            validate = true;

            let arr = checkStatus.data.map(item => {
                return item.id
            })

            layer.open({
                type: 1,
                content: '确定删除选中的 ' + checkStatus.data.length + '个公众号信息吗？',
                skin: 'delete-confirm',
                area: ['300px', '200px'],
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    console.log('确定删除');
                    api.wx.delete({ id: arr }, function (res) {
                        if (res.code == "000") {
                            
                                reloadTable();

                        } else {
                            layer.msg(res.msg);
                        }
                    })
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

            if (checkStatus.data.length < 1) {
                layer.msg('请至少选择一个用户信息');
                return;
            }
            validate = true;

            let arr = checkStatus.data.map(item => {
                return item.id
            })

            layer.open({
                type: 1,
                content: '确定删除选中的 ' + checkStatus.data.length + '个使用者信息吗？',
                skin: 'delete-confirm',
                area: ['300px', '200px'],
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    console.log('确定删除');

                    api.user.delete({ id: arr }, function (res) {
                        if (res.code == "000") {
                            
                                reloadTable();

                        } else {
                            layer.msg(res.msg);
                        }
                    })
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

            if (checkStatus.data.length < 1) {
                layer.msg('请至少选择一个角色信息');
                return;
            }
            validate = true;

            let arr = checkStatus.data.map(item => {
                return item.id
            })

            layer.open({
                type: 1,
                content: '确定删除选中的 ' + checkStatus.data.length + '个角色信息吗？',
                skin: 'delete-confirm',
                area: ['300px', '200px'],
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    console.log('确定删除');

                    api.role.delete({ id: arr }, function (res) {
                        if (res.code == "000") {
                            
                                reloadTable();

                        } else {
                            layer.msg(res.msg);
                        }
                    })
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

            if (checkStatus.data.length < 1) {
                layer.msg('请至少选择一个学校信息');
                return;
            }
            validate = true;

            let arr = checkStatus.data.map(item => {
                return item.id
            })

            layer.open({
                type: 1,
                content: '确定删除选中的 ' + checkStatus.data.length + '个学校信息吗？',
                skin: 'delete-confirm',
                area: ['300px', '200px'],
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    console.log('确定删除');
                    api.school.delete({ id: arr }, function (res) {
                        if (res.code == "000") {

                            reloadTable();

                        } else {
                            layer.msg(res.msg);
                        }
                    })
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