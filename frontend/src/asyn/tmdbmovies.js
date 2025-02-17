import axios  from "axios";


  const getAllMovies = async () => {
    let allMovies = [];
    let page = 1;
    let totalPages =5; 

    while (page <= totalPages) {
      try {
        console.log(import.meta.env.VITE_MOVIEURL)
        const response = await axios.get(import.meta.env.VITE_MOVIEURL, {
          params: {
            api_key: import.meta.env.VITE_MOVIEKEY,
            region: 'IN',
            language: 'en-US',
            page: page,
            append_to_response: 'credits,videos',
          },
        });
        console.log(response)

        allMovies = [...allMovies, ...response.data.results];
        page += 1;
      } catch (error) {
        console.error('Error fetching movies:', error);
        break;
      }
    }
    console.log(allMovies)
    return allMovies;
    
  };


  export default getAllMovies;