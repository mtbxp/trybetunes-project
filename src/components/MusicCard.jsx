import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchFavoriteMusics();
  }

  fetchFavoriteMusics = async () => {
    const { trackId } = this.props;
    const favoriteMusics = await getFavoriteSongs();
    const favorite = favoriteMusics.some((music) => music.trackId === trackId);
    this.setState({ favorite });
  }

  favoriteMusic = ({ target }) => {
    const { checked } = target;
    const { trackName, previewUrl, trackId } = this.props;
    this.setState({
      loading: true,
      favorite: checked,
    }, async () => {
      await addSong({ trackName, previewUrl, trackId });
      this.setState({
        loading: true,
        favorite: checked,
      });
      await removeSong({ trackName, previewUrl, trackId });
      this.setState({
        loading: false,
        favorite: checked,
      });
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favorite } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        {
          loading ? (
            <Loading />
          ) : (
            <label
              htmlFor="Favorite"
            >
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                id="favorite"
                onChange={ this.favoriteMusic }
                checked={ favorite }
              />
            </label>
          )
        }
      </div>
    );
  }
}
MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
