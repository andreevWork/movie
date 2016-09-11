/**
 * Чтобы поведение во всех брауузерах было одно и то же
 * Зануляем fetch и загружаем полифилл
 */
import axios from 'axios';

export default class Request {
    constructor(url) {
        this.url = url;
    }

    send() {
        return axios.get(this.url);
    }
}