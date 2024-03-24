import ConfigInterface from "@/interfaces/configInterface";

console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
const configuration:ConfigInterface={
    apiConfig:{baseUrl:process.env.NEXT_PUBLIC_API_BASE_URL as string}
}

export default configuration;