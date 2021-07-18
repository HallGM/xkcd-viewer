function Menu({ onIssueChange, onRandom }) {
  return (
    <div>
      <button onClick={() => onIssueChange(-10)}>Back</button>
      <button onClick={() => onIssueChange(10)}>Next</button>
      <button onClick={onRandom}>10 Random Comics</button>
    </div>
  );
}

export default Menu;
