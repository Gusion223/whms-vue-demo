<template>
  <div>
    <el-container class="layout-container-demo" style="height: 500px">
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu :default-openeds="['1']">
            <el-sub-menu index="1">
              <template #title>
                <el-icon><message /></el-icon>Navigator One
              </template>
              <el-menu-item-group title="Group 1">
                <el-menu-item index="1-1">Option 1</el-menu-item>
                <el-menu-item index="1-2">Option 2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group 2">
                <el-menu-item index="1-3">Option 3</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
    </el-container>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.layout-container-demo .el-header {
position: relative;
background-color: var(--el-color-primary-light-7);
color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
color: var(--el-text-color-primary);
background: var(--el-color-primary-light-8);
text-align: left;
}
.layout-container-demo .el-menu {
border-right: none;
}
.layout-container-demo .el-main {
padding: 0;
}
.layout-container-demo .toolbar {
display: inline-flex;
align-items: center;
justify-content: center;
height: 100%;
right: 20px;
}
</style>