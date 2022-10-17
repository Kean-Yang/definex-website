import React from 'react';
import {
    incrementAction,
    reduceAction,
    mapStateToProps,
    mapDispatchToProps,
} from '../../redux/reducers/switchVersion';
import {
    useDispatch,
    useSelector,
    shallowEqual,
    connect,
    useStore,
} from 'react-redux';
import './test.scss';

// @(connect( mapStateToProps, mapDispatchToProps ) as any)
// export default class Home extends Component<Props, any> {

const Home = (props: any) => {
    const version = useSelector(
        (state) => state.versionManag.version,
        shallowEqual
    );
    const reduxChainId = useSelector(
        (state) => state.networkManag.chainId,
        shallowEqual
    );
    const dispatch = useDispatch();

    const store = useStore();
    const state = store.getState();
    console.log(state);

    return (
        <div className="container">
            <p
                onClick={() => {
                    dispatch(incrementAction);
                }}
            >
                click to increment num
            </p>
            <p
                onClick={() => {
                    dispatch(reduceAction);
                }}
            >
                click to decrement num
            </p>
            <p>{version}</p>
            <p>{reduxChainId}</p>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
