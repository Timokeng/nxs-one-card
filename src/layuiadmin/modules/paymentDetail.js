let pb = dls.getElementsByClassName("projects-box")[0];
let detailData = [];

function addDetailProject() {
    let len = dls.getElementsByClassName("form-box").length;

    let item = document.createElement("div");
    item.className = "form-box layui-form";
    item.setAttribute('lay-filter', `detailForm${len}`);

    item.innerHTML = `
        <div class="layui-form-item input-box">
            <label class="layui-form-label">项目名称</label>
            <div class="layui-input-block">
                <input type="text" name="name" placeholder="请输入" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item input-box">
            <label class="layui-form-label">项目金额（元）</label>
            <div class="layui-input-block">
                <input type="text" name="sum" placeholder="请输入" autocomplete="off" class="layui-input">
            </div>
        </div>
    `

    pb.appendChild(item);
}

function deleteDetailProject() {
    let len = dls.getElementsByClassName("form-box").length;

    pb.removeChild(pb.children[len - 1]);
}


function getDatailData() {
    let len = dls.getElementsByClassName("form-box").length;
    let res = [];
    let sum = 0;
    let validate = false;

    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        if(pb.children.length < 1) {
            layer.msg("至少要有一条明细金额");
            return;
        }

        for(let i = 0; i < len; i++) {
            let data = form.val(`detailForm${i}`);

            if(!data.name) {
                layer.msg("项目名不能为空");
                return;
            }

            data.sum = Number(data.sum);
            if(data.sum == NaN || data.sum <= 0) {
                layer.msg("金额必须是大于0的数字");
                return;
            }
            sum += data.sum;
            res.push(data);
        }
        validate = true;
    })
    if(validate) {
        if(detailDataTo == 0) {
            document.getElementById("addSum").value = sum;
        } else {
            document.getElementById("changeSum").value = sum;
        }
        detailData = res;
        closeDialog();
    }
}


// 将已存在的明细数据渲染出来
function rewriteDetailProject() {
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        for(let i = 0; i < detailData.length; i++) {
            addDetailProject();

            form.val(`detailForm${i}`, detailData[i]);
        }
    })
}