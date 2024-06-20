/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {


        backgroundImage: {
            "signUp-gradient": "linear-gradient(224.55deg, rgba(5, 191, 219, 0.8) 0%, rgba(10, 77, 104, 0.8) 100%)",
        },

        screens: {

            "xs": '300px',

            'sx': '450px',

            'sm': '640px',

            'md': '768px',

            'lg': '1024px',

            'xl': '1280px',

            '2xl': '1536px',

        },

    },
    plugins: [],
}
