import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/mainImage';

const cx = classNames.bind(styles);

const MainSection = ({ images }) => {
  const imageItems = images.map((image) => {
    return (<div key={image.id} className={cx('imageCell')}>
      <img className={cx('image')} src={'/image/' + image.imageURL} />
    </div>
    );
  });

  return (
    <div className={cx("imageWrapper")}>
      <div className={cx("imageGrid")}>
        {imageItems}
    </div>
   </div>
  );
};

MainSection.propTypes = {
  images: PropTypes.array.isRequired
};

export default MainSection;
