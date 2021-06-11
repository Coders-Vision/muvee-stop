import { React, useState, useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getCelebrity } from "../../../apiService/api";
import SEO from ".././SEOComponent/SEO";

import defaultPoster from "../default-poster.svg";
function Biography({ id }) {
  const [biography, setBiography] = useState(null);
  const poster = "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    const fetchBiography = async () => {
      setBiography(null);
      setBiography(await getCelebrity(id));
    };
    fetchBiography();
  }, [id]);

  const skeletonBiography = () => {
    return (
      <>
        <Col className="mx-auto" xs={6} sm={4} md={2}>
          <SkeletonTheme color="#243142" highlightColor="#364963">
            <Skeleton height={"30vh"} />
          </SkeletonTheme>
        </Col>
        <Col xs={12} md={10}>
          <Row className="w-100" style={{ margin: "0 auto" }}>
            <SkeletonTheme color="#243142" highlightColor="#364963">
              <Skeleton width={100} />
            </SkeletonTheme>
          </Row>
          <dl className="row mt-5">
            <dt className="col-sm-3">Birthday: </dt>
            <dd className="col-sm-9  text-white-50">
              <SkeletonTheme color="#243142" highlightColor="#364963">
                <Skeleton width={100} />
              </SkeletonTheme>
            </dd>
            <dt className="col-sm-3 mt-2">Known for: </dt>
            <dd className="col-sm-9 mt-2 text-white-50">
              <SkeletonTheme color="#243142" highlightColor="#364963">
                <Skeleton width={100} />
              </SkeletonTheme>
            </dd>
            <dt className="col-sm-3 mt-2">Other Names: </dt>
            <dd className="col-sm-9 mt-2 text-white-50">
              <SkeletonTheme color="#243142" highlightColor="#364963">
                <Skeleton width={100} />
              </SkeletonTheme>
            </dd>
            <dt className="col-sm-3 mt-2">Gender: </dt>
            <dd className="col-sm-9 mt-2 text-white-50">
              <SkeletonTheme color="#243142" highlightColor="#364963">
                <Skeleton width={100} />
              </SkeletonTheme>
            </dd>
          </dl>
          <div>Biography</div>
          <SkeletonTheme color="#243142" highlightColor="#364963">
            <Skeleton width={100} />
          </SkeletonTheme>
          <SkeletonTheme color="#243142" highlightColor="#364963">
            <Skeleton width={75} />
          </SkeletonTheme>
          <SkeletonTheme color="#243142" highlightColor="#364963">
            <Skeleton width={50} />
          </SkeletonTheme>
        </Col>
      </>
    );
  };

  const showOtherNames =
    biography && biography.otherNames.slice(0, 3).map((names) => `${names} ,`);

  const showCelebDeath = () => {
    return (
      <>
        <dt className="col-sm-3 mt-2">Died: </dt>
        <dd className="col-sm-9 mt-2 text-white-50">{biography.deathday}</dd>
      </>
    );
  };

  const generateSeoTags = (bio) => {
    return (
      <SEO
        title={`Muvee Stop | ${bio?.name}`}
        description={bio?.biography}
        ogTitle={`Muvee Stop | ${bio?.name}`}
        ogDescription={bio?.biography}
      />
    );
  };

  const showBiography = () => {
    return (
      <>
        {generateSeoTags(biography)}
        <Col className="mx-auto" xs={6} sm={4} md={2}>
          <Image
            fluid
            src={`${poster}${biography.profileImage}`}
            className="img-thumbnail w-100 rounded float-left"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultPoster;
            }}
          />
        </Col>
        <Col xs={12} md={10}>
          <Row className="mt-2" style={{ textAlign: "center " }}>
            <h3 style={{ fontSize: "2rem" }} className="display-4 w-100">
              {biography.name}
            </h3>
          </Row>
          <dl className="row mt-5">
            <dt className="col-sm-3">Birthday: </dt>
            <dd className="col-sm-9  text-white-50">
              {`${
                biography.birthday
                  ? biography.birthday
                  : "No Birthday Available"
              },${
                biography.birthPlace
                  ? biography.birthPlace
                  : "No Birthplace Available"
              }`}
            </dd>
            <dt className="col-sm-3 mt-2">Known for: </dt>
            <dd className="col-sm-9 mt-2 text-white-50">
              {biography.knownFor}
            </dd>
            <dt className="col-sm-3 mt-2">Other Names: </dt>
            <dd className="col-sm-9 mt-2 text-white-50">
              {showOtherNames.length > 0 ? showOtherNames : "No Data"}
            </dd>
            <dt className="col-sm-3 mt-2">Gender: </dt>
            <dd className="col-sm-9 mt-2 text-white-50">
              {biography.gender === 1 ? "Female" : "Male"}
            </dd>
            {biography.deathday ? showCelebDeath() : null}
          </dl>
          <div>Biography</div>
          <p className="text-justify text-white-50">
            {biography.biography.length > 0 ? biography.biography : "No Data"}
          </p>
        </Col>
      </>
    );
  };

  return (
    <>
      <Row className="mt-4 shadow p-3 mb-5 rounded ">
        {biography ? showBiography() : skeletonBiography()}
      </Row>
    </>
  );
}

export default Biography;
