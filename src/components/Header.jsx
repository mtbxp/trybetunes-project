import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.handleName();
  }

  handleName = async () => {
    const response = await getUser();
    this.setState({
      user: response.name,
    });
    this.setState({ loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
        <br />
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <br />
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        {
          loading ? <Loading /> : (
            <p data-testid="header-user-name">
              {user}
            </p>
          )
        }
      </header>
    );
  }
}

export default Header;
