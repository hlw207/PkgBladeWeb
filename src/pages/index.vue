<script setup lang="ts">
import {onMounted} from "vue";
import router from "@/router";

onMounted(()=>{
  router.push('/pkgBlade/project')
})
</script>


<template>
  123
  <div class="pkg_main">
    123
  </div>
</template>

<style scoped>
.pkg_main{
  display: flex;
  width: 100vw;
  height: 100vh;
  background: black;
}
</style>