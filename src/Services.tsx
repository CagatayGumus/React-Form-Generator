import axios from "axios";

const url = "https://www.jsonbulut.com/json/";

export const services = axios.create({
    baseURL: url,
    timeout: 15000,
  });

export function formAction() {
    const params = {
      ref: "4e0cbdb3095a9a699d1d2b4a2a508d8d",
      formId: 25,
    };
    return services.get("forms.php", { params: params });
  }