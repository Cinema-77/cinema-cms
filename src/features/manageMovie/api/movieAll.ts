import { axios } from "@/lib/axios"

export const getMovieAll =()=>{
    return axios.get('/movie/all')
}