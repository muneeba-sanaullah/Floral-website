export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-red-500',
    'text-white',
    'text-4xl',
    'p-10',
    { pattern: /^bg-/ },
    { pattern: /^text-/ },
    { pattern: /^p-/ }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
