import { createStore, combineReducers } from "redux";
import { versionManag } from "./reducers/switchVersion";
import { networkManag } from "./reducers/switchNetwork";

const rootReducers = combineReducers({ versionManag, networkManag });
// 全局就管理一个store
export const store = createStore(rootReducers);
