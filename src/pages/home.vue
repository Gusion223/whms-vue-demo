<template>
  <div>
    <el-container class="layout-container-demo">
      <el-aside :width="aside_width" >
        <HomeAside :isCollapse="isCollapse"></HomeAside>
      </el-aside>

      <el-container>
        <el-header style="font-size: 12px">
          <HomeBody :isCollapse="isCollapse" @foldHandle="foldHandle"></HomeBody>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>

import HomeBody from '../components/home-header.vue';
import HomeAside from '../components/home-aside.vue';
import { ref} from 'vue';

const isCollapse = ref(true)
const aside_width = ref("64px")
const foldHandle = ()=>{
    isCollapse.value = !isCollapse.value
    if(!isCollapse.value){
      aside_width.value = "200px"
    }else{
      aside_width.value = "64px"
    }
    
    console.log(isCollapse.value)
}

</script>

<style scoped>
.layout-container-demo{
  height: 100vh;
  position: relative;
}


.layout-container-demo el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  text-align: left;
}

.layout-container-demo el-main {
  padding: 0;
}

</style>