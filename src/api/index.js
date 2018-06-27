import axios from 'axios'

const HOST = "http://localhost:8080";
const VERSION = "v1";
const http = axios.create({
    baseURL: HOST + '/api/' + VERSION
});

export async function getHomeData() {
    await http.get('/object')
}

export async function getMusic(id) {
    let music = {};
    await http.get(`/music/${id}`)
        .then((res) => {
            music = res.data
        });
    return music
}

