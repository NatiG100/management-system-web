import { StateType } from "@/context/rootReducer";
import { Paper, Text } from "@mantine/core";
import { useSelector } from "react-redux";

export default function Account(){
  const {data,errors,isLoading} = useSelector((state:StateType)=>state.users.user);
  if(isLoading)return(<p>Loading...</p>)
  if(errors) return(<p>{errors}</p>)
    return(
        <Paper withBorder className="w-max p-4 min-w-72">
            <Text>{data?.fullName}</Text>
            <Text>{data?.email}</Text>
            <Text>{data?.status}</Text>
        </Paper>
    )
}