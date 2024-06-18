<template>
  <el-form :model="dynamicForm" :rules="dynamicFormRules" ref="dynamicFormRef" class="dynamic-from-base">
    <div class="top-line">
      <el-form-item prop="wid" label="出货仓库:" :label-width="dynamicFromLabelWidth" :show-message="false">
        <el-select v-model="dynamicForm.wid" @change="()=>{loadGoods()}">
          <el-option :key="-1" :label="'请选择一个仓库'" :value="-1" />
          <el-option v-for="item in warehouses" :key="item.wid" :label="item.wname" :value="item.wid"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="cid" label="客户:" :label-width="dynamicFromLabelWidth" :show-message="false">
        <el-select v-model="dynamicForm.cid">
          <el-option :key="-1" :label="'请选择一个客户进行登记'" :value="-1" />
          <el-option v-for="item in customers" :key="item.cid" :label="item.cname" :value="item.cid"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="sotime" label="入库时间" :label-width="dynamicFromLabelWidth" :show-message="false">
        <el-date-picker type="datetime" v-model="dynamicForm.sotime" placeholder="默认为当前时间" value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
      </el-form-item>
      <el-button type="primary" style="margin-left: 5px" @click="addNewRecord">添加一条记录</el-button>
      <el-button type="success" @click="submitForm">提交表单</el-button>
    </div>

    <!--       动态表单内容 用表格表示-->

    <el-table ref="dynamicFormTableRef" :data="dynamicForm.records" border
              header-cell-class-name="table-header-cell"
              max-height="800px">
      <el-table-column type="index" label="编号" width="55px" ></el-table-column>
      <el-table-column label="商品编号">
        <template #default="{row, $index}">
          <el-form-item :prop="`records[${$index}].gid`" :rules="dynamicFormRules.gid" class="table-form-item">
            <el-input-number v-model="row.gid" placeholder="请输入商品编号" :precision="0"
                             :controls="false" style="width: 100%;" @change="(cur)=>updateOtherAttrs(cur,$index)"></el-input-number>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" >
        <template #default="{row, $index}">
          <el-form-item :prop="`records[${$index}].gid`" :rules="dynamicFormRules.gid" class="table-form-item">
            <el-select v-model="row.gid" @change="(cur)=>updateOtherAttrs(cur,$index)" >
              <el-option v-for="item in goods" :key="item.gid" :label="item.gname" :value="item.gid" />
              <!--                  虽然挺低效的-->
              <el-option v-if="row.gid !=null && goods.find((item)=>item.gid==row.gid) == null" :key="row.gid" label="该供销商不提供此商品" :value="row.gid" disabled/>
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="销售数量" >
        <template #default="{row, $index}">
          <el-form-item :prop="`records[${$index}].sdamount`" :rules="dynamicFormRules.amount" class="table-form-item">
            <el-input-number v-model="row.sdamount" placeholder="请输入商品数量" :controls="false" style="width: 100%;"
                             @change="(cur)=>{updateTotalSale(row.gunitPrice, cur, $index)}" :precision="0"
                             :min="0" :max="row.sramount" ></el-input-number>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="现有数量">
        <template #default="{row}">
          <el-input-number :model-value="row.sramount" :controls="false" style="width: 100%;" disabled :precision="0"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="售价">
        <template #default="{row}">
          <el-input-number :model-value="row.gunitPrice" :controls="false" style="width: 100%;" disabled  :precision="2"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="单位">
        <template #default="{row}">
          <el-input :model-value="row.gunit" disabled class="center-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="总售价">
        <template #default="{row}">
          <el-input-number :model-value="row.sdtotal" :controls="false" style="width: 100%;" disabled :precision="2"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column width="85px">
        <template #default="scope">
          <el-button type="danger" @click="dynamicForm.records.splice(scope.$index, 1)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
  <div v-if="enableDebug">
    <p>debug</p>
    <p>supplier:{{ customers }}</p>
    <p>warehouse:{{warehouses}}</p>
    <p>goods:{{goods}}</p>
    <p>form:{{dynamicForm}}</p>
  </div>
</template>

<script setup>

const enableDebug=ref(false)


import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import {ApiListWarehouse} from "@/api/warehouse";

