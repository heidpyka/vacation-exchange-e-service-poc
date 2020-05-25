import React from "react";
import "./css/styles.css";
import Axios from "axios";
import { Button } from "@material-ui/core";
const usersAPI = "http://localhost:5000/api/users";
const applicationAPI = `http://localhost:5000/api/application`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: " ",
      username: "",
      password: "",
      manager: "",
      group: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.checkAuthorization = this.checkAuthorization.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  checkAuthorization() {
    if (
      this.state.group.includes("Managers") ||
      this.state.username.includes("Ekonomi")
    ) {
      this.props.nextPage(7);
    } else this.getApplication();
  }

  getApplication() {
    Axios.get(applicationAPI, {
      params: {
        username: this.state.username,
      },
    }).then((res) => {
      if (res.data.length !== 0) {
        this.props.onApplicationSubmitted(res.data[0]);
        console.log(res.data[0]);
        this.props.nextPage(5);
      } else this.props.nextPage(0);
    });
  }

  handleLogin(event) {
    this.setState({ message: " " });
    event.preventDefault();

    Axios.post(usersAPI, {
      username: this.state.username,
      password: this.state.password,
    })
      .then((res) => {
        if (res.data) {
          this.setState({
            manager: res.data.manager,
            username: res.data.dn,
          });
          this.props.onLogin(this.state.username, this.state.manager);
          if (res.data.isMemberOf !== undefined) {
            this.setState({
              group: res.data.isMemberOf,
            });
            this.props.setGroup(this.state.group);
          }
          this.checkAuthorization();
        }
      })
      .catch((err) => {
        document.getElementById(
          "loginForm"
        ).children[0].lastChild.lastChild.value = "";
        this.setState({ password: "" });
        console.log(err.message);

        if (err.response !== null) {
          if (err.response.status === 401)
            this.setState({ message: "Felaktiga inloggningsuppgifter" });
          if (err.response.status === 400)
            this.setState({ message: "Fyll i dina inloggningsuppgifter" });
          if (err.response.status === 404)
            this.setState({ message: "Användaren hittades inte" });
        }
      });
  }

  render() {
    return (
      <div>
        <form
          id="loginForm"
          onSubmit={this.handleLogin}
          onChange={this.handleChange}
        >
          <div className="formContainer">
            <section className="formText">
              <h1>E-tjänst för semesterväxling</h1>
              <div className="underline"></div>
            </section>
            <label className="applicationFormLabel">
              Användarnamn:
              <input type="text" name="username" onChange={this.handleChange} />
            </label>
            <label className="applicationFormLabel">
              Lösenord:
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </label>
          </div>
        </form>

        <Button
          variant="contained"
          color="primary"
          id="nextBtn"
          form="loginForm"
          type="submit"
        >
          Logga in
        </Button>
        <p className="error">{this.state.message}</p>
      </div>
    );
  }
}

export default Login;
