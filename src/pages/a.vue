<template>
  <div class="menu">
    <div v-for="item in menuData" :key="item.id" class="menu-item">
      <div @click="toggleSubMenu(item)" style="background: #737373">{{ item.name }}</div>
      <div v-if="item.open" class="sub-menu tree-son-menu">
        <div class="menu-body">
          <!-- 子菜单内容 -->
          <div v-for="subItem in item.children" :key="subItem.id">{{ subItem.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuData: [
        { id: 1, name: '菜单1', children: [{ id: 11, name: '子菜单1' }], open: false },
        // 更多菜单项...
      ]
    };
  },
  methods: {
    toggleSubMenu(item) {
      item.open = !item.open;
    }
  }
};
</script>

<style scoped>
.tree-son-menu .menu-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height .3s;
}
.tree-son-menu.open .menu-body {
  max-height: 600px;
  transition: max-height .5s;
}
</style>