import {ApiListCustomer} from "@/api/coustomer";
import {ApiListStoreRecord} from "@/api/storeRecord";
import {ApiAddSaleOrderWithDetail} from "@/api/saleOrder";

// 获取当前时间的字符串格式
const getCurrentTime =()=>{
  let date = new Date()
  let formatDateTimeStr = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
  return formatDateTimeStr
}
const currentUser = JSON.parse(sessionStorage.getItem("CurrentUser"))



const gidExist = (rule, value, callback)=>{
  if(value==null)  callback(new Error("不存在对应的商品"))
  let res = goods.value.find((item)=>item.gid===value)
  if(res)
    callback()
  else
    callback(new Error("不存在对应的商品"))
}
const dynamicForm = ref({
  cid:null,
  wid:null,
  sotime:null,
  records:[
  ],
})

const dynamicFormRules = ref({
  cid:[{type:"number", min:0, required:true, message:"请选择一个顾客", trigger:"change" }],
  wid:[{type:"number", min:0, required:true, message:"请选择一个入库仓库", trigger:"change"}],
  gid:[{type:"number",validator:gidExist, required:true, message:"请选择一个商品", trigger:"change"}],
  potime:[{required:true, message:"请选择订货时间", trigger:"blur"}],
  amount:[{type:"number", min:0, required:true, message:"请输入购入商品的数量"}]
})
const dynamicFormRef = ref(null)
const dynamicFormTableRef = ref(null)
const dynamicFromLabelWidth = ref('6em')
const emptyRecord = {gid:null, sdamount:null, gunitPrice:null, sdtotal:null, gunit:null, sramount:null}
const customers = ref([])
const warehouses = ref([])
const goods = ref([])


const loadCustomers = async ()=>{
  try{
    let res = await ApiListCustomer()
    customers.value = res.data.data
  }catch (e){
    console.log(e)
  }
}
const loadWareHouse = async ()=>{
  try{
    let res = await ApiListWarehouse()
    warehouses.value = res.data.data
  }catch (e){
    console.log(e)
  }
}
const loadGoods = async ()=>{
  try{
    let res = await ApiListStoreRecord(dynamicForm.value.wid)
    console.log(res)
    goods.value = res.data.data
  }catch (e){
    console.log(e)
  }
}

const updateTotalSale = (cost, amount, index)=>{
  console.log(cost, amount, index)
  if (cost!=null && amount!=null)
    dynamicForm.value.records[index].sdtotal = cost * amount;
  else
    dynamicForm.value.records[index].sdtotal = null;
}
const updateOtherAttrs = (gid, index)=>{
  console.log(gid, index)
  let good = goods.value.find((item)=>item.gid===gid)
  if(good){
    dynamicForm.value.records[index].gunitPrice=good.gunitPrice
    dynamicForm.value.records[index].gunit=good.gunit
    dynamicForm.value.records[index].sramount = good.sramount
  }else{
    dynamicForm.value.records[index].sramount=null
    dynamicForm.value.records[index].gunitPrice=null
    dynamicForm.value.records[index].gunit=null
  }
}
const addNewRecord = ()=>{
  dynamicForm.value.records.push(JSON.parse(JSON.stringify(emptyRecord)))
}
const submitForm = async ()=>{
  try {
    let pass = await dynamicFormRef.value.validate()
    if(!pass) return
    let res = await ApiAddSaleOrderWithDetail(
        currentUser.id,
        dynamicForm.value.wid,
        dynamicForm.value.cid,
        dynamicForm.value.sotime,
        dynamicForm.value.records
    )
    if(res.data.status==200){
      ElMessage({message:"提交表单提交成功", type:"success"})
      // location.reload()
    }
    else
      ElMessage({message:res.data.msg, type:"warning"})
  }catch (e){
    ElMessage({message:"提交表单失败", type:"warning"})
    console.log(e)
  }
}

onMounted(()=>{
  dynamicForm.value.sotime = getCurrentTime()
  loadCustomers()
  loadWareHouse()
})

</script>

<style scoped>
.top-line{
  display: flex;
  margin-bottom: 10px;
}
.top-line :deep(.el-form-item){
  width: 20%;
  margin-bottom: 0;
}

.table-form-item{
  margin-bottom: 0px;
}
.center-input :deep( .el-input__inner ){
  text-align: center;
}
</style>