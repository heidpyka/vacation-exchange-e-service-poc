import React from "react";
import "./css/styles.css";

function ApplicationForm(props) {
  const year = new Date().getFullYear() + 1;
  return (
    <div className="formContainer">
      <section className="formText">
        <h1>
          Överenskommelse om byte av semesterdagstillägg mot extra ledighet
        </h1>
        <div className="underline"></div>

        <p>Ansökan avser år: {year}</p>

        <p>
          Överenskommelsen innebär att den pensionsgrundande inkomsten kan
          påverkas negativt vid byte av semesterdagstillägg mot lediga dagar
          genom att årsinkomsten blir lägre.
        </p>
      </section>
      <label className="applicationFormLabel">
        Namn:
        <input
          type="text"
          name="name"
          value={props.name}
          onChange={props.handleChange}
          required
        />
      </label>
      <label className="applicationFormLabel">
        Personnummer:
        <input
          type="text"
          name="pid"
          value={props.pid}
          onChange={props.handleChange}
          required
        />
      </label>
      <div className="required">
        <label className="applicationFormLabel">
          <input type="checkbox" required />
          Jag har tagit del av informationen om möjligheten att byta
          semesterdagstillägg mot extra lediga dagar med lön.
        </label>
        <label className="applicationFormLabel">
          <input type="checkbox" required />
          Jag accepterar erbjudandet om utbyte av semesterdagstillägg under
          gällande år mot extra lediga dagar med lön.
        </label>
      </div>
    </div>
  );
}

export default ApplicationForm;
