import DepartmentT from "@/api/types/department";
import { Message } from "@/api/types/message";
import DepartmentTable from "@/components/DepartmentTable";
import { StateType } from "@/context/rootReducer";
import osmsApi from "@/osmsApi";
import { Card, Title,Text, Stack, Grid, Divider } from "@mantine/core";
import { AxiosResponse } from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Department(){
    const {data} = useSelector((state:StateType)=>state.department.department)
    const params:{id:string} = useParams();
    const [department,setDepartment] = useState<DepartmentT>();
    const [loading, setLoading] = useState<boolean>(true);
    async function getDepartment(id:string){
        const data = await osmsApi.department.fetch(id);
        setDepartment((data.data as any).data as any);
        setLoading(false);
    }
    useEffect(()=>{
        if(params?.id){
            getDepartment(params.id).then();
        }
    },[params])
    return(
        <Stack>
            <Card shadow="sm" withBorder className="w-full max-w-max">
                <Title>Department Info</Title>
                <Grid my={15}>
                    <Grid.Col span={6}>
                        <Stack gap={2}>
                            <Title order={5}>Name</Title>
                            <Text>{department?.name}</Text>
                        </Stack>
                        <Stack gap={2}>
                            <Title order={5}>Description</Title>
                            <Text>{department?.description}</Text>
                        </Stack>
                        <Stack gap={2}>
                            <Title order={5}>Parent Id</Title>
                            <Text>{(department?.relationsAsAChild||[])[0]?.parentId||<span className="opacity-65">This department has no parent</span>}</Text>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Stack gap={2}>
                            <Title order={5}>Creator Id</Title>
                            <Text>{department?.creatorId}</Text>
                        </Stack>
                        <Stack gap={2}>
                            <Title order={5}>Created At</Title>
                            <Text>{department?.createdAt}</Text>
                        </Stack>
                        <Stack gap={2}>
                            <Title order={5}>Updated At</Title>
                            <Text>{department?.updatedAt}</Text>
                        </Stack>
                    </Grid.Col>
                </Grid>

            </Card>
            <Divider/>
            <Title order={3}>Managed Department List</Title>
            <DepartmentTable
                departments={data?.filter((dep)=>(dep.relationsAsAChild[0]?.parentId===params.id))}
            />
        </Stack>
    )
}