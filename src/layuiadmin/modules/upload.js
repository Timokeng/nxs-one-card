layui.use('upload', function(){
    var upload = layui.upload;
     
    var uploadInst = upload.render({
      elem: '#uploadStBt' //绑定元素
      ,url: '/upload/' //上传接口
      ,accept: 'file'
      ,acceptMime:  'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ,exts: 'xlsx|xls'
      ,done: function(res){
        //上传完毕回调
      }
      ,error: function(){
        //请求异常回调
      }
    });
  });