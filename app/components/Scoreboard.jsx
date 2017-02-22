import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/scoreboard';

const cx = classNames.bind(styles);

const Scoreboard = ({images}) => {
  const imageListItems = images.map((image, key) => {
    return (
      <li className={cx('item')} key={key}>
        <span className={cx('topic')}>{image.name}</span>
        <span className={cx('count')}>{image.question}</span>
      </li>
    );
  });
  return (
    <div className={cx('scoreboard')}>
      <h3 className={cx('header')}>Vote count</h3>
      <ul className={cx('list')}>
        {imageListItems}
      </ul>
    </div>
  );
};

Scoreboard.propTypes = {
  images: PropTypes.array.isRequired
};

export default Scoreboard;
