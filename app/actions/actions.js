/**
 * @author Alexander Pyreev
 */
export const STARTING_REQUEST = 'STARTING_REQUEST';
export const FINISHED_REQUEST = 'FINISHED_REQUEST';

export const startingRequest = () => {
    return {
        type: STARTING_REQUEST,
    }
};

export const finishedRequest = (response) => {
    return {
        type: FINISHED_REQUEST,
        response: response,
    }
};

export const getGraph = (payload) => {
    return dispatch => {
        dispatch(startingRequest());
        return new Promise(function(resolve, reject) {
            let request=new XMLHttpRequest();
            request.open("POST", "/graphql", true);
            request.setRequestHeader("Content-Type",
                "application/graphql");
            request.send(payload);
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    resolve(request.responseText)
                }
            }
        }).then(response =>
            dispatch(finishedRequest(JSON.parse(response))))
    }
};