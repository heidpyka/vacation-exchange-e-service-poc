import React from "react";
import "./css/styles.css";
import { Button } from "@material-ui/core";

function Conditions(props) {
  return (
    <section>
      <h1>E-tjänst för semesterväxling</h1>
      <div className="underline"></div>

      <Button
        variant="contained"
        color="primary"
        className="adminBtn"
        onClick={() => props.action(0)}
      >
        Ansök om semesterväxling
      </Button>

      <Button
        variant="contained"
        color="primary"
        className="adminBtn"
        onClick={() => props.action(6)}
      >
        Behandla semesterväxlingsansökningar
      </Button>

      <Button
        variant="contained"
        color="primary"
        className="adminBtn"
        onClick={() => props.action(4)}
      >
        Historik
      </Button>
    </section>
  );
}

export default Conditions;
