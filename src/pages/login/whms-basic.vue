<template>
  <div>
    <el-container class="layout-container-demo" style="height: 800px">      
      <el-aside width="200px">
        <whmsBasicAside></whmsBasicAside>
      </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <WHMSasicHeader></WHMSasicHeader>
      </el-header>
    </el-container>


    </el-container>
  </div>
</template>

<script setup>
import WHMSasicHeader from './whms-basic-header.vue';
import whmsBasicAside from './whms-basic-aside.vue';
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
.layout-container-demo .el-menu {
border-right: none;
}
.layout-container-demo .el-main {
padding: 0;
}
</style>