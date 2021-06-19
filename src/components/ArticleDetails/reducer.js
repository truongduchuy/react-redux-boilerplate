import { put, call, takeLatest, fork } from 'redux-saga/effects';
import { callApi, createReducer, createAction } from 'utils';

export const FETCH_ARTICLE_DETAILS_REQUEST = 'FETCH_ARTICLE_DETAILS_REQUEST';
export const FETCH_ARTICLE_DETAILS_RESPONSE = 'FETCH_ARTICLE_DETAILS_RESPONSE';

export const FETCH_ARTICLE_DETAILS_ERROR = 'FETCH_ARTICLE_DETAILS_ERROR';

function* getArticleDetails(action) {
  try {
    const response = yield call(callApi, 'GET', `${process.env.REACT_APP_API_URL}/blogs/${action.payload}`);
    yield put(createAction(FETCH_ARTICLE_DETAILS_RESPONSE, response));
  } catch (error) {
    yield put(createAction(FETCH_ARTICLE_DETAILS_ERROR));
  }
}

function* watchFetchArticleDetails() {
  yield takeLatest(FETCH_ARTICLE_DETAILS_REQUEST, getArticleDetails);
}

const initialArticleDetailsState = {
  articleDetails: {},
  isFetchingArticleDetails: true,
};

const articleDetailsHandlers = {
  [FETCH_ARTICLE_DETAILS_ERROR]: state => state,
  [FETCH_ARTICLE_DETAILS_REQUEST]: state => ({
    ...state,
    isFetchingArticleDetails: true,
  }),
  [FETCH_ARTICLE_DETAILS_RESPONSE]: (state, action) => ({
    ...state,
    articleDetails: action.payload,
    isFetchingArticleDetails: false,
  }),
};

export const articleDetailsReducer = createReducer(initialArticleDetailsState, articleDetailsHandlers);
export const articleDetailsSagas = [fork(watchFetchArticleDetails)];
