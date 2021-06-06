import UniversalRouter from "universal-router";

const routes = [
    {
        path: "/", // optional
        action: () => `<h1>Home</h1>`,
    },
    {
        path: "/posts",
        action: () => console.log("checking child routes for /posts"),
        children: [
            {
                path: "", // optional, matches both "/posts" and "/posts/"
                action: () => `<h1>Posts</h1>`,
            },
            {
                path: "/:id",
                action: (context) => `<h1>Post #${context.params.id}</h1>`,
            },
        ],
    },
    {
        path: "",
        action: () => console.log(context.path),
    },
    {
        path: "/que-hacemos",
        action: () => console.log(context.path),
    },
    {
        path: "/objetivos",
        action: () => console.log(context.path),
    },
    {
        path: "/mision",
        action: () => console.log(context.path),
    },
    {
        path: "/valores",
        action: () => console.log(context.path),
    },
    {
        path: "/accesibilidad",
        action: () => console.log(context.path),
    },
    {
        path: "/terminos_y_condiciones",
        action: () => console.log(context.path),
    },
    {
        path: "/privacidad",
        action: () => console.log(context.path),
    },
    {
        path: "/cookies",
        action: () => console.log(context.path),
    },
];

const router = new UniversalRouter(routes);

export default router;
