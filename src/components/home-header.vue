<template>
    <div class="toolbar">
      <el-icon @click="changeFold" style="margin-right: 5px; margin-top:1px" :size="20">
        <component :is="Expand" v-if="isCollapse"></component>
        <component :is="Fold" v-else></component>
      </el-icon>
      <span style="font-size:16px">{{router.currentRoute.value.meta.title}}</span>
      <span style="flex:1; text-align: center; font-size:28px;"></span>
      <span>{{currentUser ? currentUser.nickName : '小明'}}</span>
      <el-dropdown @command="commandHandle">
        <el-icon style="margin-right: 8px; margin-top: 1px; margin-left: 4px;">
          <arrow-down></arrow-down>
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="person">个人中心</el-dropdown-item>
            <el-dropdown-item command="exit">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
</template>

<script setup>
import { ArrowDown, Expand, Fold} from '@element-plus/icons-vue'
import { defineEmits, defineProps, toRefs } from 'vue';
import router from "@/router/router";
const currentUser = JSON.parse(sessionStorage.getItem("CurrentUser"))
console.log("currentUser", currentUser)
const emit = defineEmits(['foldHandle'])
const props = defineProps(['isCollapse'])
const {isCollapse} = toRefs(props)

const commandHandle = (command)=>{
  switch (command){
    case "person":
      console.log("Header:To Page Me")
      router.push("/home/me");break;
    case "exit":
      console.log("Header:Log out")
      sessionStorage.removeItem("CurrentUser");
      router.push("/");break;
  }
}
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

  border-bottom: darkgray 2px solid;
}
</style>