import React from "react";
import "./css/styles.css";
import Axios from "axios";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { green, red } from "@material-ui/core/colors";
import { TableRow, TableCell, TableHead, TableBody } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
const getHistoryAPI = `http://localhost:5000/api/applications/history`;

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
    };
  }

  componentDidMount() {
    this.loadApplications();
  }

  loadApplications() {
    Axios.get(getHistoryAPI).then((res) => {
      this.setState({ applications: Object.values(res.data) });
    });
  }

  listApplications() {
    const applicationsList = this.state.applications.map(
      ({ _id, name, pid, year, status }) => (
        <TableRow key={_id}>
          <TableCell>{name}</TableCell>
          <TableCell>{pid}</TableCell>
          <TableCell>{year}</TableCell>
          <TableCell>
            {status === "rejected" ? (
              <CancelIcon style={{ color: red[500] }} />
            ) : status === "completed" ? (
              <CheckCircleIcon style={{ color: green[500] }} />
            ) : (
              ""
            )}
          </TableCell>
        </TableRow>
      )
    );
    return applicationsList;
  }

  render() {
    return (
      <section>
        <h1> Tidigare semesterväxlingsansökningar</h1>
        <div className="underline"></div>
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Namn</TableCell>
                  <TableCell>Personnummer</TableCell>
                  <TableCell>År</TableCell>
                  <TableCell>Beslut</TableCell>
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

export default History;
