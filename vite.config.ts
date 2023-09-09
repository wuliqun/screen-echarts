import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);
  return {
    mode,
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    // 强制预构建插件包
    optimizeDeps: {
      //检测需要预构建的依赖项
      entries: [],
      //默认情况下，不在 node_modules 中的，链接的包不会预构建
      include: ["axios", "vue", "echarts"],
      exclude: [], //排除在优化之外
      force: true,
    },
    //本地运行配置，以及反向代理配置
    server: {
      host: "0.0.0.0",
      https: false, //是否启用 http 2
      cors: true, //为开发服务器配置 CORS , 默认启用并允许任何源
      // open: true, //服务启动时自动在浏览器中打开应用
      strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
      hmr: true, //禁用或配置 HMR 连接 true 时 热部署
      // 传递给 chockidar 的文件系统监视器选项
      watch: {
        ignored: ["!**/node_modules/**"],
      },
      // 反向代理配置
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 后台地址
          target: "https://api.imooc-web.lgdsunday.club/api",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
  };
});
