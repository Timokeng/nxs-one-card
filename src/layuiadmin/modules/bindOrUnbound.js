// 用户管理页面所需变量
let user = {};

let treeData1 = [],
    treeData2 = [],
    scChoose1 = [],
    scChoose2 = [],
    opt_auth = [],
    powerMap = {};

let scMap = {};


// 缴费模板页面所需变量
let temp = {};

let treeGr1 = [],
    treeGr2 = [],
    grChoose1 = [],
    grChoose2 = [],
    grades = [],
    grMap = {};




// 用户管理页面配置学校相关函数
function getScTree() {
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

                    scMap[item.id] = item.schoolname;

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

                            return;
                        }
                    },
                });
            } else {
                layer.msg(res.msg);
            }
        })
    })
}

function configUserPower() {
    layui.use(['dtree', 'layer', 'jquery'], async function () {
        var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;


        scChoose1.forEach(item => {
            if (powerMap[item.nodeId] === undefined) {
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
    layui.use(['dtree', 'layer', 'jquery'], async function () {
        var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;

        scChoose2.forEach(item => {
            let index = powerMap[item.nodeId];
            treeData2[index] = -1;
            opt_auth[index] = -1;
            powerMap[item.nodeId] = undefined;
        })

        treeData2 = treeData2.filter(item => {
            return item != -1;
        })

        opt_auth = opt_auth.filter(item => {
            return item != -1;
        })

        powerMap = [];

        treeData2.forEach((item, index) => {
            powerMap[item.id] = index;
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
    let map = {}; 

    treeData2 = [];
    powerMap = {};
    opt_auth = [];

    arr.forEach(item => {
        map[item] = 1;
    })

    treeData1.forEach(item => {
        if (map[item.id] !== undefined) {
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
        opt_auth: opt_auth.length > 0 ? opt_auth : ''
    }

    return new Promise((resolve, reject) => {
        api.user.change(reqData, (res) => {
            setTimeout(() => {
                reloadTable();
            }, 500)

            resolve(res);
        })
    })
}






// 缴费模板页面配置班级相关函数
function getGrTree() {
    treeGr1 = [
        {
            id: "G1",
            title: "高一年级",
            parentId: '0',
            checkArr: '0'
        },
        {
            id: "G2",
            title: "高二年级",
            parentId: '0',
            checkArr: '0'
        },
        {
            id: "G3",
            title: "高三年级",
            parentId: '0',
            checkArr: '0'
        },
    ];

    layui.use(['dtree', 'layer', 'jquery'], function () {
        var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;

        dtree.render({
            elem: "#cskTree1",
            data: treeGr1, // 使用data加载
            checkbar: true,
            checkbarType: "no-all",
            checkbarFun: {
                chooseDone: function (checkbarNodesParam) {
                    grChoose1 = checkbarNodesParam;

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
                    grChoose2 = checkbarNodesParam;

                    return;
                }
            },
        });
    })
}

function congfigTemGr() {
    layui.use(['dtree', 'layer', 'jquery'], async function () {
        var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;

        
        grChoose1.forEach(item => {
            if (grMap[item.nodeId] === undefined) {
                let one = {
                    id: item.nodeId,
                    title: item.context,
                    parentId: '0',
                    checkArr: '0'
                }

                treeGr2.push(one);
                grades.push(item.nodeId);

                grMap[item.nodeId] = treeGr2.length - 1;
            }
        })

        // 发送请求
        let res = await changeGr();

        if (res.code === '000') {
            dtree.render({
                elem: "#cskTree2",
                data: treeGr2, // 使用data加载
                checkbar: true,
                checkbarType: "no-all",
                checkbarFun: {
                    chooseDone: function (checkbarNodesParam) {
                        grChoose2 = checkbarNodesParam;

                        return;
                    }
                },
            });
        } else {
            layer.msg(res.msg);
        }
    })
}

function deleteTemGr() {
    layui.use(['dtree', 'layer', 'jquery'], async function () {
        var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;

        grChoose2.forEach(item => {
            let index = grMap[item.nodeId];
            treeGr2[index] = -1;
            grades[index] = -1;
            grMap[item.nodeId] = undefined;
        })

        treeGr2 = treeGr2.filter(item => {
            return item != -1;
        })

        grades = grades.filter(item => {
            return item != -1;
        })

        grMap = [];

        treeGr2.forEach((item, index) => {
            grMap[item.id] = index;
        })


        // 发送请求
        let res = await changeGr();

        if (res.code === '000') {
            dtree.render({
                elem: "#cskTree2",
                data: treeGr2, // 使用data加载
                checkbar: true,
                checkbarType: "no-all",
                checkbarFun: {
                    chooseDone: function (checkbarNodesParam) {
                        grChoose2 = checkbarNodesParam;

                        return;
                    }
                },
            });
        } else {
            layer.msg(res.msg);
        }
    })
}

function setGr2(arr) {
    let map = {};

    treeGr2 = [];
    grMap = {};
    grades = [];

    arr.forEach(item => {
        map[item] = 1;
    })

    treeGr1.forEach(item => {
        if (map[item.id]) {
            treeGr2.push(item);
            grades.push(item.id);

            grMap[item.id] = treeGr2.length - 1;
        }
    })


    layui.use(['dtree', 'layer', 'jquery'], function () {
        var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;

        dtree.render({
            elem: "#cskTree2",
            data: treeGr2, // 使用data加载
            checkbar: true,
            checkbarType: "no-all",
            checkbarFun: {
                chooseDone: function (checkbarNodesParam) {
                    grChoose2 = checkbarNodesParam;

                    return;
                }
            },
        });

    })
}

function changeGr() {
    let reqData = {
        id: temp.id,
        school_id: temp.school,
        grade_no: grades.length > 0? grades:'',
        item_no: temp.templateNo,
        item_name: temp.name,
        amt: temp.sum,
        remark: temp.detail
    }

    return new Promise((resolve, reject) => {
        api.template.change(reqData, (res) => {
            setTimeout(() => {
                reloadTable();
            }, 500)

            resolve(res);
        })
    })
}