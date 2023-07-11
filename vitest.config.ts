/**
 * @author baoyuhao
 * @date 2023/7/11 16:44:14
 * @description ViTest配置文件
 * @version 0.1.0
 */
/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
  }
});
