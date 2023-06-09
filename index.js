const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "e9bacc05",
      s: searchTerm,
    },
  });

  if(response.data.Error){
    return [];
  }

  return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search for a movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
        </div>
    </div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector('.dropdwon');
const resultWrapper = document.querySelector('.results');


const onInput = debounce( async (event) => {
  const movies = await fetchData(event.target.value);
  
  for (let movie of movies){
    const div = document.createElement('div')
    div.innerHTML = `
        <img src = "${movie.Poster}" />
        <h1>${movie.Title}</h1>
    `

    document.querySelector('#target').appendChild(div);
  }

}, 1000);


input.addEventListener("input", onInput);
