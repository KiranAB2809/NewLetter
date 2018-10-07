import 'isomorphic-fetch';

const API_ROOT = 'http://localhost:8000/api/';

function callApi(endPoint, id = '') {
    const fullURL = ((endPoint.indexOf(API_ROOT) === -1) ? API_ROOT + endPoint : endPoint) + (id ? '/' + id : '');

    return fetch(fullURL)
        .then(response =>
            response.json().then(json => ({ json, response }))
        ).then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
        .then(
            response => ({ response }),
            error => ({ error: error.message || 'Something really went wrong' })
        );
}

export const fetchCategory = () => callApi(`category`);