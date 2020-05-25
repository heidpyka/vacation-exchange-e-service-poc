import React from "react";
import "./css/styles.css";
import Axios from "axios";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import { TableRow, TableCell, TableHead, TableBody } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
const getManagerAPI = `http://localhost:5000/api/applications/manager`;
const getPayrollAPI = `http://localhost:5000/api/applications/payroll`;
const putAPI = `http://localhost:5000/api/application`;

class ProcessApplications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      group: this.props.group,
      mode: "",
      applications: [],
    };
  }

  componentDidMount() {
    this.loadApplications();
  }

  loadApplications() {
    if (this.state.group !== "") {
      this.setState({ mode: "manager" });
      Axios.get(getManagerAPI, {
        params: {
          username: this.state.username,
          status: "submitted",
        },
      }).then((res) => {
        this.setState({ applications: Object.values(res.data) });
        console.log(res.data);
      });
    } else {
      this.setState({ mode: "payroll" });
      Axios.get(getPayrollAPI, {
        params: {
          status: "approved",
        },
      }).then((res) => {
        this.setState({ applications: Object.values(res.data) });
        console.log(res.data);
      });
    }
  }

  handleApplicationStatus(_id, status) {
    Axios.put(putAPI, {
      id: _id,
      status: status,
    }).then((res) => {
      this.loadApplications();
    });
  }

  listApplications() {
    const applicationsList = this.state.applications.map(
      ({ _id, name, pid, year, status }) => (
        <TableRow
          key={this.state.applications.findIndex(function (app) {
            return app._id === _id;
          })}
        >
          <TableCell>{name}</TableCell>
          <TableCell>{pid}</TableCell>
          <TableCell>{year}</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>
            <Button
              className="approveBtn"
              variant="outlined"
              size="small"
              onClick={() =>
                this.handleApplicationStatus(
                  _id,
                  this.state.mode === "manager" ? "approved" : "completed"
                )
              }
            >
              {this.state.mode === "manager" ? "Godkänn" : "Bekräfta"}
            </Button>
            <br />
            <Button
              className="rejectBtn"
              variant="outlined"
              size="small"
              onClick={() =>
                this.handleApplicationStatus(
                  _id,
                  this.state.mode === "manager" ? "rejected" : "failed"
                )
              }
            >
              {this.state.mode === "manager" ? "Avslå" : "Neka"}
            </Button>
          </TableCell>
        </TableRow>
      )
    );
    return applicationsList;
  }

  render() {
    return (
      <section>
        <h1>Behandla semesterväxlingsansökningar</h1>
        <div className="underline"></div>
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Namn</TableCell>
                  <TableCell>Personnummer</TableCell>
                  <TableCell>År</TableCell>
                  <TableCell>Sparade semesterdagar</TableCell>
                  <TableCell>Anställningsform</TableCell>
                  <TableCell>Planerad frånvaro</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.listApplications()}</TableBody>
            </Table>
          </TableContainer>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="adminBackBtn"
          onClick={() => this.props.backToLanding(7)}
        >
          Tillbaka
        </Button>
      </section>
    );
  }
}

export default ProcessApplications;
