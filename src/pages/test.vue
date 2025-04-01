<script lang="ts" setup>
import {onMounted, ref} from 'vue';
const colorList = ref(['#ABABAB', '#99ADD1', '#b37feb', '#7DAAFF', '#5AB8DB', '#5cdbd3', '#95de64', '#d3f261', '#F6903D'])

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
  layout: {
    layoutName: 'tree',
    from: 'left',
    'min_per_width': 300,
    'min_per_height': 100,
  }

};
const showGraph = async () => {
  const __graph_json_data: RGJsonData = {
    rootId: 'wget_0',
    nodes: [
      { id: 'wget_0', data: { name: 'wget', order: 0 } },
      { id: 'libc_1', data: { name: 'libc', order: 1 } },
      { id: 'libcurl_1', data: { name: 'libcurl', order: 1 } },
      { id: 'gcc_2', data: { name: 'gcc', order: 2 } },
      { id: 'openssl_2', data: { name: 'openssl', order: 2 } },
      { id: 'zlib_2', data: { name: 'zlib', order: 2 } },
      { id: 'libssh2_2', data: { name: 'libssh2', order: 2 } },
      { id: 'glibc_3', data: { name: 'glibc', order: 3 } },
      { id: 'libcrypto_3', data: { name: 'libcrypto', order: 3 } },
      { id: 'libssl_3', data: { name: 'libssl', order: 3 } },
      { id: 'libidn_3', data: { name: 'libidn', order: 3 } },
      { id: 'libunistring_3', data: { name: 'libunistring', order: 3 } },
      { id: 'libiconv_3', data: { name: 'libiconv', order: 3 } },
      { id: 'libnghttp2_3', data: { name: 'libnghttp2', order: 3 } },
      { id: 'libstdc++_4', data: { name: 'libstdc++', order: 4 } },
      { id: 'libc_5', data: { name: 'libc', order: 5 } },
      { id: 'libpthread_5', data: { name: 'libpthread', order: 5 } },
      { id: 'libdl_5', data: { name: 'libdl', order: 5 } },
      { id: 'libm_5', data: { name: 'libm', order: 5 } },
      { id: 'librt_5', data: { name: 'librt', order: 5 } }
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
  const graphInstance = graphRef.value!.getInstance();
  await graphInstance.setJsonData(__graph_json_data);
  await graphInstance.moveToCenter();
  await graphInstance.zoomToFit();
};
const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
  console.log('onNodeClick:', nodeObject);
};
const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
  console.log('onLineClick:', lineObject);
};
onMounted(() => {
  showGraph();
});
</script>

<template>
  <div>
    <div style="height:calc(100vh - 60px);">
      <RelationGraph

          ref="graphRef"
          :options="graphOptions"
          :on-node-click="onNodeClick"
          :on-line-click="onLineClick">

        <template #node="{node}">
          <div class="package" :class="['border_' + node.data.order]">
            <div class="package_top" :class="['border_' + node.data.order]">
              {{node.data.order}}
            </div>
            <div class="package_main" :class="['border_' + node.data.order]">
              {{node.data.name}}
            </div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.package{
  cursor: pointer;
}

.package_main{
  border: 2px solid black;
  border-radius: 0 0 2px 2px;
  box-sizing: border-box;
  height: 60px;
  width: 120px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
}

.package_top{
  height: 12px;
  width: 30px;
  border-radius: 2px 6px 0 0;
  border: 2px solid black;
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: black;
  font-weight: bolder;
}

.border_0 {
  color: #ABABAB;
  border-color: #ABABAB;
  pointer-events: none;
}

.border_1 {
  color: #99ADD1;
  border-color: #99ADD1;
}

.border_2 {
  color: #b37feb;
  border-color: #b37feb;
}

.border_3 {
  color: #7DAAFF;
  border-color: #7DAAFF;
}

.border_4 {
  color: #5AB8DB;
  border-color: #5AB8DB;
}

.border_5 {
  color: #5cdbd3;
  border-color: #5cdbd3;
}

.border_6 {
  color: #95de64;
  border-color: #95de64;
}

.border_7 {
  color: #d3f261;
  border-color: #d3f261;
}

.border_8 {
  color: #F6903D;
  border-color: #F6903D;
}
</style>
