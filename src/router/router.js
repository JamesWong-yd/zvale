import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@/views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/model',
        icon: 'android-apps',
        title: '版块管理',
        name: 'model',
        component: Main,
        children: [
            { path: '/model', title: '版块管理', name: 'model_index', component: resolve => { require(['@/views/model/model.vue'], resolve); } }
        ]
    },
    {
        path: '/resource',
        icon: 'images',
        title: '资源管理',
        name: 'resource',
        access: 1,
        component: Main,
        children: [
            { path: '/resource', title: '资源管理', name: 'resource_index', component: resolve => { require(['@/views/resource/resource.vue'], resolve); } }
        ]
    },
    {
        path: '/article',
        icon: 'ios-paper',
        title: '文章管理',
        name: 'article',
        access: 1,
        component: Main,
        children: [
            { path: '/article', title: '文章管理', name: 'article_index', component: resolve => { require(['@/views/article/article.vue'], resolve); } }
        ]
    },
    {
        path: '/web-setting',
        icon: 'ios-settings-strong',
        title: '网站配置',
        name: 'websetting',
        component: Main,
        children: [
            { path: '/web-setting', title: '基础配置', name: 'websetting_index', access: 1, component: resolve => { require(['@/views/syssetting/base/base.vue'], resolve); } },
            { path: '/websetting_header', title: '头部模型', name: 'websetting_header', component: resolve => { require(['@/views/syssetting/header/header.vue'], resolve); } },
            { path: '/websetting_footer', title: '尾部模型', name: 'websetting_footer', component: resolve => { require(['@/views/syssetting/footer/footer.vue'], resolve); } },
            { path: '/websetting_model', title: '版块模型', name: 'websetting_model', component: resolve => { require(['@/views/syssetting/model/model.vue'], resolve); } }
        ]
    },
    {
        path: '/msg-manage',
        icon: 'email',
        title: '站内消息',
        name: 'msgManage',
        access: 1,
        component: Main,
        children: [
            { path: '/msg-manage', title: '站内消息', name: 'msgManage_index', component: resolve => { require(['@/views/message/messageM.vue'], resolve); } }
        ]
    },
    {
        path: '/account',
        icon: 'person-stalker',
        title: '用户管理',
        name: 'account',
        access: 1,
        component: Main,
        children: [
            { path: '/account', title: '用户管理', name: 'account_index', component: resolve => { require(['@/views/account/account.vue'], resolve); } }
        ]
    },
    {
        path: '/access',
        icon: 'android-alert',
        name: 'access',
        title: '系统权限',
        component: Main,
        children: [
            { path: '/access', title: '系统权限', name: 'access_index', component: resolve => { require(['@/views/access/access.vue'], resolve); } }
        ]
    },
    {
        path: '/logs',
        icon: 'clipboard',
        title: '日志审计',
        name: 'logs',
        access: 1,
        component: Main,
        children: [
            { path: '/logs', title: '日志审计', name: 'logs_index', component: resolve => { require(['@/views/logs/logs.vue'], resolve); } }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
