const baseUrl = 'http://test.rcc.ynwrkj.com';

const req = {
    get: (url, suc, data = null, async = true) => {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                suc(JSON.parse(this.responseText));
            }
        }

        if (data) {
            let params = '?';
            for (let key in data) {
                params = params + `${key}=${data[key]}&`
            }
            params = params.slice(0, params.length - 1);
            url = url + params;
        }

        xhr.open("GET", url, async);
        // xhr.withCredentials = true;
        xhr.send();
    },

    post: (url, suc, data = null, beforeLogin) => {
        if (!beforeLogin) {
            let sid = sessionStorage.getItem("sid");
            data.sid = sid;
        }

        layui.use("jquery", function () {
            var $ = layui.$;

            $.post(
                url,
                data,
                function (res) {
                    if (res.code === '001' && sessionStorage.getItem("sid")) {
                        alert(res.msg);
                        window.parent.goLogin();
                        return;
                    }
                    suc(res);
                },
                "json"
            );
        })
    },
}


const api = {
    getCode: (data, suc) => req.post(baseUrl + '/commonApi/sendSms', suc, data, true),
    login: (data, suc) => req.post(baseUrl + '/commonApi/login', suc, data, true),
    out: (data, suc) => req.post(baseUrl + '/commonApi/logout', suc, data, true),
    wxLogin: (data, suc) => req.post(baseUrl + '/commonApi/qyWxLogin', suc, data, true),
    payType: (data, suc) => req.post(baseUrl + '/commonApi/queryLinkage', suc, data),
    role: {
        add: (data, suc) => req.post(baseUrl + '/user_typeApi/userTypeAdd', suc, data),
        getList: (data, suc) => req.post(baseUrl + '/user_typeApi/userTypeList', suc, data),
        change: (data, suc) => req.post(baseUrl + '/user_typeApi/userTypeUpdate', suc, data),
        delete: (data, suc) => req.post(baseUrl + '/user_typeApi/userTypeDel', suc, data),
        getDetail: (data, suc) => req.post(baseUrl + '/user_typeApi/getUserTypeOne', suc, data),
    },
    user: {
        add: (data, suc) => req.post(baseUrl + '/userApi/userAdd', suc, data),
        getList: (data, suc) => req.post(baseUrl + '/userApi/userList', suc, data),
        change: (data, suc) => req.post(baseUrl + '/userApi/userUpdate', suc, data),
        delete: (data, suc) => req.post(baseUrl + '/userApi/userDel', suc, data),
    },
    getAreaList: (data, suc) => req.post(baseUrl + '/commonApi/queryOrg', suc, data),
    school: {
        add: (data, suc) => req.post(baseUrl + '/schoolApi/schoolAdd', suc, data),
        getList: (data, suc) => req.post(baseUrl + '/schoolApi/schoolList', suc, data),
        change: (data, suc) => req.post(baseUrl + '/schoolApi/schoolUpdate', suc, data),
        delete: (data, suc) => req.post(baseUrl + '/schoolApi/schoolDel', suc, data),
    },
    grade: {
        add: (data, suc) => req.post(baseUrl + '/gradeApi/gradeAdd', suc, data),
        getList: (data, suc) => req.post(baseUrl + '/gradeApi/gradeList', suc, data),
        change: (data, suc) => req.post(baseUrl + '/gradeApi/gradeUpdate', suc, data),
        delete: (data, suc) => req.post(baseUrl + '/gradeApi/gradeDel', suc, data),
        getTree: (data, suc) => req.post(baseUrl + '/gradeApi/getGradeTree', suc, data),
        getDetail: (data, suc) => req.post(baseUrl + '/gradeApi/getGradeOne', suc, data),
    },
    class: {
        add: (data, suc) => req.post(baseUrl + '/classApi/classAdd', suc, data),
        getList: (data, suc) => req.post(baseUrl + '/classApi/classList', suc, data),
        change: (data, suc) => req.post(baseUrl + '/classApi/classUpdate', suc, data),
        delete: (data, suc) => req.post(baseUrl + '/classApi/classDel', suc, data),
        getTree: (data, suc) => req.post(baseUrl + '/classApi/getClassTree', suc, data),
        getDetail: (data, suc) => req.post(baseUrl + '/classApi//getClassOne', suc, data),
    },
    wx: {
        add: (data, suc) => req.post(baseUrl + '/wx_schoolApi/wxSchoolAdd', suc, data),
        getList: (data, suc) => req.post(baseUrl + '/wx_schoolApi/wxSchoolList', suc, data),
        change: (data, suc) => req.post(baseUrl + '/wx_schoolApi/wxSchoolUpdate', suc, data),
        delete: (data, suc) => req.post(baseUrl + '/wx_schoolApi/wxSchoolDel', suc, data),
    },
    template: {
        add: (data, suc) => req.post(baseUrl + '/itemsApi/itemsAdd', suc, data),
        getList: (data, suc) => req.post(baseUrl + '/itemsApi/itemsList', suc, data),
        change: (data, suc) => req.post(baseUrl + '/itemsApi/itemsUpdate', suc, data),
        delete: (data, suc) => req.post(baseUrl + '/itemsApi/itemsDel', suc, data),
        selfPay: (data, suc) => req.post(baseUrl + '/itemsApi/otherItemAdd', suc, data),
    },
    list: {
        getList: (data, suc) => req.post(baseUrl + '/pay_orderApi/orderList', suc, data),
        getDetail: (data, suc) => req.post(baseUrl + '/pay_orderApi/getoderDetailsByOrderid', suc, data),
        export: (data, suc) => req.post(baseUrl + '/pay_orderApi/export_order', suc, data),
    },
    student: {
        add: (data, suc) => req.post(baseUrl + '/studentsApi/studentsAdd', suc, data),
        getList: (data, suc) => req.post(baseUrl + '/studentsApi/studentsList', suc, data),
        change: (data, suc) => req.post(baseUrl + '/studentsApi/studentsUpdate', suc, data),
        delete: (data, suc) => req.post(baseUrl + '/studentsApi/studentsDel', suc, data),
        getDetail: (data, suc) => req.post(baseUrl + '/studentsApi/getstudentsOne', suc, data),
        export: (data, suc) => req.post(baseUrl + '/studentsApi/exportStudents', suc, data),
    },
    report: {
        getList: (data, suc) => req.post(baseUrl + '/countApi/countPaid', suc, data),
        getCollect: (data, suc) => req.post(baseUrl + '/countApi/getSummaryBySchool', suc, data),
        export: (data, suc) => req.post(baseUrl + '/countApi/export_paid', suc, data),
    }
}