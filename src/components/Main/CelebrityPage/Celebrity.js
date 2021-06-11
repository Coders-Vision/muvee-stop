import React from "react";
import Biography from "./Biography";
import Filmography from "./Filmography";
import SEO from ".././SEOComponent/SEO";
function Celebrity({ match }) {
  const { id } = match.params;
  return (
    <>
      <SEO
        title={"Muvee Stop"}
        description={"Search all your favourite Movies at Muvee Stop."}
        keywords={`Muvee Stop, Muvee, movie database, online movie, movie online,movies online,`}
        ogTitle={"Muvee Stop"}
        ogDescription={"Search all your favourite Movies at Muvee Stop."}
      />
      <Biography id={id} />
      <Filmography id={id} />
    </>
  );
}

export default Celebrity;
