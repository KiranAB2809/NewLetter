import {all, fork} from 'redux-saga/effects';
import * as watchers from './saga';

export default function* root() {
    yield all([
        fork(watchers.watchLoadCategory)
    ]);
}