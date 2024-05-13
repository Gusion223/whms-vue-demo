<template>
    <div class="toolbar">
      <el-icon @click="changeFold" style="margin-right: 5px; margin-top:1px" :size="20">
        <component :is="Expand" v-if="isCollapse"></component>
        <component :is="Fold" v-else></component>
      </el-icon>
      <span style="flex:1; text-align: center; font-size:28px;">欢迎来到商城管理系统</span>
      <span>王小虎</span>
      <el-dropdown>
        <el-icon style="margin-right: 8px; margin-top: 1px; margin-left: 4px;">
          <arrow-down></arrow-down>
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>添加</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
</template>

<script setup>
import { ArrowDown, Expand, Fold} from '@element-plus/icons-vue'
import { defineEmits, defineProps, toRefs } from 'vue';

const emit = defineEmits(['foldHandle'])
const props = defineProps(['isCollapse'])
const {isCollapse} = toRefs(props)

const changeFold = ()=>{
  emit("foldHandle")
  console.log("clicked icon")
}

// @click
// const view = ()=>{
//   alert("点击了查看按钮")
// }


</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  right: 20px;
  border-bottom: darkgray 2px solid;
}
</style>