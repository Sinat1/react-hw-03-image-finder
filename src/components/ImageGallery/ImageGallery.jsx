import { Component } from 'react';
import { toast } from 'react-toastify';
import pixabayAPI from '../../services/pixabay-api';
import Loader from 'components/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { StyledImageGallery } from './ImageGallery.styled';
import Button from 'components/Button';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending', images: [], page: 1 });
      this.fetchImages(nextQuery, 1);
    }
  }

  fetchImages = (query, page) => {
    pixabayAPI
      .getImages(query, page)
      .then(data => {
        if (data.hits.length === 0) {
          toast.error(`No results found for '${query}'`);
          this.setState({ status: 'idle' });
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          status: 'resolved',
        }));
      })
      .catch(error => {
        this.setState({ error, status: 'rejected' });
        toast.error(`Error: ${error.message}`);
      });
  };

  handleLoadMore = () => {
    const { searchQuery } = this.props;
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => this.fetchImages(searchQuery, this.state.page)
    );
  };

  render() {
    const { images, error, status } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return (
        <div role="alert">
          <p>{error.message}</p>
        </div>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <StyledImageGallery>
            {images.map(({ id, webformatURL, largeImageURL, tags }, index) => (
              <ImageGalleryItem
                key={`${id}-${index}`}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
          </StyledImageGallery>
          {images.length > 0 && images.length % 12 === 0 && (
            <Button onClick={this.handleLoadMore} />
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
