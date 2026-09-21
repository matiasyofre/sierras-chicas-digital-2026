/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00685f',
        'primary-container': '#008378',
        'primary-fixed': '#89f5e7',
        'on-primary': '#ffffff',
        'on-primary-fixed': '#00201d',
        'on-primary-fixed-variant': '#005049',
        secondary: '#00687a',
        'secondary-container': '#57dffe',
        'secondary-fixed': '#acedff',
        'secondary-fixed-dim': '#4cd7f6',
        tertiary: '#755800',
        'tertiary-fixed': '#ffdf9a',
        'tertiary-fixed-dim': '#f7be1d',
        'tertiary-container': '#936f00',
        surface: '#f8f9ff',
        'surface-dim': '#cbdbf5',
        'surface-bright': '#f8f9ff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#eff4ff',
        'surface-container': '#e5eeff',
        'surface-container-high': '#dce9ff',
        'surface-container-highest': '#d3e4fe',
        'surface-variant': '#d3e4fe',
        'on-surface': '#0b1c30',
        'on-surface-variant': '#3d4947',
        outline: '#6d7a77',
        'outline-variant': '#bcc9c6',
        'inverse-surface': '#0b1c30',
        'inverse-on-surface': '#eaf1ff'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(11, 28, 48, 0.08), 0 1px 4px -1px rgba(11, 28, 48, 0.04)',
        'card': '0 8px 24px -6px rgba(11, 28, 48, 0.12), 0 2px 6px -2px rgba(11, 28, 48, 0.06)',
        'modal': '0 25px 50px -12px rgba(11, 28, 48, 0.25), 0 0 0 1px rgba(11, 28, 48, 0.08)'
      }
    },
  },
  plugins: [],
}
