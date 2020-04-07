import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Table from './views/nav1/Table.vue'
import echarts from './views/charts/echarts.vue'
import purchasedecharts from './views/charts/purchased-echarts'
import Main from './views/nav1/Main'
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '团队成员',
        iconCls: 'el-icon-message',//图标样式class
        children:[
            {path:'Main',component:Main,name:'团队成员'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '书籍管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/puchased-table', component: Table, name: '已购书籍管理' },
            { path: '/stored-table', component: Table, name: '书籍管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据分析',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/data-analysis', component: echarts, name: '库存书籍分析' },
            { path: '/purchased-data-analysis',component: purchasedecharts, name: '已购书籍分析'}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];
export default routes;
