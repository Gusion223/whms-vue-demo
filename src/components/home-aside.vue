<template>
  <el-scrollbar>
    <el-menu :default-openeds="[]" :collapse="isCollapse" class="el-menu-vertical-demo"
             :router="true">
      <el-menu-item index="/home/dashboard">
          <el-icon><DataLine /></el-icon>
          <template #title>主控面板</template>
      </el-menu-item>
      <el-menu-item index="/home/userInfo">
        <el-icon><User /></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>
      <div></div>
      <el-sub-menu index=2>
        <template #title >
          <el-icon><Suitcase /></el-icon>
          <span>供货商管理</span>
        </template>
        <el-menu-item>基本信息管理</el-menu-item>
        <el-menu-item>供货信息管理</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/home/goodInfo">
        <el-icon> <Box /></el-icon>
        <template #title>商品信息管理</template>
      </el-menu-item>
      <el-menu-item index="/home/customerInfo">
        <el-icon><UserFilled /></el-icon>
        <template #title>
          顾客信息管理
        </template>
      </el-menu-item>
      <el-sub-menu index=3>
        <template #title>
          <el-icon><House /></el-icon>
          <span>进货管理</span>
        </template>
        <el-menu-item>填写进货表单</el-menu-item>
        <el-menu-item>管理进货记录</el-menu-item>
        <el-menu-item>管理进货细则</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index=4>
        <template #title>
          <el-icon><Van /></el-icon>
          <span>转储管理</span>
        </template>
        <el-menu-item>填写转储表单</el-menu-item>
        <el-menu-item>查看转储记录</el-menu-item>
        <el-menu-item>查看转储细则</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index=5>
        <template #title>
          <el-icon><Sell /></el-icon>
          <span>销售管理</span>
        </template>
        <el-menu-item>填写销售表单</el-menu-item>
        <el-menu-item>查看销售记录</el-menu-item>
        <el-menu-item>查看销售细则</el-menu-item>
      </el-sub-menu>
      <el-menu-item>
        <el-icon><Document /></el-icon>
        <template #title>
          <span>进销记录总览</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/home/backupInfo">
        <el-icon><Monitor /></el-icon>
        <template #title>数据库备份管理</template>
      </el-menu-item>
      <el-menu-item @click="logout">
        <el-icon><CloseBold /></el-icon>
        <template #title>
          退出系统
        </template>
      </el-menu-item>

    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import {defineProps, toRefs } from 'vue';
const props = defineProps(['isCollapse'])
const {isCollapse} = toRefs(props)
import router from "@/router/router";
const logout = ()=>{
  sessionStorage.removeItem("CurrentUser");
  router.push("/");
}

</script>


<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}

</style>