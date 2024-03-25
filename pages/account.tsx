import { StateType } from "@/context/rootReducer";
import { Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useSelector } from "react-redux";

export default function Account(){
  const {data,errors,isLoading} = useSelector((state:StateType)=>state.users.user);
  if(isLoading)return(<p>Loading...</p>)
  if(errors) return(<p>{errors}</p>)
    return(
        <Paper withBorder className="w-max p-4 min-w-72" shadow="sm">
            <Stack>
                <Title order={3}>Account Information</Title>
                <Stack gap={1}>
                    <Title order={5}>Full Name</Title>
                    <Text>{data?.fullName}</Text>
                </Stack>
                <Stack gap={1}>
                    <Title order={5}>Email</Title>
                    <Text>{data?.email}</Text>
                </Stack>
                <Stack gap={1}>
                    <Title order={5}>Status</Title>
                    <Text c={data?.status==="ACTIVE"?"green":"red"}>{data?.status}</Text>
                </Stack>
            </Stack>
        </Paper>
    )
}