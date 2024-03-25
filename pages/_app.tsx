import store from "@/context";
import "@/styles/globals.css";
import "@mantine/core/styles.css"
import {createTheme, MantineProvider} from '@mantine/core'
import type { AppProps } from "next/app";
import { Provider, useDispatch, useSelector } from "react-redux";
import { StateType } from "@/context/rootReducer";
import {useEffect, useState} from 'react';
import { meUserAction } from "@/context/user-slice/slice";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import MainLayout from "@/components/Layout";
import { fetchDepartmentAction } from "@/context/department-slice/slice";
const theme = createTheme({
  
});

export default function App(props: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <ConfuguredApp {...props} />
      </Provider>
    </MantineProvider>
  );
}

function ConfuguredApp({Component,pageProps}:AppProps){
  const {data,errors,isLoading} = useSelector((state:StateType)=>state.users.user);
  const [pageLoading,setPageLoading] = useState(true);
  const dispath = useDispatch();
  const router = useRouter();
  useEffect(()=>{
    dispath(meUserAction());
    dispath(fetchDepartmentAction());
  },[])
  useEffect(()=>{
    if(errors.length!==0 ||!data){
      router.replace('/login')
    }
    if(data){
      router.replace('/')
    }
    setPageLoading(false);
  },[errors,data])
  if(pageLoading) return<p>Loadig</p>
  if(router.pathname.includes('login')){
    return(
      <Component {...pageProps}/>
    );  
  }
  return(
    <MainLayout>
      <Component {...pageProps}/>
    </MainLayout>
  );
}
