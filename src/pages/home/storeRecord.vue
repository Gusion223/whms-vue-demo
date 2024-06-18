<template>
    <el-scrollbar style="padding-left: 20px; padding-right: 20px;">

<!--      // 顶部搜索栏-->
      <div class="top-search">
        <el-input v-model="gnameSearch" placeholder="请输入要查询的商品名称"
                  style="width: 20%;" suffix-icon="search" @keyup.enter="loadData"/>
        <el-select v-model="gtypeSearch" placeholder="请选择商品类型"
                   @keyup.enter="loadData" style="width: 20%;">
          <el-option :key="-1" label="请选择商品类型" :value="null"></el-option>
          <el-option v-for="item in gtypeDisplay" :key="item.value" :label="item.text" :value="item.value">
          </el-option>
        </el-select>

        <el-select v-model="widSearch" :key="-1" placeholder="请选择仓库名称"
                   @keyup.enter="loadData" style="width: 20%;">
          <el-option :key="-1" label="请选择仓库名称" :value="null" />
          <el-option v-for="item in warehouses" :key="item.wid" :label="item.wname" :value="item.wid" />
        </el-select>

        <el-button type="primary" style="margin-left: 5px" @click="loadData">查询</el-button>
        <el-button type="warning" style="margin-left: 5px" @click="resetTableData">重置</el-button>
      </div>


<!--      // 表格数据-->
      <el-table  :data="tableData" border style="width:100%">
        <el-table-column prop="wid" label="仓库id" />
        <el-table-column prop="wname" label="仓库名称" />
        <el-table-column prop="gid" label="商品id" min-width="65px"/>
        <el-table-column prop="gname" label="商品名" />
        <el-table-column prop="gunitPrice" label="商品价格" />
        <el-table-column prop="gunit" label="商品单位" />
        <el-table-column prop="gtype" label="类别" />
        <el-table-column prop="sramount" label="商品数量" />

      </el-table>

<!--      // 分页-->
      <div style="display: flex; justify-content: center; margin-top: 10px;">
        <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :small="false"
        :disabled="false"
        :background="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize"
        @size-change="loadData"
        @current-change="loadData"
        />
      </div>
  </el-scrollbar>

</template>

<script setup>
  import {onMounted, ref} from "vue";
  import {ApiGetStoreRecord} from "@/api/storeRecord";
  import {ApiListWarehouse} from "@/api/warehouse";
  // 表格信息
  const tableData = ref([])
  const totalSize = ref(1)
  const currentPage = ref(1)
  const pageSize = ref(5)
  const pageSizes = ref([5, 10, 20])
  const gtypeDisplay=[
    {
      text:"日用品",
      value:"日用品"
    },
    {
      text:"电子产品",
      value:"电子产品"
    },
    {
      text:"食品饮料",
      value:"食品饮料"
    }
  ]

  // 搜索框相关
  const gnameSearch = ref("")
  const gtypeSearch = ref(null)
  const widSearch=ref(null)
  const warehouses = ref([])

  const loadWareHouse = async ()=>{
    try{
      let res = await ApiListWarehouse()
      warehouses.value = res.data.data
    }catch (e){
      console.log(e)
    }
  }

  const loadData = async ()=>{
    console.log("Start Loading UserData")
    console.log(currentPage.value)
    let index, size;
    if((currentPage.value-1)* (pageSize.value) > totalSize.value){
      index = 1
      size = pageSize.value
    }else{
      index = currentPage.value
      size = pageSize.value
    }

    try{
      let res;
      res = await ApiGetStoreRecord(index,size,widSearch.value, gnameSearch.value, gtypeSearch.value)
      console.log(tableData.value)
      tableData.value = res.data.data
      totalSize.value = res.data.total
    }catch (e){
      console.log(e)
    }
  }

  const resetTableData = async ()=>{
    gnameSearch.value=null
    gtypeSearch.value=null
    widSearch.value=null
    await loadData()
  }


  onMounted(()=>{
    loadWareHouse()
    loadData()
  })
</script>

<style scoped>
.top-search{
  display: flex;
  margin-bottom: 5px;
}
:deep(.el-dialog){
  width: 400px;
}
</style>