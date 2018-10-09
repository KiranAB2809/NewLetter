import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import { api } from '../../services';
import { getCategory } from '../reducers/selector.reducer';

const { category } = actions;

function* fetchEntity(entity, apiFn, id, url) {
    yield put(entity.request(id))
    const { response, error } = yield call(apiFn, url || id);
    if (response)
        yield put(entity.success(response))
    else
        yield put(entity.failure(error))
}

export const fetchCategory = fetchEntity.bind(null, category, api.fetchCategory);

function* loadCategory(){
    const categories = yield select(getCategory);
    if(categories.length > 0){
        yield put(category.success(categories));
    } else {
        yield call(fetchCategory)
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Watchers///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

export function* watchLoadCategory(){
    yield takeLatest(actions.LOAD_CATEGORY, loadCategory)
}
