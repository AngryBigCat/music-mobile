import axios from 'axios'

const HOST = "http://182.254.158.150:8080";
// const HOST = "http://localhost:8080";
const VERSION = "v1";
const http = axios.create({
    baseURL: HOST + '/api/' + VERSION
});

export function getMusicList() {
    return http.get('/musics?page=home');
}

export function getMusic(id) {
    return http.get(`/music/${id}`);
}

export function getSearch(v) {
    return http.get(`/musics?search=${v}`);
}

export function getToken(u, p) {
    let params = new URLSearchParams();
    params.append("username", u);
    params.append("password", p);
    return http.post(`/token`, params);
}

export function getCode(phone) {
    return http.get(`/getCode?phone=${phone}`);
}

export function register(u, p, c) {
    let params = new URLSearchParams();
    params.append("username", u);
    params.append("password", p);
    params.append("code", c);
    return http.post("/register", params)
}

export function addMusicToCart(musicId) {
    let token = localStorage.getItem("token");
    if (!token) {
        this.props.history.push('/login');
        return
    }

    let cartData = localStorage.getItem("cartData");
    if (!cartData) {
        localStorage.setItem("cartData", musicId)
    } else if (cartData.indexOf(musicId) === -1) {
        localStorage.setItem("cartData", cartData += `,${musicId}`)
    }
}

export function getShopCart() {
    return http.get('/musics?ids=' + localStorage.getItem('cartData'));
}

export function getInviters() {
    return http.get('/inviters');
}

export function getOrder(field, value) {
    return http.get(`/order?${field}=${value}`)
}

export function getOrders() {
    let token = localStorage.getItem('token');
    return http.get(`/orders?token=${token}`)
}

export function postOrder(data) {
    return http.post('/order', data);
}

export function pay(state, ordernum) {
    let params = new URLSearchParams();
    params.append("state", state);
    params.append("ordernum", ordernum);
    return http.post('/pay', params);
}
export function getHome() {
    return http.get('/home/text');
}
