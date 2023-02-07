import axios from 'axios';

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const fetchImage = async (url) => {
    const { data } = await $host.get(url, {
        responseType: 'arraybuffer',
    });
    return data;
};

export const fetchImagesNames = async (url) => {
    const { data } = await $host.get(url + '/config.json');
    return data.images;
};
