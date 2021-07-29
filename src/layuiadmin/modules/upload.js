layui.use('upload', function () {
  var upload = layui.upload;

  if (document.getElementById("uploadStBt")) {
    var uploadSt = upload.render({
      elem: '#uploadStBt' //绑定元素
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