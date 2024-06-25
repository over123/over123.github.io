<template>
    <div>
        {{ a.name }}
        <button @click="changeA">changeA</button>
        {{ b.name }}
        <button @click="changeB">changeB</button>
    </div>
</template>

<script setup lang='ts'>
        import {nextTick, reactive} from  'vue';
        let a = reactive({name:'a'})
        let b = {name:'b'}
        function changeA(){
            a.name = 'aa' + Math.random()
        }
        async function changeB(){
            b.name = 'bb' + Math.random()
            await nextTick();
        }
        // 注意：虽然b不是一个reactive对象，但它是一个普通的JavaScript对象。当我们更新a.name时，整个模板会重新渲染，并重新计算和更新模板中的所有表达式。由于b.name也是一个模板表达式，它会被重新计算并显示新的值。
        
</script>

<style scoped lang='less'>

</style>