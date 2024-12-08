import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from './App.styled.js';
import SearchBar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <AppContainer>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery} />
        <ToastContainer autoClose={3000} />
      </AppContainer>
    );
  }
}

export default App;
//
