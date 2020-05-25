import React from "react";
import "./css/styles.css";

function Criteria(props) {
  return (
    <section>
      <h1>Vem omfattas av kollektivavtalet?</h1>
      <div className="underline"></div>
      <p>
        Avtalet gäller för dig som är tillsvidareanställd med månadslön inom
        koncernen Karlstads kommun (Mariebergsskogen AB och delar av Karlstads
        Energi omfattas inte) och som omfattas av vårt centrala kollektivavtal
        Allmänna Bestämmelser (AB). För dig som är tidsbegränsat anställd, dock
        minst 12 månader och minst ett kalenderår, görs en prövning i varje
        enskilt fall om en överenskommelse är möjlig.
      </p>

      <p>Följande omfattas inte av avtalet:</p>

      <ul>
        <li>Medarbetare med uppehålls- eller ferietjänst</li>
        <li>
          {" "}
          Medarbetare som av någon anledning inte bedöms få full årssemester
        </li>
        <li>Medarbetare anställda på BEA eller PAN</li>
        <li>
          Medarbetare som har mer än 10 sparade semesterdagar vid ingången av
          aktuellt år (årsskiftet)
        </li>
      </ul>
    </section>
  );
}

export default Criteria;
