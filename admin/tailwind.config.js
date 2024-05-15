/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    darkMode: true,
    content: [
        './pages/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
