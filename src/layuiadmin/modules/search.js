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

        let classId = [];

        classData.forEach(item => {
            if(item.level === '3') {
                classId.push(item.nodeId.slice(1));
            }
        })

        reloadTable(data.name, classId);
    });
}

function searchTe() {
    let conditionData = {};
    let validate = false;
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        conditionData = form.val("conditionForm");

        // let sdate = Date.parse(conditionData.startDate),
        //     edate = Date.parse(conditionData.endDate);
        // if(sdate > edate) {
        //     layer.msg("结束时间要在开始时间之后");
        //     return;
        // }

        validate = true;
    })
    if(validate) {
        reloadTable(conditionData.name, conditionData.templateNo, conditionData.school);
    }
}

function searchWx() {
    let conditionData = {};
    let validate = false;
    let wxid = '';
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        conditionData = form.val("conditionForm");

        validate = true;

        wxid = conditionData.wxid
    })
    if(validate) {
        reloadTable(wxid);
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

    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        let data = form.val("conditionForm");

        // 处理性别数据（暂时不需要了）
        // if(data.woman && data.man) {
        //     conditionData.sex = "all"
        // } else if (data.woman) {
        //     conditionData.sex = "woman"
        // } else if (data.man) {
        //     conditionData.sex = "man"
        // } else {
        //     conditionData.sex = "all"
        // }

        // 处理学校、年级、班级数据
        
        reloadTable(data.order_id, data.name, classData[0].nodeId, data.pid);

    });

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