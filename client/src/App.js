import React from "react";
import Axios from "axios";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import "./css/styles.css";
import Information from "./Information";
import Criteria from "./Criteria";
import Conditions from "./Conditions";
import ApplicationForm from "./ApplicationForm";
import Status from "./Status";
import ProcessApplications from "./Admin";
import Login from "./Login";
import AdminLanding from "./AdminLanding";
import History from "./History";
const postAPI = `http://localhost:5000/api/applications`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff9900", //primary button color
    },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: -1,
      message: "",
      name: "",
      pid: "",
      year: new Date().getFullYear() + 1,
      username: "",
      manager: "",
      group: "",
      application: {},
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handlePage = this.handlePage.bind(this);
    this.handleGroup = this.handleGroup.bind(this);
    this.onApplicationSubmitted = this.onApplicationSubmitted.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onApplicationSubmitted(application) {
    this.setState({ application: application });
  }

  onLogin(username, manager) {
    this.setState({ username: username, manager: manager });
  }

  handlePage(number) {
    this.setState({ page: number });
  }

  handleGroup(group) {
    this.setState({ group: group });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    Axios.post(postAPI, {
      username: this.state.username,
      name: this.state.name,
      pid: this.state.pid,
      year: this.state.year,
      status: "submitted",
      manager: this.state.manager,
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Din ansökan har skickats!");
          this.setState({ application: res.data });
          this.setState({ page: 5 });
        } else {
        }
      })
      .catch((err) => {
        this.setState({
          error: "Ett fel inträffade när din ansökan skulle skickas.",
        });
      });
  }

  handleNext(event) {
    if (this.state.page < 3 && event.target.type !== "submit")
      this.setState({ page: this.state.page + 1 });
  }

  handleBack(event) {
    this.setState({ page: this.state.page - 1 });
  }

  loadPage() {
    switch (this.state.page) {
      case 0:
        return <Information />;
      case 1:
        return <Criteria />;
      case 2:
        return <Conditions />;
      case 3:
        return (
          <form
            id="applicationForm"
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
          >
            <ApplicationForm />
          </form>
        );
      case 4:
        return <History backToLanding={this.handlePage} />;
      case 5:
        return <Status application={this.state.application} />;
      case 6:
        return (
          <ProcessApplications
            username={this.state.username}
            group={this.state.group}
            backToLanding={this.handlePage}
          />
        );
      case 7:
        return <AdminLanding action={this.handlePage} />;
      case -1:
        return (
          <Login
            nextPage={this.handlePage}
            setGroup={this.handleGroup}
            onApplicationSubmitted={this.onApplicationSubmitted}
            onLogin={this.onLogin}
          />
        );
      default:
        console.log("Page numbering error");
        break;
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="appWrapper">
          <div className="infoBox"> {this.loadPage()} </div>
          <p className="error">{this.state.error}</p>
          {this.state.page > -1 && this.state.page < 3 ? (
            <p className="pageIndex">{this.state.page + 1}/3</p>
          ) : null}

          {this.state.page > 0 && this.state.page < 4 ? (
            <Button
              variant="contained"
              color="primary"
              id="backBtn"
              onClick={this.handleBack}
            >
              Tillbaka
            </Button>
          ) : null}

          {this.state.page > -1 && this.state.page < 4 ? (
            <Button
              variant="contained"
              color="primary"
              id="nextBtn"
              onClick={this.handleNext}
              form="applicationForm"
              type={this.state.page === 3 ? "submit" : "button"}
              disabled={this.state.page === 4}
            >
              {this.state.page === 2
                ? "Till ansökan"
                : this.state.page === 3
                ? "Skicka"
                : "Nästa"}
            </Button>
          ) : null}
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
