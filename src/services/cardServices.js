import request from "../utils/request";


const cardService = {
  ClickGetToken: (data) => request.post("/payment/click_token", data),
  ClickVerifyToken: (data) => request.post("/payment/click_token_verify", data),
};

export default cardService;