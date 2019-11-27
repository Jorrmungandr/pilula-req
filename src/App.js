import React, { Component } from 'react';
import { gel, axiosGet, axiosPost } from './global/func';
import { withCookies } from 'react-cookie';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      resposta: {},
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    axiosPost('/login', {
      user: this.username.value,
      password: this.password.value,
    }, (res) => {
      if (res.data.status === 200) {
        const { cookies } = this.props;
        cookies.set('token', res.data.token, { path: '/' });
      } else {
        console.log(res);
        alert(res.data.error);
      }
    });
  }

  componentDidMount() {
    axiosGet('/json', this, 'resposta');
  }

  render() {
    const { resposta } = this.state;
    return (
      <section className="app">
        <form onSubmit={this.handleSubmit} >
          <input ref={(u) => {this.username = u}} type="text" name="user" id="user"/>
          <input ref={(p) => {this.password = p}} type="password" name="password" id="password"/>
          <button>Entrar</button>
        </form>
        <div className="res-container">
          {resposta.key && resposta.key.map((valor) => (
            <p>{valor}</p>
          ))}
        </div>
      </section>
    );
  }
};

export default withCookies(App);
