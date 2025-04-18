/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',  // Optional if using App Router only
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
