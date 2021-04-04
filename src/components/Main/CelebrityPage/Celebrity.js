import React from "react";
import Biography from "./Biography";
import Filmography from "./Filmography";
function Celebrity({ match }) {
  const { id } = match.params;
  return (
    <>
      <Biography id={id} />
      <Filmography  id={id} />
    </>
  );
}

export default Celebrity;
