<script setup lang="ts">

import router from "@/router";
import {onMounted, ref} from "vue";
import Efficiency from "@/components/icon/efficiency.vue";

const pkgTotal = ref(13)
const pkgPage = ref(1)
const pkgList = ref([
  {name: "gyj_package", describe: 'gyj测试package，项目进度遥遥领先', type: '源码', status: 'processing', dependency: 8, degree: 0.315},
  {name: "gyj_package1", describe: 'gyj测试package，项目进度遥遥领先', type: '源码', status: 'finished', dependency: 11, degree: 0.442},
  {name: "gyj_package2", describe: 'gyj测试package，项目进度遥遥领先', type: '可执行文件', status: 'defeated', dependency: 3, degree: 0.124},
  {name: "gyj_package3", describe: 'gyj测试package，项目进度遥遥领先', type: '源码', status: 'finished', dependency: 2, degree: 0.093},
])
const size = ref(10)
const sizeList = ref([5, 10, 20, 50])

const show = ref([] as boolean[])
const openShow = (index: number, line: number) =>{
  show.value[line * 3 + index] = true
}

const closeShow = (index: number, line: number) =>{
  show.value[line * 3 + index] = false
}

const goProject = (name: string) =>{
  router.push('/pkgBlade/project/' + name)
}

onMounted(()=>{
  for (let i = 0; i < pkgList.value.length; i++){
    show.value.splice(0,0, false, false, false)
  }
})
</script>

<route lang="yaml">
  meta:
    layout: pkgMain
</route>

<template>
  <div class="project">
    <div class="project_top">
      <div class="project_title">
        软件包
      </div>
      <div style="display: flex;flex: 1;justify-content: right;align-items: center;">
        <div class="project_button" @click="router.push('/pkgBlade/addPkg')">
          添加软件包
        </div>
      </div>
    </div>
    <div class="project_middle">
      <div class="project_info">
        您的
        <div class="project_number">
          <div style="margin-top: -1px">13</div>
        </div>
      </div>
      <div style="display: flex;flex: 1;justify-content: right;align-items: center;">
        <el-pagination
            v-model:current-page="pkgPage"
            :page-size="size"
            :size="size"
            layout="prev, pager, next"
            :total="pkgTotal"
        />
      </div>
    </div>
    <div class="project_search">
      <div class="search">
        <div class="search_left">
          <el-icon style="font-size: 17px;margin-right: 3px"><Clock /></el-icon>
          <div>添加时间</div>
        </div>
        <div style="display: flex;align-items: center;flex: 1;margin-left: 8px">
          <input class="search_input" placeholder="搜索或筛选结果..."/>
        </div>
        <div class="search_right">
          <el-icon><Search /></el-icon>
        </div>
      </div>

      <el-select v-model="size" placeholder="Select" style="width: 120px;height: 32px">
        <el-option
            v-for="s in sizeList"
            :label="s + '个/页'"
            :value="s"
        />
      </el-select>
    </div>
    <div style="margin-top: 3px">
      <template v-for="(pkg,index) in pkgList" >
        <div class="project_item">
          <div class="project_avatar">
            {{pkg.name.substring(0, 1).toUpperCase()}}
          </div>
          <div style="margin-left: 20px;display: flex;flex: 1;flex-direction: column">
            <div style="display: flex;align-items: center">
              <div class="project_text" @click="goProject(pkg.name)">{{pkg.name}}</div>
              <Exe v-if="pkg.type == '可执行文件'" class="project_icon"/>
              <Source v-if="pkg.type == '源码'" class="project_icon"/>
              <div class="project_number" style="margin-left: 0">
                <div>{{pkg.type}}</div>
              </div>
            </div>
            <div class="project_describe">{{pkg.describe}}</div>
          </div>
          <div style="display: flex;flex: 1;justify-content: right;align-items: center">
            <div style="display: flex;flex-direction: column;align-items: flex-end;">
              <div style="display: flex;align-items: center;margin-bottom: 3px">
                <div class="pipeline_basic" :class="['pipeline_' + pkg.status]"  @mouseenter="openShow(0, index)" @mouseleave="closeShow(0, index)">
                  <el-icon v-if="pkg.status == 'finished'" style="margin-top: 1px"><Select /></el-icon>
                  <el-icon v-if="pkg.status == 'defeated'"><CloseBold /></el-icon>
                  <el-icon v-if="pkg.status == 'processing'"><MoreFilled /></el-icon>
                  <Tip :tags="'流水线：' + pkg.status"  v-if="show[3 * index]" style="font-weight: normal"/>
                </div>
                <div class="project_show" @mouseenter="openShow(1, index)" @mouseleave="closeShow(1, index)" style="width: 55px;justify-content: right">
                  <Dependency class="project_icon" style="height: 15px;width: 15px;color: rgb(98, 97, 104)"/>
                  <div class="project_show_text" style="width: 16px">{{pkg.dependency}}</div>
                  <Tip tags="依赖数" v-if="show[3 * index + 1]"/>
                </div>
                <div class="project_show" @mouseenter="openShow(2, index)" @mouseleave="closeShow(2, index)" style="width: 70px;justify-content: right">
                  <Efficiency class="project_icon" style="height: 15px;width: 15px;color: rgb(98, 97, 104)"/>
                  <div class="project_show_text" style="width: 38px">{{pkg.degree * 100}}%</div>
                  <Tip tags="裁剪度" v-if="show[3 * index + 2]"/>
                </div>
              </div>
              <div class="project_describe" style="width: fit-content">
                创建于 {{new Date().getMonth()}}/{{new Date().getDate()}}
              </div>
            </div>
          </div>
        </div>
        <div style="height: 1px;background: rgb(236, 236, 239)" v-if="pkgList.length - 1 != index"></div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.project{
  padding: 15px 25px 30px;
}

