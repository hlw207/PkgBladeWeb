<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {ElMessage} from "element-plus";
import {request} from "@/util/request";
import {useRoute} from "vue-router";
import type {pipelineStage} from "@/util/interface";

const props = defineProps<{
  show: boolean,
}>()

const emits = defineEmits(['close'])
const route = useRoute()
const stages = ref([] as pipelineStage[])

const clickCancel = ref({name: '', status: 0} as any)
const chooseCancel = ref([] as any[])

const close = () =>{
  emits('close')
}

const graphRef = ref<RelationGraphComponent>();
const graphOptions = {
  debug: false,
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  defaultLineColor: 'rgba(255, 255, 255, 0.6)',
  defaultNodeColor: 'transparent',
  defaultNodeBorderWidth: 0,
  defaultNodeBorderColor: 'transparent',
  defaultNodeFontColor: '#ffffff',
  defaultNodeShape: 1,
  toolBarDirection: 'h',
  toolBarPositionH: 'left',
  toolBarPositionV: 'top',
  defaultlineShape: 4,
  defaultJunctionPoint: 'lr',
  backgroundColor: 'transparent',
  // disableNodeClickEffect: true, // 禁用节点点击效果
  disableDragNode: true,
  disableNodeClickEffect: true,
  layout: {
    layoutName: 'tree',
    from: 'left',
    'min_per_width': 1000,
    'min_per_height': 120,
  }
};

