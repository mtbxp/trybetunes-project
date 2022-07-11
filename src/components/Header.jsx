import React, { Component } from 'react';
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
