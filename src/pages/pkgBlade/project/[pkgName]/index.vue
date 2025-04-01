<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import LineLayout from "@/components/icon/lineLayout.vue";
import {usePipelineStore} from "@/pages/pkgBlade/project/[pkgName]/pipeline/pipeline";
import {request} from "@/util/request";
import {ElMessage} from "element-plus";
import router from "@/router";
import type {pipeline, pipelineStage} from "@/util/interface";
import DependencyGraph from "@/components/dependencyGraph.vue";

const pipelineInfo = usePipelineStore()

const route = useRoute()
const pkgName = ref('')
const right_top = ref(0)
const deleteShow = ref(false)

const pkgBasic = ref({} as pipeline)
const transform = ['exe', 'source', 'linux_package']

const pkg = reactive({
  dependency: 0,
  allDependency: 0,
  layout: 0,
})

const pipelineList = ref([] as pipelineStage[])

const intToStatus = ref(['finished', 'not_started', 'failed', 'processing'])
const missionToName = ref({
  GET_DEPENDENCY: "依赖拉取",
  FILE_CUTTING: "文件裁剪",
  FUNCTION_CUTTING: "函数裁剪",
  GENERATE: "依赖生成"
})

const pipeShow = ref([false, false, false])

const openShow = (index: number) =>{
  pipeShow.value[index] = true
}

const closeShow = (index: number) =>{
  pipeShow.value[index] = false
}

const deleteMission = () =>{
  request({
    url: '/pipeline/deletePipeline',
    method: 'POST',
    params: {
      missionName: <string>route.params['pkgName']
    }
  }).then((res)=>{
    ElMessage.success("成功删除" + <string>route.params['pkgName'])
    router.push('/')
  })
}

const getStage = () => {
  request({
    url: '/pipeline/getPipelineStageInfo',
    method: 'get',
    params: {
      missionName: <string>route.params['pkgName']
    }
  }).then((res)=>{
    console.log(res.data)
    pipelineList.value = res.data.data
  })
}

const getPipelineDetail = () =>{
  request({
    url: '/pipeline/getPipelineDetail',
    method: 'get',
    params: {
      missionName: <string>route.params['pkgName']
    }
  }).then((res)=>{
    console.log(res.data)
    pkgBasic.value = res.data.data
  })
}

const getPipelineInfoDetail = () =>{
  request({
    url: '/pipeline/getPipelineInfoDetail',
    method: 'get',
    params: {
      missionName: <string>route.params['pkgName']
    }
  }).then((res)=>{
    console.log(res.data)
  })
}

const formatDate = (date: Date) =>{
  if(date != null) {
    const d = new Date(date);
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }
}

const gainPkg = (allDependency: number, dependency: number, layout: number) =>{
  pkg.dependency = dependency
  pkg.allDependency = allDependency
  pkg.layout = layout
}

onMounted(()=>{
  pkgName.value = <string>route.params['pkgName']
  pipelineInfo.missionName = pkgName.value
  pipelineInfo.dependency = ''
  getStage()
  getPipelineDetail()
  getPipelineInfoDetail()
})
</script>

<route lang="yaml">
  meta:
    layout: pkgDetail
</route>

<template>
  <div class="pkg_box">
    <div style="display: flex;flex-direction: column;flex: 1">
      <div style="display: flex;align-items:center;">
        <div class="project_avatar">{{pkgName.substring(0, 1).toUpperCase()}}</div>
        <div class="project_text">{{pkgName}}</div>
        <div style="display: flex;flex: 1;justify-content: right;align-items: center">
          <div class="cancel_button" @click="deleteShow = true">删除软件包</div>
          <div class="upload_button">下载依赖包</div>
        </div>
      </div>
      <div>
        <div class="pkg_show">
          <div class="pkg_show_top" style="height: 45px">
            <div style="font-size: 15px;font-weight: bolder">依赖包图示</div>
            <div style="display: flex;align-items: center;justify-content: right;flex: 1">

            </div>
          </div>
          <DependencyGraph @gain-pkg="gainPkg"/>
        </div>
