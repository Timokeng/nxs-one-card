const sbt = document.getElementById("searchBt");
let cdb = document.getElementById("condition");
let conditionData = {
    id: "",
    name: "",
    sex: "",
    pid: "",
    class: []
};
var classData = [];

sbt.addEventListener("click", function () {
    cdb.style.display = 'block'
});

function searchSt() {
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        let data = form.val("conditionForm");

        // 处理性别数据
        if(data.woman && data.man) {
            conditionData.sex = "all"
        } else if (data.woman) {
            conditionData.sex = "woman"
        } else if (data.man) {
            conditionData.sex = "man"
        }

        // 处理学校、年级、班级数据
        if(classData.length > 0) {
            classData.forEach(function(item) {
                // if(item.level == 1) {
                //     conditionData.schoool.push(item.id);
                // } else if(item.level == 2) {
                //     conditionData.grade.push(item.id);
                // } else if(item.level == 3) {
                //     conditionData.class.push(item.id);
                // }
                if(item.leaf) {
                    conditionData.class.push(item.nodeId);
                }
            })
        }

        // 填入其他数据
        for(let key in data) {
            if(key == 'man' || key == 'woman') {
                continue;
            }
            conditionData[key] = data[key];
        } 
        console.log(conditionData);
    });
    reLoadTable();
}
