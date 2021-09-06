let sub = document.getElementById("sideUpload");

let timeout = null;

function msg(str) {
  layui.use('layer', function () {
    var layer = layui.layer;

    layer.msg(str);
  })
}

function exportStTe() {
  sub.style.display = 'block'

  var list = document.getElementById("uploadList");
  var listTitles = document.getElementsByClassName("item-title");
  let exist = false;
  for (let i = 0; i < listTitles.length; i++) {
    if (listTitles[i].innerHTML === '学生信息导入模板') {
      exist = true;
    }
  }

  if (exist) {
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

  setTimeout(() => {
    let item = document.getElementById(id);
    let status = item.children[1];
    status.className = 'item-status ok';
    status.innerHTML = '可下载';

    item.addEventListener('click', () => {
      let url = 'http://192.168.1.18/rcc_pay/Upexcel/批量信息导入模板.xlsx',
      filename = '批量信息导入模板.xlsx';
      downloadFile(url, filename);
    });

  }, 3000)
}

function exportSt() {
  let onlyClass = classData.filter((item) => {
    return item.leaf;
  })

  if (onlyClass.length < 1) {
    msg("请至少选择一个有效班级导出学生信息");
    return;
  }

  // 节流
  if (timeout) {
    msg("请勿频繁进行重复操作，容易导致系统卡顿");
    return
  }
  timeout = setTimeout(() => {
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


function exportClTe() {
  sub.style.display = 'block'

  var list = document.getElementById("uploadList");
  var listTitles = document.getElementsByClassName("item-title");
  let exist = false;
  for (let i = 0; i < listTitles.length; i++) {
    if (listTitles[i].innerHTML === '班级信息导入模板') {
      exist = true;
    }
  }

  if (exist) {
    msg("该下载项已存在，请稍等准备完成即可点击下载");
    return;
  }

  var item = document.createElement("div");

  let id = `uploadItem${list.children.length}`;

  item.id = id;
  item.className = "upload-item";

  item.innerHTML = `
    <div class="item-title">班级信息导入模板</div>
    <div class="item-status doing">准备中</div>
  `;

  list.appendChild(item);
}

function exportCl() {
  let onlyClass = classData.filter((item) => {
    return item.leaf;
  })

  if (onlyClass.length < 1) {
    msg("请至少选择一个有效班级导出班级信息");
    return;
  }

  // 节流
  if (timeout) {
    msg("请勿频繁进行重复操作，容易导致系统卡顿");
    return
  }
  timeout = setTimeout(() => {
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
    <div class="item-title">班级信息表 ${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</div>
    <div class="item-status doing">准备中</div>
  `;

  list.appendChild(item);
}

function exportLi() {
  let onlyClass = classData.filter((item) => {
    return item.leaf;
  })

  if (onlyClass.length < 1) {
    msg("请至少选择一个有效班级导出班级缴费记录");
    return;
  }

  // 节流
  if (timeout) {
    msg("请勿频繁进行重复操作，容易导致系统卡顿");
    return
  }
  timeout = setTimeout(() => {
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
    <div class="item-title">缴费记录表 ${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</div>
    <div class="item-status doing">准备中</div>
  `;

  list.appendChild(item);
}


function downloadFile(url, filename) {
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', filename);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}