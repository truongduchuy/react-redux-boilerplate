import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAction } from 'utils';
import Spinner from 'components/Spinner';
import useDebounce from 'hooks/useDebounce';
import { FETCH_ARTICLES_REQUEST, PAGE_LIMIT } from './reducer';
import './index.scss';
import ArticleItem from './ArticleItem';
import SearchInput from './ArticleItem/SearchInput';
import PaginationBox from './PaginationBox';

const MILISECONDS_TO_DELAY = 500;

function Articles() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const articleState = useSelector(state => state.articleState);

  const [pageIndexs, setPageIndexs] = useState([1, 2, 3]);

  const { articles, isFetchingArticles, totalRecords } = articleState;
  const maxPage = Math.ceil((totalRecords || 53) / PAGE_LIMIT);

  // this is for no delay for first render
  const isFirstRender = useRef(true);

  const fetchArticlesCallback = useCallback(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    dispatch(createAction(FETCH_ARTICLES_REQUEST, { page, searchTerm }));
  }, [dispatch, page, searchTerm]);

  useDebounce(fetchArticlesCallback, isFirstRender.current ? 0 : MILISECONDS_TO_DELAY);

  const handleSearchChanged = event => {
    const { value } = event.target;
    setSearchTerm(value);
    setPage(1);
    setPageIndexs([1, 2, 3]);
  };

  const handlePageChanged = (newPageIndex, isClickedNumberButton) => {
    setPage(newPageIndex);

    if (!isClickedNumberButton) {
      if (newPageIndex > page) {
        setPageIndexs(pageIndexs.map(pi => pi + 1));
      } else {
        setPageIndexs(pageIndexs.map(pi => pi - 1));
      }
    }
  };

  return (
    <div className="d-flex flex-column">
      <h4 className="mb-4">Articles</h4>
      <div className="mb-4">
        <SearchInput value={searchTerm} onChange={handleSearchChanged} />
      </div>

      {isFetchingArticles ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <>
          <ul className="list-unstyled">
            {articles.map(article => (
              <ArticleItem key={article.id} article={article} />
            ))}
          </ul>
          <div className="d-flex justify-content-end">
            <PaginationBox
              onPageIndexChanged={handlePageChanged}
              currentPageIndex={page}
              hasNext={page < maxPage}
              hasPrev={page > 1}
              maxPage={maxPage}
              pageIndexs={pageIndexs}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Articles;
