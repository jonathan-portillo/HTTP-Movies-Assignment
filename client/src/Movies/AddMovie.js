import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const AddMovie = () => {
  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });

  const { push } = useHistory();

  const handleChange = (e) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const movieAndStars = {
      ...newMovie,
      stars: newMovie.stars.split(", "),
    };
    axios
      .post("http://localhost:5000/api/movies", movieAndStars)
      .then((res) => {
        setNewMovie(res.data);
      });
    push("/");
  };

  return (
    <>
      <h1>Add a New Movie!!</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="title"
          value={newMovie.name}
          onChange={handleChange}
        />
        <input
          name="director"
          type="text"
          placeholder="director"
          value={newMovie.text}
          onChange={handleChange}
        />
        <input
          name="metascore"
          type="number"
          placeholder="metascore"
          value={newMovie.metascore}
          onChange={handleChange}
        />
        <input
          name="stars"
          type="textbox"
          placeholder="enter stars"
          value={newMovie.stars}
          onChange={handleChange}
        />
        <button>Add a New Movie</button>
      </form>
    </>
  );
};

export default AddMovie;
