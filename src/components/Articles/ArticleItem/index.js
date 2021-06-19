import React from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';

function ArticleItem({ article }) {
  const { id, image, title, content } = article;

  const history = useHistory();

  const goToDetails = event => {
    event.preventDefault();
    history.push(`/articles/${id}`);
  };

  return (
    <li className="media mb-3">
      <img src={image} className="mr-3 mt-1" alt="" />
      <div className="media-body">
        <a className="title" href="##" onClick={goToDetails}>
          <h6 className="mt-0 mb-1">{title}</h6>
        </a>
        <div>{content}</div>
      </div>
    </li>
  );
}

export default ArticleItem;
