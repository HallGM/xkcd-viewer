function getAllComicsInRegion(firstComicId, latestComic, returnData) {
  let counter = latestComic;
  let comics = [];
  (function getData(id) {
    fetch(
      `https://nameless-cliffs-43970.herokuapp.com/http://xkcd.com/${id}/info.0.json`
    )
      .then((res) => res.json())
      .then((data) => {
        counter--;
        comics.unshift(data);
        // requesting 404 returns an error - very clever, xkcd!
        if (counter === 404) counter--;
        if (counter <= firstComicId - 1) {
          returnData(comics);
        } else {
          // Recursion!!!!
          getData(counter);
        }
      });
  })(counter);
}

function getComicFromNumber(id, callBack) {
  fetch(
    `https://nameless-cliffs-43970.herokuapp.com/http://xkcd.com/${id}/info.0.json`
  )
    .then((res) => res.json())
    .then((data) => callBack(data));
}

function getLatestComicNum(returnedComic) {
  fetch(
    "https://nameless-cliffs-43970.herokuapp.com/http://xkcd.com/info.0.json"
  )
    .then((res) => res.json())
    .then((data) => returnedComic(data.num));
}

function getTenComics(start, returnData) {
  getLatestComicNum((latestComicNum) => {
    let numberOfComics = 10;
    if (start + 10 > latestComicNum) numberOfComics = latestComicNum - start;
    if (numberOfComics > 0) {
      getAllComicsInRegion(start, start + numberOfComics, (data) => {
        returnData(data);
      });
    }
  });
}

function getTenRandomComics(returnData) {
  getLatestComicNum((latestComicNum) => {
    let randomNumbers = [];
    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.floor(Math.random() * latestComicNum) + 1;
      randomNumbers.push(randomNumber);
    }
    let randomComics = [];
    randomNumbers.forEach((number, index) => {
        getComicFromNumber(number, (comic) => {
            randomComics.push(comic);
            if (index === 9) returnData(randomComics);
          })
    })
    })
  }

const dataFetcher = { getAllComicsInRegion, getLatestComicNum, getTenComics, getTenRandomComics };
export default dataFetcher;
