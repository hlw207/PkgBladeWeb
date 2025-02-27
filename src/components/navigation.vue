<script setup lang="ts">
import {ref} from "vue";
import Tip from "@/components/tip.vue";

const url = ref('../../public/logoPrune.png')

const show = ref([false, false, false, false, false])
const openShow = (index: number) =>{
  show.value[index] = true
}

const closeShow = (index: number) =>{
  show.value[index] = false
}
</script>

<template>
  <div class="navigation">
    <div class="navigation_top">
      <div class="page_up" @mouseenter="openShow(0)" @mouseleave="closeShow(0)">
        <img :src="url" style="width: 32px">
        <div style="margin-left: 1px">
          <div style="font-size: 13.5px;color: var(--font-color);font-weight: 540">剪剪减</div>
          <div style="font-size: 10px;color: var(--font-color);font-weight: 520">PkgBlade</div>
        </div>
        <Tip tags="主页" v-if="show[0]"/>
      </div>
      <div style="display: flex;flex: 1;justify-content: right">
        <div class="avatar"  @mouseenter="openShow(4)" @mouseleave="closeShow(4)">
          <div class="avatar_main">
            <el-icon><User /></el-icon>
          </div>
          <Tip tags="我的主页" v-if="show[4]"/>
        </div>
      </div>
    </div>
    <div style="display: flex;justify-content: space-between;margin-top: 10px">
      <div class="item_box" @mouseenter="openShow(1)" @mouseleave="closeShow(1)">
        <el-icon><FolderAdd />
        </el-icon>
        <Tip tags="添加包" v-if="show[1]"/>
      </div>
      <div class="item_box" @mouseenter="openShow(2)" @mouseleave="closeShow(2)">
        <el-icon><Memo />
        </el-icon>
        <Tip tags="档案库" v-if="show[2]"/>
      </div>
      <div class="item_box" @mouseenter="openShow(3)" @mouseleave="closeShow(3)">
        <el-icon><Link /></el-icon>
        <Tip tags="共享链接" v-if="show[3]"/>
      </div>

    </div>
  </div>
</template>

<style scoped>
.navigation{
  background: var(--grey-back);
  padding: 12px 7px;
}

.navigation_top{
  display: flex;
}

.page_up{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 5px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
}

.page_up:hover{
  background: var(--hover-color);
}

.avatar{
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 4px;
  cursor: pointer;
}

.avatar:hover{
  background: var(--hover-color);
}

.avatar_main{
  box-sizing: border-box;
  border-radius: 14px;
  width: 28px;
  height: 28px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  color: var(--font-color);
}

.item_box{
  position: relative;
  box-sizing: border-box;
  width: 77px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background: white;
  cursor: pointer;
  margin-bottom: 3px;
}

.item_box:hover{
  background: var(--hover-color);
  border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>