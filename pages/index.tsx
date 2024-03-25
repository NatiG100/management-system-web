import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, Divider, Flex, Group, Paper, Stack, Table, Title } from "@mantine/core";
import {  useSelector } from "react-redux";
import { StateType } from "@/context/rootReducer";
import { useState } from "react";
import Link from "next/link";
import {IconUser,IconLayersIntersect} from "@tabler/icons-react"
import DepartmentTable from "@/components/DepartmentTable";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [hilightedDepartment,setHilightedDepartment] = useState<string>('');
    function hilightDepartment(depId:string){
        setHilightedDepartment(depId);
        setTimeout(()=>{setHilightedDepartment('')},4000);
    }
  const {data,errors,isLoading} = useSelector((state:StateType)=>state.department.department);
    return(
      <Stack>
        <Paper withBorder className="w-max" bg={"green"} c="var(--mantine-color-white)" shadow="sm" px={20} py={10}>
          <Flex align={"center"} gap={15}><IconUser/><Title size={25}>{data?.length} Departments</Title></Flex>
        </Paper>
        <Divider color="var(--mantine-primary-color-2)" />
        <Title >Department List</Title>
        <DepartmentTable departments={data}/>
        <Divider color="var(--mantine-primary-color-2)" />
        <Title>Actions</Title>
        <Group>
          <Link href={"/departments"}>
            <Button leftSection={<IconLayersIntersect/>}>Manage Departments</Button>
          </Link>
          <Link href={"/account"}>
            <Button leftSection={<IconUser/>}>Manage Account</Button>
          </Link>
        </Group>
      </Stack>
    )
}
