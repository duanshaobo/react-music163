import React from 'react';
// 导入路由组件
const Recommend=React.lazy(()=>import('../pages/Recommend'));
const Hot=React.lazy(()=>import('../pages/Hot'));
const Search=React.lazy(()=>import('../pages/Search'));
const SongList=React.lazy(()=>import('../pages/SongList'));
const Play=React.lazy(()=>import('../pages/Play'));
const NotFound=React.lazy(()=>import('../pages/NotFound'));



// 定义路由规则数组
const routes=[
    {
        path:'/',
        to:'/recommend',
        exact:true
    },
    {
        path:'/recommend',
        component:Recommend,
        exact:false
    },
    {
        path:'/hot',
        component:Hot,
        exact:false
    },
    {
        path:'/search',
        component:Search,
        exact:false
    },
    // 动态路由
    {
        path:'/songlist/:id',
        component:SongList,
        exact:false
    },
    {
        path:'/play/:id',
        component:Play,
        exact:true
    },
    {
        path:'*',
        component:NotFound,
        exact:false
    }
];

// 导出
export default routes;
