# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.


```
创建项目
npm init vite

安装依赖
npm install vue-router@next vuex@next axios
npm install

运行项目
npm run dev

安装element-plus
npm install element-plus --save

按需导入 - 自动导入
npm install -D unplugin-vue-components unplugin-auto-import

配置vite
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default {
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```

## typescript 忽略路径检测
```javascript
// 根目录下创建文件 shims-vue.d.ts 
declare module "*.vue" {
    // 从 "vue" 中导入 DefineComponent 类型
    import { DefineComponent } from "vue";
    // 定义一个类型为 DefineComponent 的变量 component
    // 它具有三个泛型参数，分别表示组件的 props、组件的 data 和其他的类型。
    // 在这里，我们使用空对象（{}）表示没有 props，使用空对象（{}）表示没有 data，使用 any 表示其他类型可以是任意值。
    const component: DefineComponent<{}, {}, any>;
    // 导出 component 变量，这样其他地方在导入 ".vue" 文件时，TypeScript 编译器会将它识别为一个 Vue 组件
    export default component;
}

// 配置tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
}
```

## Vue实例全局挂载方法
```javascript
// 也可直接写在main.ts
import { App} from 'vue'
import http from '@/http'
export const registerCommon = (app: App<Element>) => {
    app.config.globalProperties.$http = http; // 全局挂载http请求方法
}

// http/index.ts
import axios from 'axios'

let instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000, // 超时时长
})

/**
 * @description: 请求拦截
 * @param {*} param1
 * @param {*} param2
 * @return {*}
 */
instance.interceptors.request.use((config) => {
    // 请求拦截需处理的内容
    // ...
    return config
}, (error) => {
    console.log('请求失败，' + error)
    return Promise.reject(error)
})

/**
 * @description: 响应拦截
 * @param {*} param1
 * @param {*} param2
 * @return {*}
 */
instance.interceptors.response.use((response) => {
    // 响应拦截需处理的内容
    // ...
    return response
}, (error) => {
    console.log('响应失败，' + error)
    return Promise.reject(error)
})

/**
 * @description: 封装http请求
 * @param {*} option 配置对象，属性包括:
 * path: 请求地址,
 * method: 请求方法,
 * params: 请求数据,
 * @return {*}
 */
async function http(option: { method?: string, path?: string, params?: any } = {}) {
    let result = null;
    
    if(option.method == 'get'  || option.method == 'delete') {
        await instance[option.method](
            option.path || '', // Provide a default value for option.path
            {
                params: option.params
            }
        ).then(res=> {
            console.log(res);
            result = res
        }).catch(err => {
            console.log(err);
            result = err
        })
        // return instance.get(option.path || '', {params: option.params}) // Provide a default value for option.path
    }else if(option.method == 'post'  || option.method == 'put') {
        await instance[option.method](
            option.path || '',
            option.params
        ).then(res=> {
            console.log(res);
            result = res
        }).catch(err => {
            console.log(err);
            result = err
        })
    }

    return result
}

export default http

```

## Vue全局注入方法

```javascript
// main.ts
app.provide('$increment', increment);

// 模板中使用
import { inject } from 'vue'
const incrment_num = inject('$increment')

```