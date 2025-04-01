<script setup lang="ts">

import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import Arrow from "@/components/icon/arrow.vue";
import {useScrollStore} from "@/stores/scroll";
import WrongProcess from "@/pages/pkgBlade/project/[pkgName]/pipeline/components/wrongProcess.vue";
import ChooseProcess from "@/pages/pkgBlade/project/[pkgName]/pipeline/components/chooseProcess.vue";
import {ElMessage} from "element-plus";
import {usePipelineStore} from "@/pages/pkgBlade/project/[pkgName]/pipeline/pipeline";
import {request} from "@/util/request";
import {useRoute} from "vue-router";
import type {pipelineInfo, pipelineStage} from "@/util/interface";

const pipelineInfo = usePipelineStore()
const route = useRoute()
const processTimer = ref(null)

const scroll = useScrollStore()
const fixedWidth = ref(0)
const fixShow = ref(false)
const topDiv = ref()
const scrollRef = ref()
const now_stage = ref("GET_DEPENDENCY")
const now_status = ref(0)
const stages = ref([
  {missionStageName: 'GET_DEPENDENCY', missionStageStatus: 0},
  {missionStageName: 'FILE_CUTTING', missionStageStatus: 3},
  {missionStageName: 'FUNCTION_CUTTING', missionStageStatus: 1},
  {missionStageName: 'GENERATE', missionStageStatus: 1},
] as pipelineStage[])

const intToStatus = ref(['finished', 'not_started', 'failed', 'processing'])
const missionToName = ref({
  GET_DEPENDENCY: "依赖拉取",
  FILE_CUTTING: "文件裁剪",
  FUNCTION_CUTTING: "函数裁剪",
  GENERATE: "依赖生成"
})

const statusTo = ref({
  'finished': '已完成',
  'failed': '已失败',
  'processing': '运行中',
  'not_started': '未开始'
})

const pipeShow = ref([false, false, false, false, false, false])

const pipeline = ref([] as pipelineInfo[]);
const pipelineLock = ref(false)

const show = ref(false)
const wrongShow = computed(()=>{
  return now_stage.value == '软件编译' && show.value
})

const nextShow = ref(false)

const openShow = (index: number) =>{
  pipeShow.value[index] = true
}

const closeShow = (index: number) =>{
  pipeShow.value[index] = false
}

const toTop = () =>{
  scroll.toPosition(0)
  scrollRef.value.scrollTop = 0
}

const toBottom = () =>{
  console.log(scroll.scrollHeight)
  scroll.toPosition(scroll.scrollHeight)
  scrollRef.value.scrollTop = scrollRef.value.scrollHeight
}

const openChoose = () =>{
  if(now_stage.value == 'GET_DEPENDENCY' && now_status.value == 0){
    nextShow.value = true
  }else {
    ElMessage.warning('请等待依赖拉取结束')
  }
}

const closeChoose = () =>{
   nextShow.value = false
}

const changeStage = async (name: string, status: string) =>{
  now_stage.value = name
  now_status.value = status
  pipeline.value.splice(0, pipeline.value.length)
  if(now_stage.value == 'GET_DEPENDENCY'){
    await pipelineInfo.getDependency()
    changeToDependency(pipelineInfo.dependency)
  }else {
    getPipelineStageInfo()
  }
  // if(name == '迭代') {
  //   for (let i = 0;i < stages.value.length; i++){
  //     if(stages.value[i].name == '迭代' && stages.value[i].order == order){
  //       for (let j = 0;j < 4;j++){
  //         stages.value[i + j].show = !stages.value[i + j].show
  //       }
  //     }
  //   }
  // }
}

const changeShow = (index: number) =>{
  pipeline.value[index].show = !pipeline.value[index].show
  for (let i = index + 1; i < pipeline.value.length; i++){
    if(pipeline.value[i].type == 'info')
      break
    pipeline.value[i].show = !pipeline.value[i].show
  }
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
    stages.value = res.data.data
  })
}

const getPipelineStageInfo = () => {
  if(!pipelineLock.value && (pipeline.value.length == 0 || pipeline.value[pipeline.value.length - 1].content != now_stage.value + " is over")) {
    pipelineLock.value = true
    request({
      url: '/pipeline/getPipelineStage',
      method: 'get',
      params: {
        missionName: <string>route.params['pkgName'],
        missionStageName: now_stage.value,
        lineCount: pipeline.value.length + 1
      }
    }).then((res) => {
      for (let i = 0; i < res.data.data.length; i++) {
        pipeline.value.push({content: res.data.data[i].info, type: res.data.data[i].type, show: true})
      }
      pipelineLock.value = false
    })
  }
}

