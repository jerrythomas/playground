const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles')
const { pass, fail, warn, info } = require('./colors.cjs')

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    } else {
      return `rgb(var(${variableName}))`
    }
  }
}
module.exports = {
  mode: 'aot',
  purge: {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    options: {
      defaultExtractor: (content) => [
        // If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
        ...tailwindExtractor(content),
        // Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
        ...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
          ([_match, group, ..._rest]) => group
        )
      ]
    },
    safelist: [/^svelte-[\d\w]+$/]
  },
  theme: {
    fontFamily: {
      mono: [
        'Victor Mono',
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Liberation Mono',
        'monospace'
      ]
    },
    extend: {
      colors: {
        pass,
        fail,
        warn,
        info
      },
      padding: {
        '1/3': '33.33333%',
        '2/3': '66.66667%'
      },

      textColor: {
        skin: {
          base: withOpacity('--color-text-base'),
          light: withOpacity('--color-text-light'),
          muted: withOpacity('--color-text-muted'),
          inverted: withOpacity('--color-text-inverted')
        }
      },
      backgroundColor: {
        skin: {
          fill: withOpacity('--color-fill'),
          'button-accent': withOpacity('--color-button-accent'),
          'button-accent-hover': withOpacity('--color-button-accent-hover'),
          'button-muted': withOpacity('--color-button-muted')
        }
      },
      gradientColorStops: {
        skin: {
          hue: withOpacity('--color-fill')
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp')
  ]
}