const __graph_json_data: RGJsonData = {
  rootId: 'wget_0',
  nodes: [
    { id: 'wget_0', data: { name: 'wget', order: 0, status: 0} },
    { id: 'libc_1', data: { name: 'libc', order: 1, status: 1} },
    { id: 'libcurl_1', data: { name: 'libcurl', order: 1, status: 1} },
    { id: 'gcc_2', data: { name: 'gcc', order: 2, status: 2} },
    { id: 'openssl_2', data: { name: 'openssl', order: 2, status: 2} },
    { id: 'zlib_2', data: { name: 'zlib', order: 2, status: 2} },
    { id: 'libssh2_2', data: { name: 'libssh2', order: 2, status: 2} },
    { id: 'glibc_3', data: { name: 'glibc', order: 3, status: 3} },
    { id: 'libcrypto_3', data: { name: 'libcrypto', order: 3, status: 3} },
    { id: 'libssl_3', data: { name: 'libssl', order: 3, status: 3} },
    { id: 'libidn_3', data: { name: 'libidn', order: 3, status: 3} },
    { id: 'libunistring_3', data: { name: 'libunistring', order: 3, status: 3} },
    { id: 'libiconv_3', data: { name: 'libiconv', order: 3, status: 3} },
    { id: 'libnghttp2_3', data: { name: 'libnghttp2', order: 3, status: 3} },
    { id: 'libstdc++_4', data: { name: 'libstdc++', order: 4, status: 4} },
    { id: 'libc_5', data: { name: 'libc', order: 5, status: 5} },
    { id: 'libpthread_5', data: { name: 'libpthread', order: 5, status: 5} },
    { id: 'libdl_5', data: { name: 'libdl', order: 5, status: 5} },
    { id: 'libm_5', data: { name: 'libm', order: 5, status: 5}},
    { id: 'librt_5', data: { name: 'librt', order: 5, status: 5} }
  ],
  lines: [
    { from: 'wget_0', to: 'libc_1', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'wget_0', to: 'libcurl_1', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libcurl_1', to: 'gcc_2', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libcurl_1', to: 'openssl_2', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libcurl_1', to: 'zlib_2', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libcurl_1', to: 'libssh2_2', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libc_1', to: 'gcc_2', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'openssl_2', to: 'libssl_3', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'gcc_2', to: 'glibc_3', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'gcc_2', to: 'libcrypto_3', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'gcc_2', to: 'libssl_3', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'gcc_2', to: 'libidn_3', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'gcc_2', to: 'libunistring_3', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'gcc_2', to: 'libiconv_3', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'gcc_2', to: 'libnghttp2_3', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'gcc_2', to: 'librt_3', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'gcc_2', to: 'libpthread_3', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'gcc_2', to: 'libm_3', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'gcc_2', to: 'libdl_3', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libssl_3', to: 'libstdc++_4', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libcrypto_3', to: 'libstdc++_4', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libidn_3', to: 'libstdc++_4', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libunistring_3', to: 'libstdc++_4', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libiconv_3', to: 'libstdc++_4', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libnghttp2_3', to: 'libstdc++_4', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libstdc++_4', to: 'libc_5', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libstdc++_4', to: 'libpthread_5', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libstdc++_4', to: 'libdl_5', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libstdc++_4', to: 'libm_5', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true },
    { from: 'libstdc++_4', to: 'librt_5', text: '依赖', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true }
  ],
  elementLines: [
    // { from: 'a-r2-c2', to: 'b-r1-c1', text: '', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3 },
    // { from: 'a-r2-c2', to: 'b-r2-c1', text: '', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3 },
    // { from: 'a-r3-c2', to: 'b-r3-c1', text: '', lineShape: 4, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
    // { from: 'a-r3-c2', to: 'd-r2-c1', text: '', lineShape: 4, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
    // { from: 'a-r3-c2', to: 'c-r4-c1', text: '', lineShape: 5, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
    // { from: 'b-r1-c3', to: 'c-r1-c1', text: '', lineShape: 4, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
    // { from: 'd-r4-c2', to: 'c-r4-c2', text: '', lineShape: 4, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
    // { from: 'd-r2-c1', to: 'c-r4-c2', text: '', lineShape: 4, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
    // { from: 'd-r2-c1', to: 'b-r4-c3', text: '', lineShape: 4, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
    // { from: 'b-r3-c2', to: 'c-r2-c1', text: '', lineShape: 4, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
    // { from: 'el-1', to: 'el-2', text: 'Line Text', lineShape: 4, color: 'red', lineWidth: 4, showEndArrow: false },
    // { from: 'el-1', to: 'd-1', text: 'Line Text', lineShape: 4, color: 'red', lineWidth: 4, showEndArrow: false },
  ]
};

const showGraph = async () => {
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
  await request({
    url: '/dependency/getPackageDependency',
    method: 'POST',
    params: {
      packageName: <string>route.params['pkgName']
    }
  }).then((res)=>{
    __graph_json_data.rootId = ''
    __graph_json_data.nodes.splice(0, __graph_json_data.nodes.length)
    __graph_json_data.lines.splice(0, __graph_json_data.lines.length)
    let info = res.data.data.split(['\n'])
    const jsonString = info[0].replace(/'/g, '"');
    let nodesJson = JSON.parse(jsonString)
    console.log(nodesJson)
    for (const key in nodesJson) {
      if (nodesJson.hasOwnProperty(key)) { // 确保是对象自身的属性，而非继承的属性
        for (let i = 0; i < nodesJson[key].length; i++) {
          let item = {id: key + '_' + nodesJson[key][i], data: {name: key, order: nodesJson[key][i], status: nodesJson[key][i]}}
          if(item.data.status == 0)
            item.data.status = -1
          console.log(item)
          __graph_json_data.nodes.push(item)
        }
      }
    }
    __graph_json_data.rootId = __graph_json_data.nodes[0].id

    // 替换单引号为双引号，并将元组格式转换为数组格式
    const formattedStr = info[1]
        .replace(/'/g, '"') // 将单引号替换为双引号
        .replace(/\(/g, '[') // 将左括号替换为左方括号
        .replace(/\)/g, ']'); // 将右括号替换为右方括号

    // 使用 JSON.parse 解析为 JavaScript 数组
    const array = JSON.parse(formattedStr);
    for (let i = 0;i < array.length; i++){
      let item = { from: array[i][0][0] + '_' + array[i][0][1], to: array[i][1][0] + '_' + array[i][1][1], text: '', lineShape: 4, color: 'rgba(29,169,245,0.76)', lineWidth: 3, useTextPath: true }
      console.log(item)
      __graph_json_data.lines.push(item)
    }
    console.log(__graph_json_data)
  })

  const graphInstance = graphRef.value!.getInstance();
  await graphInstance.setJsonData(__graph_json_data);
  await graphInstance.moveToCenter();
  await graphInstance.zoomToFit();

  const hash = new Map()
  const _all_nodes = graphInstance.getNodes();
  for (let i = 0;i < _all_nodes.length;i++){
    if(hash.has(_all_nodes[i].data.name)){
      console.log(_all_nodes[i].data.name)
      _all_nodes[i].data.status = hash.get(_all_nodes[i].data.name)
    }else {
      hash.set(_all_nodes[i].data.name, _all_nodes[i].data.status)
    }
  }
  graphInstance.dataUpdated()
  
};

const changeStatus = (name: string, status: number) =>{
  const graphInstance = graphRef.value!.getInstance();
  const _all_nodes = graphInstance.getNodes();
    for (let i = 0;i < _all_nodes.length;i++){
      if(_all_nodes[i].data.name == name){
        _all_nodes[i].data.status = status
      }
    }
    graphInstance.dataUpdated()
}

const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
  if(nodeObject.data.status != 0 && nodeObject.data.status != -1){
    if(clickCancel.value.name != '' && (chooseCancel.value.length == 0 || (chooseCancel.value[0].name != clickCancel.value.name))){
      changeStatus(clickCancel.value.name, clickCancel.value.status)
    }
    clickCancel.value.name = nodeObject.data.name
    clickCancel.value.status = nodeObject.data.status
    changeStatus(clickCancel.value.name, 0)
  }
  console.log('onNodeClick:', nodeObject);
};
const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
  console.log('onLineClick:', lineObject);
};

const addCancel = () =>{
  if(clickCancel.value.name != ''){
    let item = {name: clickCancel.value.name, status: clickCancel.value.status}
    chooseCancel.value.push(item)
    clickCancel.value.status = 0
    clickCancel.value.name = ''
    ElMessage.success('添加成功')
  }else {
    ElMessage.warning('尚未选择')
  }
}

const deleteCancel = (index: number) =>{
  changeStatus(chooseCancel.value[index].name, chooseCancel.value[index].status)
  chooseCancel.value.splice(index, 1)
  ElMessage.success('删除成功')
}

const continueProcess = () =>{
  if(stages.value[1].missionStageStatus == 1){
    let handlePackageList = []
    for (let i = 0;i < chooseCancel.value.length;i++){
      handlePackageList.push(chooseCancel.value[i].name)
    }
    console.log(handlePackageList.toString())
    request({
      url: '/pipeline/startPipeline',
      method: 'post',
      params: {
        missionName: <string>route.params['pkgName'],
        handlePackageName: handlePackageList.toString()
      },
    }).then((res)=>{
      ElMessage.success('成功运行')
      emits('close')
    })
  }else {
    ElMessage.warning('之前已成功上传')
  }
}

watch(()=>props.show, ()=>{
  if(props.show){
    setTimeout(()=>{
      showGraph()
    }, 100)
  }
})
</script>

<template>
  <div class="mask" v-if="props.show"></div>
  <Transition>
    <div v-if="props.show" class="choose">
        <div style="width: 100%;height: 100%">
          <RelationGraph
              ref="graphRef"
              :options="graphOptions"
              :on-node-click="onNodeClick"
              :on-line-click="onLineClick">

            <template #node="{node}">
              <div class="package" :class="['border_' + node.data.status]" style="background: transparent">
                <div class="package_top" :class="['border_' + node.data.status]">
                  {{node.data.order}}
                </div>
                <div class="package_main" :class="['border_' + node.data.status]">
                  {{node.data.name}}
                </div>
              </div>
            </template>
            <template #graph-plug>
              <div class="upload_button" @click="continueProcess">
                选择完毕，进入下一步
              </div>
              <div class="left_tip">
                Tip：点击、选中需要处理的软件包
              </div>
              <div class="left_box">
                <div style="display: flex;align-items: center">
                  当前选中：
                  <div style="width: 100px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-weight: bolder;margin-top: 2px /* 使用省略号代替 */">
                    {{clickCancel.name != '' ? clickCancel.name : '尚未选中'}}
                  </div>
                  <div style="display: flex;flex: 1;justify-content: right;align-items: center">
                    <div class="left_button" @click="addCancel">添加</div>
                  </div>
                </div>
                <div style="display: flex;align-items: center;margin-top: 8px;margin-bottom: 5px">
                  全部选中：
                  <div style="width: 100px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-weight: bolder;margin-top: 2px /* 使用省略号代替 */">
                    {{chooseCancel.length == 0 ? '暂无' : ''}}
                  </div>
                </div>
                <el-scrollbar :max-height="200">
                  <template v-for="(c, index) in chooseCancel">
                    <div class="left_item" style="font-weight: bolder">
                      {{c.name}}-{{c.status}}
                      <div style="display: flex;flex: 1;justify-content: right;margin-right: 15px">
                        <el-icon class="iconStyle" @click="deleteCancel(index)"><Close /></el-icon>
                      </div>
                    </div>
                  </template>
                </el-scrollbar>
              </div>
            </template>
          </RelationGraph>
        </div>
      <div class="close" @click="close">
        <el-icon><Close /></el-icon>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active{
  transition: transform 0.5s ease, opacity 0.5s ease;}

.v-enter-to,
.v-leave-from {
  opacity: 1; /* 完全不透明 */
}

.v-enter-from,
.v-leave-to {
  opacity: 0; /* 从透明开始 */
}

.mask{
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
}

.choose{
  top: 5vh;
  left: 5vw;
  position: fixed;
  width: 90vw;
  height: 90vh;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: white;
  border: 1px solid rgb(191, 191, 195);
  border-radius: 10px;
  z-index: 1000;
}

.close{
  position: absolute;
  right: 15px;
  top: 15px;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
}

.close:hover{
  background: var(--hover-color);
}

.package{
}

.package_main{
  border-radius: 0 0 2px 2px;
  box-sizing: border-box;
  height: 70px;
  width: 150px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  font-size: 19px;
  cursor: pointer;
  transition: all 0.5s;
}

.package_top{
  height: 18px;
  width: 45px;
  border-radius: 2px 9px 0 0;
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
  font-weight: bolder;
  cursor: pointer;
  transition: all 0.5s;
}


.package:hover .package_main{
  background: #fff566;
}

.package:hover .package_top{
  background: #fff566;
}

.border_0 {
  background: #fff566;
  pointer-events: none;
  color: var(--font-color)
}

.border_1 {
  background: #99ADD1;
}

.border_2 {
  background: #b37feb;
}

.border_3 {
  background: #7DAAFF;
}

.border_4 {
  background: #5AB8DB;
}

.border_5 {
  background: #5cdbd3;
}

.border_6 {
  background: #95de64;
}

.border_7 {
  background: #d3f261;
}

.border_8 {
  background: #F6903D;
}

.border_-1{
  background: #ABABAB;
  pointer-events: none;
  cursor: none;
}

.upload_button{
  right: 25px;
  bottom: 25px;
  position: absolute;
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
  z-index: 800;
}

.upload_button:hover{
  background: #1a62a9;
}

.left_tip{
  position: absolute;
  left: 15px;
  top: 70px;
  width: 246px;
  box-sizing: border-box;
  border-radius: 5px;
  color: var(--font-color);
  font-size: 14px;
}

.left_box{
  position: absolute;
  left: 15px;
  bottom: 15px;
  width: 246px;
  background: #f8f8f8;
  border: 1px solid #efefef;
  box-sizing: border-box;
  border-radius: 5px;
  color: var(--font-color);
  padding: 10px;
  font-size: 14px;
  z-index: 80;
}

.left_button{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  border-radius: 13px;
  width: 48px;
  font-size: 12px;
  background: rgb(64, 158, 255);
  color: white;
  cursor: pointer;
}

.left_button:hover{
  background: rgb(121, 187, 255);
}

.left_item{
  height: 32px;
  box-sizing: border-box;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  color: var(--font-color);
  display: flex;
  align-items: center;
}

.iconStyle{
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.left_item:hover{
  background: rgba(168, 171, 178, 0.2);
}

.iconStyle:hover{
  background: var(--hover-color);
}
</style>