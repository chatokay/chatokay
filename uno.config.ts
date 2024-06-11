import { defineConfig, presetIcons, presetMini, presetUno } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: 'var(--el-color-primary)',
      secondary: 'var(--el-text-color-secondary)',
      success: 'var(--el-color-success)',
      danger: 'var(--el-color-danger)',
      warning: 'var(--el-color-warning)',
      muted: 'var(--color-muted)',
    },
  },
  safelist: [],
  shortcuts: [
    {
      'border': ['border', 'border-[var(--el-border-color)]', 'border-solid'],
      'border-light': ['border-[var(--el-border-color-lighter)]'],
      'border-lighter': ['border-[var(--el-border-color-extra-light)]'],
      'border-top': ['border-t', 'border-t-[var(--el-border-color)]', 'border-t-solid', 'border-1px'],
      'border-right': ['border-r', 'border-r-[var(--el-border-color)]', 'border-r-solid', 'border-1px'],
      'border-bottom': ['border-b', 'border-b-[var(--el-border-color)]', 'border-b-solid', 'border-1px'],
      'border-left': ['border-l', 'border-l-[var(--el-border-color)]', 'border-l-solid', 'border-1px'],
    },
  ],
  presets: [
    presetMini(),
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
})
