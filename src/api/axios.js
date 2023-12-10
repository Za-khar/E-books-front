import { defaultApi } from "@app/config";
import axios from "axios";

export const api = axios.create({
  baseURL: defaultApi,
});
