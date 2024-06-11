import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'vue/first-attribute-linebreak': ['error', {
      multiline: 'beside',
      singleline: 'beside',
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 10,
      },
      multiline: {
        max: 1,
      },
    }],
  },
})
