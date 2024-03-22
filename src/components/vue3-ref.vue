<template>
    <div>
        <h1>姓名:{{ name }}</h1>
        <h1>年龄:{{ age }}</h1>
        <h1>公司:{{ company }}</h1>
        <h1>产品:{{ obj.taobao }}</h1>
        <button @click="btn">视图中的某个数据</button>
    </div>
</template>

<script>
// ref实现响应式 ref是一个封装
    import { ref } from 'vue';
    export default({
        setup(){
            const btn = ()=>{
                console.log("btn clicked!!!")
                name.value = "另一个马某"
            }
            var name = ref("马某")
            const age = 50
            const company = "ali"
            const obj = {taobao:"淘宝", tmall:"天猫"}
            return {name, age, company, obj, btn}
        }
    })
</script>