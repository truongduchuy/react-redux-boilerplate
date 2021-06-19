import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createAction } from 'utils';
import Spinner from 'components/Spinner';
import * as dayjs from 'dayjs';
import { ChevronLeft } from 'react-bootstrap-icons';
import { FETCH_ARTICLE_DETAILS_REQUEST } from './reducer';
import './index.scss';

function ArticleDetails() {
  const articleDetailsState = useSelector(state => state.articleDetailsState);
  const { articleDetails, isFetchingArticleDetails } = articleDetailsState;

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(createAction(FETCH_ARTICLE_DETAILS_REQUEST, id));
  }, [dispatch, id]);

  const handleBack = () => {
    history.push('/articles');
  };

  return isFetchingArticleDetails ? (
    <div className="text-center">
      <Spinner />
    </div>
  ) : (
    <>
      <div className="content">
        <ChevronLeft onClick={handleBack} className="content__icon" />
        <div className="content__title">
          <h4>{articleDetails.title}</h4>
          {articleDetails.createdAt && <div>{dayjs(articleDetails.createdAt).fromNow()}</div>}
        </div>
      </div>
      <img src={articleDetails.image} alt="" className="w-100" />
      <div>{articleDetails.content}</div>
    </>
  );
}

export default ArticleDetails;