const changeToDependency = (data: string) =>{
  if(data != '' && pipeline.value.length == 0) {
    pipeline.value.splice(0, pipeline.value.length)
    pipeline.value.push({content: "GET_DEPENDENCY start", type: "info", show: true})
    let info = data.split(['\n'])
    const jsonString = info[0].replace(/'/g, '"');
    let nodesJson = JSON.parse(jsonString)
    console.log(nodesJson)
    for (const key in nodesJson) {
      if (nodesJson.hasOwnProperty(key)) { // 确保是对象自身的属性，而非继承的属性
        for (let i = 0; i < nodesJson[key].length; i++) {
          let item = {content: "Dependency layout " + nodesJson[key][i] + ": " + key, type: "", show: true}
          console.log(item)
          pipeline.value.push(item)
        }
      }
    }
    pipeline.value.push({content: "GET_DEPENDENCY is over", type: "info", show: true})
  }
}

watch(()=>scroll.scrollTop, ()=>{
  fixShow.value = scroll.scrollTop >= 140;
})

onMounted(async () => {
  getStage()
  await pipelineInfo.getDependency()
  console.log(pipelineInfo.dependency)
  changeToDependency(pipelineInfo.dependency)
  processTimer.value = setInterval(async ()=>{
    getStage()
    // TODO: 获取流水线信息
    if(now_stage.value == 'FILE_CUTTING'){
      getPipelineStageInfo()
    }else if(now_stage.value == 'FUNCTION_CUTTING'){
      getPipelineStageInfo()
    }else if(now_stage.value == 'GENERATE'){
      getPipelineStageInfo()
    }else {
      await pipelineInfo.getDependency()
      changeToDependency(pipelineInfo.dependency)
    }
  }, 5000)

  scroll.toPosition(0)
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      fixedWidth.value = entry.contentRect.width; // 更新宽度
    }
  });

  if (topDiv.value) {
    resizeObserver.observe(topDiv.value); // 绑定目标元素
  }

  // 在组件销毁时清理资源
  onUnmounted(() => {
    resizeObserver.disconnect();
  });
})

onUnmounted(()=>{
  clearInterval(processTimer.value)
})

</script>

<route lang="yaml">
  meta:
    layout: pkgDetail
</route>

