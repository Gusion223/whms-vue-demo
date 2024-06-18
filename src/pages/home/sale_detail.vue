<template>
    <el-scrollbar style="padding-left: 20px; padding-right: 20px;">

<!--      // 顶部搜索栏-->
      <div class="top-search">
        <el-input v-model="nameSearch" placeholder="请输入要查询的销售记录id"
                  style="width: 20%;" suffix-icon="search" @keyup.enter="loadData"/>

        <el-button type="primary" style="margin-left: 5px" @click="loadData">查询</el-button>
        <el-button type="warning" style="margin-left: 5px" @click="resetTableData">重置</el-button>
        <el-button type="success" style="margin-left: 5px" @click="openAddForm">销售信息细则登记</el-button>
      </div>

<!--      // 添加信息的表单-->
      <div>
        <el-dialog title="添加新销售细则记录" v-model="addFormVisible">
          <el-form :model="addForm" :rules="formRules" ref="addFormRef">
            <el-form-item prop="soid" :label-width="addFormLabelWidth" label="销售记录id">
              <el-input v-model="addForm.soid"></el-input>
            </el-form-item>
            <el-form-item prop="gid" :label-width="addFormLabelWidth" label="商品id">
              <el-input v-model="addForm.gid"></el-input>
            </el-form-item>
            <el-form-item prop="gname" :label-width="addFormLabelWidth" label="商品名称">
              <el-input v-model="addForm.gname"></el-input>
            </el-form-item>
            <el-form-item prop="sdamount" :label-width="addFormLabelWidth" label="商品销售数量">
              <el-input v-model="addForm.sdamount"></el-input>
            </el-form-item>
            <el-form-item prop="sdtotal" :label-width="addFormLabelWidth" label="商品销售金额">
              <el-input v-model="addForm.sdtotal" controls-position="right" style="width: 100%"></el-input>
            </el-form-item>


            <el-button type="info" @click="addFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryAdd">添加新的销售细则记录</el-button>
          </el-form>
        </el-dialog>
      </div>

<!--      // 修改信息的表单-->
      <div>
        <el-dialog title="修改销售细则记录信息" v-model="updateFormVisible">
          <el-form :model="updateForm" :rules="formRules" ref="updateFormRef">
            <el-form-item prop="soid" :label-width="updateFormLabelWidth" label="销售记录id">
              <el-input v-model="updateForm.soid" :disabled="updateExtraCfg.soid.lock"></el-input>
            </el-form-item>
            <el-form-item prop="gid" :label-width="updateFormLabelWidth" label="商品id">
              <el-input v-model="updateForm.gid"></el-input>
            </el-form-item>
            <el-form-item prop="gname" :label-width="updateFormLabelWidth" label="商品名称">
              <el-input v-model="updateForm.gname"></el-input>
            </el-form-item>
            <el-form-item prop="sdamount" :label-width="updateFormLabelWidth" label="商品销售数量">
              <el-input v-model="updateForm.sdamount" ></el-input>
            </el-form-item>
            <el-form-item prop="sdtotal" :label-width="updateFormLabelWidth" label="商品销售金额">
              <el-input v-model="updateForm.sdtotal" controls-position="right" style="width: 100%"></el-input>
            </el-form-item>


            <el-button type="info" @click="updateFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryUpdate">修改当前销售细则信息</el-button>
          </el-form>
        </el-dialog>
      </div>


<!--      // 表格数据-->
      <el-table  :data="tableData" border style="width:100%">
        <el-table-column prop="soid" label="销售记录id" />
        <el-table-column prop="gid" label="商品id" />
        <el-table-column prop="gname" label="商品名称" />
        <el-table-column prop="sdamount" label="商品销售数量" />
        <el-table-column prop="sdtotal" label="商品销售金额"/>

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
  import {ApiGetSaleDetail,ApiUpdateSaleDetail,ApiDeleteSaleDetail,ApiAddSaleDetail} from "@/api/saleDetail";

  // 表格信息
  const tableData = ref([])
  const totalSize = ref(1)
  const currentPage = ref(1)
  const pageSize = ref(5)
  const pageSizes = ref([5, 10, 20])

  const nameSearch = ref("")
  // const userTypeSearch = ref(-1)

  // 添加表单
  const formDefaultValue = {
    soid:"",
    gid:"",
    sdamount:"",
    sdtotal:"",
    gname:"",

  }
  const formRules = ref({
    soid:[{required: true,  message:"请输入销售记录id", trigger:"blur"},{ trigger:'blur'}],
    gid:[{required: true,  message:"请输入商品id", trigger:"blur"}],
    gname:[{required: true,  message:"请输入商品名称", trigger:"blur"}],
    sdamount:[{required: true,  message:"请输入商品销售数量", trigger:"blur"}],
    sdtotal:[{required: true,  message:"请输入商品销售金额", trigger:"blur"}],

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
    soid: {lock:true},
    gid: {lock:false},
    sdamount:{lock:false},
    sdtotal:{lock:false}
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
      let res = await ApiAddSaleDetail(
          addForm.value.soid,
          addForm.value.gid,
          addForm.value.sdamount,
          addForm.value.adtotal,
      )
      if(res.data.status!==200){
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      // 关闭窗口
      addFormVisible.value=false
      ElMessage({message:`销售记录细则${addForm.value.soid}添加成功`, type:"success"})
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


      let res = await ApiUpdateSaleDetail(
          updateForm.value.soid,
          updateForm.value.gid,
          updateForm.value.sdamount,
          updateForm.value.sdtotal
      )

      if(res.data.status!==200)
      {
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      console.log("修改成功")
      updateFormVisible.value=false
      ElMessage({message:`销售记录细则${updateForm.value.soid}添加成功`, type:"success"})
      await loadData()
    }catch(e){
      // ElMessage({message:"用户表单未通过校验要求", type:'warning'})
      return
    }
  }

  const tryDelete = async (old_data) => {
    try {
      let res = await ApiDeleteSaleDetail(old_data.soid,old_data.gid)
      if (res.data.status !== 200)
        ElMessage({message: res.data.msg, type: "warning"})
      else{
        ElMessage({message: `成功删除销售细则记录${old_data.soid}}`, type: "success"})
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

      res = await ApiGetSaleDetail(index,size)
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
</style>