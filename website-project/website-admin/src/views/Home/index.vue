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
                        <!-- <el-sub-menu index="/">
                            <template #title>
                                <span>个人中心1</span>
                            </template>
                        </el-sub-menu> -->
                        <el-sub-menu index="/">
                            <template #title>
                                <span>个人中心</span>
                            </template>
                            <router-link to="/users/personal">
                                <el-menu-item index="/users/personal">个人资料</el-menu-item>
                            </router-link>
                            <router-link to="/users/password">
                                <el-menu-item index="/users/password">修改密码</el-menu-item>
                            </router-link>
                        </el-sub-menu>
                        <el-menu-item index="/users/password1">一级导航</el-menu-item>
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
.common-layout{
    height: 100%;

    .el-header {
        background-color: aqua
    }

    .el-container{
        height: 100%;
        background-color: bisque;
    }
}
</style>