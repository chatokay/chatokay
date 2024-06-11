import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

export default defineConfig(async () => {
  return {
    resolve: {
      alias: {
        '~/': `${path.resolve('src')}/`,
      },
    },
    plugins: [
      // https://github.com/posva/unplugin-vue-router
      VueRouter({
        dts: './types/typed-router.d.ts',
      }),

      Vue(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          '@vueuse/core',
          VueRouterAutoImports,
          {
            // add any other imports you were relying on
            'vue-router/auto': ['useLink'],
            'vue-i18n': ['useI18n'],
          },
        ],
        dts: './types/auto-imports.d.ts',
        dirs: [
          './src/use',
          './src/helpers',
        ],
        vueTemplate: true,
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: './types/components.d.ts',
        dirs: ['./src/components'],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),

      // https://github.com/antfu/unocss
      // see uno.config.ts for config
      UnoCSS(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/styles/vars.scss" as *;`,
        },
      },
    },
    server: {
      port: 4000,
    },
  }
})
