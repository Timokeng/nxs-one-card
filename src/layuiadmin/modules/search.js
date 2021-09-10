const sbt = document.getElementById("searchBt");
let cdb = document.getElementById("condition");
var classData = [];

if(sbt) {
    sbt.addEventListener("click", function () {
        cdb.style.display = 'block';
    });
}

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

        let t1 = data.start, t2 = data.end;

        t1 = Math.floor((new Date(t1).getTime()) / 1000);
        t2 = Math.floor((new Date(t2).getTime()) / 1000);

        if(t1 >= t2) {
            layer.msg("开始时间必须在结束时间之前");
            return;
        }

        let school_id = classData.length > 0? classData[0].nodeId:'';
        
        reloadTable(data.order_id, data.name, school_id, data.pid, t1, t2);

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