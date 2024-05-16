<template>
    <el-scrollbar>
      <el-table :data="tableData">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="no" label="账号" />
        <el-table-column prop="password" label="密码" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="phone" label="电话"/>       
        <el-table-column prop="roldId" label="角色" />
      </el-table>
  </el-scrollbar>
</template>

<script setup>
  import { ref, toRefs, defineProps} from 'vue';
  const props = defineProps(["tableData"])
  let tableData = ref([])
  console.log("Message From Body SetUp")
  tableData = toRefs(props).tableData
  console.log(tableData.value)


</script>