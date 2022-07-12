import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumName: '',
      artistsName: '',
      musics: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const fetch = await getMusics(id);
    const { collectionName, artistName } = fetch[0];
    this.setState({}, () => {
      this.setState({
        albumName: collectionName,
        artistsName: artistName,
        musics: fetch,
      });
    });
  }

  render() {
    const { musics, albumName, artistsName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="album-name">{ albumName }</h2>
          <h3 data-testid="artist-name">{ artistsName }</h3>
          {
            musics.filter((music) => music.kind === 'song')
              .map((music) => (
                <MusicCard
                  key={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                />
              ))
          }
        </div>
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
