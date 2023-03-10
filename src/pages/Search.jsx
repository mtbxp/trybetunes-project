import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      disable: true,
      artistNameSearch: '',
      fetchAlbums: [],
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

  onClick = async () => {
    const { artist } = this.state;
    const artistsList = await searchAlbumsAPI(artist);
    this.setState({
      artistNameSearch: artist,
      artist: '',
      fetchAlbums: artistsList,
    });
  }

  render() {
    const { artist, disable, fetchAlbums, artistNameSearch } = this.state;
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
          type="submit"
          disabled={ disable }
          onClick={ this.onClick }
        >
          Pesquisar
        </button>

        {
          fetchAlbums.length > 0 ? (
            <div>
              <h2>{ `Resultado de álbuns de: ${artistNameSearch}` }</h2>
              {
                fetchAlbums.map((album) => {
                  const { collectionName, artworkUrl100, collectionId,
                    artistName } = album;
                  return (
                    <div key={ collectionId }>
                      <h2>{ collectionName }</h2>
                      <h4>{ artistName }</h4>
                      <img src={ artworkUrl100 } alt="Capa do Album" />
                      <br />
                      <Link
                        data-testid={ `link-to-album-${collectionId}` }
                        to={ `/album/${collectionId}` }
                      >
                        Músicas
                      </Link>
                    </div>
                  );
                })
              }
            </div>
          )
            : <h2>Nenhum álbum foi encontrado</h2>
        }
      </div>
    );
  }
}

export default Search;
