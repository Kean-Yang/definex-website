import config from '../config';
const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');


export cosnt Api = async () => {
    const wsProvider = new WsProvider(config.PROVIDER_SOCKET);
    return await ApiPromise.create({
        provider: wsProvider,

        types: {
            PoolId: 'u64',
        },
    });
}