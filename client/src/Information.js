import React from "react";
import "./css/styles.css";

function Information(props) {
  return (
    <section>
      <h1>Byte av semesterdagstillägg mot extra lediga dagar med lön</h1>
      <div className="underline"></div>
      <p>
        Du som är anställd på någon av kommunens förvaltningar och flera av
        koncernens bolag har möjlighet att byta ditt semesterdagstillägg mot
        lediga dagar med lön.
      </p>

      <p>
        Du som omfattas av avtalet har möjlighet att genom en överenskommelse
        med din chef byta semesterdagstillägg mot fem eller sex extra lediga
        dagar med lön per år beroende på hur gammal du är.
      </p>

      <p>
        Den 1 december varje år är sista dagen som du kan ansöka om förmånen
        inför nästa år.
      </p>
    </section>
  );
}

export default Information;
