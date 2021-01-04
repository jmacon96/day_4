import axios from "axios";
import React from "react";

const options = [
  {
    label: "Doggos",
    value: "DOG",
  },
  {
    label: "Fluffy Kitten",
    value: "CAT",
  },
  {
    label: "Godzilla",
    value: "LIZARD",
  },
];

export default function PhotoPage() {
  const [file, setFile] = React.useState();
  const [category, setCategory] = React.useState(options[0].value);

  const onSubmit = (event) => {
    console.log("submitting form");
    event.preventDefault();
    if (!file) return;
    console.log("sending photo");
    axios
      .post(`/api/backblaze?category=${category}`, file, {
        headers: {
          "Content-Type": file.type,
        },
      })
      .then((response) => {
        console.log("done");
      })
      .catch((error) => console.log(error));
  };

  return (
    <main>
      <h1>Upload photo</h1>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(event) => setFile(event.target.files[0])}
        />
        <select onChange={(event) => setCategory(event.target.value)}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit">Upload</button>
      </form>
    </main>
  );
}
