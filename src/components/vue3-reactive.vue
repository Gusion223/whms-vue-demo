<template>
    <div>
        <h1>姓名:{{ name }}</h1>
        <h1>年龄:{{ age }}</h1>
        <h1>产品:{{ obj.taobao }}</h1>
        <button @click="btn">视图中的某个数据</button>
    </div>
</template>

<script>
import { reactive } from 'vue'

// ref实现响应式 ref是一个封装
    export default({
        setup(){
            const btn = ()=>{
                console.log("btn clicked!!!")
                obj.taobao = "Timi"
            }
            var name = "马某"
            var age = 50
            var obj = reactive({taobao:"淘宝"})

            return {name, age, obj, btn}
        }
    })
</script>