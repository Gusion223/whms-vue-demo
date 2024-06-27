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
            <span>{{customerNum}}</span>
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
            <span>{{goodNum}}</span>
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
            <span>{{totalCost}}</span>
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
            <span>{{totalSale}}</span>
            <span style="flex: 1"></span>
            <el-icon color="#e26060"><WalletFilled /></el-icon>
          </div>

        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="dashboard-row">
      <el-col :span="24" >
        <el-card>
          <template #header>
            <div class="flex-parent">
              <span style="color: #a2a2a2;">进货销售折线图</span>
            </div>
          </template>
          <line-chart :id="'saleChart'" height="400px" width="100%"
                      :labels="lineChartLabels" :data="lineChartData"
                      :range="lineChartRange" :catalog="lineChartCatalog"
                      v-if="loadDate"></line-chart>
        </el-card>
      </el-col>
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
  import {onMounted, ref, toRaw} from "vue";
  import {ApiGetCustomer} from "@/api/coustomer";
  import {ApiGetGood} from "@/api/good";
  import {ApiGetDayPurchaseSale, ApiGetTotalCostSale} from "@/api/user";
  const lineChartCatalog = ref(["进货额", "销售额"])
  const lineChartLabels = ref(["温州", "杭州", "宁波", "台州", "丽水"])
  const lineChartData = ref([
    [1000, 2000, 3000, 4000, 5000],
    [8000, 8200, 8400, 8600, 8800]
  ])
  const loadDate = ref(false)
  const lineChartRange = ref([[0, 10000], [0, 10000]])
  const customerNum = ref(0)
  const goodNum = ref(0)
  const totalCost = ref(0)
  const totalSale = ref(0)

  const loadLineData = async ()=>{
    let res = await ApiGetDayPurchaseSale()
    let data = res.data.data;
    lineChartData.value[0] = []
    lineChartData.value[1] = []
    lineChartLabels.value = []
    let maxNum=0
    for(let i=0; i < 7 ; i++){
      lineChartData.value[0].push(data[i].dayCost)
      lineChartData.value[1].push(data[i].daySale)
      lineChartLabels.value.push(data[i].date)
      maxNum = data[i].daySale > maxNum ? data[i].daySale : maxNum;
      maxNum = data[i].dayCost > maxNum ? data[i].dayCost : maxNum;
    }
    console.log(lineChartLabels.value, lineChartData.value)
    lineChartRange.value = [[0, maxNum]]
    loadDate.value=true
  }

  onMounted( async ()=>{
    let res;
    res = await ApiGetCustomer()
    customerNum.value = res.data.total
    res = await ApiGetGood()
    goodNum.value = res.data.total
    res = await ApiGetTotalCostSale()
    totalCost.value=res.data.data.totalCost
    totalSale.value= res.data.data.totalSale
    await loadLineData()
  })

</script>
