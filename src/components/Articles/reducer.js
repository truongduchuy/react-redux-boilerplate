import { put, call, takeLatest, fork } from 'redux-saga/effects';
import { callApi, createReducer, createAction } from 'utils';

export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_RESPONSE = 'FETCH_ARTICLES_RESPONSE';

export const FETCH_ARTICLES_ERROR = 'FETCH_ARTICLES_ERROR';
export const PAGE_LIMIT = 5;

function* getArticles(action) {
  const { page, searchTerm } = action.payload;
  let query = `?limit=${PAGE_LIMIT}`;
  if (page) {
    query += `&page=${page}`;
  }

  if (searchTerm) {
    query += `&search=${searchTerm}`;
  }

  try {
    const response = yield call(callApi, 'GET', `${process.env.REACT_APP_API_URL}/blogs${query}`);
    yield put(createAction(FETCH_ARTICLES_RESPONSE, response));
  } catch (error) {
    yield put(createAction(FETCH_ARTICLES_ERROR));
  }
}

function* watchFetchArticles() {
  yield takeLatest(FETCH_ARTICLES_REQUEST, getArticles);
}

const initialArticleState = {
  articles: [],
  isFetchingArticles: true,
};

const articleHandlers = {
  [FETCH_ARTICLES_ERROR]: state => ({ ...state }),
  [FETCH_ARTICLES_RESPONSE]: (state, action) => ({ ...state, articles: action.payload, isFetchingArticles: false }),
  [FETCH_ARTICLES_REQUEST]: state => ({ ...state, isFetchingArticles: true }),
};

export const articleReducer = createReducer(initialArticleState, articleHandlers);
export const articleSagas = [fork(watchFetchArticles)];
