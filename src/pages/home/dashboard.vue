<template>
  <div style="margin-left: 10px; margin-right: 10px" >
    <el-row :gutter="20"  class="dashboard-header" >
      <el-col :span="6" >
        <el-card>
          <template #header>
            <div class="flex-parent">
              <span style="color: #a2a2a2;">当前顾客数量</span>
            </div>
          </template>
          <div class="flex-parent">
            <span>2000</span>
            <span style="flex: 1"></span>
            <el-icon color="blue"> <avatar></avatar></el-icon>
          </div>

        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="flex-parent">
              <span style="color: #a2a2a2;">当前商品种类</span>
            </div>
          </template>
          <div class="flex-parent">
            <span>2000</span>
            <span style="flex: 1"></span>
            <el-icon color="#e1bf14"><GoodsFilled /></el-icon>
          </div>

        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="flex-parent">
              <span style="color: #a2a2a2;">当前总进货额</span>
            </div>
          </template>
          <div class="flex-parent">
            <span>2000</span>
            <span style="flex: 1"></span>
            <el-icon color="#df942a"><HomeFilled /></el-icon>
          </div>

        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="flex-parent">
              <span style="color: #a2a2a2;">当前总销售额</span>
            </div>
          </template>
          <div class="flex-parent">
            <span>2000</span>
            <span style="flex: 1"></span>
            <el-icon color="#e26060"><WalletFilled /></el-icon>
          </div>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.dashboard-header{
  padding:16px 16px 0;
  margin-bottom:32px;
}
.flex-parent{
  display: flex;
}

</style>
<script setup>
import {Avatar} from "@element-plus/icons-vue";
</script>
