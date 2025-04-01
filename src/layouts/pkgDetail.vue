<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {throttle} from "lodash";
import router from "@/router";
import {useScrollStore} from "@/stores/scroll";

const route = useRoute()
const scrollRef = ref(null)
const scroll = useScrollStore()

const guide = ref([
  "", "/pipeline", "/dependency"
])

const guidePathList = ref([])

const pathToName = ref({
  "pkgBlade": "主页",
  "project": "软件包",
  "document": "档案",
  "community": "共享社区",
  "help": "帮助文档",
  "addPkg": "添加软件包",
  "pipeline": "流水线",
  "dependency": "依赖"
})

const nodes = ref([
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
  { id: 'librt_5', data: { TrimRate: '100%', DeletedFiles: 19, DeletedFunctions: 36 } },
  { id: 'libnghttp2_3', data: { TrimRate: '70%', DeletedFiles: 13, DeletedFunctions: 24 } },
  { id: 'libstdc++_4', data: { TrimRate: '75%', DeletedFiles: 14, DeletedFunctions: 26 } },
  { id: 'libc_5', data: { TrimRate: '80%', DeletedFiles: 15, DeletedFunctions: 28 } },
  { id: 'libpthread_5', data: { TrimRate: '85%', DeletedFiles: 16, DeletedFunctions: 30 } },
  { id: 'libdl_5', data: { TrimRate: '90%', DeletedFiles: 17, DeletedFunctions: 32 } },
  { id: 'libm_5', data: { TrimRate: '95%', DeletedFiles: 18, DeletedFunctions: 34 } },
  { id: 'librt_5', data: { TrimRate: '100%', DeletedFiles: 19, DeletedFunctions: 36 } },
]);

const guideChoice = ref('')
const dependencyOpen = ref(false)

const router_to = (path: string) =>{
  if(path == '/dependency')
    dependencyOpen.value = !dependencyOpen.value
  if(path == '/dependency' || path == '' || path == "/pipeline")
    router.push("/pkgBlade/project/" + route.params['pkgName'] + path)
  else
    router.push("/pkgBlade/project/" + route.params['pkgName'] + '/dependency/' + path)
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

const scrollHandle = () =>{
  scroll.scrollTop = scrollRef.value?.wrapRef.scrollTop
  scroll.scrollHeight = scrollRef.value?.wrapRef.scrollHeight
}

const throttleScroll = throttle(scrollHandle, 50)


watch(route, ()=>{
  guideChoice.value = route.path.replace('/pkgBlade/project/' + route.params['pkgName'], '')
  if(guideChoice.value.startsWith('/dependency/') && guideChoice.value.length > 11)
    guideChoice.value = guideChoice.value.replace('/dependency/', '')
  guidePathList.value = route.path.split("/")
  if(guidePathList.value[0] == '')
    guidePathList.value.splice(0, 1)
})

watch(()=>scroll.scrollPosition,()=>{
  scrollRef.value.scrollTo({
    top: scroll.position,
    behavior: "smooth"
  })
})

onMounted(()=>{
  guideChoice.value = route.path.replace('/pkgBlade/project/' + route.params['pkgName'], '')
  if(guideChoice.value.startsWith('/dependency/') && guideChoice.value.length > 11) {
    guideChoice.value = guideChoice.value.replace('/dependency/', '')
    dependencyOpen.value = true
  }
  guidePathList.value = route.path.split("/")
  if(guidePathList.value[0] == '')
    guidePathList.value.splice(0, 1)
  if(guidePathList.value[guidePathList.value.length - 1] == '')
    guidePathList.value.pop()
  scroll.scrollHeight = scrollRef.value?.wrapRef.scrollHeight
})
</script>


<template>
  <div class="pkg_main">
    <div class="pkg_left">
      <Navigation />
      <div style="font-size: 14px;font-weight: bolder;padding: 10px 12px;color: var(--font-color)">
        软件包
      </div>
      <div style="margin-top: 2px;padding: 0 5px">
        <div class="pkg_item" :class="{pkg_item_active_back: guideChoice == guide[0]}" @click="router_to(guide[0])">
          <div class="pkg_item_active" v-if="guideChoice == guide[0]"></div>
          <el-icon style="font-size: 20px"><FolderOpened /></el-icon>
          <div style="margin-left: 12px;margin-top: -2px">控制台</div>
        </div>
        <div class="pkg_item" :class="{pkg_item_active_back: guideChoice == guide[1]}" @click="router_to(guide[1])">
          <div class="pkg_item_active" v-if="guideChoice == guide[1]"></div>
          <el-icon style="font-size: 20px"><Memo /></el-icon>
          <div style="margin-left: 12px;margin-top: -2px">流水线</div>
        </div>
        <div class="pkg_item" :class="{pkg_item_active_back: guideChoice == guide[2]}" @click="router_to(guide[2])">
          <div class="pkg_item_active" v-if="guideChoice == guide[2]"></div>
          <el-icon style="font-size: 20px"><Link /></el-icon>
          <div style="margin-left: 12px;margin-top: -2px">相关依赖</div>
          <div style="display: flex;flex: 1;justify-content: right">
            <el-icon class="pkg_arrow" :class="{pkg_arrow_active: dependencyOpen}"><ArrowRight /></el-icon>
          </div>
        </div>
        <Transition>
          <el-scrollbar v-if="dependencyOpen" :max-height="590">
            <template v-for="node in nodes">
              <div class="pkg_item" :class="{pkg_item_active_back: guideChoice == node.id}" @click="router_to(node.id)">
                <div style="margin-left: 32px;margin-top: -2px">{{node.id}}</div>
              </div>
            </template>
          </el-scrollbar>
        </Transition>
      </div>
    </div>
    <div class="pkg_right">
      <el-scrollbar style="height: 100vh;width: 100%" ref="scrollRef" @scroll="throttleScroll">
        <div class="pkg_top">
          <template v-for="(path, index) in guidePathList">
            <div class="pkg_top_text" :class="{pkg_top_text_active: index == guidePathList.length - 1}" @click="routerIndex(index)">
              {{pathToName[path as keyof typeof pathToName] || path}}
            </div>
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
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active{
  transition: transform 0.5s ease, opacity 0.5s ease, height 0.5s ease;}

.v-enter-to,
.v-leave-from {
  height: 600px;
  opacity: 1; /* 完全不透明 */
}

.v-enter-from,
.v-leave-to {
  height: 0;
  opacity: 0; /* 从透明开始 */
}

.pkg_main{
  display: flex;
  width: 100vw;
  height: 100vh;
  background: white;
}

.pkg_left{
  width: 255px;
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

.pkg_arrow{
  transition: all 0.5s;
}

.pkg_arrow_active{
  transform: rotate(90deg);
  transition: all 0.5s;
}
</style>