module.exports = {
    purge: {
        enabled: false,
        mode: "all",
        preserveHtmlElements: false,
        content: ["./src/**/*.html", "./src/**/*.js"],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            backgroundColor: ['group-focus'],
            textColor: ['group-focus', 'focus-within'],
            ringColor: ['focus-within']
        },
    },
    plugins: [],
};
