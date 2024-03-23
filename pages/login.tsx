import { Anchor, Box, Button, Card, Center, Checkbox, Container, Flex, Group, Paper, PasswordInput, Space, Stack, Text, TextInput } from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import {useForm} from "@mantine/form";

export default function LoginPage({props}:any){
    const [type,toggle] = useToggle(['login','register']);
    const form = useForm({
        initialValues:{
            email:'',
            fullName:'',
            password:'',
            terms:false,
        }
    })
    return (
        <Center mt={"xl"}>

        <Paper radius="md" p="xl" withBorder maw={"500"} bg={"#efeffa"} shadow="sm"{...props}>
            <Text size="lg" fw={500}>
        Welcome to OSMS, {type} with
      </Text>

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Full Name"
              placeholder="Your name"
              value={form.values.fullName}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
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