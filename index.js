const fetchData = async () => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'e9bacc05',
            s: 'avengers'
    }});

    console.log(response.data);
};

fetchData();