<template>
 <div>
<!--   debug 提示-->
   <p>这里是动态表单</p>
   <p>sid:{{dynamicForm.sid}} type:{{typeof(dynamicForm.sid)}}</p>
   <p>records:{{dynamicForm.records[0]}}</p>
<!--   此处为替换修改的代码-->
   <div>
     <el-form :model="dynamicForm" :rules="dynamicFormRules" ref="dynamicFormRef" class="dynamic-from-base">
        <el-form-item prop="sid" label="供货商" :label-width="dynamicFromLabelWidth">
          <el-select v-model="dynamicForm.sid">
            <el-option :key="-1" :label="'请选择一个供货商'" :value="-1" />
            <el-option v-for="item in suppliers" :key="item.sid" :label="item.sname" :value="item.sid"/>
          </el-select>
        </el-form-item>
<!--       动态表单内容 用表格表示-->
        <el-button type="primary" style="margin-bottom: 10px" @click="addNewRecord">添加一条记录</el-button>

        <el-table ref="dynamicFormTableRef" :data="dynamicForm.records" border
                  header-cell-class-name="table-header-cell"
                  max-height="400px">
          <el-table-column type="index" label="编号" width="55px" ></el-table-column>
          <el-table-column label="商品编号">
            <template #default="{row, $index}">
              <el-form-item :prop="`records[${$index}].gid`" :rules="dynamicFormRules.gid" class="table-form-item">
                <el-input-number v-model="row.gid" placeholder="请输入商品编号"
                                 :controls="false" style="width: 100%;" @change="(cur)=>updateOtherAttrs(cur,$index)"></el-input-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" >
            <template #default="{row, $index}">
              <el-form-item :prop="`records[${$index}].gid`" :rules="dynamicFormRules.gid" class="table-form-item">
                <el-select v-model="row.gid" @change="(cur)=>updateOtherAttrs(cur,$index)" :filterable="true">
                  <el-option :key="-1" :label="'请选择一个已有的商品'" :value="-1" />
                  <el-option v-for="item in goods" :key="item.gid" :label="item.gname" :value="item.gid" />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="订购数量" >
            <template #default="{row, $index}">
              <el-form-item :prop="`records[${$index}].amount`" :rules="dynamicFormRules.amount" class="table-form-item">
                <el-input-number v-model="row.amount" placeholder="请输入商品数量" :controls="false" style="width: 100%;"></el-input-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="单价">
            <template #default="{row}">
                <el-input-number :model-value="row.cost" :controls="false" style="width: 100%;" disabled></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="总价">
            <template #default="{row}">
                <el-input-number :model-value="(row.cost===null || row.amount===null) ? null :row.cost * row.amount" :controls="false" style="width: 100%;" disabled></el-input-number>
            </template>
          </el-table-column>
          <el-table-column width="85px">
            <template #default="scope">
              <el-button type="danger" @click="dynamicForm.records.splice(scope.$index, 1)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="submitForm">提交表单</el-button>
     </el-form>
   </div>
 </div>
</template>

<script setup>

  import {ref} from "vue";
  import {ElMessage} from "element-plus";

  const dynamicForm = ref({
    sid:1, // 供应商id
    records:[
      {gid:25, amount:100, cost:10}
    ],
    where:"不知道"
  })

  const dynamicFormRules = ref({
    sid:[{type:"number", min:0, required:true, message:"请选择一个供货商", trigger:"change" }],
    gid:[{type:"number", min:0, max:100, required:true, message:"请选择一个商品", trigger:"change"}],
    amount:[{type:"number", min:0, required:true, message:"请输入购入商品的数量"}]
  })
  const dynamicFormRef = ref(null)
  const dynamicFormTableRef = ref(null)
  const dynamicFromLabelWidth = ref('6em')
  const emptyRecord = {gid:null, amount:null, cost:null}

  const suppliers = ref([
    {sid:0, sname:"李浩田有限公司"},
    {sid:1, sname:"一斤鸭梨有限公司"}
  ])
  const goods = ref([{gid:25, gname:"事薯片", cost:10}])


  const updateOtherAttrs = (gid, index)=>{
    console.log(gid, index)
    var good = goods.value.find((item)=>item.gid===gid)
    if(good){
      dynamicForm.value.records[index].cost=good.cost
    }else{
      dynamicForm.value.records[index].cost=null
    }
  }
  const addNewRecord = ()=>{
    dynamicForm.value.records.push(JSON.parse(JSON.stringify(emptyRecord)))
  }

  const submitForm = async ()=>{
    try {
      let pass = await dynamicFormRef.value.validate()
      if(pass)
        ElMessage({message:"表单提交成功", type:"success"})
      else
        ElMessage({message:"提交表单失败", type:"warning"})
    }catch (e){
      ElMessage({message:"提交表单失败", type:"warning"})
      console.log(e)
    }
  }

</script>

<style>
.dynamic-from-base{
  max-width: 90%;
  min-height: 300px;
  margin: auto;
}

.table-header-cell{
  text-align: center;
}

.table-form-item{
  margin-bottom: 0px;

}

</style>