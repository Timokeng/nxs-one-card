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
];


layui.extend({
    dtree: 'style/dtree/dtree'
}).use(['dtree', 'layer', 'jquery'], function () {
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
        console.log(param);
        if (param.length == 0) {
            layer.msg("请至少选择一个节点");
        }

        let data = param.map(item => {
            return {
                id: item.nodeId,
                title: item.context,
                checkArr: '0'
            }
        })

        // param.forEach(item => {
        //     if (item.parentId == "undefined") {
        //         item.parentId = '-1';
        //     }
        // })

        dtree.reload("cskTree2", { data: data });
    })
}



// 在菜单权限选择的右边渲染出已有的菜单权限
function setHasNavs(arr) {
    let data = [];
    for(let i = 0; i < arr.length; i++) {
        data.push(navTreeData[arr[i] - 1]);
    }

    layui.use(['dtree', 'layer', 'jquery'], function () {
        var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;

        dtree.reload("cskTree2", { data: data });
    })
}