.project_top{
  display: flex;
  align-items: center;
}

.project_title{
  font-weight: bolder;
  color: var(--font-color);
  font-size: 30px;
}

.project_button{
  font-size: 14px;
  display: flex;
  padding: 7px 12px;
  color: white;
  background: #1f75cb;
  border-radius: 5px;
  cursor: pointer;
}

.project_middle{
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.project_info{
  display: flex;
  align-items: center;
  padding: 12px 14px 12px;
  box-sizing: border-box;
  font-size: 15px;
  font-weight: bolder;
  color: var(--font-color);
  border-bottom: 2px solid #1f75cb;
}


.project_number{
  background: rgb(236, 236, 239);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  height: 20px;
  font-size: 12px;
  color: rgb(98, 97, 104);
  border-radius: 10px;
  margin-left: 4px;
  margin-top: 1px;
}

.project_search{
  background: var(--lowgrey-back);
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search{
  display: flex;
  flex: 1;
  border: 1px solid var(--font-color);
  height: 34px;
  border-radius: 5px;
  background: white;
  margin-right: 12px;
}

.search_left{
  padding: 0 10px;
  display: flex;
  font-size: 14px;
  align-items: center;
  color: var(--font-color);
  border-right: 1px solid var(--font-color);
}

.search_input{
  margin-top: 1px;
  border: none;        /* 重置input */
  box-shadow:none;
  background: none;
  outline: none;
  height: 26px;
  width: calc(100% - 16px);
}

.search_input::placeholder{
  font-size: 14px;
}

.search_right{
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid var(--font-color);
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.search_right:hover{
  background: var(--hover-color);
}

.project_item{
  padding: 12px 0;
  display: flex;
  align-items: center;
  color: var(--font-color);
  font-size: 14px;
  width: 100%;
}

.project_avatar{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  border-radius: 5px;
  background: #e8f2fc;
  color: #0b4787;
  font-size: 30px;
  border: 1px solid #dee5ed;
}

.project_text{
  box-sizing: border-box;
  height: 20px;
  font-weight: bolder;
  font-size: 14px;
  cursor: pointer;
  width: fit-content;
}

.project_text:hover{
  border-bottom: 1px solid var(--font-color);
}

.project_describe{
  margin-top: 4px;
  font-size: 13px;
  font-weight: normal;
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 使用省略号代替 */
  color: rgb(98, 97, 104);
}

.project_icon{
  height: 18px;
  width: 18px;
  margin: 0 12px;
}

.project_show{
  position: relative;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--font-color);
  cursor: pointer;
}

.project_show_text{
  display: flex;
  justify-content: center;
  margin-top: -2px;
  margin-left: -5px;
  height: 18px;
  box-sizing: border-box;
}

.project_show:hover .project_show_text{
  border-bottom: 1px solid var(--font-color);
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
</style>