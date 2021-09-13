// 临时数据，对接口后删除
var navTreeData = [
    {
        id: '1',
        title: '主页',
        checkArr: "0",
    },
    {
        id: '2',
        title: '班级管理',
        checkArr: "0",
    },
    {
        id: '3',
        title: '学生管理',
        checkArr: "0",
    },
    {
        id: '4',
        title: '缴费管理',
        checkArr: "0",
    },
    {
        id: '5',
        title: '权限管理',
        checkArr: "0",
    },
    {
        id: '6',
        title: '微信管理',
        checkArr: "0",
    },
    {
        id: '7',
        title: '学校管理',
        checkArr: "0",
    },
    {
        id: '8',
        title: '报表管理',
        checkArr: "0",
    },
];

var navTreeData2 = [];
var navsId = [];
var navs = '';

layui.use(['dtree', 'layer', 'jquery'], function () {
    var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;

    var Tree1 = dtree.render({
        elem: "#cskTree1",
        data: navTreeData, // 使用data加载
        checkbar: true,
        checkbarType: "no-all",
        // checkbarFun: {
        //   chooseDone: function (checkbarNodesParam) {
        //     classData = checkbarNodesParam;
        //     console.log(classData);
        //     return;
        //   }
        // },
    });

    var Tree2 = dtree.render({
        elem: "#cskTree2",
        data: [], // 使用data加载
        checkbar: true,
        checkbarType: "no-all",

        // response: { treeId: "nodeId", title: "context", parentId: "parentId" },
        // dataFormat: "list"
        // checkbarFun: {
        //   chooseDone: function (checkbarNodesParam) {
        //     classData = checkbarNodesParam;
        //     console.log(classData);
        //     return;
        //   }
        // },
    });
})



function useNav() {
    layui.use(['dtree', 'layer', 'jquery'], function () {
        var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;

        var param = dtree.getCheckbarNodesParam("cskTree1");  // 获取选中数据

        if (param.length == 0) {
            layer.msg("请至少选择一个节点");
        }

        param.forEach(item => {
            let isHas = navsId.some(id => {
                return id == item.nodeId;
            })

            if(!isHas) {
                let node = {
                    id: item.nodeId,
                    title: item.context,
                    checkArr: '0'
                }
    
                // 记录已选的菜单权限
                navTreeData2.push(node);
                navsId.push(item.nodeId);
                navs = navs + item.context + ",";
            }
        })
        if(navs[navs.length - 1] == ',') {
            navs = navs.slice(0, navs.length - 1);
        }

        dtree.reload("cskTree2", { data: navTreeData2 });
    })
}


function deleteNav() {
    layui.use(['dtree', 'layer', 'jquery'], function () {
        var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;

        var param = dtree.getCheckbarNodesParam("cskTree2");  // 获取选中数据

        if (param.length == 0) {
            layer.msg("请至少选择一个节点");
        }

        let map = {}, navsIdTemplate = [], navsTemplate = '';

        param.forEach(item => {
            map[item.nodeId] = 1;
        })

        navTreeData2.forEach(item => {
            // 选出未选中禁用的节点的
            if(map[item.id]) {
                item.id = -1;
            } else {
                navsIdTemplate.push(item.id);
                navsTemplate = navsTemplate + item.title + ","
            }
        })


        // 获得未禁用的节点数据
        navTreeData2 = navTreeData2.filter(item => {
            return item.id != -1;
        })
        navsId = navsIdTemplate;
        navs = navsTemplate.slice(0, navsTemplate.length - 1);

        dtree.reload("cskTree2", { data: navTreeData2 });
    })
}


// 在菜单权限选择的右边渲染出已有的菜单权限
function setHasNavs(arr) {
    let data = [];

    // 初始化数据
    navsId = [];
    navs = '';

    for(let i = 0; i < arr.length; i++) {
        let item = navTreeData[Number(arr[i]) - 1]
        data.push(item);
        navsId.push(item.id);
        navs = navs + item.title + ','
    }
    navs = navs.slice(0, navs.length - 1);
    navTreeData2 = data;

    layui.use(['dtree', 'layer', 'jquery'], function () {
        var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;

        dtree.reload("cskTree2", { data: navTreeData2 });
    })
}
