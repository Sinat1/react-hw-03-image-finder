import { Component } from 'react';
import {
  StyledImageGalleryItem,
  StyledImageGalleryItemImg,
} from './ImageGalleryItem.styled';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { showModal } = this.state;
    return (
      <StyledImageGalleryItem>
        <StyledImageGalleryItemImg
          src={this.props.webformatURL}
          alt={this.props.tags}
          onClick={this.toggleModal}
        />
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            modalImage={this.props.largeImageURL}
            tags={this.props.tags}
          />
        )}
      </StyledImageGalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
