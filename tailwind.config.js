const { colors } = require('@mui/material');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            position: {
                fixed: "fixed",
            },
            keyframes: {
                'slide-down': {
                    '0%': { 'margin-top': '-100px' },
                    '100%': { 'margin-top': '0' },
                },
            },
            animation: {
                'sliding-down': 'slide-down  0.95s ease forwards',
            },
            width: {
                '1802': '1802px',
            },
            fontFamily: {
                'futura': ['Futura-medium-bt', 'Sans-serif'],
            },
            customHeight: {
                '3': '3em',
            },
            colors: {
                'primary': '#E4E4E457',
            }
        },
    },

    plugins: [],
};
