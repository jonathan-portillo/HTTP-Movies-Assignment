import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const MovieUpdate = (props) => {
  const [updateMovie, setUpdateMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });

  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("movieupdate", res);
        setUpdateMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setUpdateMovie({
      ...updateMovie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const movieAndStars = {
      ...updateMovie,
      stars: updateMovie.stars.split(", "),
    };
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movieAndStars)
      .then((res) => {
        console.log("axios res", res);
        // setUpdateMovie(res.data);
        updateMovie();
      })
      .catch((err) => console.log(err));
    push(`/movies/${id}`);
  };

  return (
    <>
      <h1>Update Movies</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="title"
          onChange={handleChange}
          value={updateMovie.title}
        />
        <input
          name="director"
          type="text"
          placeholder="director"
          onChange={handleChange}
          value={updateMovie.director}
        />
        <input
          name="metascore"
          type="number"
          placeholder="metascore"
          onChange={handleChange}
          value={updateMovie.metascore}
        />
        <input
          name="stars"
          type="textbox"
          placeholder="enter stars"
          onChange={handleChange}
          value={updateMovie.stars}
        />
        <button>Update</button>
      </form>
    </>
  );
};

export default MovieUpdate;
