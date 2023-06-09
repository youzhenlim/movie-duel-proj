const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "e9bacc05",
      s: searchTerm,
    },
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

const root = document.querySelector(".autocomplete");
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
const dropdown = document.querySelector(".dropdown");
const resultWrapper = document.querySelector(".results");

const onInput = debounce(async (event) => {
  const movies = await fetchData(event.target.value);

  if(!movies.length){
    dropdown.classList.remove('is-active');
    return;
  }

  resultWrapper.innerHTML = '';

  dropdown.classList.add("is-active");
  for (let movie of movies) {
    const option = document.createElement("a");
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster

    option.classList.add("dropdown-item");
    option.innerHTML = `
        <img src = "${imgSrc}" />
        ${movie.Title}
    `;
    option.addEventListener('click',()=>{
        dropdown.classList.remove('is-active')
        input.value = movie.Title;
    })

    resultWrapper.appendChild(option);
  }
}, 1000);

input.addEventListener("input", onInput);

document.addEventListener('click', event =>{
    if (!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    }
})
