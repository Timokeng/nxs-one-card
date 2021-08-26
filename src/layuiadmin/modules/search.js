const sbt = document.getElementById("searchBt");
let cdb = document.getElementById("condition");
var classData = [];

sbt.addEventListener("click", function () {
    cdb.style.display = 'block'
});

function searchSt() {
    let conditionData = {};

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

function searchTe() {
    let conditionData = {};
    let validate = false;
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        conditionData = form.val("conditionForm");

        let sdate = Date.parse(conditionData.startDate),
            edate = Date.parse(conditionData.endDate);
        if(sdate > edate) {
            layer.msg("结束时间要在开始时间之后");
            return;
        }

        validate = true;

        console.log(conditionData);
    })
    if(validate) {
        reloadTable();
    }
}

function searchWx() {
    let conditionData = {};
    let validate = false;
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        conditionData = form.val("conditionForm");

        validate = true;

        console.log(conditionData);
    })
    if(validate) {
        reloadTable();
    }
}

function searchUser() {
    let conditionData = {};
    let validate = false;
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        conditionData = form.val("conditionForm");

        validate = true;
    })
    if(validate) {
        reloadTable(conditionData.name, conditionData.phone);
    }
}

function searchLi() {
    let conditionData = {};

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
        } else {
            conditionData.sex = "all"
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

    reloadTable();
}


function searchRole() {
    let conditionData = {};
    let validate = false;
    let data = '';
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        conditionData = form.val("conditionForm");

        validate = true;
        data = conditionData.name;
    })
    if(validate) {
        reloadTable(data);
    }
}


function searchSc() {
    let conditionData = {};
    let validate = false;
    let name = '', areaid = '';
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        conditionData = form.val("conditionForm");

        validate = true;

        name = conditionData.name;
        areaid = conditionData.area;
    })

    if(validate) {
        reloadTable(name, areaid);
    }
}