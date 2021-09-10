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
      let url = 'http://test.rcc.ynwrkj.com/Upexcel/批量信息导入模板.xlsx',
        filename = '批量信息导入模板.xlsx';
      downloadFile(url, filename);
    });

  }, 2000)
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

function handleExportLi() {
  cdb.style.display = 'none';
  ecb.style.display = 'block';
}

function exportLi() {

  layui.use(['form', 'dtree', 'layer'], function () {
    var dtree = layui.dtree,
      layer = layui.layer,
      form = layui.form;


    let cd = form.val("conditionForm");
    let school = classData.length > 0 ? classData[0].nodeId : '';

    let t1 = cd.start ? Math.floor((new Date(cd.start).getTime()) / 1000):'',
        t2 = cd.end ? Math.floor((new Date(cd.end).getTime()) / 1000):'';

    if(t1 >= t2 && t2) {
      layer.msg("开始时间必须在结束时间之前");
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


    // 发起请求
    let reqData = {
      order_id: cd.order_id,
      logmin: t1,
      logmax: t2,
      school_id: school,
      name: cd.name,
      idnumber: cd.pid
    }

    api.list.export(reqData, (res) => {
      let dom = document.getElementById(id);
      
      if(res.code === '000') {
        layer.msg('文件准备就绪，点击即可下载');
        dom.children[1].className = 'item-status ok';
        dom.children[1].innerHTML = '可下载';

        let url = 'http://test.rcc.ynwrkj.com' + res.result,
            arr = res.result.split('/'),
            filename = arr[arr.length - 1];

        dom.addEventListener('click', ()=>{
          downloadFile(url, filename);
        })
      } else {
        layer.msg(res.msg);
        dom.children[1].innerHTML = '下载失败';
      }
    })
  })
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