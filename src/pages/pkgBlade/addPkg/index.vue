<script setup lang="ts">
import {reactive, ref} from "vue";
import type {UploadFile, UploadFiles, UploadUserFile} from "element-plus";
import {request} from "@/util/request";
import {ElMessage} from "element-plus";
import router from "@/router";

const pkg = reactive({
  name: '',
  description: '',
  type: 'exe'
})

const submitFile = ref(null)

const changeFile = (uploadFile: UploadFile, uploadFiles: UploadFiles) =>{
  if(pkg.type == 'exe'){
    if(!uploadFile.name.endsWith('.exe')){
      ElMessage.warning('上传格式不合规')
      uploadFiles.pop()
      return;
    }
  }else if(pkg.type == 'source'){
    if(!uploadFile.name.endsWith('.zip') && !uploadFile.name.endsWith('.rar')){
      ElMessage.warning('上传格式不合规')
      uploadFiles.pop()
      return
    }
  }
  submitFile.value = uploadFile
  if(uploadFiles.length > 1)
    uploadFiles.shift()
}

const removeFile = (uploadFile: UploadFile, uploadFiles: UploadFiles) =>{
  submitFile.value = null
}


const uploadFile = () =>{
  if(pkg.name == ''){
    ElMessage.warning("请填写软件包名称")
    return
  }
  if(submitFile.value == null){
    ElMessage.warning("请上传软件包")
    return;
  }
  let formData = new FormData();
  formData.append('file', submitFile.value.raw)
  formData.append('fileName', pkg.name)
  formData.append('description', pkg.description)
  request({
    url: '/file/pkgAdd',
    method: "POST",
    data: formData,
  }).then((res)=>{
    ElMessage.success("上传成功")
  })
}

</script>

<route lang="yaml">
  meta:
    layout: pkgMain
</route>

<template>
  <div class="addPkg">
    <div class="addPkg_top">
      <NewPackage style="height: 100px;width: 100px"/>
      <div style="margin-left: 20px">
        <div style="font-weight: bolder;font-size: 23px;">添加软件包</div>
        <div style="color: var(--font-color);margin-top: 10px;font-size: 15px">添加新软件包，系统会为您分析、裁剪软件包依赖，生成流水线</div>
      </div>
    </div>

    <div style="font-size: 15px;font-weight: bolder;margin-top: 20px">软件包名称</div>
    <el-input
        v-model="pkg.name"
        style="width: 320px;margin: 12px 0 8px"
        placeholder="My awesome project"
        clearable
    />
    <div style="color: rgb(98, 97, 104);font-size: 14px">
      必须以小写或大写字母、数字、表情符号或下划线开头。也可以包含点、加号、破折号或空格。
    </div>
    <div style="font-size: 15px;font-weight: bolder;margin-top: 20px">软件包描述</div>
    <el-input
        v-model="pkg.description"
        style="width: 600px;margin: 12px 0 8px"
        :autosize="{ minRows: 2, maxRows: 3 }"
        type="textarea"
        placeholder="We build websites that make users smile and computers cry with joy."
    />
    <div style="color: rgb(98, 97, 104);font-size: 14px">
      给出软件包的描述，方便更好找到软件包
    </div>

    <div style="font-size: 15px;font-weight: bolder;margin-top: 20px">软件包类型</div>
    <el-radio-group v-model="pkg.type">
      <el-radio label="exe" size="large">
        <div style="margin-top: -1px;display: flex">
        可执行文件
        </div>
      </el-radio>
      <el-radio label="source" size="large">
        <div style="margin-top: -1px;display: flex">
        软件包源码
        </div>
      </el-radio>
    </el-radio-group>
    <div style="width: 542px;">
      <el-upload v-if="pkg.type == 'exe'" action="" :limit="2" :auto-upload="false" :on-change="changeFile" :on-remove="removeFile">
        <div class="addPkg_upload">
          <Exe style="width: 80px;height: 80px"/>
          <div style="margin-left: 30px">
            <div class="upload_title">请上传软件包可执行文件</div>
            <div class="upload_tip">上传 .exe 文件，系统会帮你分析、裁剪依赖包，构建最小环境</div>
          </div>
        </div>
      </el-upload>

      <el-upload v-if="pkg.type == 'source'" action="" :limit="2" :auto-upload="false" :on-change="changeFile" :on-remove="removeFile">
        <div class="addPkg_upload">
          <Source style="width: 80px;height: 80px"/>
          <div style="margin-left: 30px">
            <div class="upload_title">请上传软件包源码</div>
            <div class="upload_tip">上传 .zip / .rar 文件，系统会帮你编译，分析、裁剪依赖包，构建最小环境</div>
          </div>
        </div>
      </el-upload>
    </div>

    <div style="display: flex;align-items: center;margin-top: 25px">
      <div class="upload_button" @click="uploadFile">添加软件包</div>
      <div class="cancel_button" @click="router.push('/')">取消</div>
    </div>
  </div>
</template>

<style scoped>
.addPkg{
  padding: 25px;
}

.addPkg_top{
  display: flex;
  align-items: center;
}

.addPkg_upload{
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid rgb(220, 220, 222);
  width: 540px;
  height: 220px;
}

.addPkg_upload:hover{
  background: rgb(64, 158, 255, 0.05);;
}

.upload_title{
  color: rgb(64, 158, 255);
  font-weight: bolder;
}

.upload_tip{
  margin-top: 10px;
  width: 300px;
  font-size: 14px;
  color: var(--font-color);
}

.upload_button{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  color: white;
  font-size: 14px;
  background: rgb(64, 158, 255);
  cursor: pointer;
  border-radius: 4px;
}

.upload_button:hover{
  background: #1f75cb;
}

.cancel_button{
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 11px;
  color: var(--font-color);
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid rgb(191, 191, 195);
}

.cancel_button:hover{
  background: var(--hover-color);
}
</style>