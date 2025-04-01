<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import router from "@/router";

const route = useRoute()

const guide = ref([
  "/project", "/document", "/community", "/help", "/home"
])

const guidePathList = ref(["pkgBlade", "project"])

const pathToName = ref({
  "pkgBlade": "主页",
  "project": "软件包",
  "document": "档案",
  "community": "共享社区",
  "help": "帮助文档",
  "addPkg": "添加软件包",
  "home": "个人主页"
})

const guideChoice = ref('/project')

const router_to = (path: string) =>{
  router.push("/pkgBlade" + path)
}

const routerIndex = (index: number) =>{
  if(index != guidePathList.value.length - 1){
    let path = ''
    for(let i = 0; i <= index; i++){
      path += '/' + guidePathList.value[i]
    }
    router.push(path)
  }
}

watch(route, ()=>{
  guideChoice.value = route.path.replace('/pkgBlade', '')
  guidePathList.value = route.path.split("/")
  if(guidePathList.value[0] == '')
    guidePathList.value.splice(0, 1)
})

onMounted(()=>{
  guideChoice.value = route.path.replace('/pkgBlade', '')
  guidePathList.value = route.path.split("/")
  if(guidePathList.value[0] == '')
    guidePathList.value.splice(0, 1)
})
</script>


<template>
  <div class="pkg_main">
    <div class="pkg_left">
      <Navigation />
      <div style="font-size: 14px;font-weight: bolder;padding: 10px 12px;color: var(--font-color)">
        你的工具
      </div>
      <div style="margin-top: 2px;padding: 0 5px">
        <div class="pkg_item" :class="{pkg_item_active_back: guideChoice == guide[0]}" @click="router_to(guide[0])">
          <div class="pkg_item_active" v-if="guideChoice == guide[0]"></div>
          <el-icon style="font-size: 20px"><FolderOpened /></el-icon>
          <div style="margin-left: 12px;margin-top: -2px">项目</div>
        </div>
        <div class="pkg_item" :class="{pkg_item_active_back: guideChoice == guide[1]}" @click="router_to(guide[1])">
          <div class="pkg_item_active" v-if="guideChoice == guide[1]"></div>
          <el-icon style="font-size: 20px"><Memo /></el-icon>
          <div style="margin-left: 12px;margin-top: -2px">档案</div>
        </div>
        <div class="pkg_item" :class="{pkg_item_active_back: guideChoice == guide[2]}" @click="router_to(guide[2])">
          <div class="pkg_item_active" v-if="guideChoice == guide[2]"></div>
          <el-icon style="font-size: 20px"><Link /></el-icon>
          <div style="margin-left: 12px;margin-top: -2px">共享社区</div>
        </div>
        <div class="pkg_item" :class="{pkg_item_active_back: guideChoice == guide[3]}" @click="router_to(guide[3])">
          <div class="pkg_item_active" v-if="guideChoice == guide[3]"></div>
          <el-icon style="font-size: 20px"><Help /></el-icon>
          <div style="margin-left: 12px;margin-top: -2px">帮助文档</div>
        </div>
      </div>
    </div>
    <div class="pkg_right">
      <el-scrollbar style="height: 100vh;width: 100%">
        <div class="pkg_top">
          <template v-for="(path, index) in guidePathList">
            <div class="pkg_top_text" :class="{pkg_top_text_active: index == guidePathList.length - 1}" @click="routerIndex(index)">{{pathToName[path as keyof typeof pathToName]}}</div>
            <div v-if="index != guidePathList.length - 1" style="margin: 0 8px">/</div>
          </template>
        </div>
        <div style="padding-top: 50px; width: 100%">
          <router-view />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped>
.pkg_main{
  display: flex;
  width: 100vw;
  height: 100vh;
  background: white;
}

.pkg_left{
  width: 255px;
  max-width: 20vw;
  border-right: 1px solid var(--spilit-color);
  background: var(--lowgrey-back);
}

.pkg_right{
  display: flex;
  flex: 1;
  flex-direction: column;
}

.pkg_item{
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 5px;
  font-size: 14px;
  font-weight: normal;
  padding: 6px 12px;
  margin-bottom: 2px;
  color: var(--font-color);
  letter-spacing: 1px;
  cursor: pointer;
}

.pkg_item:hover{
  background: var(--hover-color);
}

.pkg_item_active{
  position: absolute;
  left: 3px;
  top: 4px;
  background: #1f75cb;
  width: 3px;
  height: calc(100% - 8px);
  border-radius: 1.5px;
}

.pkg_item_active_back{
  background: var(--hover-color);
}

.pkg_top{
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid var(--spilit-color);
  display: flex;
  align-items: center;
  padding: 0 25px;
  font-size: 12px;
  color: var(--font-color);
  background: white;
  z-index: 999;
}

.pkg_top_text{
  height: 18px;
  padding: 1px 0;
  box-sizing: border-box;
  cursor: pointer;
}

.pkg_top_text:hover{
  border-bottom: 1px solid var(--font-color);
}

.pkg_top_text_active{
  font-weight: bolder;
  pointer-events: none;
}
</style>