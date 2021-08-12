let dlb = document.getElementById("dialong-box");
let dla = document.getElementById("dialog-article");

dlb.addEventListener("click", function(e){
    dlb.style.display = 'none';
})

dla.addEventListener("click", function(e){
    e.stopPropagation();
})

var demoTree = [
    {
        id: "1",
        title: '一中',
        checkArr: "0",
        children: [
            {
                id: "11",
                parentId: "1",
                title: '高一',
                checkArr: "0",
                children: [
                    {
                        id: '111',
                        parentId: '11',
                        title: '一班',
                        checkArr: '0'
                    }
                ]
            },
            {
                id: "12",
                parentId: "1",
                title: '高二',
                checkArr: "0",
            },
            {
                id: "13",
                parentId: "1",
                title: '高三',
                checkArr: "0",
            },
        ]
    },
    {
        id: '2',
        title: '二中',
        checkArr: "0",
        children: [
            {
                id: "21",
                parentId: "2",
                title: '高一',
                checkArr: "0",
            },
            {
                id: "22",
                parentId: "2",
                title: '高二',
                checkArr: "0",
            },
            {
                id: "23",
                parentId: "2",
                title: '高三',
                checkArr: "0",
            },
        ]
    },
    {
        id: '3',
        title: '三中',
        checkArr: "0",
        children: [
            {
                id: "31",
                parentId: "3",
                title: '高一',
                checkArr: "0",
            },
            {
                id: "32",
                parentId: "3",
                title: '高二',
                checkArr: "0",
            },
            {
                id: "33",
                parentId: "3",
                title: '高三',
                checkArr: "0",
            },
        ]
    },
];

layui.extend({
    dtree: 'style/dtree/dtree'
}).use(['dtree', 'layer', 'jquery'], function () {
    var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;

    var Tree1 = dtree.render({
        elem: "#cskTree1",
        data: demoTree, // 使用data加载
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
        // checkbarFun: {
        //   chooseDone: function (checkbarNodesParam) {
        //     classData = checkbarNodesParam;
        //     console.log(classData);
        //     return;
        //   }
        // },
    });
})