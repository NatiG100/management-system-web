import ConfigInterface from "@/interfaces/configInterface";

const configuration:ConfigInterface={
    apiConfig:{baseUrl:process.env.API_BASE_URL as string}
}

export default configuration;