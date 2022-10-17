import { buildEnv, CHAINID } from "../config";
// 获取当前账户
export const getAccount = () => {
    let account = window.localStorage.getItem('account') || '';
    return account;
};

// 切换账户
export const switchAccount = (account: any) => {
    window.localStorage.setItem('account', account);
};


// v1 v2 版本切换
export const switchVersion = (version: any) => {
    window.localStorage.setItem('version', version || "v2");
};

// 获取当前版本
export const getVersion = () => {
    return window.localStorage.getItem('version') || 'V2';
};

// 切换网络
export const switchNetwork = (network: any) => {
    window.localStorage.setItem('network', network || buildEnv);
};

// 获取当前网络
export const getNetwork = () => {
    return window.localStorage.getItem('network') || buildEnv;
};


// 切换网络
export const switchChainId = (chainId: any) => {
    window.localStorage.setItem('chainId', chainId || CHAINID);
};

// 获取当前网络
export const getChainId = () => {
    return window.localStorage.getItem('chainId') || CHAINID;
};