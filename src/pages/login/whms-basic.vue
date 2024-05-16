<template>
  <div>
    <el-container class="layout-container-demo" style="height: 800px">      
      <el-aside :width="aside_width">
        <WHMSBasicAside :isCollapse="isCollapse"></WHMSBasicAside>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <WHMSasicHeader :isCollapse="isCollapse" @foldHandle="foldHandle"></WHMSasicHeader>
        </el-header>
        <el-main>
          <WHMSBasicBody  v-if="hasLoadTableData"  :tableData="tableData"></WHMSBasicBody>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script setup>

import WHMSasicHeader from './whms-basic-header.vue';
import WHMSBasicAside from './whms-basic-aside.vue';
import WHMSBasicBody  from './whms-basic-body.vue'
import { ref, inject,onMounted, reactive} from 'vue';
const isCollapse = ref(false)
const aside_width = ref("200px")

const $axios = inject("$axios");

let tableData = reactive([])
let hasLoadTableData = ref(false)

const foldHandle = ()=>{
    isCollapse.value = !isCollapse.value
    if(!isCollapse.value){
      aside_width.value = "200px"
    }else{
      aside_width.value = "64px"
    }
    
    console.log(isCollapse.value)
}

const loadDataByGet = async()=>{
    hasLoadTableData.value = false
    $axios.get('http://localhost:8090/user/list').then(res=>{
    console.log("Get User List From localhost:8090/user/list")
    console.log(res.data)
    tableData = res.data
    var i = 0
    for(i=0;i<tableData.length;i++)
      console.log(tableData[i])    
    hasLoadTableData.value = true
  })
}

console.log("message from basic setup")


onMounted(()=>{
  console.log("message from basic OnMounted")
  loadDataByGet()
  // loadDataByPost()
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