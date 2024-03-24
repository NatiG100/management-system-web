import { Anchor, Box, Button, Card, Center, Checkbox, Container, Flex, Group, Paper, PasswordInput, Space, Stack, Text, TextInput } from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import {useForm} from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction, registerUserAction } from "@/context/user-slice/slice";
import { StateType } from "@/context/rootReducer";

export interface AuthFormValues{
  email:string,
  fullName:string,
  password:string,
  terms:boolean,
}
export default function LoginPage({props}:any){
    const [type,toggle] = useToggle(['login','register']);
    const form = useForm<AuthFormValues>({
        initialValues:{
            email:'',
            fullName:'',
            password:'',
            terms:false,
        },
    });
    const dispatch = useDispatch();
    function handleSubmit(formValue:AuthFormValues){
      if(type==="login"){
        dispatch(loginUserAction({email:formValue.email,password:formValue.password}));
      }else if(type==="register"){
        dispatch(registerUserAction({email:formValue.email,fullName:formValue.fullName,password:formValue.password}))
      }
    }
    const {errors} = useSelector((state:StateType)=>state.users.user);
    return (
        <Center mt={"xl"}>

        <Paper radius="md" p="xl" withBorder maw={"500"} bg={"#efeffa"} shadow="sm"{...props}>
            <Text size="lg" fw={500}>
        Welcome to OSMS, {type} with
      </Text>
      {errors.length!==0&&<Text c="red">{errors}</Text>}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Full Name"
              placeholder="Your name"
              value={form.values.fullName}
              onChange={(event) => form.setFieldValue('fullName', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="Your email"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" disabled={type==="register"&&form.values.terms===false}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
        </Center>
    )
}