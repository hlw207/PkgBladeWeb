<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {request} from "@/util/request";
import {useRoute} from "vue-router";

const route = useRoute()

const nodes = [
  { id: 'wget_0', data: { TrimRate: '0%', DeletedFiles: 0, DeletedFunctions: 0 } },
  { id: 'libc_1', data: { TrimRate: '10%', DeletedFiles: 1, DeletedFunctions: 1 } },
  { id: 'libcurl_1', data: { TrimRate: '15%', DeletedFiles: 2, DeletedFunctions: 3 } },
  { id: 'gcc_2', data: { TrimRate: '20%', DeletedFiles: 3, DeletedFunctions: 5 } },
  { id: 'openssl_2', data: { TrimRate: '25%', DeletedFiles: 4, DeletedFunctions: 7 } },
  { id: 'zlib_2', data: { TrimRate: '30%', DeletedFiles: 5, DeletedFunctions: 9 } },
  { id: 'libssh2_2', data: { TrimRate: '35%', DeletedFiles: 6, DeletedFunctions: 10 } },
  { id: 'glibc_3', data: { TrimRate: '40%', DeletedFiles: 7, DeletedFunctions: 12 } },
  { id: 'libcrypto_3', data: { TrimRate: '45%', DeletedFiles: 8, DeletedFunctions: 14 } },
  { id: 'libssl_3', data: { TrimRate: '50%', DeletedFiles: 9, DeletedFunctions: 16 } },
  { id: 'libidn_3', data: { TrimRate: '55%', DeletedFiles: 10, DeletedFunctions: 18 } },
  { id: 'libunistring_3', data: { TrimRate: '60%', DeletedFiles: 11, DeletedFunctions: 20 } },
  { id: 'libiconv_3', data: { TrimRate: '65%', DeletedFiles: 12, DeletedFunctions: 22 } },
  { id: 'libnghttp2_3', data: { TrimRate: '70%', DeletedFiles: 13, DeletedFunctions: 24 } },
  { id: 'libstdc++_4', data: { TrimRate: '75%', DeletedFiles: 14, DeletedFunctions: 26 } },
  { id: 'libc_5', data: { TrimRate: '80%', DeletedFiles: 15, DeletedFunctions: 28 } },
  { id: 'libpthread_5', data: { TrimRate: '85%', DeletedFiles: 16, DeletedFunctions: 30 } },
  { id: 'libdl_5', data: { TrimRate: '90%', DeletedFiles: 17, DeletedFunctions: 32 } },
  { id: 'libm_5', data: { TrimRate: '95%', DeletedFiles: 18, DeletedFunctions: 34 } },
  { id: 'librt_5', data: { TrimRate: '100%', DeletedFiles: 19, DeletedFunctions: 36 } }
];

const choose = ref('glibc_3')

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
    'min_per_width': 300,
    'min_per_height': 100,
  }
};

const __graph_json_data: RGJsonData = {
  rootId: 'wget_0',
  nodes: [
  ],
  lines: [
  ],
  elementLines: [
  ]
};

