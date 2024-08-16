<!--
 * @Author: xudan
 * @Date: 2024-07-16 15:37:16
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-12 13:46:34
 * @Description: home page
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
-->
<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div class="sys-title">后台管理系统</div>
                <div class="header-right">
                    <span>首页</span>
                    <span>头像</span>
                    <span>admin</span>
                    <span>退出</span>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu>
                        <div v-for="(menu, index) in routes">
                            <el-sub-menu :index="menu.title" v-if="menu.children.length > 1">
                                <template #title>
                                    <span>{{ menu.title }}</span>
                                </template>
                                <router-link v-for="(item, index) in menu.children"  :to="item.path" >
                                    <el-menu-item :index="item.path"> {{ item.meta.title }} </el-menu-item>
                                </router-link>
                            </el-sub-menu>
                            <router-link :to="menu.children[0].path" v-else>
                                <el-menu-item :index="menu.children[0].path">{{ menu.title }}</el-menu-item>
                            </router-link>
                        </div>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped lang="less">
.common-layout {
    height: 100%;

    .el-header {
        background-color: aqua
    }

    .el-container {
        height: 100%;
        background-color: bisque;
    }
}
</style>

<script setup>
import { routes } from '@/common/routeConfig';

</script>