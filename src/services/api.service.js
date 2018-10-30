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

function postApi(endPoint, data) {
    const fullURL = endPoint.indexOf(API_ROOT) === -1 ? API_ROOT + endPoint : endPoint;

    return fetch(fullURL, {
        method: 'POST',
        body: data
    }).then((response) => {
        if (!response.ok) {
            return Promise.reject(response.json);
        }
        return response.json();
    }).then(
        response => ({ response }),
        error => ({ error: error.message || 'Something really went wrong' })
    );

}

const uploadImage = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append('image', data);
    return formData;
}

export const fetchCategory = () => callApi(`category`);
export const uploadBlogImage = data => postApi(`blog/picture`, uploadImage(data));
// export const uploadImage = data => postApi(     , data);