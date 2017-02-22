import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import MainSection from '../components/MainSection';
import { } from '../actions/images';
import styles from '../css/components/vote';

const cx = classNames.bind(styles);

class Main extends Component {
  render() {
    const {images} = this.props;
    return (
      <div className={cx('vote')}>

        <MainSection
          images={images} />
      </div>
    );
  }
}

Main.propTypes = {
  images: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    images: state.images
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {})(Main);
