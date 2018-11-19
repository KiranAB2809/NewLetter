import {all, fork} from 'redux-saga/effects';
import * as watchers from './saga';

export default function* root() {
    yield all([
        fork(watchers.watchLoadCategory),
        fork(watchers.watchLoadUser),
        fork(watchers.watchLoadOtherUser),
        fork(watchers.watchLoadArticle),
        fork(watchers.watchUpdateUser),
        fork(watchers.watchLoadUserArticle),
        fork(watchers.watchUpdateArticle),
        fork(watchers.watchGetArticle),
        fork(watchers.watchLoadArticleReview),
        fork(watchers.watchReviewUpdateArticle),
        fork(watchers.watchUpdateOtherUser)
    ]);
}