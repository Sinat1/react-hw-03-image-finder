import { Component } from 'react';
import { toast } from 'react-toastify';
import pixabayAPI from '../../services/pixabay-api';
import Loader from 'components/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { StyledImageGallery } from './ImageGallery.styled';

export default class ImageGallery extends Component {
  state = {
    query: null,
    page: 1,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, _) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending' });
      pixabayAPI
        .getImages(nextQuery, this.state.page)
        .then(data => {
          if (data.hits.length === 0) {
            toast.error(
              `Unfortunately, no results were found for the query '${nextQuery}'`
            );
            this.setState({ status: 'idle' });
            return;
          }
          this.setState({ query: data, status: 'resolved' });
        })

        .catch(error => {
          this.setState({ error, status: 'rejected' });
          toast.error(`Error: ${error.message}`);
        });
    }
  }
  render() {
    const { query, error, status } = this.state;

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
        <StyledImageGallery>
          {query.hits.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))}
        </StyledImageGallery>
      );
    }
  }
}
