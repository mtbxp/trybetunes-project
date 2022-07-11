// import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      disableButton: true,
      loading: false,
    };
  }

  inputOnChange = ({ target }) => {
    const { value } = target;
    this.setState({
      user: value,
    }, this.enableDisableButton);
  };

 buttonCreate = async () => {
   const { user } = this.state;
   this.setState({ loading: true });
   await createUser({ name: user });
   this.setState({ loading: false });
   const { history } = this.props;
   history.push('/search');
 }

  enableDisableButton = () => {
    const { user } = this.state;
    const min = 3;
    this.setState({
      disableButton: user.length < min,
    });
  }

  render() {
    const { loading, user, disableButton } = this.state;
    return (
      <div data-testid="page-login">
        {
          loading ? <Loading /> : (
            <>
              <h1>Login</h1>
              <form>
                <label htmlFor="name">
                  Nome:
                  <input
                    id="name"
                    type="text"
                    name="user"
                    value={ user }
                    data-testid="login-name-input"
                    onChange={ this.inputOnChange }
                  />
                </label>
                <button
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ disableButton }
                  onClick={ this.buttonCreate }
                >
                  Entrar
                </button>
              </form>
            </>
          )
        }
      </div>

    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
