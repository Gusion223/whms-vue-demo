<template>
  <div>
    <el-container class="layout-container-demo" style="height: 800px">      
      <el-aside :width="aside_width">
        <whmsBasicAside :isCollapse="isCollapse"></whmsBasicAside>
      </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <WHMSasicHeader :isCollapse="isCollapse" @foldHandle="foldHandle"></WHMSasicHeader>
      </el-header>
    </el-container>


    </el-container>
  </div>
</template>

<script setup>

import WHMSasicHeader from './whms-basic-header.vue';
import whmsBasicAside from './whms-basic-aside.vue';
import { ref } from 'vue';
const isCollapse = ref(false)
const aside_width = ref("200px")

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
.layout-container-demo .el-header {
position: relative;
/* background-color: var(--el-color-primary-light-7); */
/* color: var(--el-text-color-primary); */
}
.layout-container-demo .el-aside {
color: var(--el-text-color-primary);
background: var(--el-color-primary-light-8);
text-align: left;
}

.layout-container-demo .el-main {
padding: 0;
}

</style>