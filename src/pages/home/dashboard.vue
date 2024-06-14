<template>
  <div style="margin-left: 10px; margin-right: 10px" >
    <el-row :gutter="20"  class="dashboard-header" >
      <el-col :span="6" >
        <el-card>
          <template #header>
            <div style="display: flex">
              <span class="text-[var(--el-text-color-secondary)]">当前顾客数量</span>
              <span style="flex: 1;"></span>
              <el-icon color="blue"> <avatar></avatar></el-icon>
            </div>
          </template>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-statistic title="当前商品种类" :value="12"></el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="当前总计进货额" :value="12"></el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="当前总计销售额" :value="12"></el-statistic>
      </el-col>

    </el-row>
  </div>
</template>

<style scoped>
.dashboard-header{
  padding:16px 16px 0;
  margin-bottom:32px;
}

.dashboard-header :deep(.el-statistic){
  background-color: white;

}

</style>
<script setup>
import {Icon} from "@iconify/vue";
import {Avatar} from "@element-plus/icons-vue";
</script>