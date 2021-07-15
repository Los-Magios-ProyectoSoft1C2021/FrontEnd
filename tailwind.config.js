module.exports = {
    purge: {
        enabled: true,
        mode: "all",
        preserveHtmlElements: false,
        content: [
            "./src/*.html",
            "./src/js/**/*.html",
            "./src/js/**/*.handlebars",
            "./src/*.js",
            "./src/**/.html",
            "./src/**/*.js",
            "./src/**/*.handlebars"
        ],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            ringColor: ['hover'],
            opacity: ['disabled'],
        },
    },
    plugins: [],
};
