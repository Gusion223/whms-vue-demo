<template>
    <el-scrollbar style="padding-left: 20px; padding-right: 20px;">

<!--      // 顶部搜索栏-->
      <div class="top-search">
        <el-input-number v-model="nameSearch" placeholder="请输入要查询的转储记录id" :precision="0" :controls="false"
                  style="width: 20%;" suffix-icon="search" @keyup.enter="loadData"/>

        <el-button type="primary" style="margin-left: 5px" @click="loadData">查询</el-button>
        <el-button type="warning" style="margin-left: 5px" @click="resetTableData">重置</el-button>
        <el-button type="success" style="margin-left: 5px" @click="openAddForm">转储记录总则登记</el-button>
      </div>

<!--      // 添加信息的表单-->
      <div>
        <el-dialog title="添加新转储记录" v-model="addFormVisible">
          <el-form :model="addForm" :rules="formRules" ref="addFormRef">
            <el-form-item prop="id" :label-width="addFormLabelWidth" label="操作员id">
              <el-input v-model="addForm.id"></el-input>
            </el-form-item>
            <el-form-item prop="nickName" :label-width="addFormLabelWidth" label="操作员名称">
              <el-input v-model="addForm.id"></el-input>
            </el-form-item>
            <el-form-item prop="widPrev" :label-width="addFormLabelWidth" label="转储前仓库id">
              <el-input v-model="addForm.widPrev"></el-input>
            </el-form-item>
            <el-form-item prop="wnamePrev" :label-width="addFormLabelWidth" label="转储前仓库名称">
              <el-input v-model="addForm.wnamePrev"></el-input>
            </el-form-item>
            <el-form-item prop="widCur" :label-width="addFormLabelWidth" label="转储后仓库id">
              <el-input v-model="addForm.widCur"></el-input>
            </el-form-item>
            <el-form-item prop="wnameCur" :label-width="addFormLabelWidth" label="转储后仓库名称">
              <el-input v-model="addForm.wnameCur"></el-input>
            </el-form-item>
            <el-form-item prop="totime" :label-width="addFormLabelWidth" label="转储时间">
              <el-input v-model="addForm.totime"></el-input>
            </el-form-item>


            <el-button type="info" @click="addFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryAdd">添加新的转储总则</el-button>
          </el-form>
        </el-dialog>
      </div>

<!--      // 修改信息的表单-->
      <div>
        <el-dialog title="修改转储总则信息" v-model="updateFormVisible">
          <el-form :model="updateForm" :rules="formRules" ref="updateFormRef">
            <el-form-item prop="id" :label-width="updateFormLabelWidth" label="操作员id">
              <el-input v-model="updateForm.id" :disabled="updateExtraCfg.id.lock"></el-input>
            </el-form-item>
            <el-form-item prop="nickName" :label-width="updateFormLabelWidth" label="操作员名字">
              <el-input v-model="updateForm.nickName"></el-input>
            </el-form-item>
            <el-form-item prop="widPrev" :label-width="updateFormLabelWidth" label="转储前仓库id">
              <el-input v-model="updateForm.widPrev"></el-input>
            </el-form-item>
            <el-form-item prop="wnamePrev" :label-width="updateFormLabelWidth" label="转储前仓库名称">
              <el-input v-model="updateForm.wnamePrev"></el-input>
            </el-form-item>
            <el-form-item prop="widCur" :label-width="updateFormLabelWidth" label="转储后仓库id">
              <el-input v-model="updateForm.widCur"></el-input>
            </el-form-item>
            <el-form-item prop="wnameCur" :label-width="updateFormLabelWidth" label="转储后仓库名称">
              <el-input v-model="updateForm.wnameCur"></el-input>
            </el-form-item>
            <el-form-item prop="totime" :label-width="updateFormLabelWidth" label="转储时间">
              <el-input v-model="updateForm.totime" :disabled="updateExtraCfg.totime.lock"></el-input>
            </el-form-item>



            <el-button type="info" @click="updateFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryUpdate">修改当前转储信息</el-button>
          </el-form>
        </el-dialog>
      </div>


