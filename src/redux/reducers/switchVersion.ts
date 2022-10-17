

export const incrementAction = { type: 'v1', version: 'V1' };
export const reduceAction = { type: 'v2', version: "V2" };

const initVersion = {
    version: 'V2'
}

export const versionManag = (state: any = initVersion, action: any) => {
    switch (action.type) {
        case 'v1':
            return incrementAction;
        case "v2":
            return reduceAction;
        default:
            return state;
    }
}


export const mapStateToProps = (state: any) => {
    return {
        version: state.versionManag.version
    };
};

export const mapDispatchToProps = (dispatch: any) => ({
    increment: () => dispatch(incrementAction),
    decrement: () => dispatch(reduceAction)
});






