function Comic({data}) {
  return (
    <>
    <h2>{data.title}</h2>
    <img src={data.img} alt={data.safe_title} />
    <p>{data.alt}</p>
    </>
  );
}
 export default Comic;