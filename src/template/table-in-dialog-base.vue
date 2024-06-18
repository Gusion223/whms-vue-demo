<template>
  <div>
    <el-button @click="dialogVisble=true">打开对话框</el-button>
    <el-dialog v-model="dialogVisble">
      <el-table :data="tabelData" border max-height="400px">
        <el-table-column type="index" label="编号" width="55px"></el-table-column>
        <el-table-column label="title" prop="title"></el-table-column>
        <el-table-column label="name" prop="name"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup>

  import {ref} from "vue";
  const dialogVisble=ref(false)
  const tabelData = ref([
    {title:"123", name:"此处为名称"},
    {title:"123", name:"此处为名称"},
    {title:"123", name:"此处为名称"},
    {title:"123", name:"此处为名称"},
    {title:"123", name:"此处为名称"},
    {title:"123", name:"此处为名称"},
    {title:"123", name:"此处为名称"},
    {title:"123", name:"此处为名称"},
    {title:"123", name:"此处为名称"},
    {title:"123", name:"此处为名称"},
    {title:"123", name:"此处为名称"}
  ])

</script>