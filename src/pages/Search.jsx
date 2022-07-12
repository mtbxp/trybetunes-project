import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      disable: true,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      artist: value,
    }, this.enabledisableButton);
  }

  enabledisableButton = () => {
    const { artist } = this.state;
    const min = 2;
    this.setState({
      disable: artist.length < min,
    });
  }

  render() {
    const { artist, disable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Pesquisar</h1>
        <input
          type="text"
          value={ artist }
          placeholder="Nome do Artista"
          data-testid="search-artist-input"
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ disable }
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

export default Search;
