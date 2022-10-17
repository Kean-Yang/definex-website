/**
 *
 * @author
 * @create
 */

import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import { PagesRouters, RouteType } from './app.pages.route';
import PageHeader from '../components/Header/index';
// import SwitchNetwork from "../components/UnlockWallet/network.tsx";
// import Overheated from "../components/Modal/Overheated.tsx";
import './app.layout.scss';
// import { useTranslation } from 'react-i18next';
const { Content } = Layout;

const DdRoute = () => {
    // const { t } = useTranslation();

    return (
        <Layout className="app-layout">
            <PageHeader />
            {/* <SwitchNetwork text={t('maintenanceContent')} visible={true} /> */}
            {/* {t('v1_overheated') ? <Overheated text={t('v1_overheated')} deadline={Number(t('deadline'))} visible={true} /> : ""} */}
            <Content className="layout-content">
                {PagesRouters.map((route) => (
                    <Route
                        exact={route.exact}
                        path={route.pathname}
                        key={route.pathname}
                        render={(routePorps: RouteType) => (
                            <route.component {...routePorps} />
                        )}
                    />
                ))}
            </Content>
        </Layout>
    );
};

export default DdRoute;