<!--        <div class="pkg_show">-->
<!--          <div class="pkg_show_top"></div>-->
<!--        </div>-->
<!--        <div class="pkg_show">-->
<!--          <div class="pkg_show_top"></div>-->
<!--        </div>-->
      </div>
    </div>
    <div class="pkg_right"></div>
    <div class="pkg_right_fixed">
      <div class="pkg_title">软件包信息</div>
      <div class="pkg_info">
        <div style="display: flex;align-items: center;">
          <Exe v-if="pkgBasic.missionType == 0" class="project_icon"/>
          <Source v-if="pkgBasic.missionType == 1" class="project_icon"/>
          <Linux v-if="pkgBasic.missionType == 2" class="project_icon"/>
          <div class="project_number" style="margin-left: 0">
            <div>{{transform[pkgBasic.missionType]}}</div>
          </div>
        </div>
        <div style="width: 100%;margin-top: 6px">
          {{pkgBasic.missionDescription}}
        </div>
      </div>
      <div class="pkg_title">流水线信息</div>
      <div class="pkg_info">
        <div style="display: flex;align-items: center">
          <template v-for="(p ,index) in pipelineList">
            <div class="pipeline_basic" :class="['pipeline_' + intToStatus[p.missionStageStatus]]" @mouseenter="openShow(index)" @mouseleave="closeShow(index)">
              <el-icon v-if="intToStatus[p.missionStageStatus] == 'finished'" style="margin-top: 1px"><Select /></el-icon>
              <el-icon v-if="intToStatus[p.missionStageStatus] == 'defeated'"><CloseBold /></el-icon>
              <el-icon v-if="intToStatus[p.missionStageStatus] == 'processing'"><MoreFilled /></el-icon>
              <el-icon v-if="intToStatus[p.missionStageStatus] == 'not_started'"><DArrowRight /></el-icon>
              <Tip :tags="missionToName[p.missionStageName] + '：' + intToStatus[p.missionStageStatus]"  v-if="pipeShow[index]" style="font-weight: normal"/>
            </div>
            <div class="pipeline_line" v-if="index != pipelineList.length - 1"></div>
          </template>
        </div>
      </div>
      <div class="pkg_title">依赖信息</div>
      <div class="pkg_info">
        <div class="pkg_info_text">
          <div class="pkg_info_icon">
            <Dependency style="height: 16px;width: 16px;"/>
          </div>
          <div style="margin-top: -5px; display: flex">
            <div style="font-weight: bolder;margin: 0 5px">{{pkg.dependency}}</div>
            个直接依赖
          </div>
        </div>
        <div class="pkg_info_text" style="margin-top: 7px">
          <div class="pkg_info_icon">
            <AllDependency style="height: 18px;width: 18px;margin-left: -1px;"/>
          </div>
          <div style="margin-top: -3px;display: flex">
            <div style="font-weight: bolder;margin: 0 5px">{{pkg.allDependency}}</div>
            个全部依赖
          </div>
        </div>
        <div class="pkg_info_text">
          <div class="pkg_info_icon">
            <LineLayout style="height: 21px;width: 21px;margin-left: -2px"/>
          </div>
          <div style="margin-top: -3px;display: flex">
            <div style="font-weight: bolder;margin: 0 5px">{{pkg.layout}}</div>
            层递归
          </div>
        </div>
        <div class="pkg_info_text">
          <div class="pkg_info_icon">
            <Efficiency style="height: 18px;width: 18px;"/>
          </div>
          <div style="margin-top: -3px;display: flex">
            <div style="font-weight: bolder;margin: 0 5px">33.6%</div>
            裁剪率
          </div>
        </div>
      </div>
      <div class="pkg_title">创建于</div>
      <div class="pkg_info" style="border-bottom: none">
        {{formatDate(pkgBasic.missionCreateTime)}}
      </div>
    </div>
  </div>

  <el-dialog
      v-model="deleteShow"
      title=""
      width="500"
  >
    <div style="color: black;font-size: 18px;margin-top: -25px;">是否删除项目 {{route.params['pkgName']}} ？</div>
    <div style="font-size: 12px;color: #737373">一旦删除将永久无法找回</div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="deleteShow = false">取消</el-button>
        <el-button type="primary" @click="deleteMission">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.pkg_box{
  padding: 20px 20px 20px 25px;
  display: flex;
}

.pkg_right{
  margin-left: 20px;
  width: 300px;
  padding: 15px;
}

.pkg_right_fixed{
  position: fixed;
  top: 63px;
  right: 20px;
  margin-left: 20px;
  margin-top: v-bind(right_top + 'px');
  width: 300px;
  padding: 15px;
}

.project_avatar{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  border-radius: 5px;
  background: rgba(191, 191, 195, 0.24);
  color: rgb(58, 56, 63);
  font-size: 26px;
  border: 1px solid rgba(5, 5, 6, 0.08);
}

.project_text{
  margin-top: -5px;
  margin-left: 10px;
  box-sizing: border-box;
  font-weight: bolder;
  font-size: 24px;
  cursor: pointer;
  letter-spacing: 0.8px;
  color: rgb(24, 23, 29);
  width: fit-content;
}

.pkg_title{
  font-size: 14px;
  font-weight: bolder;
  color: var(--font-color);
}

.pkg_info{
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(236, 236, 239);
  font-size: 14px;
  color: var(--font-color);
}

.pkg_info_icon{
  height: 20px;
  width: 20px;
}

.pkg_info_text{
  display: flex;
  align-items: center;
  margin: 6px 0;
  font-weight: normal;
  color:  rgb(58, 56, 63);
  font-size: 14px;
}

.pipeline_basic{
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  font-size: 14px;
  cursor: pointer;
}

.pipeline_finished{
  background: #108548;
  color: white;
  border: 3px solid #c3e6cd;
}

.pipeline_defeated{
  background: #dd2b0e;
  color: white;
  border: 3px solid #fdd4cd;
}

.pipeline_processing{
  background: #1f75cb;
  color: white;
  border: 3px solid #cbe2f9;
}

.pipeline_not_started{
  background: white;
  color: var(--font-color);
  border: 3px solid #dcdcde;
}

.pipeline_line{
  height: 3px;
  width: 15px;
  background: #dcdcde;
}

.project_icon{
  height: 22px;
  width: 22px;
  margin-right: 8px;
}

.project_number{
  background: rgb(236, 236, 239);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  height: 24px;
  font-size: 13px;
  color: rgb(98, 97, 104);
  border-radius: 12px;
  margin-left: 4px;
  margin-top: 1px;
}

.upload_button{
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  color: white;
  font-size: 14px;
  background: #1f75cb;
  cursor: pointer;
  border-radius: 4px;
}

.upload_button:hover{
  background: #1a62a9;
}

.cancel_button{
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

.pkg_show{
  border: 1px solid rgb(220, 220, 222);
  background: white;
  font-size: var(--font-color);
  margin-top: 18px;
  border-radius: 5px;
}

.pkg_show_top{
  height: 30px;
  border-bottom: 1px solid rgb(220, 220, 222);
  background: var(--lowgrey-back);
  border-radius: 5px 5px 0 0;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.pkg_color{
  width: 18px;
  height: 18px;
  border-radius: 9px;
}
</style>