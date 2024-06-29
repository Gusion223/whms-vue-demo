<template>
    <el-scrollbar style="padding-left: 20px; padding-right: 20px;">

<!--      // 顶部搜索栏-->
      <div class="top-search">
        <el-input-number v-model="nameSearch" placeholder="请输入要查询的转储记录id" :precision="0" :controls="false"
                  style="width: 20%;" suffix-icon="search" @keyup.enter="loadData"/>

        <el-button type="primary" style="margin-left: 5px" @click="loadData">查询</el-button>
        <el-button type="warning" style="margin-left: 5px" @click="resetTableData">重置</el-button>
<!--        <el-button type="success" style="margin-left: 5px" @click="openAddForm">添加转储信息细则</el-button>-->
      </div>

<!--      // 添加信息的表单-->
      <div>
        <el-dialog title="添加新转储记录" v-model="addFormVisible">
          <el-form :model="addForm" :rules="formRules" ref="addFormRef">
            <el-form-item prop="toid" :label-width="addFormLabelWidth" label="转储id">
              <el-input v-model="addForm.toid"></el-input>
            </el-form-item>
            <el-form-item prop="gid" :label-width="addFormLabelWidth" label="货物id">
              <el-input v-model="addForm.gid"></el-input>
            </el-form-item>
            <el-form-item prop="gname" :label-width="addFormLabelWidth" label="货物名称">
              <el-input v-model="addForm.gname"></el-input>
            </el-form-item>
            <el-form-item prop="tdamount" :label-width="addFormLabelWidth" label="转储商品数量">
              <el-input v-model="addForm.tdamount"></el-input>
            </el-form-item>



            <el-button type="info" @click="addFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryAdd">添加新的转储细则</el-button>
          </el-form>
        </el-dialog>
      </div>

<!--      // 修改信息的表单-->
      <div>
        <el-dialog title="修改转储细则信息" v-model="updateFormVisible">
          <el-form :model="updateForm" :rules="formRules" ref="updateFormRef">
            <el-form-item prop="toid" :label-width="updateFormLabelWidth" label="转储id">
              <el-input v-model="updateForm.toid" ></el-input>
            </el-form-item>
            <el-form-item prop="gid" :label-width="updateFormLabelWidth" label="商品id">
              <el-input v-model="updateForm.gid"></el-input>
            </el-form-item>
            <el-form-item prop="gname" :label-width="updateFormLabelWidth" label="商品名称">
              <el-input v-model="updateForm.gname"></el-input>
            </el-form-item>
            <el-form-item prop="tdamount" :label-width="updateFormLabelWidth" label="转储商品数量">
              <el-input v-model="updateForm.tdamount"></el-input>
            </el-form-item>



            <el-button type="info" @click="updateFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryUpdate">修改当前细则信息</el-button>
          </el-form>
        </el-dialog>
      </div>


<!--      // 表格数据-->
      <el-table  :data="tableData" border style="width:100%">
        <el-table-column prop="toid" label="转储id" />
        <el-table-column prop="gid" label="商品id" />
        <el-table-column prop="gname" label="商品名称" />
        <el-table-column prop="tdamount" label="转储商品数量"/>


        <el-table-column prop="operate" label="操作">
          <template #default="scope">
            <div style="display: flex;">
              <el-button size='small' type="success" @click="openUpdateForm(scope.row)">修改</el-button>
              <el-button size='small' type="danger"
                         @click="tryDelete(scope.row)">删除</el-button>
            </div>
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
  import {ElMessage} from "element-plus";
  import {ApiAddTransferDetail,ApiDeleteTransferDetail,ApiGetTransferDetail,ApiUpdateTransferDetail} from "@/api/transferDetail";
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
    toid:"",
    gid:"",
    tdamount:"",
    gname:"",

  }
  const formRules = ref({
    toid:[{required: true,  message:"请输入转储id", trigger:"blur"},{ trigger:'blur'}],
    gid:[{required: true,  message:"请输入商品id", trigger:"blur"}],
    gname:[{required: true,  message:"请输入商品名称", trigger:"blur"}],
    tdamount:[{required: true,  message:"请输入转储商品数量", trigger:"blur"}],


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
  // const updateExtraCfg = ref({
  //   poid: {lock:false},
  //   gid: {lock:false},
  //   pdamount:{lock:false},
  //   pototalCost:{lock:false}
  // })
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
      let res = await ApiAddTransferDetail(
          addForm.value.gname,
          addForm.value.toid,
          addForm.value.gid,
          addForm.value.tdamount
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


      let res = await ApiUpdateTransferDetail(
          updateForm.value.gname,
          updateForm.value.toid,
          updateForm.value.gid,
          updateForm.value.tdamount
      )

      if(res.data.status!==200)
      {
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      console.log("修改成功")
      updateFormVisible.value=false
      ElMessage({message:`转储细则${updateForm.value.toid}添加成功`, type:"success"})
      await loadData()
    }catch(e){
      // ElMessage({message:"用户表单未通过校验要求", type:'warning'})
      return
    }
  }

  const tryDelete = async (old_data) => {
    try {
      let res = await ApiDeleteTransferDetail(old_data.toid,old_data.gid)
      if (res.data.status !== 200)
        ElMessage({message: res.data.msg, type: "warning"})
      else{
        ElMessage({message: `成功删除转储记录细则${old_data.toid}}`, type: "success"})
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

      res = await ApiGetTransferDetail(index,size,nameSearch.value)
      console.log(tableData.value)
      tableData.value = res.data.data
      totalSize.value = res.data.total
    }catch (e){
      console.log(e)
    }
  }
  const resetTableData = async ()=>{
    nameSearch.value = null
    // userTypeSearch.value=-1
    await loadData()
  }


  onMounted(()=>{
    if(router.currentRoute.value.query.toid != null)
      nameSearch.value = Number(router.currentRoute.value.query.toid)
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