<template>
  <div class="pipeline">
    <div class="pipeline_left">
      <div style="font-weight: bolder;font-size: 22px">
        {{missionToName[now_stage]}}
      </div>
      <div class="status_basic" :class="['status_' + intToStatus[now_status]]" style="margin-top: 10px">
        <div class="pipeline_basic" :class="['pipeline_' + intToStatus[now_status]]">
          <el-icon v-if="now_status == 0" style="margin-top: 1px"><Select /></el-icon>
          <el-icon v-if="now_status == 2"><CloseBold /></el-icon>
          <el-icon v-if="now_status == 3"><MoreFilled /></el-icon>
          <el-icon v-if="now_status == 1"><DArrowRight /></el-icon>
        </div>
        <div style="margin-left: 3px">
          {{statusTo[intToStatus[now_status] as keyof typeof statusTo]}}
        </div>
      </div>
      <div class="pipeline_main">
        <Transition>
          <div class="pipeline_main_top_fixed" v-if="fixShow">
            <div class="pipeline_main_top" style="border: 1px solid rgb(220, 220, 222);border-bottom: none;border-radius: 8px 8px 0 0;">
              <div style="display: flex;flex: 1;justify-content: left;align-items: center">
                <div class="pipeline_top_tip" @click="openChoose" v-if="now_stage == 'GET_DEPENDENCY'" style="display: flex;">
                  <div style="font-weight: bolder;text-decoration: none">Tip：</div>此步骤结束后，需人工选择待处理的对象，随后进入下一步
                </div>
              </div>
              <div class="pipeline_button" @click="toTop">
                <el-icon><Top /></el-icon>
              </div>
              <div class="pipeline_button" @click="toBottom">
                <el-icon><Bottom /></el-icon>
              </div>
            </div>
          </div>
        </Transition>
        <div class="pipeline_main_top" ref="topDiv">
          <div style="display: flex;flex: 1;justify-content: left;cursor: pointer;align-items: center">
            <div class="pipeline_top_tip" @click="openChoose" v-if="now_stage == 'GET_DEPENDENCY'" style="display: flex;">
              <div style="font-weight: bolder;text-decoration: none">Tip：</div>此步骤结束后，需人工选择待处理的对象，随后进入下一步
            </div>
          </div>
          <div class="pipeline_button" @click="toTop">
            <el-icon><Top /></el-icon>
          </div>
          <div class="pipeline_button" @click="toBottom">
            <el-icon><Bottom /></el-icon>
          </div>
        </div>
        <div class="pipeline_core else-family" ref="scrollRef">
            <div>
              <template v-for="(line, index) in pipeline">
                <div class="pipeline_item" v-if="line.show || line.type == 'info'" :class="{pipeline_item_none: line.type != 'info'}" @click="changeShow(index)">
                  <div class="pipeline_item_button" :class="{pipeline_item_button_open: line.show}" v-if="line.type == 'info' && index != pipeline.length - 1">
                    <el-icon><ArrowRightBold /></el-icon>
                  </div>
                  <div class="pipeline_item_button" v-if="line.type != 'info' || index == pipeline.length - 1">
                  </div>
                  <div class="pipeline_item_number">{{index + 1}}</div>
                  <div class="pipeline_item_text" :class="['pipeline_item_text_' + line.type]">
                    {{line.content}}
                  </div>
                </div>
              </template>
            </div>
        </div>
      </div>

      <WrongProcess :show="wrongShow" @close="show = false"/>
      <ChooseProcess :show="nextShow" @close="closeChoose"/>
    </div>
    <div class="pipeline_right">
    </div>
    <div class="pipeline_right" style="position: fixed;right: 20px">
      <div style="height: 150px;">
        <div class="pipeline_right_info">
          <div style="color: var(--font-color);;font-weight: bolder">流水线状态：</div>
          <div>{{statusTo[intToStatus[now_status] as keyof typeof statusTo]}}</div>
        </div>

        <div class="pipeline_right_info" style="margin-top: 10px">
          <div style="color: var(--font-color);;font-weight: bolder">开始时间：</div>
          <div>12月31号</div>
        </div>

        <div class="pipeline_right_info" style="margin-top: 10px">
          <div style="color: var(--font-color);;font-weight: bolder">持续时长：</div>
          <div>2分49秒</div>
        </div>

        <div class="pipeline_top_tip" @click="openChoose" v-if="now_stage == 'GET_DEPENDENCY'" style="margin-top: 10px;display: flex;">
          <div style="font-weight: bolder;text-decoration: none">Tip：</div>此步骤结束后，需人工选择待处理的对象，随后进入下一步
        </div>

        <div style="height: 1px; background: rgb(236, 236, 239);margin: 10px 0 15px"></div>
      </div>
      <div style="font-size: 15px;color: var(--font-color);margin-bottom: 15px;font-weight: bolder">
        流水线阶段
      </div>
      <el-scrollbar style="height: calc(100vh - 300px)">
        <template v-for="(stage, index) in stages">
          <div class="pipeline_stage" :class="{pipeline_stage_active: now_stage == stage.missionStageName}" @click="changeStage(stage.missionStageName, stage.missionStageStatus)">
            <div style="margin-left: 15px"></div>
            <div v-if="now_stage == stage.missionStageName" style="margin-left: 10px">
              <Arrow style="height: 15px;width: 15px;margin-top: 4px"/>
            </div>
            <div v-if="now_stage != stage.missionStageName" style="margin-left: 25px"></div>
            <div class="pipeline_basic" :class="['pipeline_' + intToStatus[stage.missionStageStatus]]" style="margin-left: 25px"  @mouseenter="openShow(index)" @mouseleave="closeShow(index)">
              <el-icon v-if="stage.missionStageStatus == 0" style="margin-top: 1px"><Select /></el-icon>
              <el-icon v-if="stage.missionStageStatus == 2"><CloseBold /></el-icon>
              <el-icon v-if="stage.missionStageStatus == 3"><MoreFilled /></el-icon>
              <el-icon v-if="stage.missionStageStatus == 1"><DArrowRight /></el-icon>
              <Tip :tags="missionToName[stage.missionStageName] + '：' + intToStatus[stage.missionStageStatus]"  v-if="pipeShow[index]" style="font-weight: normal"/>
            </div>
            <div class="pipeline_text">{{missionToName[stage.missionStageName]}}</div>
          </div>
        </template>
      </el-scrollbar>
  </div>

  </div>
</template>

<style scoped>
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active{
  transition: all 0.2s ease;
}

.v-leave-active{
  transition: none;
}

.v-enter-from,
.v-leave-to {
  margin-top: -20px;
}

.pipeline{
  padding: 20px 20px 20px 25px;
  display: flex;
}

.pipeline_left{
  display: flex;
  flex-direction: column;
  flex: 1
}

