import { OsmsApi } from "./api";
import configuration from "./config";

const osmsApi = new OsmsApi(configuration.apiConfig);
export default osmsApi; 