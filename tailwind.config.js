/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode : 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{ts,tsx}'
    ],
    theme: {
        extend: {
            colors : {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                background: 'var(--color-background)',
                text: 'var(--color-text)'
            },
            fontFamily: {
                dosis: ['var(--font-dosis)'],
                baskerville: ['var(--font-baskerville)'],
                orbitron: ['var(--font-orbitron)'],
                rowdies: ['var(--font-rowdies)'],
                shafarik: ['var(--font-shafarik)'],
                yuji: ['var(--font-yuji)'],
            },
        },
    },
    plugins: [],
}