<!--      // 表格数据-->
      <el-table  :data="tableData" border style="width:100%">
        <el-table-column prop="toid" label="转储记录id" />
        <el-table-column prop="id" label="操作员id" />
        <el-table-column prop="nickName" label="操作员名字" />
        <el-table-column prop="widPrev" label="转储前仓库id"/>
        <el-table-column prop="wnamePrev" label="转储前仓库名称" />
        <el-table-column prop="widCur" label="转储后仓库id" />
        <el-table-column prop="wnameCur" label="转储后仓库名称" />
        <el-table-column prop="totime" label="转储时间" />

        <el-table-column prop="operate" label="操作" min-width="120px">
          <template #default="scope">
            <div style="display: flex;">
              <el-button size='small' type="success" @click="openUpdateForm(scope.row)">修改</el-button>
              <el-button size='small' type="danger"
                         @click="tryDelete(scope.row)">删除</el-button>
            </div>
            <el-button size="small" type="info" @click="router.push(
                  {
                    path:'/home/transferDetail',
                    query:{toid:scope.row.toid}
                  }
              )" >查看详情</el-button>
          </template>
        </el-table-column>
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
  import {ApiGetUsers} from "@/api/serviceApi";
  import {ElMessage} from "element-plus";
  import {ApiAddTransferOrder,ApiGetTransferOrder,ApiDeleteTransferOrder,ApiUpdateTransferOrder} from "@/api/transferOrder";
  import router from "@/router/router";

  // 表格信息
  const tableData = ref([])
  const totalSize = ref(1)
  const currentPage = ref(1)
  const pageSize = ref(5)
  const pageSizes = ref([5, 10, 20])

  const nameSearch = ref(null)
  // const userTypeSearch = ref(-1)

  // 添加表单
  const formDefaultValue = {
    id:"",
    widPrev:"",
    widCur:"",
    totime:"",
    wnamePrev:"",
    wnameCur:"",
    nickName:""


  }
  const formRules = ref({
    id:[{required: true,  message:"请输入操作员id", trigger:"blur"},{ trigger:'blur'}],
    nickName:[{required: true,  message:"请输入操作员名字", trigger:"blur"}],
    widPrev:[{required: true,  message:"请输入转储前仓库id", trigger:"blur"}],
    wnamePrev:[{required: true,  message:"请输入转储前仓库名称", trigger:"blur"}],
    widCur:[{required: true,  message:"请输入转储后仓库id", trigger:"blur"}],
    wnameCur:[{required: true,  message:"请输入转储后仓库名称", trigger:"blur"}],
    totime:[{required: true,  message:"请输入转储时间", trigger:"blur"}],

  })

  const addFormVisible = ref(false)
  // emm 深拷贝比较逆天就是了
  const addForm = ref(JSON.parse(JSON.stringify(formDefaultValue)))
  const addFormRef = ref(null)
  const addFormLabelWidth=ref("10em")

  // 修改表单
  const updateFormVisible = ref(false)
  const updateForm = ref(JSON.parse(JSON.stringify(formDefaultValue)))
  const updateFormRef = ref(null)
  const updateExtraCfg = ref({
    id: {lock:true},
    widPrev: {lock:false},
    widCur:{lock:false},
    totime:{lock:true},

  })
  // const currentUser = JSON.parse(sessionStorage.getItem("CurrentUser"))


  const updateFormLabelWidth=ref("10em")

  const openAddForm = ()=>{
    console.log("打开添加表单")
    addForm.value = JSON.parse(JSON.stringify(formDefaultValue))
    addFormVisible.value=true
  }
  const openUpdateForm = (rowData)=>{
    updateForm.value = JSON.parse(JSON.stringify(rowData))
    updateFormVisible.value = true

  }

  const tryAdd = async ()=>{
    console.log("尝试提交添加表单")
    try{
      let passValidate = await addFormRef.value.validate()
      if(!passValidate){
        return
      }
      // api处理
      let res = await ApiAddTransferOrder(
          addForm.value.id,
          addForm.value.widPrev,
          addForm.value.widCur,
          addForm.value.totime
      )
      if(res.data.status!==200){
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      // 关闭窗口
      addFormVisible.value=false
      ElMessage({message:`转储记录${addForm.value.toid}添加成功`, type:"success"})
      await loadData()
    }catch(e){
      console.log(e)
    }
  }
  const tryUpdate = async ()=>{
    try{
      let passValidate = await updateFormRef.value.validate()
      if(!passValidate){
        // ElMessage({message:"用户表单未通过校验要求", type:'warning'})
        return
      }


      let res = await ApiUpdateTransferOrder(
          updateForm.value.toid,
          updateForm.value.id,
          updateForm.value.widPrev,
          updateForm.value.widCur,
          updateForm.value.totime,
      )

      if(res.data.status!==200)
      {
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      console.log("修改成功")
      updateFormVisible.value=false
      ElMessage({message:`转储记录总则${updateForm.value.toid}添加成功`, type:"success"})
      await loadData()
    }catch(e){
      // ElMessage({message:"用户表单未通过校验要求", type:'warning'})
      return
    }
  }

  const tryDelete = async (old_data) => {
    try {
      let res = await ApiDeleteTransferOrder(old_data.toid)
      if (res.data.status !== 200)
        ElMessage({message: res.data.msg, type: "warning"})
      else{
        ElMessage({message: `成功删除转储记录${old_data.toid}}`, type: "success"})
        await loadData()
      }
    } catch (e) {
      ElMessage({message: e.message, type: "warning"})
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

      res = await ApiGetTransferOrder(index,size,nameSearch.value)
      console.log(tableData.value)
      tableData.value = res.data.data
      totalSize.value = res.data.total
    }catch (e){
      console.log(e)
    }
  }
  const resetTableData = async ()=>{
    nameSearch.value = ""
    // userTypeSearch.value=-1
    await loadData()
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
.top-search :deep(.el-input__inner){
  text-align: left;
}
</style>