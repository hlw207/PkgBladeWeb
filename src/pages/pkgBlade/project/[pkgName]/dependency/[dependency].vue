<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import CPlus from "@/components/icon/cPlus.vue";
import Compare from "@/pages/pkgBlade/project/[pkgName]/dependency/components/compare.vue";

const route = useRoute()
const dependencyName = ref('')
const now_status = ref("finished")
const show = ref(false)

const statusTo = ref({
  'finished': '已完成裁剪',
  'failed': '裁剪已失败',
  'processing': '正在裁剪中',
  'not_started': '裁剪未开始'
})

const path = ref('/')

const documentList = ref([
  { type: "folder", name: "src", info: 5 },
  { type: "folder", name: "include", info: 3 },
  { type: "folder", name: "lib", info: 2 },
  { type: "folder", name: "test", info: 4 },
  { type: "folder", name: "docs", info: 1 },
  { type: "folder", name: "bin", info: 3 },
  { type: "folder", name: "assets", info: 2 },
  { type: "folder", name: "scripts", info: 1 },
  { type: "file", name: "utils.cpp", info: "未裁剪" },
  { type: "file", name: "logger.c", info: "未裁剪" },
  { type: "file", name: "network.cpp", info: "未裁剪" },
  { type: "file", name: "process.cpp", info: "未裁剪" },
  { type: "file", name: "data.c", info: "未裁剪" },
  { type: "file", name: "graphics.cpp", info: "未裁剪" },
  { type: "file", name: "script1.c", info: "未裁剪" },
  { type: "file", name: "main.c", info: "已裁剪" },
  { type: "file", name: "core.hpp", info: "已裁剪" },
  { type: "file", name: "types.h", info: "已裁剪" },
  { type: "file", name: "parser.hpp", info: "已裁剪" },
  { type: "file", name: "output.c", info: "已裁剪" },
  { type: "file", name: "module.hpp", info: "已裁剪" },
  { type: "file", name: "theme.hpp", info: "已裁剪" },
  { type: "file", name: "script4.hpp", info: "已裁剪" },
  { type: "file", name: "config.h", info: "已删减" },
  { type: "file", name: "settings.h", info: "已删减" },
  { type: "file", name: "style.h", info: "已删减" },
  { type: "file", name: "readme.c", info: "已删减" },
  { type: "file", name: "example.cpp", info: "已删减" },
  { type: "file", name: "header.h", info: "已删减" },
  { type: "file", name: "template.hpp", info: "已删减" },
  { type: "file", name: "script2.cpp", info: "已删减" },
  { type: "file", name: "script3.h", info: "已删减" }
]);

watch(route, ()=>{
  dependencyName.value = route.path.replace('/pkgBlade/project/' + route.params['pkgName'] + '/dependency/', '')
})

onMounted(()=>{
  dependencyName.value = route.path.replace('/pkgBlade/project/' + route.params['pkgName'] + '/dependency/', '')
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
        {{ dependencyName }}
      </div>

      <div style="display: flex;align-items: center">
        <div class="status_basic" :class="['status_' + now_status]" style="margin-top: 10px">
          <div class="pipeline_basic" :class="['pipeline_' + now_status]">
            <el-icon v-if="now_status == 'finished'" style="margin-top: 1px"><Select /></el-icon>
            <el-icon v-if="now_status == 'defeated'"><CloseBold /></el-icon>
            <el-icon v-if="now_status == 'not_started'"><DArrowRight /></el-icon>
          </div>
          <div style="margin-left: 3px">
            {{statusTo[now_status as keyof typeof statusTo]}}
          </div>
        </div>
      </div>

      <div class="pkg_show">
        <div class="pkg_show_top" style="height: 45px">
          <div style="font-size: 15px;font-weight: bolder">
            当前路径：{{path}}
          </div>
          <div style="display: flex;flex: 1;justify-content: right">
            <div style="font-size: 15px;font-weight: bolder">裁剪信息</div>
          </div>
        </div>
        <div>
          <template v-for="(document, index) in documentList">
            <div class="dependency_item" :class="{dependency_item_active: index == documentList.length - 1}" @click="show = true">
              <div class="document">
                <div class="document_icon">
                  <CPlus class="document_icon" v-if="document.name.endsWith('.cpp')"/>
                  <C class="document_icon" v-if="document.name.endsWith('.c')"/>
                  <H class="document_icon" v-if="document.name.endsWith('.h') || document.name.endsWith('.hpp')"/>
                  <Folder class="document_icon" v-if="document.type == 'folder'"/>
                </div>
                <div :class="{deleted: document.info == '已删减', resize: document.info == '已裁剪'}">
                  {{document.name}}
                </div>
              </div>
              <div style="display: flex;flex: 1;justify-content: right">
                <div class="document_info" :class="{deleted: document.info == '已删减', resize: document.info == '已裁剪', folder: document.type == 'folder'}">
                  {{document.info}}
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="dependency_right"></div>
    <div class="dependency_right" style="position: fixed;right: 20px">
      <div style="font-size: 15px;color: var(--font-color);margin-bottom: 15px;font-weight: bolder">
        裁剪数据
      </div>
      <el-scrollbar :height="700">
        <div class="pipeline_right_info">
          <div style="color: var(--font-color);;font-weight: bolder">裁剪率：</div>
          <div>50%</div>
        </div>

        <div class="pipeline_right_info" style="margin-top: 10px">
          <div style="color: var(--font-color);;font-weight: bolder">裁剪文件数：</div>
          <div>12个</div>
        </div>

        <div class="pipeline_right_info" style="margin-top: 10px">
          <div style="color: var(--font-color);;font-weight: bolder">裁剪函数数：</div>
          <div>24个</div>
        </div>
      </el-scrollbar>
    </div>
  </div>

  <Compare :show="show" name="123" @close="show=false"/>
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
  width: 250px;
  padding: 15px;
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

.dependency_item{
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 42px;
  border-bottom: 1px solid rgb(220, 220, 222);
  color: var(--font-color);
  cursor: pointer;
  padding: 0 15px;
}

.dependency_item_active{
  border-radius: 0 0 5px 5px;;
}

.dependency_item:hover{
  border: 1px solid rgb(31, 117, 203);
  border-left: 1.5px solid rgb(31, 117, 203);
  border-right: 1.5px solid rgb(31, 117, 203);
}

.dependency_item:hover .document{
  text-decoration: underline;
}

.document{
  display: flex;
  align-items: center;
  color: var(--font-color);
  font-size: 14px;
}

.document_icon{
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
}

.document_info{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #737373;
  font-size: 13px;
}

.deleted{
  color: #dd2b0e;
  text-decoration: line-through;
}

.resize{
  color: #3f72ac;
}

.folder{
  color: var(--font-color);
}

.pipeline_right_info{
  display: flex;
  align-items: center;
  color: rgb(98, 97, 104);
  font-size: 14px;
}
</style>