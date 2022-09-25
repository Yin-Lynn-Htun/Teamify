/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'main-background': '#030812',
                'text-dark': '#3C485D',
                'text-darker': '#202123',
                'text-blue': '#8393AF',
                'border-blue': '#10599f',
                'text-green': '#00FFD1',
                'background-main': '#030812',
                'text-pink': '#FD3E71',

                'button-blue': '#24478c',

                'form-gray': '#252525',
            },
        },
    },
    plugins: [],
}
