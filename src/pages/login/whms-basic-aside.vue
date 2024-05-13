<template>
  <el-scrollbar>
    <el-menu :default-openeds="['1']">
      <!-- default-openeds表示默认打开什么 -->
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <home-filled />
          </el-icon>主页
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
          <el-icon>
            <Menu />
          </el-icon>菜单
        </template>
        <el-menu-item index="2-1">选项？</el-menu-item>
      </el-sub-menu>
      
    </el-menu>
  </el-scrollbar>
</template>

<script setup>


</script>