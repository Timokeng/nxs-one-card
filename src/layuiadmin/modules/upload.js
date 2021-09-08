layui.use(['upload', 'layer'], function () {
  var upload = layui.upload,
      layer = layui.layer;

  if (document.getElementById("uploadStBt")) {
    var uploadSt = upload.render({
      elem: '#uploadStBt' //绑定元素
      , url: 'http://test.rcc.ynwrkj.com/studentsApi/upExcel' //上传接口
      , accept: 'file'
      , acceptMime: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      , exts: 'xlsx|xls'
      , done: function (res) {
        //上传完毕回调
        layer.msg(res.msg);
        setTimeout(()=>{
          reloadTable()
        }, 500);
      }
      , error: function () {
        //请求异常回调
      }
    });
  }

  if (document.getElementById("uploadClBt")) {
    var uploadCl = upload.render({
      elem: '#uploadClBt' //绑定元素
      , url: '/upload/' //上传接口
      , accept: 'file'
      , acceptMime: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      , exts: 'xlsx|xls'
      , done: function (res) {
        //上传完毕回调
      }
      , error: function () {
        //请求异常回调
      }
    });
  }
});