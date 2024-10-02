<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import LayoutHead from './component/LayoutHead.vue';
import LayoutFoot from './component/LayoutFoot.vue';

</script>

<template>
   <LayoutHead/>
   <RouterView/><!--二级路由出口-->
   <LayoutFoot/>
</template>