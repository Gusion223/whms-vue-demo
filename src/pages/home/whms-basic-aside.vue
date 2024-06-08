<template>
  <el-scrollbar>
    <el-menu :default-openeds="['1']" :collapse="isCollapse">
      <!-- default-openeds表示默认打开什么 -->
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <home-filled />
          </el-icon>
          <span>主页</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="2">
        <template #title>
          <el-icon><Menu /></el-icon><span>菜单</span>
        </template>
        <el-menu-item index="2-1">选项？</el-menu-item>
      </el-sub-menu>
      
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import {defineProps, toRefs } from 'vue';
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