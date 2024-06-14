<template>
  <div style="margin-left: 10px; margin-right: 10px" >
    <el-row :gutter="20"  class="dashboard-row" >
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

    <el-row :gutter="20" class="dashboard-row">
      <el-col :span="18" >
        <el-card>
          <template #header>
            <div class="flex-parent">
              <span style="color: #a2a2a2;">进货销售折线图</span>
            </div>
          </template>
          <line-chart :id="'saleChart'" height="400px" width="100%"
                      :labels="lineChartLabels" :data="lineChartData"
                      :range="lineChartRange" :catalog="lineChartCatalog"></line-chart>
        </el-card>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<style scoped>
.dashboard-row{
  padding:16px 16px 0;
  //margin-bottom:12px;
}
.flex-parent{
  display: flex;
}

</style>
<script setup>
  import {Avatar} from "@element-plus/icons-vue";
  import LineChart from "@/components/line-chart.vue";
  import {ref} from "vue";
  const lineChartCatalog = ref(["收入", "毛利润", "收入增长率", "利润增长率"])
  const lineChartLabels = ref(["温州", "杭州", "宁波", "台州", "丽水"])
  const lineChartData = ref([
    [1000, 2000, 3000, 4000, 5000],
    [8000, 8200, 8400, 8600, 8800],
    [60, 65, 70, 75, 80],
    [70, 75, 80, 85, 90]
  ])
  const lineChartRange = ref([[0, 10000], [0, 100]])
</script>
