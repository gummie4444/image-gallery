import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/mainImage';
import LargeImageModal from './LargeImageModal';

const cx = classNames.bind(styles);


class MainSection extends React.Component {

  constructor(props) {
    super(props);
    let isImageLeft = false;
    let isImageRight = false;
    if (this.props.images.length > 1){
      isImageRight = true;
    }

    if (false){
      //TODO ef relative url OPNA LIKA LIGHTBOXIÐ HERNA
      isImageLeft = true;
    }

    this.state = {
      image: {},
      isOpen: false,
      isImageRight: isImageRight,
      isImageLeft: isImageLeft,
      index: -1
    };
  }

    componentDidMount() {
     document.addEventListener('keydown', this.handleArrowKeys.bind(this), false);
   }

   componentDidUnMount(){
    document.removeEveentListener('keydown', this.handleArrowKeys, false);
   }



  openModal(image){
    const index = this.getIndex(image);
    this.setState({
      image: image,
      isOpen: true,
      index: index,
      isImageLeft: this.isNextImageLeft(index),
      isImageRight: this.isNextImageRight(index)
    });
  }

  closeModal(){
    this.setState({
      image: {},
      isOpen: false
    });
  }

  getIndex(image) {
    const array = this.props.images;
    const key = image.id
    for (let i = 0; i < array.length; i++) {
      if (array[i]['id'] == key) {
        return i;
      }
    }
    return -1;
  }


  handleArrowKeys(event) {

    if (this.state.isOpen) {
      if (event.keyCode === 37 && this.state.isImageLeft) {
        this.nextImageLeft();
      }
      else if (event.keyCode === 39 && this.state.isImageRight) {
        this.nextImageRight();
      }
    }
   }

  isNextImageRight(index) {
    return index !== this.props.images.length - 1;
  }

  isNextImageLeft(index) {
    return index > 0;
  }

  nextImageRight() {
    const newIndex = this.state.index + 1;

    this.setState({
      index: newIndex,
      isImageRight: this.isNextImageRight(newIndex),
      isImageLeft: true,
      image: this.props.images[newIndex]
    });
  }

  nextImageLeft() {
    const newIndex = this.state.index - 1;

    this.setState({
      index: newIndex,
      isImageRight: true,
      isImageLeft: this.isNextImageLeft(newIndex),
      image: this.props.images[newIndex]
    });
  }

  render() {
    const {images} = this.props;

    const test = [...images, ...images,...images,...images,...images];
    const imageItems = images.map((image,index) => {
      return (<div onClick={this.openModal.bind(this, image)} key={index} className={cx('imageCell')}>
        <img className={cx('image')} src={'https://s3-eu-west-1.amazonaws.com/photo-app-gudda/' + image.imageURL} />
      </div>
      );
    });

    return (
      <div className={cx('imageWrapper')}>
        <div className={cx('imageGrid')}>
          {imageItems}
        </div>

        <LargeImageModal
         isOpen={this.state.isOpen}
         closeModal={this.closeModal.bind(this)}
         isImageLeft={this.state.isImageLeft}
         isImageRight={this.state.isImageRight}
         image={this.state.image}
         nextImageRight={this.nextImageRight.bind(this)}
         nextImageLeft={this.nextImageLeft.bind(this)} />
      </div>
     );
  }
}


MainSection.propTypes = {
  images: PropTypes.array.isRequired
};

export default MainSection;