const showGraph = async () => {

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


const now_pkg = computed(()=>{
  for (let i = 0;i < nodes.length;i++){
    if(nodes[i].id == choose.value)
      return nodes[i]
  }
  return nodes[0]
})

onMounted(()=>{
  showGraph()
})
</script>

<route lang="yaml">
  meta:
    layout: pkgDetail
</route>

<template>
  <div class="dependency">
    <div class="dependency_left">
      <div style="font-weight: bolder;font-size: 22px">
        软件包依赖
      </div>
      <div class="pkg_show">
        <div class="pkg_show_top" style="height: 45px">
          <div style="font-size: 15px;font-weight: bolder">依赖包数据</div>
          <div style="display: flex;flex: 1;justify-content: right">
            <el-select v-model="choose" placeholder="Select" style="width: 180px;">
              <el-option
                  v-for="node in nodes"
                  :key="node.id"
                  :label="node.id"
                  :value="node.id"
              />
            </el-select>
          </div>
        </div>
        <div class="pkg_show_main" style="padding: 25px 80px">
          <el-progress type="dashboard" :percentage="Number(now_pkg.data.TrimRate.substring(0, now_pkg.data.TrimRate.length - 1))" status="success">
            <template #default="{ percentage }">
              <div style="font-weight: bolder">裁剪率</div>
              <div style="font-weight: bolder;margin-top: 10px;font-size: 14px">{{ percentage }}%</div>
            </template>
          </el-progress>
          <el-progress type="dashboard" :percentage="Number(now_pkg.data.TrimRate.substring(0, now_pkg.data.TrimRate.length - 1))" color="#8c8c8c">
            <template #default="{ percentage }">
              <div style="font-weight: bolder;color: #8c8c8c">总文件数</div>
              <div style="font-weight: bolder;margin-top: 10px;font-size: 14px;color: #8c8c8c">108</div>
            </template>
          </el-progress>
          <el-progress type="dashboard" :percentage="100" status="warning">
            <div style="font-weight: bolder">裁剪文件数</div>
            <div style="font-weight: bolder;margin-top: 10px;font-size: 14px">{{ now_pkg.data.DeletedFiles }}</div>
          </el-progress>
          <el-progress type="dashboard" :percentage="100">
            <template #default="{ percentage }">
              <div style="font-weight: bolder">裁剪函数数</div>
              <div style="font-weight: bolder;margin-top: 10px;font-size: 14px">{{ now_pkg.data.DeletedFunctions }}</div>
            </template>
          </el-progress>
        </div>
      </div>

      <div class="pkg_show">
        <div class="pkg_show_top" style="height: 45px">
          <div style="font-size: 15px;font-weight: bolder">依赖包图示</div>
          <div style="display: flex;flex: 1;justify-content: right">
          </div>
        </div>
        <div class="pkg_show_main" style="height: 700px">
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
          </RelationGraph>
        </div>
      </div>
    </div>

    <div class="dependency_right"></div>
    <div class="dependency_right" style="position: fixed;right: 20px">
      <div style="font-size: 15px;color: var(--font-color);margin-bottom: 15px;font-weight: bolder">
        涉及依赖包
      </div>
      <el-scrollbar :height="700">
        <template v-for="node in nodes">
          <div class="dependency_package">
            {{node.id}}
            <div style="display: flex;flex: 1;justify-content: right;align-items: center">
              <div style="font-size: 13px;color: #737373">{{node.data.TrimRate}}</div>
            </div>
          </div>
        </template>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped>
.dependency{
  padding: 20px 20px 20px 25px;
  display: flex;
}

.dependency_left{
  display: flex;
  flex-direction: column;
  flex: 1
}

.dependency_right{
  margin-left: 20px;
  width: 240px;
  padding: 15px;
}

.dependency_package{
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 7px 10px;
  cursor: pointer;
}

.dependency_package:hover{
  background: var(--grey-back);
  color: #1f75cb;
}

.pkg_show{
  border: 1px solid rgb(220, 220, 222);
  background: white;
  font-size: var(--font-color);
  margin-top: 18px;
  border-radius: 5px;
}

.pkg_show_top{
  height: 40px;
  border-bottom: 1px solid rgb(220, 220, 222);
  background: var(--lowgrey-back);
  border-radius: 5px 5px 0 0;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.pkg_show_main{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.package{
}

.package_main{
  border-radius: 0 0 2px 2px;
  box-sizing: border-box;
  height: 60px;
  width: 120px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.5s;
}

.package_top{
  height: 16px;
  width: 40px;
  border-radius: 2px 8px 0 0;
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: white;
  font-weight: bolder;
  cursor: pointer;
  transition: all 0.5s;
}


.package:hover .package_main{
  background: #F6903D;
}

.package:hover .package_top{
  background: #F6903D;
}

.border_0 {
  background: #ABABAB;
  pointer-events: none;
  cursor: none;
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
</style>