.pipeline_right{
  margin-left: 20px;
  width: 260px;
  padding: 15px;
}

.pipeline_stage{
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 7px 0;
  cursor: pointer;
}

.pipeline_stage_active{
  font-weight: bolder;
  background: var(--grey-back);
}


.pipeline_stage:hover{
  background: var(--grey-back);
  color: #1f75cb;
}

.pipeline_stage:hover .pipeline_text{
  text-decoration: #1f75cb underline;
}

.pipeline_stage_special{
  pointer-events: none;
}


.pipeline_text{
  margin-left: 10px;
  font-size: 14px;
}

.pipeline_basic{
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  width: 22px;
  height: 22px;
  border-radius: 11px;
  font-size: 11px;
  cursor: pointer;
}

.pipeline_finished{
  background: #108548;
  color: white;
  border: 4px solid #c3e6cd;
}

.pipeline_defeated{
  background: #dd2b0e;
  color: white;
  border: 4px solid #fdd4cd;
}

.pipeline_processing{
  background: #1f75cb;
  color: white;
  border: 4px solid #cbe2f9;
}

.pipeline_not_started{
  background: white;
  color: var(--font-color);
  border: 4px solid #dcdcde;
}

.status_basic{
  position: relative;
  display: flex;
  align-items: center;
  height: 24px;
  border-radius: 13px;
  font-size: 13px;
  cursor: pointer;
  width: fit-content;
  padding-right: 10px;
}

.status_finished{
  background: #c3e6cd;
  color: #108548;
}

.status_defeated{
  background: #fdd4cd;
  color: #dd2b0e;
}

.status_processing{
  background: #cbe2f9;
  color: #1f75cb;
}

.status_not_started{
  background: #dcdcde;
  color: var(--font-color);
}

.pipeline_main{
  margin-top: 15px;
  border: 1px solid rgb(220, 220, 222);
  border-radius: 8px;
}

.pipeline_main_top{
  display: flex;
  align-items: center;
  justify-content: right;
  height: 50px;
  padding: 0 15px;
}

.pipeline_main_top_fixed{
  top: 50px;
  left: 280px;
  position: fixed;
  height: 50px;
  box-sizing: border-box;
  width: v-bind(fixedWidth + 33 + 'px');
  padding: 0 1px;
  background: white;
}

.pipeline_core{
  padding: 8px 12px;
  background: black;
  border-radius: 0 0 8px 8px;
  max-height: 2000px;
  overflow-y: auto;
}

/* Chrome、Safari 和 Opera */
.pipeline_core::-webkit-scrollbar {
  width: 8px; /* 滚动条的宽度 */
}

.pipeline_core::-webkit-scrollbar-track {
  background: transparent; /* 滚动条轨道的背景颜色 */
}

.pipeline_core::-webkit-scrollbar-thumb {
  background: #2b2c2e; /* 滚动条的背景颜色 */
  border-radius: 4px; /* 滚动条的圆角 */
}

.pipeline_core::-webkit-scrollbar-thumb:hover {
  background: #484a4d; /* 滚动条悬停时的背景颜色 */
}

.pipeline_item{
  cursor: pointer;
  display: flex;
  padding: 4px 0;
}

.pipeline_item_none{
  pointer-events: none;
}

.pipeline_item_number{
  width: 30px;
  display: flex;
  justify-content: right;
  color: rgb(98, 97, 104);
  font-size: 13px;
}

.pipeline_item_button{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  font-size: 14px;
  color: white;
  transition: all 0.2s;
}

.pipeline_item_button_open{
  transform: rotate(90deg);
  transition: all 0.5s;
}

.pipeline_item_text{
  margin-left: 15px;
  display: flex;
  flex: 1;
  color: white;
  font-size: 13px;
}

.pipeline_item_text_info{
  color: rgb(0, 189, 189)
}

.pipeline_item_text_command{
  color: rgb(92, 247, 89);
}

.pipeline_item_text_wrong{
  color: rgb(255, 97, 97);
}

.pipeline_item:hover{
  background: #414141;
}

.pipeline_button{
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(191, 191, 195);
  margin-left: 7px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  color: var(--font-color);
}

.pipeline_button:hover{
  background: var(--hover-color);
}

.pipeline_right_info{
  display: flex;
  align-items: center;
  color: rgb(98, 97, 104);
  font-size: 14px;
}

.pipeline_top_tip{
  font-size: 14px;
  cursor: pointer;
  color: var(--font-color)
}

.pipeline_top_tip:hover{
  text-decoration: underline;
}
</style>