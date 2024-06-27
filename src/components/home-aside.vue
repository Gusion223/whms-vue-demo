<template>
  <el-scrollbar>
    <el-menu :default-openeds="[]" :collapse="isCollapse" class="el-menu-vertical-demo"
             :router="true">
      <div v-if="isAdmin()">
        <el-menu-item index="/home/dashboard">
          <el-icon><DataLine /></el-icon>
          <template #title>主控面板</template>
        </el-menu-item>
        <el-menu-item index="/home/userInfo">
          <el-icon><User /></el-icon>
          <template #title>用户管理</template>
        </el-menu-item>
      </div>

      <el-menu-item index="/home/goodInfo" v-if="isAdmin() || isWarehouseManager()">
        <el-icon> <Box /></el-icon>
        <template #title>商品信息管理</template>
      </el-menu-item>
      <el-menu-item index="/home/customerInfo" v-if="isAdmin() || isSaler()">
        <el-icon><UserFilled /></el-icon>
        <template #title>
          顾客信息管理
        </template>
      </el-menu-item>

      <el-sub-menu index=1 v-if="isAdmin() || isWarehouseManager()">
        <template #title>
          <el-icon><House /></el-icon>
          <span>仓库管理</span>
        </template>
        <el-menu-item index="/home/warehouse" >
          <template #title>仓库信息</template>
        </el-menu-item>
        <el-menu-item index="/home/storeRecord">
          <template #title>存储记录</template>
        </el-menu-item>
      </el-sub-menu >
      <el-sub-menu index=2 v-if="isAdmin() || isWarehouseManager()">
        <template #title >
          <el-icon><Suitcase /></el-icon>
          <span>供货商管理</span>
        </template>
        <el-menu-item index="/home/supplierInfo">基本信息管理</el-menu-item>
        <el-menu-item index="/home/s_gInfo">供货信息管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index=3 v-if="isAdmin() || isWarehouseManager()">
        <template #title>
          <el-icon><SoldOut /></el-icon>
          <span>进货管理</span>
        </template>
        <el-menu-item index="/home/addPurchaseOrder">填写进货表单</el-menu-item>
        <el-menu-item index="/home/purchaseOrder">管理进货记录</el-menu-item>
        <el-menu-item index="/home/purchaseDetail">管理进货细则</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index=4 v-if="isAdmin() || isWarehouseManager()">
        <template #title>
          <el-icon><Van /></el-icon>
          <span>转储管理</span>
        </template>
        <el-menu-item index="/home/addTransferOrder">填写转储表单</el-menu-item>
        <el-menu-item index="/home/transferOrder">查看转储记录</el-menu-item>
        <el-menu-item index="/home/transferDetail">查看转储细则</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index=5 v-if="isAdmin()||isSaler()">
        <template #title>
          <el-icon><Sell /></el-icon>
          <span>销售管理</span>
        </template>
        <el-menu-item index="/home/addSaleOrder">填写销售表单</el-menu-item>
        <el-menu-item index="/home/saleOrder">查看销售记录</el-menu-item>
        <el-menu-item index="/home/saleDetail">查看销售细则</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="/home/backupInfo" v-if="isAdmin()">
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
const currentUser = JSON.parse(sessionStorage.getItem("CurrentUser"))


const isAdmin=()=>{
  return currentUser.userType==0
}
const isWarehouseManager=()=>{return currentUser.userType==1}
const isSaler=()=>{return currentUser.userType==2}

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