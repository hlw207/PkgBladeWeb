<script setup lang="ts">

import router from "@/router";
import {onMounted, ref} from "vue";
import Shell from "@/components/icon/shell.vue";
import {ElMessage, UploadFile, UploadFiles} from "element-plus";
import {request} from "@/util/request";

const props = defineProps<{
  show: boolean
}>()

const emits = defineEmits(['close'])

const type = ref('exe')

const submitFile = ref(null)

const changeFile = (uploadFile: UploadFile, uploadFiles: UploadFiles) =>{
  if(type.value == 'exe'){
    if(!uploadFile.name.endsWith('.exe')){
      ElMessage.warning('上传格式不合规')
      uploadFiles.pop()
      return;
    }
  }else if(type.value == 'source'){
    if(!uploadFile.name.endsWith('.zip') && !uploadFile.name.endsWith('.rar')){
      ElMessage.warning('上传格式不合规')
      uploadFiles.pop()
      return
    }
  }else if(type.value == 'shell'){
    if(!uploadFile.name.endsWith('.sh')){
      ElMessage.warning('上传格式不合规')
      uploadFiles.pop()
      return;
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

const close = () =>{
  emits('close')
}
</script>

<template>
  <el-dialog v-model="props.show" width="800px" title="软件编译" @close="close">
    <div style="display: flex;align-items: center;margin-top: -15px;margin-bottom: 10px">
      <div style="font-weight: bolder;font-size: 18px;color: #dd2b0e">
        编译失败
      </div>
    </div>
    <div style="font-size: 15px;color: var(--font-color);margin-top: 5px">请选择以下三种方式之一，重新运行流水线</div>

    <el-radio-group v-model="type" style="margin: 10px 0">
      <el-radio label="exe" size="large">
        <div style="margin-top: -1px;display: flex">
          上传可执行文件
        </div>
      </el-radio>
      <el-radio label="source" size="large">
        <div style="margin-top: -1px;display: flex">
          重新上传软件包
        </div>
      </el-radio>
      <el-radio label="shell" size="large">
        <div style="margin-top: -1px;display: flex">
          上传编译shell脚本
        </div>
      </el-radio>
    </el-radio-group>
    <div style="width: 542px;">
      <el-upload v-if="type == 'exe'" action="" :limit="2" :auto-upload="false" :on-change="changeFile" :on-remove="removeFile">
        <div class="addPkg_upload">
          <Exe style="width: 80px;height: 80px"/>
          <div style="margin-left: 30px">
            <div class="upload_title">请上传软件包可执行文件</div>
            <div class="upload_tip">上传 .exe 文件，系统会帮你分析、裁剪依赖包，构建最小环境</div>
          </div>
        </div>
      </el-upload>

      <el-upload v-if="type == 'source'" action="" :limit="2" :auto-upload="false" :on-change="changeFile" :on-remove="removeFile">
        <div class="addPkg_upload">
          <Source style="width: 80px;height: 80px"/>
          <div style="margin-left: 30px">
            <div class="upload_title">请重新上传软件包源码</div>
            <div class="upload_tip">上传 .zip / .rar 文件，系统会帮你编译，分析、裁剪依赖包，构建最小环境</div>
          </div>
        </div>
      </el-upload>

      <el-upload v-if="type == 'shell'" action="" :limit="2" :auto-upload="false" :on-change="changeFile" :on-remove="removeFile">
        <div class="addPkg_upload">
          <Shell style="width: 80px;height: 80px"/>
          <div style="margin-left: 30px">
            <div class="upload_title">请上传构建软件包shell脚本</div>
            <div class="upload_tip">上传 .sh文件，系统会使用该sh脚本构建软件包</div>
          </div>
        </div>
      </el-upload>
    </div>

    <div style="display: flex;align-items: center;margin-top: 25px">
      <div class="upload_button" @click="uploadFile">重新执行流水线</div>
    </div>
  </el-dialog>
</template>

<style scoped>
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
</style>