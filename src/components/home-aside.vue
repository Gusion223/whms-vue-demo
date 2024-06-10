<template>
  <el-scrollbar>
    <el-menu :default-openeds="[]" :collapse="isCollapse">
      <el-menu-item index="1" @click="router.push('/home/dashboard')">
          <el-icon><DataLine /></el-icon>
          <template #title>主控面板</template>
      </el-menu-item>
      <el-menu-item index="2" @click="router.push('/home/userInfo')">
        <el-icon><User /></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>
      <!-- default-openeds表示默认打开什么 -->
<!--      <el-sub-menu index="2">-->
<!--        <template #title>-->
<!--          <el-icon>-->
<!--            <home-filled />-->
<!--          </el-icon>-->
<!--          <span>主页</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="2-1">选项1</el-menu-item>-->
<!--          <el-menu-item index="2-2">选项2</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="2-3">选项3</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-sub-menu>-->

<!--      <el-sub-menu index="3">-->
<!--        <template #title>-->
<!--          <el-icon><Menu /></el-icon><span>菜单</span>-->
<!--        </template>-->
<!--        <el-menu-item index="3-1">选项？</el-menu-item>-->
<!--      </el-sub-menu>-->
      
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import {defineProps, toRefs } from 'vue';
import router from "@/router/router";
const props = defineProps(['isCollapse'])
const {isCollapse} = toRefs(props)


</script>


<style scoped>
.el-menu {
border-right: none;
}

.el-menu--collapse .el-sub-menu__title span{
  display: none;
}
</style>