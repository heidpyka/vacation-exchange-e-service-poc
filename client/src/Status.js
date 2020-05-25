import React from "react";
import { LinearProgress } from "@material-ui/core";
import "./css/styles.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { orange, grey, red } from "@material-ui/core/colors";

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      status: "",
    };
  }

  componentDidMount() {
    this.setProgress();
    this.setStatus();
  }

  setStatus() {
    this.setState({
      status:
        this.props.application.status === "submitted"
          ? "Inskickad"
          : this.props.application.status === "approved"
          ? "Godkänd av chef"
          : this.props.application.status === "rejected"
          ? "Avslagen av chef"
          : this.props.application.status === "completed"
          ? "Registrerad"
          : this.props.application.status === "failed"
          ? "Nekad vid registrering"
          : "",
    });
  }

  setProgress() {
    if (this.props.application.status === "submitted")
      this.setState({ progress: 0 });
    else if (this.props.application.status === "approved")
      this.setState({ progress: 50 });
    else if (this.props.application.status === "rejected")
      this.setState({ progress: 50 });
    else if (this.props.application.status === "completed")
      this.setState({ progress: 100 });
    else if (this.props.application.status === "failed")
      this.setState({ progress: 100 });
  }

  render() {
    return (
      <div>
        <section>
          <h1>Status för semesterväxlingsansökan</h1>
          <div className="underline"></div>
          <p>
            Här kan du följa status för din inskickade semesterväxlingsansökan.
          </p>{" "}
        </section>
        <p>Din ansökan är:</p>
        <LinearProgress variant="determinate" value={this.state.progress} />
        <div>
          <div className="statusIcon">
            <div>
              <CheckCircleIcon style={{ color: orange[500], fontSize: 40 }} />
              <p className="statusText">Inskickad</p>
            </div>
            <div>
              {this.props.application.status === "submitted" ? (
                <RadioButtonUncheckedIcon
                  style={{ color: grey[500], fontSize: 40 }}
                />
              ) : this.props.application.status === "approved" ? (
                <CheckCircleIcon style={{ color: orange[500], fontSize: 40 }} />
              ) : this.props.application.status === "rejected" ? (
                <CancelIcon style={{ color: red[500], fontSize: 40 }} />
              ) : this.props.application.status === "completed" ? (
                <CheckCircleIcon style={{ color: orange[500], fontSize: 40 }} />
              ) : this.props.application.status === "failed" ? (
                <CheckCircleIcon style={{ color: orange[500], fontSize: 40 }} />
              ) : (
                ""
              )}
              {this.props.application.status === "rejected" ||
              this.props.application.status === "approved" ? (
                <p className="statusText">{this.state.status}</p>
              ) : this.props.application.status === "completed" ||
                this.props.application.status === "failed" ? (
                <p className="statusText">Godkänd av chef</p>
              ) : (
                <p style={{ textAlign: "center", color: "gray" }}>Beslut</p>
              )}
            </div>

            <div>
              {this.props.application.status === "submitted" ? (
                <RadioButtonUncheckedIcon
                  style={{ color: grey[500], fontSize: 40 }}
                />
              ) : this.props.application.status === "approved" ? (
                <RadioButtonUncheckedIcon
                  style={{ color: grey[500], fontSize: 40 }}
                />
              ) : this.props.application.status === "rejected" ? (
                <RadioButtonUncheckedIcon
                  style={{ color: grey[500], fontSize: 40 }}
                />
              ) : this.props.application.status === "completed" ? (
                <CheckCircleIcon style={{ color: orange[500], fontSize: 40 }} />
              ) : this.props.application.status === "failed" ? (
                <CancelIcon style={{ color: red[500], fontSize: 40 }} />
              ) : (
                ""
              )}
              {this.props.application.status === "failed" ||
              this.props.application.status === "completed" ? (
                <p className="statusText">{this.state.status}</p>
              ) : (
                <p style={{ textAlign: "center", color: "gray" }}>
                  Registrering
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Status;
