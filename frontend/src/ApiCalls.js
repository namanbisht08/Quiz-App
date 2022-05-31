export default function gellAllQuestions() {
  return fetch("http://localhost:8000/")
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}
