let sub = document.getElementById("sideUpload");

let timeout = null;


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

function msg(str) {
  layui.use('layer', function() {
    var layer = layui.layer;

    layer.msg(str);
  })
}

function uploadStTe() {
  sub.style.display = 'block'
  
  var list = document.getElementById("uploadList");
  var listTitles = document.getElementsByClassName("item-title");
  let exist = false;
  for(let i = 0; i < listTitles.length; i++) {
    if(listTitles[i].innerHTML === '学生信息导入模板') {
      exist = true;
    }
  }

  if(exist) {
    msg("该下载项已存在，请稍等准备完成即可点击下载");
    return;
  }

  var item = document.createElement("div");

  let id = `uploadItem${list.children.length}`;

  item.id = id;
  item.className = "upload-item";

  item.innerHTML = `
    <div class="item-title">学生信息导入模板</div>
    <div class="item-status doing">准备中</div>
  `;

  list.appendChild(item);
}

function exportSt() {
  let onlyClass = classData.filter((item) => {
    return item.leaf;
  })

  if(onlyClass.length < 1) {
    msg("请至少选择一个有效班级导出学生信息");
    return;
  }

  // 节流
  if(timeout) {
    msg("请勿频繁进行重复操作，容易导致系统卡顿");
    return
  }
  timeout = setTimeout(()=>{
    timeout = null;
  }, 5000);

  sub.style.display = 'block';

  var list = document.getElementById("uploadList")

  var item = document.createElement("div");

  let id = `uploadItem${list.children.length}`;
  let date = new Date();

  item.id = id;
  item.className = "upload-item";

  item.innerHTML = `
    <div class="item-title">学生信息表 ${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</div>
    <div class="item-status doing">准备中</div>
  `;

  list.appendChild(item);
}