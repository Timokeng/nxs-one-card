const sbt = document.getElementById("searchBt");
let cdb = document.getElementById("condition");
let conditionData = {};

sbt.addEventListener("click", function () {
    cdb.style.display = 'block'
});

function searchSt() {
    layui.use('form', function () {
        var form = layui.form;

        conditionData = form.val("conditionForm");
        console.log(conditionData);
    });
    reLoadTable();
}
