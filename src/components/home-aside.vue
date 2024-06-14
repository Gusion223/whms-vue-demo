<template>
  <el-scrollbar>
    <el-menu :default-openeds="[]" :collapse="isCollapse" class="el-menu-vertical-demo">
      <el-menu-item index="1" @click="router.push('/home/dashboard')">
          <el-icon><DataLine /></el-icon>
          <template #title>主控面板</template>
      </el-menu-item>
      <el-menu-item index="2" @click="router.push('/home/userInfo')">
        <el-icon><User /></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>

    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import {defineProps, toRefs } from 'vue';
import router from "@/router/router";
const props = defineProps(['isCollapse'])
const {isCollapse} = toRefs(props)


</script>


<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
</style>