import Comic from "../components/Comic.js";

function ComicContainer({ loading, comicData }) {

  if (!comicData || loading) return "loading..";
  return (
    <div>
      {comicData.map((comicData) => (
        <Comic data={comicData} key={comicData.num} />
      ))}
    </div>
  );
}
export default ComicContainer;
