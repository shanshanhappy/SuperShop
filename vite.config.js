import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//elementui 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
          //1.配置elementPlus采用sass样式配色系统
          ElementPlusResolver({importStyle:"sass"})
      ],
    }),
  
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行文件样式覆盖
        additionalData: `
        @use "@/styles/element/index.scss" as *;
         @use "@/styles/var.scss" as *;
        `
      }
    }
  },
  server:
  {
    proxy: {

      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/apis': {
        target: 'http://localhost:8080/SuperShop/customers/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apis/, ''),
      },
  }},
  
})
