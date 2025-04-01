<script setup lang="ts">
const props = defineProps<{
  tags: string,
}>()
</script>

<template>
  <div class="tip">
    <div class="tip_triangle"></div>
    <div class="tip_main">{{tags}}</div>
  </div>
</template>

<style scoped>
.tip{
  z-index: 999;
  position: absolute;
  bottom: -38px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tip_triangle{
  width: 0;
  height: 0;
  border-bottom: 4px solid transparent; /* 改变大小 */
  border-top: 4px solid transparent; /* 改变大小 */
  border-left: 5px solid transparent; /* 改变大小 */
  border-right: 5px solid transparent; /* 改变大小 */
  border-bottom-color: var(--font-color); /* 改变颜色 */
}

.tip_main{
  white-space: nowrap;
  background: var(--font-color);
  width: fit-content;
  height: 32px;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 12px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>