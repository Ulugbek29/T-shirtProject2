import request from "../utils/request";

export const apikey = "c98d40ff-b595-4324-ac0e-ac2159a1a918";

const getGeoLocation = ({ lat, long }) =>
  request.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${apikey}&format=json&geocode=${lat},${long}&lang=uz_UZ`);

export { getGeoLocation };
