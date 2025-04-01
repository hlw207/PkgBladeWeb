<script setup lang="ts">
const props = defineProps<{
  show: boolean,
  name: string,
}>()

const emits = defineEmits(['close'])

const close = () =>{
  emits('close')
}
</script>

<template>
  <div class="mask" v-if="props.show"></div>
  <Transition>
    <div v-if="props.show" class="compare">
      <div class="close" @click="close">
        <el-icon><Close /></el-icon>
      </div>
      <div style="display: flex;align-items: center; justify-content: space-between; padding: 40px 20px 10px;height: calc(96vh - 80px)">
        <div class="pkg_show">
          <div class="pkg_show_top">

          </div>
        </div>
        <div class="pkg_show">
          <div class="pkg_show_top"></div>
        </div>
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
  transform: scale(1);
}

.v-enter-from,
.v-leave-to {
  opacity: 0; /* 从透明开始 */
  transform: scale(0);
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

.compare{
  top: 2vh;
  left: 2vw;
  position: fixed;
  width: 96vw;
  height: 96vh;
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

.pkg_show{
  width: 48%;
  height: 100%;
  border: 1px solid rgb(220, 220, 222);
  background: white;
  font-size: var(--font-color);
  margin-top: 18px;
  border-radius: 8px;
}

.pkg_show_top{
  height: 40px;
  border-bottom: 1px solid rgb(220, 220, 222);
  background: var(--lowgrey-back);
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
</style>