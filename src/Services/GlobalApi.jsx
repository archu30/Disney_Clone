import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key = '2ec0d66f5bdf1dd12eefa0723f1479cf';

const getTrendingVideos = () => {
    return axios.get(`${movieBaseUrl}/trending/all/day?api_key=${api_key}`)
        .catch(error => {
            console.error('Error fetching trending videos:', error);
            throw error;
        });
};

const getMovieByGenreId = (id) => {
    return axios.get(`${movieBaseUrl}/discover/movie?api_key=${api_key}&with_genres=${id}`)
        .catch(error => {
            console.error(`Error fetching movies for genre ID ${id}:`, error);
            throw error;
        });
};

export default {
    getTrendingVideos,
    getMovieByGenreId
};
