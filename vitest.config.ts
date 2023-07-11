/**
 * @author baoyuhao
 * @date 2023/7/11 16:44:14
 * @description Vitest配置文件
 * @version 0.1.0
 * Tips：Vitest 需要 Vite >=v3.0.0 和 Node >=v14.18
 */

/// <reference types="vitest" />
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    Vue()
  ],
  test: {
    globals: true,
    environment: "jsdom"
  }
});
