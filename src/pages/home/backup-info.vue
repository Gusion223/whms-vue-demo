<template>
  <el-scrollbar style="padding-left: 20px; padding-right: 20px;">
    <div class="top-search">
      <el-date-picker v-model="dateSearch" placeholder="选择日期查询相关备份信息"
                      value-format="YYYY-MM-DD"></el-date-picker>
      <el-button type="primary" style="margin-left: 5px" @click="loadData">查询</el-button>
      <el-button type="warning" style="margin-left: 5px" @click="resetTableData">重置</el-button>
      <el-button type="success" style="margin-left: 5px" @click="openAddForm">增加备份</el-button>
    </div>

    <div>
      <el-dialog title="添加新的备份" v-model="addFormVisible">
        <el-form :model="addForm" :rules="formRules" ref="addFormRef">
          <el-form-item prop="bdesc" :label-width="addFormLabelWidth" label="备份描述">
            <el-input type="textarea" v-model="addForm.bdesc"></el-input>
          </el-form-item>
          <el-button type="info" @click="addFormVisible=false">取消</el-button>
          <el-button type="primary" @click="tryAdd">添加的数据库备份</el-button>
        </el-form>
      </el-dialog>
    </div>

    <el-table  :data="tableData" border style="width:100%" v-loading="tableLoading">
      <el-table-column prop="bid" label="ID" width="60px" />
      <el-table-column label="创建用户">
        <template #default="scope">
          {{scope.row.id==null ? "为止用户" : scope.row.userName}}
        </template>
      </el-table-column>
      <el-table-column prop="btime" label="创建时间" />
      <el-table-column prop="bdesc" label="备份描述" />
      <el-table-column prop="operate" label="操作">
        <template #default="scope">
          <div style="display: flex;">
            <el-button size='small' type="warning" @click="tryRollback(scope.row)">回滚</el-button>
            <el-button size='small' type="danger"
                       @click="tryDelete(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

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
import {ElMessage} from "element-plus";
import {ApiCreateBackup, ApiDeleteBackup, ApiGetBackupInfo, ApiRollbackBackup} from "@/api/backup";
  // top-search
  const dateSearch = ref("")
  const resetTableData = async ()=>{
    dateSearch.value = ""
    await loadData()
  }
  // 获取用户信息
  const currentUser = JSON.parse(sessionStorage.getItem("CurrentUser"))

  const formDefaultValue = {
    bid:-1,
    id:-1,
    autoCreate:"N",
    btime:"1999-01-01 12:00:00",
    bdesc:"这个备份暂无相关描述",
    bfilepath:"",
    btype:0,
    userName:""
  }
  const formRules = ref({
    bdesc:[{required:true, message:"备份的描述不可为空", trigger:"blur"},{min:0, max:50, message:"备份描述请控制在1-50字之间", trigger:"blur"}]
  })

  // 添加表单
  const addFormVisible = ref(false)
  const addForm = ref(JSON.parse(JSON.stringify(formDefaultValue)))
  const addFormRef = ref(null)
  const addFormLabelWidth=ref("6em")
  const openAddForm = ()=>{
    console.log("打开添加表单")
    addForm.value = JSON.parse(JSON.stringify(formDefaultValue))
    addFormVisible.value=true
  }
  const tryAdd = async ()=>{
    console.log("尝试提交添加表单")
    try{
      let passValidate = await addFormRef.value.validate()
      if(!passValidate){
        return
      }
      // api处理
      let res = await ApiCreateBackup(currentUser.id, addForm.value.bdesc);
      if(res.data.status!==200){
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      // 关闭窗口
      addFormVisible.value=false
      ElMessage({message:res.data.msg, type:"success"})
      await loadData()
    }catch(e){
      console.log(e)
    }
  }

  // 表格信息
  const tableLoading = ref(false)
  const tableData = ref([])
  const totalSize = ref(1)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const pageSizes = ref([5, 10, 20])

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
      let date = dateSearch.value
      res = await ApiGetBackupInfo(index, size, date)
      tableData.value = res.data.data
      totalSize.value = res.data.total
    }catch (e){
      console.log(e)
    }
  }

  const tryRollback = async (old_data)=>{
    try {
      tableLoading.value=true
      let res = await ApiRollbackBackup(old_data.bid, old_data.bfilepath)
      if (res.data.status !== 200)
        ElMessage({message: res.data.msg, type: "warning"})
      else{
        ElMessage({message: res.data.msg, type: "success"})
        await loadData()
      }
      tableLoading.value=false
    } catch (e) {
      ElMessage({message: e.message, type: "warning"})
      tableLoading.value=false
    }
  }

const tryDelete = async (old_data) => {
  try {
    let res = await ApiDeleteBackup(old_data.bid, old_data.bfilepath)
    if (res.data.status !== 200)
      ElMessage({message: res.data.msg, type: "warning"})
    else{
      ElMessage({message: res.data.msg, type: "success"})
      await loadData()
    }
  } catch (e) {
    ElMessage({message: e.message, type: "warning"})
  }
}


onMounted(()=>{
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