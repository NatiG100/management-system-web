
import { useState } from 'react';
import { UnstyledButton, Tooltip, Title, rem, Dialog, Group, TextInput, Button, Text } from '@mantine/core';
import {
  IconGauge,
  IconLogout,
  IconBrandAsana,
  IconUser,
  IconSettings,
  IconLayersLinked,
  
} from '@tabler/icons-react';
import classes from './Navbar.module.css';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logoutUserAction } from '@/context/user-slice/slice';
import { useDisclosure } from '@mantine/hooks';


export function Navbar() {
  const [active, setActive] = useState('Releases');
  const [activeLink, setActiveLink] = useState('Settings');
  const [opened,{toggle,close}] = useDisclosure(false);

    const router = useRouter();
    const dispatch = useDispatch();
const mainLinksMockdata = [
    { icon: IconGauge, label: 'Dashboard',onclick:()=>{router.push('/')} },
    {icon:IconLayersLinked,label:"Departments",onclick:()=>{router.push('/departments')}},
    { icon: IconUser, label: 'Account',onclick:()=>{router.push('/account')} },
    { icon: IconLogout, label: 'Logout',onclick:toggle },
    { icon: IconSettings, label: 'Settings',onclick:()=>{} },
  ];

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => {
            if(link.label!=="Logout"){
                setActive(link.label)
            }
            link.onclick();
        }}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  return (
    <>
        <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md" c={"white"} bg={"gray"}>
        <Text size="sm" mb="xs" fw={500}>
          Are you sure? You want to logout?
        </Text>

        <Group align="flex-end">
          <Button onClick={()=>{close;dispatch(logoutUserAction())}} c="var(--mantine-color-white)" bg="red">Logout</Button>
        </Group>
      </Dialog>
        <nav className={classes.navbar}>
        <div className={classes.wrapper}>
            <div className={classes.aside}>
            <div className={classes.logo}>
                <IconBrandAsana size={35}/>
            </div>
            {mainLinks}
            </div>
            
        </div>
        </nav>
    </>
  );
}