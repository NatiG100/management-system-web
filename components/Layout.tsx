import { ReactNode } from "react";
import { Navbar } from "./Sidebar";
import { Anchor, Breadcrumbs } from "@mantine/core";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

export default function MainLayout({children}:{children:ReactNode}){
    const router = useRouter();
    const params:{id?:string} = useParams();
    let items:{title:string,href?:string}[] = []
    if(router.pathname==='/'){
        items = [{title:"Dashboard"}]
    }else if(router.pathname==="/departments"){
        items = [{title:"Departments"}]
    }else if(router.pathname==="/account"){
        items = [{title:"Account"}]
    }else if(router.pathname.includes("/departments")){
        const routes = router.pathname.split('/');
        items = [{href:"/",title:"Departments"},{title:params?.id||""}]
    }
    const breadcrumbItems = items.map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ));
    return(
        <div className="grid grid-cols-[max-content,1fr]">
            <Navbar/>
            <div className="w-full grid grid-rows-[max-content,1fr]">
                <div className="mx-3 mt-4 mb-6">
                    <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
                </div>
                <div className="px-3 h-full w-full overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}