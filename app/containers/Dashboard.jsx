import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MainAdminSection from '../components/MainAdminSection';

import { createImage, typing, destroyImage, openCreateImageModal, closeCreateImageModal } from '../actions/images';
import styles from '../css/components/vote';

injectTapEventPlugin();

const cx = classNames.bind(styles);

class Dashboard extends Component {
  render() {
    const { images, isCreateImageModalOpen, createImage, destroyImage, openCreateImageModal, closeCreateImageModal} = this.props;
    return (
      <div >
        <MainAdminSection
          images={images}
          isCreateImageModalOpen={isCreateImageModalOpen}
          createImage={createImage}
          destroyImage={destroyImage}
          openCreateImageModal={openCreateImageModal}
          closeCreateImageModal={closeCreateImageModal}
         />
      </div>
    );
  }
}

Dashboard.propTypes = {
  images: PropTypes.array.isRequired,
  isCreateImageModalOpen: PropTypes.bool.isRequired,
  openCreateImageModal: PropTypes.func.isRequired,
  closeCreateImageModal: PropTypes.func.isRequired,
  createImage: PropTypes.func.isRequired,
  destroyImage: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    images: state.images,
    isCreateImageModalOpen: state.isCreateImageModalOpen
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createImage, destroyImage, openCreateImageModal, closeCreateImageModal })(Dashboard);
