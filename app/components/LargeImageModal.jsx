import {ModalContainer, ModalDialog} from 'react-modal-dialog';

import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/largeImageModal';
import rightArrow from '../images/next.svg';
import leftArrow from '../images/back.svg';


const cx = classNames.bind(styles);

// cx('header')

class LargeImageModal extends React.Component {

  constructor(props) {
    super(props);
    console.log("?");
  }

  render() {
    const { isOpen, closeModal, nextImageLeft, nextImageRight, image, isImageLeft, isImageRight } = this.props;
    return (
		<div>
			{isOpen &&
			<ModalContainer onClose={closeModal}>
				<ModalDialog onClose={closeModal}>
					<h1>{image.name}</h1>
					<img className={cx(styles.imageMain)}  src={'https://s3-eu-west-1.amazonaws.com/photo-app-gudda/' + image.imageURL} />
					<br/>
					<span>Q: {image.question}</span><br/>
					<span>A: {image.answer}</span>
					<br/>
					{isImageLeft && <div onClick={nextImageLeft} className={cx(styles.leftButtonDiv)}>  <img src={leftArrow} className={cx(styles.leftButton)} /></div>}
					{isImageRight && <div onClick={nextImageRight} className={cx(styles.rightButtonDiv)}>  <img src={rightArrow} className={cx(styles.rightButton)} /></div>}
				</ModalDialog> 
			</ModalContainer>
			}
		</div>
    );
  }
}

LargeImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
  nextImageRight: PropTypes.func.isRequired,
  nextImageLeft: PropTypes.func.isRequired,
  isImageLeft: PropTypes.bool.isRequired,
  isImageRight: PropTypes.bool.isRequired,
};

export default LargeImageModal;
