import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { articleReducer, articleSagas } from 'components/Articles/reducer';
import { articleDetailsReducer, articleDetailsSagas } from 'components/ArticleDetails/reducer';

const rootReducer = combineReducers({
  articleState: articleReducer,
  articleDetailsState: articleDetailsReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([...articleSagas, ...articleDetailsSagas]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
