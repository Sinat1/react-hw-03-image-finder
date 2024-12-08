import {
  StyledImageGalleryItem,
  StyledImageGalleryItemImg,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  return (
    <StyledImageGalleryItem>
      <StyledImageGalleryItemImg src={webformatURL} alt={tags} />
    </StyledImageGalleryItem>
  );
};

export default ImageGalleryItem;
