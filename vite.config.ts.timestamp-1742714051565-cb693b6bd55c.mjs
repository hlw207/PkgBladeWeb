// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/49925/Desktop/bishe/PkgBladeWeb/node_modules/vite/dist/node/index.js";
import Vue from "file:///C:/Users/49925/Desktop/bishe/PkgBladeWeb/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///C:/Users/49925/Desktop/bishe/PkgBladeWeb/node_modules/vite-plugin-pages/dist/index.js";
import Layouts from "file:///C:/Users/49925/Desktop/bishe/PkgBladeWeb/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Components from "file:///C:/Users/49925/Desktop/bishe/PkgBladeWeb/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///C:/Users/49925/Desktop/bishe/PkgBladeWeb/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { createStyleImportPlugin, ElementPlusResolve } from "file:///C:/Users/49925/Desktop/bishe/PkgBladeWeb/node_modules/vite-plugin-style-import/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/49925/Desktop/bishe/PkgBladeWeb/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    Vue(),
    Pages({
      dirs: "src/pages",
      // 需要生成路由的文件目录
      exclude: ["**/components/*.vue"],
      // 排除在外的目录，即不将所有 components 目录下的 .vue 文件生成路由
      extendRoute(route) {
        if (route.path === "/") {
          return {
            ...route,
            redirect: "/pkgBlade/project"
          };
        } else if (route.path === "/pkgBlade") {
          return {
            ...route,
            redirect: "/pkgBlade/project"
          };
        }
      }
    }),
    Layouts({
      // 如果是默认 layouts文件夹，默认 default.vue文件，则不需要配置
      layoutsDirs: "src/layouts",
      defaultLayout: "default"
    }),
    Components({
      extensions: ["vue"],
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass"
        })
      ],
      dts: "src/components.d.ts"
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()]
    })
  ],
  server: {
    port: 5174,
    //端口号
    host: true
    //ip地址 或 '0.0.0.0' 或 "loaclhost"
    // open: false, //启动后是否自动打开浏览器
    // https: false, // 是否开启 https
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "~": fileURLToPath(new URL("./public", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw0OTkyNVxcXFxEZXNrdG9wXFxcXGJpc2hlXFxcXFBrZ0JsYWRlV2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw0OTkyNVxcXFxEZXNrdG9wXFxcXGJpc2hlXFxcXFBrZ0JsYWRlV2ViXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy80OTkyNS9EZXNrdG9wL2Jpc2hlL1BrZ0JsYWRlV2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcbmltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgeyBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbiwgRWxlbWVudFBsdXNSZXNvbHZlIH0gZnJvbSAndml0ZS1wbHVnaW4tc3R5bGUtaW1wb3J0J1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIFZ1ZSgpLFxuICAgIFBhZ2VzKHtcbiAgICAgIGRpcnM6ICdzcmMvcGFnZXMnLCAgLy8gXHU5NzAwXHU4OTgxXHU3NTFGXHU2MjEwXHU4REVGXHU3NTMxXHU3Njg0XHU2NTg3XHU0RUY2XHU3NkVFXHU1RjU1XG4gICAgICBleGNsdWRlOiBbJyoqL2NvbXBvbmVudHMvKi52dWUnXSwgIC8vIFx1NjM5Mlx1OTY2NFx1NTcyOFx1NTkxNlx1NzY4NFx1NzZFRVx1NUY1NVx1RkYwQ1x1NTM3M1x1NEUwRFx1NUMwNlx1NjI0MFx1NjcwOSBjb21wb25lbnRzIFx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NCAudnVlIFx1NjU4N1x1NEVGNlx1NzUxRlx1NjIxMFx1OERFRlx1NzUzMVxuICAgICAgZXh0ZW5kUm91dGUocm91dGUpIHtcbiAgICAgICAgaWYgKHJvdXRlLnBhdGggPT09ICcvJykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5yb3V0ZSxcbiAgICAgICAgICAgIHJlZGlyZWN0OiAnL3BrZ0JsYWRlL3Byb2plY3QnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJvdXRlLnBhdGggPT09ICcvcGtnQmxhZGUnKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnJvdXRlLFxuICAgICAgICAgICAgcmVkaXJlY3Q6ICcvcGtnQmxhZGUvcHJvamVjdCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSxcbiAgICBMYXlvdXRzKHtcbiAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NjYyRlx1OUVEOFx1OEJBNCBsYXlvdXRzXHU2NTg3XHU0RUY2XHU1OTM5XHVGRjBDXHU5RUQ4XHU4QkE0IGRlZmF1bHQudnVlXHU2NTg3XHU0RUY2XHVGRjBDXHU1MjE5XHU0RTBEXHU5NzAwXHU4OTgxXHU5MTREXHU3RjZFXG4gICAgICBsYXlvdXRzRGlyczogJ3NyYy9sYXlvdXRzJyxcbiAgICAgIGRlZmF1bHRMYXlvdXQ6ICdkZWZhdWx0JyxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIGV4dGVuc2lvbnM6IFsndnVlJ10sXG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlL10sXG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcih7XG4gICAgICAgICAgaW1wb3J0U3R5bGU6ICdzYXNzJyxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgICAgZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cycsXG4gICAgfSksXG4gICAgY3JlYXRlU3R5bGVJbXBvcnRQbHVnaW4oe1xuICAgICAgcmVzb2x2ZXM6IFtFbGVtZW50UGx1c1Jlc29sdmUoKV0sXG4gICAgfSksXG4gIF0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDUxNzQsLy9cdTdBRUZcdTUzRTNcdTUzRjdcbiAgICBob3N0OiB0cnVlLC8vaXBcdTU3MzBcdTU3NDAgXHU2MjE2ICcwLjAuMC4wJyBcdTYyMTYgXCJsb2FjbGhvc3RcIlxuICAgIC8vIG9wZW46IGZhbHNlLCAvL1x1NTQyRlx1NTJBOFx1NTQwRVx1NjYyRlx1NTQyNlx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NkQ0Rlx1ODlDOFx1NTY2OFxuICAgIC8vIGh0dHBzOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU1RjAwXHU1NDJGIGh0dHBzXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAnfic6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9wdWJsaWMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1QsU0FBUyxlQUFlLFdBQVc7QUFFelYsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBVztBQUNsQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFDcEMsU0FBUyx5QkFBeUIsMEJBQTBCO0FBUnVJLElBQU0sMkNBQTJDO0FBV3BQLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxNQUNKLE1BQU07QUFBQTtBQUFBLE1BQ04sU0FBUyxDQUFDLHFCQUFxQjtBQUFBO0FBQUEsTUFDL0IsWUFBWSxPQUFPO0FBQ2pCLFlBQUksTUFBTSxTQUFTLEtBQUs7QUFDdEIsaUJBQU87QUFBQSxZQUNMLEdBQUc7QUFBQSxZQUNILFVBQVU7QUFBQSxVQUNaO0FBQUEsUUFDRixXQUNTLE1BQU0sU0FBUyxhQUFhO0FBQ25DLGlCQUFPO0FBQUEsWUFDTCxHQUFHO0FBQUEsWUFDSCxVQUFVO0FBQUEsVUFDWjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxRQUFRO0FBQUE7QUFBQSxNQUVOLGFBQWE7QUFBQSxNQUNiLGVBQWU7QUFBQSxJQUNqQixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxZQUFZLENBQUMsS0FBSztBQUFBLE1BQ2xCLFNBQVMsQ0FBQyxVQUFVLFlBQVk7QUFBQSxNQUNoQyxXQUFXO0FBQUEsUUFDVCxvQkFBb0I7QUFBQSxVQUNsQixhQUFhO0FBQUEsUUFDZixDQUFDO0FBQUEsTUFDSDtBQUFBLE1BQ0EsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLElBQ0Qsd0JBQXdCO0FBQUEsTUFDdEIsVUFBVSxDQUFDLG1CQUFtQixDQUFDO0FBQUEsSUFDakMsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBR1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDcEQsS0FBSyxjQUFjLElBQUksSUFBSSxZQUFZLHdDQUFlLENBQUM7QUFBQSxJQUN6RDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
