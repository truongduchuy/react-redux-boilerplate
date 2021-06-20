import React from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';
import PropTypes from 'prop-types';

function ArticleItem({ article }) {
  const { id, image, title, content } = article;

  const history = useHistory();

  const goToDetails = () => {
    history.push(`/articles/${id}`);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li className="media mb-3 pointer" onClick={goToDetails}>
      <img src={image} className="mr-3 mt-1" alt="" />
      <div className="media-body">
        <a className="title" href="##" onClick={event => event.preventDefault()}>
          <h6 className="mt-0 mb-1">{title}</h6>
        </a>
        <div>{content}</div>
      </div>
    </li>
  );
}

ArticleItem.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default ArticleItem;
