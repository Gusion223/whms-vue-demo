<template>
    <el-scrollbar style="padding-left: 20px; padding-right: 20px;">
      <div style="display: flex">
        <el-input v-model="input_text" placeholder="请输入要查询的人员名称" style="width: 20%;"/>
      </div>
      
      <el-table  :data="tableData" border style="width:100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="nickName" label="姓名" />
        <el-table-column prop="userName" label="账号" />
<!--        <el-table-column prop="password" label="密码" />-->
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="sex" label="性别">
          <template #default="scope">
              <el-tag :type="scope.row.sex === 0 ? 'success':'primary'" :disable-transitions="true">
                {{scope.row.sex === 0 ? '女':'男'}}
              </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话"/>       
        <el-table-column prop="userType" label="角色">
          <template #default="scope">
              <el-tag :type="scope.row.userType === 0 ? 'warning':'primary'" :disable-transitions="true">
                {{scope.row.userType === 0 ? '超级管理员':'管理员'}}
              </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <div style="display: flex;">
            <el-button size='small' type="success">修改</el-button>
            <el-button size='small' type="danger">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: center; margin-top: 10px;">
        <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[2, 5, 10, 20]"
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
  // import { ref, toRefs, defineProps, defineEmits, watch} from 'vue';
  // const props = defineProps(["tableData", "totalSize"])
  // const emit = defineEmits(["loadNewData"])
  // const currentPage = ref(1)
  // const pageSize = ref(2)
  // const input_text = ref("")
  //
  // const {tableData, totalSize} = toRefs(props)
  // console.log("Message From Body SetUp")
  //
  // // 向父组件发送信息
  // const loadNewData = ()=>{
  //   console.log("emit loadNewData")
  //   if(currentPage.value * (pageSize.value-1) > totalSize.value)
  //     emit("loadNewData", 1, pageSize.value)
  //   else
  //     emit("loadNewData", currentPage.value, pageSize.value)
  // }
  //
  // watch(()=>props.tableData,()=>{
  //   console.log("message from body watch", props.tableData, props.totalSize)
  // })
  import {onMounted, ref} from "vue";
  import {ApiGetUsers} from "@/api/serviceApi";

  const tableData = ref([])
  const totalSize = ref(1)
  const currentPage = ref(1)
  const pageSize = ref(2)
  const input_text = ref("")


  const loadData = async ()=>{
    console.log("Start Loading UserData")
    let index, size;
    if(currentPage.value * (pageSize.value-1) > totalSize.value){
      index = 1
      size = pageSize.value
    }else{
      index = currentPage.value
      size = pageSize.value
    }
    ApiGetUsers(index, size).then((res)=>{
      tableData.value = res.data.data
      totalSize.value = res.data.total
      console.log("Load Data UserData")
    }).catch((error)=>{
      console.log(error)
    })
  }

  onMounted(()=>{
    loadData()
  })
</script>

<style scoped>
.el-button
{
  margin:0
}
</style>