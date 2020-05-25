import React from "react";
import "./css/styles.css";

function Conditions(props) {
  return (
    <section>
      <h1>Förutsättningar</h1>
      <div className="underline"></div>
      <p>
        De extra lediga dagarna kan efter överenskommelse med chef tas ut som
        hel dag och/eller del av dag, det vill säga omvandlas till semester i
        timmar.
      </p>

      <p>
        Du måste ta ut hela din årssemester och de extra lediga dagarna under
        det år som överenskommelsen gäller. Det innebär att du inte kan spara
        några nya semesterdagar under det året.
      </p>

      <p>
        Eventuella sedan tidigare sparade dagar, upp till max 10 stycken, kan
        dock fortsätta sparas till nästkommande år och behöver inte tas ut under
        det år överenskommelsen gäller.
      </p>

      <p>
        Hela semesterdagstillägget måste bytas för att överenskommelse ska vara
        möjlig.
      </p>
    </section>
  );
}

export default Conditions;
