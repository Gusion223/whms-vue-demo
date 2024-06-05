<template>
  <div>
    <el-container class="layout-container-demo" style="height: 800px">      
      <el-aside :width="aside_width">
        <WHMSBasicAside :isCollapse="isCollapse"></WHMSBasicAside>
      </el-aside>

      <el-container>
        <el-header style="font-size: 12px">
          <WHMSasicHeader :isCollapse="isCollapse" @foldHandle="foldHandle"></WHMSasicHeader>
        </el-header>
        <el-main>
          <WHMSBasicBody
          :tableData="tableData" 
          :totalSize="totalSize"
          @loadNewData="loadDataByPost"></WHMSBasicBody>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>

import WHMSasicHeader from './whms-basic-header.vue';
import WHMSBasicAside from './whms-basic-aside.vue';
import WHMSBasicBody  from './whms-basic-body.vue'
import { ref, inject, onMounted} from 'vue';
const isCollapse = ref(false)
const aside_width = ref("200px")

const $axios = inject("$axios");

let tableData = ref([])
let hasLoadTableData = ref(false)
let totalSize = ref(0)

const foldHandle = ()=>{
    isCollapse.value = !isCollapse.value
    if(!isCollapse.value){
      aside_width.value = "200px"
    }else{
      aside_width.value = "64px"
    }
    
    console.log(isCollapse.value)
}

const loadDataByPost = async(currentPage=1, pageSize=2)=>{
  hasLoadTableData.value = false
  $axios.post('/user/pageC', {
    "pageSize":pageSize,
    "pageIndex":currentPage
  }).then((res)=>{
    let res_obj = res.data
    if(res_obj.code=="200"){
      console.log("Get Data From PageC Interface", res_obj.data) 
      tableData.value = res_obj.data
      totalSize.value = res_obj.total
    }else{
      alert("访问数据库信息失败")
    }
    hasLoadTableData.value = true
  }).catch((error)=>{
    console.log(error.message)
  })

}

console.log("message from basic setup")


onMounted(()=>{
  console.log("message from basic OnMounted")
  // loadDataByGet()
  loadDataByPost()
})



</script>

<style scoped>
.layout-container-demo .el-header {
position: relative;
/* background-color: var(--el-color-primary-light-7); */
/* color: var(--el-text-color-primary); */
}
.layout-container-demo .el-aside {
color: var(--el-text-color-primary);
background: var(--el-color-primary-light-8);
text-align: left;
}

.layout-container-demo .el-main {
padding: 0;
}

</style>