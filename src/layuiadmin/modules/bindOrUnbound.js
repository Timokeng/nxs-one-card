let user = {};

let treeData1 = [],
    treeData2 = [],
    scChoose1 = [],
    scChoose2 = [],
    opt_auth = [],
    powerMap = {};


layui.use(['dtree', 'layer', 'jquery'], function () {
    var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;

    let reqData = {
        schoolname: '',
        areaid: '',
        page: '1',
        epage: '100'
    }

    api.school.getList(reqData, (res) => {
        if (res.code === '000') {

            res.rows.list.forEach(item => {
                let one = {
                    id: item.id,
                    title: item.schoolname,
                    parentId: '0',
                    checkArr: '0'
                }

                treeData1.push(one);
            })

            dtree.render({
                elem: "#cskTree1",
                data: treeData1, // 使用data加载
                checkbar: true,
                checkbarType: "no-all",
                checkbarFun: {
                    chooseDone: function (checkbarNodesParam) {
                        scChoose1 = checkbarNodesParam;
                        console.log(scChoose1);
                        return;
                    }
                },
            });


            dtree.render({
                elem: "#cskTree2",
                data: [], // 使用data加载
                checkbar: true,
                checkbarType: "no-all",
                checkbarFun: {
                    chooseDone: function (checkbarNodesParam) {
                        scChoose2 = checkbarNodesParam;
                        console.log(scChoose2);
                        return;
                    }
                },
            });
        } else {
            layer.msg(res.msg);
        }
    })
})


// num用来判断是那个页面的业务，从而对应正确接口
// 一个是模板界面，一个是权限界面
function bindCl(num) {
    layui.use(['dtree', 'layer', 'jquery'], function () {
        var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;

        var param = dtree.getCheckbarNodesParam("cskTree1");  // 获取选中数据
        if (param.length == 0) {
            layer.msg("请至少选择一个节点");
        }

        param.forEach(item => {
            if (item.parentId == "undefined") {
                item.parentId = '-1';
            }
        })

        dtree.reload("cskTree2", { data: param });

    })
}

function configUserPower() {
    layui.use(['dtree', 'layer', 'jquery'],async function () {
        var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;


        scChoose1.forEach(item => {
            if (!powerMap[item.nodeId]) {
                let one = {
                    id: item.nodeId,
                    title: item.context,
                    parentId: '0',
                    checkArr: '0'
                }

                treeData2.push(one);
                opt_auth.push(item.nodeId);

                powerMap[item.nodeId] = treeData2.length - 1;
            }
        })

        // 发送请求
        let res = await changePower();

        if (res.code === '000') {
            dtree.render({
                elem: "#cskTree2",
                data: treeData2, // 使用data加载
                checkbar: true,
                checkbarType: "no-all",
                checkbarFun: {
                    chooseDone: function (checkbarNodesParam) {
                        scChoose2 = checkbarNodesParam;
                        console.log(scChoose2);
                        return;
                    }
                },
            });
        } else {
            layer.msg(res.msg);
        }
    })
}


function deleteUserPower() {
    layui.use(['dtree', 'layer', 'jquery'],async function () {
        var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;

        scChoose2.forEach(item => {
            let index = powerMap[item.nodeId];
            treeData2[index] = -1;
            opt_auth[index] = -1;
        })

        treeData2 = treeData2.filter(item => {
            return item != -1;
        })

        opt_auth = opt_auth.filter(item => {
            return item != -1;
        })

        // 发送请求
        let res = await changePower();

        if (res.code === '000') {
            dtree.render({
                elem: "#cskTree2",
                data: treeData2, // 使用data加载
                checkbar: true,
                checkbarType: "no-all",
                checkbarFun: {
                    chooseDone: function (checkbarNodesParam) {
                        scChoose2 = checkbarNodesParam;
                        console.log(scChoose2);
                        return;
                    }
                },
            });
        } else {
            layer.msg(res.msg);
        }
    })
}


function setTree2(arr) {
    let map = {}, treeData2 = [];
    powerMap = {};

    arr.forEach(item => {
        map[item] = 1;
    })

    treeData1.forEach(item => {
        if (map[item.id]) {
            treeData2.push(item);
            opt_auth.push(item.id);

            powerMap[item.id] = treeData2.length - 1;
        }
    })

    layui.use(['dtree', 'layer', 'jquery'], function () {
        var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;

        dtree.render({
            elem: "#cskTree2",
            data: treeData2, // 使用data加载
            checkbar: true,
            checkbarType: "no-all",
            checkbarFun: {
                chooseDone: function (checkbarNodesParam) {
                    scChoose2 = checkbarNodesParam;
                    console.log(scChoose2);
                    return;
                }
            },
        });

    })
}


function changePower() {

    let reqData = {
        id: user.id,
        username: user.name,
        type_id: user.role,
        phone: user.phone,
        opt_auth: opt_auth.length > 0 ? opt_auth:''
    }

    return new Promise((resolve, reject) => {
        console.log(reqData)
        api.user.change(reqData, (res) => {
            setTimeout(()=>{
                reloadTable();
            }, 500)

            resolve(res);
        })
    })
}