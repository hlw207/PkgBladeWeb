<script setup lang="ts">

import {ref} from "vue";
import Arrow from "@/components/icon/arrow.vue";

const now_stage = ref("依赖拉取")
const now_status = ref('finished')
const stages = ref([
  {name: '依赖拉取', status: 'finished'},
  {name: '依赖裁剪', status: 'processing'},
  {name: '符号分析', status: 'finished'},
  {name: '文件裁剪', status: 'processing'},
  {name: '函数裁剪', status: 'not_started'},
  {name: '依赖生成', status: 'not_started'},
])

const statusTo = ref({
  'finished': '已完成',
  'defeated': '已失败',
  'processing': '运行中',
  'not_started': '未完成'
})

const pipeShow = ref([false, false, false, false, false, false])

const openShow = (index: number) =>{
  pipeShow.value[index] = true
}

const closeShow = (index: number) =>{
  pipeShow.value[index] = false
}

const changeStage = (name: string, status: string) =>{
  now_stage.value = name
  now_status.value = status
  if(now_stage.value == '依赖裁剪') {
    now_stage.value = '符号分析'
    now_status.value = stages.value[2].status
  }
}
</script>

<route lang="yaml">
  meta:
    layout: pkgDetail
</route>

<template>
  <div class="pipeline">
    <div class="pipeline_left">
      <div style="font-weight: bolder;font-size: 22px">
        {{now_stage}}
      </div>
      <div class="status_basic" :class="['status_' + now_status]" style="margin-top: 10px">
        <div class="pipeline_basic" :class="['pipeline_' + now_status]">
          <el-icon v-if="now_status == 'finished'" style="margin-top: 1px"><Select /></el-icon>
          <el-icon v-if="now_status == 'defeated'"><CloseBold /></el-icon>
          <el-icon v-if="now_status == 'processing'"><MoreFilled /></el-icon>
          <el-icon v-if="now_status == 'not_started'"><DArrowRight /></el-icon>
        </div>
        <div style="margin-left: 3px">
          {{statusTo[now_status]}}
        </div>
      </div>
      <div class="pipeline_main">
        <div class="pipeline_main_top"></div>
        <div class="pipeline_core"></div>
      </div>
    </div>
    <div class="pipeline_right">
      <div style="font-size: 15px;color: var(--font-color);margin-bottom: 15px;font-weight: bolder">
        流水线阶段
      </div>
      <template v-for="(stage, index) in stages">
        <div class="pipeline_stage" :class="{pipeline_stage_active: now_stage == stage.name}" @click="changeStage(stage.name, stage.status)">
          <div v-if="stage.name == '符号分析' || stage.name == '文件裁剪' || stage.name == '函数裁剪'" style="margin-left: 35px"></div>
          <div v-if="now_stage == stage.name" style="margin-left: 10px">
            <Arrow style="height: 15px;width: 15px;margin-top: 4px"/>
          </div>
          <div v-if="now_stage != stage.name" style="margin-left: 25px"></div>
          <div class="pipeline_basic" :class="['pipeline_' + stage.status]" style="margin-left: 15px"  @mouseenter="openShow(index)" @mouseleave="closeShow(index)">
            <el-icon v-if="stage.status == 'finished'" style="margin-top: 1px"><Select /></el-icon>
            <el-icon v-if="stage.status == 'defeated'"><CloseBold /></el-icon>
            <el-icon v-if="stage.status == 'processing'"><MoreFilled /></el-icon>
            <el-icon v-if="stage.status == 'not_started'"><DArrowRight /></el-icon>
            <Tip :tags="stage.name + '：' + stage.status"  v-if="pipeShow[index]" style="font-weight: normal"/>
          </div>
          <div class="pipeline_text">{{stage.name}}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
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

.pipeline_stage_special{
  pointer-events: none;
}

.pipeline_stage:hover{
  background: var(--grey-back);
  color: #1f75cb;}

.pipeline_stage:hover .pipeline_text{
  text-decoration: #1f75cb underline;

}


.pipeline_text{
  margin-left: 10px;
  font-size: 13px;
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
}

.pipeline_core{
  height: 1000px;
  background: black;
  border-radius: 0 0 8px 8px;
}
</style>