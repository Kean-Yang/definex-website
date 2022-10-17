/**
 * 页面路由
 * @author
 * @create
 */

import { lazy } from 'react';

export interface RouteType {
    pathname: string;
    component: any;
    exact: boolean;
    key?: string;
    title?: string;
    icon?: string;
    children?: RouteType[];
}

export const PagesRouters: RouteType[] = [
    {
        pathname: '/dashboard',
        component: lazy(() => import('../pages/dashboard')),
        exact: true,
        key: 'Dashboard',
        title: 'Dashboard',
    },
    {
        pathname: '/vote',
        component: lazy(() => import('../pages/vote')),
        exact: true,
        key: 'Vote',
        title: 'Vote',
    },
    {
        pathname: '/vote/details',
        component: lazy(() => import('../pages/vote/details')),
        exact: true,
        key: 'VoteDetails',
        title: 'Vote details',
    },
];
