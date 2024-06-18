<template>
    <el-scrollbar style="padding-left: 20px; padding-right: 20px;">

<!--      // 顶部搜索栏-->
      <div class="top-search">
        <el-input-number v-model="nameSearch" placeholder="请输入要查询的入库记录id"
                  style="width: 20%;" suffix-icon="search" @keyup.enter="loadData" :controls="false" :precision="0"/>

        <el-button type="primary" style="margin-left: 5px" @click="loadData">查询</el-button>
        <el-button type="warning" style="margin-left: 5px" @click="resetTableData">重置</el-button>
        <el-button type="success" style="margin-left: 5px" @click="openAddForm">入库信息登记</el-button>
      </div>

<!--      // 添加信息的表单-->
      <div>
        <el-dialog title="添加新进货记录" v-model="addFormVisible">
          <el-form :model="addForm" :rules="formRules" ref="addFormRef">
            <el-form-item prop="id" :label-width="addFormLabelWidth" label="操作员id">
              <el-input v-model="addForm.id"></el-input>
            </el-form-item>
            <el-form-item prop="nickName" :label-width="addFormLabelWidth" label="操作员名称">
              <el-input v-model="addForm.nickName"></el-input>
            </el-form-item>

            <el-form-item prop="sid" :label-width="addFormLabelWidth" label="供货商id">
              <el-input v-model="addForm.sid"></el-input>
            </el-form-item>
            <el-form-item prop="sname" :label-width="addFormLabelWidth" label="供货商名称">
              <el-input v-model="addForm.sname"></el-input>
            </el-form-item>

            <el-form-item prop="wid" :label-width="addFormLabelWidth" label="仓库id">
              <el-input v-model="addForm.wid"></el-input>
            </el-form-item>
            <el-form-item prop="wname" :label-width="addFormLabelWidth" label="仓库名称">
              <el-input v-model="addForm.wname"></el-input>
            </el-form-item>
            <el-form-item prop="potime" :label-width="addFormLabelWidth" label="入库时间">
              <el-input v-model="addForm.potime"></el-input>
            </el-form-item>
            <el-form-item prop="pototalCost" :label-width="addFormLabelWidth" label="总成本">
              <el-input v-model="addForm.pototalCost" controls-position="right" style="width: 100%"></el-input>
            </el-form-item>


            <el-button type="info" @click="addFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryAdd">添加新的入库总则</el-button>
          </el-form>
        </el-dialog>
      </div>

<!--      // 修改信息的表单-->
      <div>
        <el-dialog title="修改入库总则信息" v-model="updateFormVisible">
          <el-form :model="updateForm" :rules="formRules" ref="updateFormRef">
            <el-form-item prop="id" :label-width="updateFormLabelWidth" label="操作员id">
              <el-input v-model="updateForm.id" ></el-input>
            </el-form-item>
            <el-form-item prop="nickName" :label-width="updateFormLabelWidth" label="操作员名称">
            <el-input v-model="updateForm.nickName" ></el-input>
          </el-form-item>
            <el-form-item prop="sid" :label-width="updateFormLabelWidth" label="供货商id">
              <el-input v-model="updateForm.sid"></el-input>
            </el-form-item>
            <el-form-item prop="sname" :label-width="updateFormLabelWidth" label="供货商名称">
              <el-input v-model="updateForm.sname" ></el-input>
            </el-form-item>
            <el-form-item prop="wid" :label-width="updateFormLabelWidth" label="仓库id">
              <el-input v-model="updateForm.wid"></el-input>
            </el-form-item>
            <el-form-item prop="wname" :label-width="updateFormLabelWidth" label="仓库名称">
              <el-input v-model="updateForm.wname" ></el-input>
            </el-form-item>
            <el-form-item prop="potime" :label-width="updateFormLabelWidth" label="入库时间">
              <el-input v-model="updateForm.potime" :disabled="updateExtraCfg.potime.lock"></el-input>
            </el-form-item>
            <el-form-item prop="pototalCost" :label-width="updateFormLabelWidth" label="总成本">
              <el-input v-model="updateForm.pototalCost" controls-position="right" style="width: 100%"></el-input>
            </el-form-item>


            <el-button type="info" @click="updateFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryUpdate">修改当前入库信息</el-button>
          </el-form>
        </el-dialog>
      </div>


<!--      // 表格数据-->
      <el-table  :data="tableData" border style="width:100%">
        <el-table-column prop="poid" label="入库记录id" />
        <el-table-column prop="id" label="操作员id" />
        <el-table-column prop="nickName" label="操作员名称" />
        <el-table-column prop="sid" label="供货商id"/>
        <el-table-column prop="sname" label="供货商名称" />
        <el-table-column prop="wid" label="仓库id" />
        <el-table-column prop="wname" label="仓库名称" />
        <el-table-column prop="potime" label="入库时间" />
        <el-table-column prop="pototalCost" label="总成本"/>

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
  import {ApiAddPurchaseOrder,ApiGetPurchaseOrder,ApiUpdatePurchaseOrder,ApiDeletePurchaseOrder} from "@/api/purchaseOrder";

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
    sid:"",
    wid:"",
    potime:"",
    pototalCost:"",
    nickName:"",
    sname:"",
    wname:""

  }
  const formRules = ref({
    id:[{required: true,  message:"请输入操作员id", trigger:"blur"},{ trigger:'blur'}],
    nickName:[{required: true,  message:"请输入操作眼名称", trigger:"blur"}],
    sid:[{required: true,  message:"请输入供货商id", trigger:"blur"}],
    sname:[{required: true,  message:"请输入供货商名称", trigger:"blur"}],
    wid:[{required: true,  message:"请输入仓库id", trigger:"blur"}],
    wname:[{required: true,  message:"请输入仓库名称", trigger:"blur"}],
    potime:[{required: true,  message:"请输入入库时间", trigger:"blur"}],
    pototalCost:[{required: true,  message:"请输入总成本", trigger:"blur"}],

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
    nickName: {lock:false},
    wname: {lock:false},
    sname: {lock:false},
    sid: {lock:false},
    wid:{lock:false},
    potime:{lock:true},
    pototalCost:{lock:false}
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
      let res = await ApiAddPurchaseOrder(
          addForm.value.id,
          addForm.value.sid,
          addForm.value.wid,
          addForm.value.potime
      )
      console.log(res.data.data())
      if(res.data.status!==200){
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      // 关闭窗口
      addFormVisible.value=false
      ElMessage({message:`入库记录${addForm.value.poid}添加成功`, type:"success"})
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


      let res = await ApiUpdatePurchaseOrder(
          updateForm.value.poid,
          updateForm.value.id,
          updateForm.value.sid,
          updateForm.value.wid,
          updateForm.value.potime
      )

      if(res.data.status!==200)
      {
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      console.log("修改成功")
      updateFormVisible.value=false
      ElMessage({message:`入库记录总则${updateForm.value.poid}添加成功`, type:"success"})
      await loadData()
    }catch(e){
      // ElMessage({message:"用户表单未通过校验要求", type:'warning'})
      return
    }
  }

  const tryDelete = async (old_data) => {
    try {
      let res = await ApiDeletePurchaseOrder(old_data.poid)
      if (res.data.status !== 200)
        ElMessage({message: res.data.msg, type: "warning"})
      else{
        ElMessage({message: `成功删除入库记录${old_data.poid}}`, type: "success"})
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

      res = await ApiGetPurchaseOrder(index,size,null, null, null, null, nameSearch.value)
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