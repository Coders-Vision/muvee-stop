import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getGenreList } from "../../../apiService/api";

function GenreList({ setGenreId }) {
  const [genreList, setGenreList] = useState(null);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const fetchGenreList = async () => {
      setGenreList(await getGenreList());
    };
    fetchGenreList();
  }, [setGenreId]);

  const setID = (id) => {
    setActiveId(id);
    setGenreId(id);
  };

  const skeletonButton = () => {
    return [1, 2, 3, 4].map((times) => {
      return (
        <li className="list-inline-item" key={times}>
          <SkeletonTheme color="#243142" highlightColor="#364963">
            <Skeleton width={100} count={5} />
          </SkeletonTheme>
        </li>
      );
    });
  };

  const showGenreList =
    genreList &&
    genreList.map((item, index) => {
      return (
        <li className="list-inline-item" key={index}>
          <Button
            variant={
              item.id === activeId ? `outline-info active` : `outline-info`
            }
            onClick={() => setID(item.id)}
          >
            {item.name}
          </Button>
        </li>
      );
    });

  return (
    <Row className="mt-3" xs="12" mt="6">
      <Col>{showGenreList || skeletonButton()}</Col>
    </Row>
  );
}

export default GenreList;
