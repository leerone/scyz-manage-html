const routers = [
    {
        path: '/index',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    }
];

/* 路由权限拦截 */
// routers.beforeEach((to, from, next) => {
//     if (to.meta.requestLogin) {
//         let loginName = localStorage.getItem("username");
//         if (loginName) {
//             next();
//         } else if (to.path === '/login') {
//             next();
//         } else {
//             next({
//                 path: "/login"
//             })
//         }
//     } else {
//         next();
//     }
// });

export default routers;