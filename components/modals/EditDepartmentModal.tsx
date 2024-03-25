import DepartmentT from "@/api/types/department";
import { createDepartmentAction, updateDepartmentAction } from "@/context/department-slice/slice";
import { Button, Group, Modal, Stack, TextInput, Title } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { create } from "domain";
import { useDispatch } from "react-redux";

export interface EditDepartmentModalProps{
    opened:boolean,
    onClose:()=>void,
    department:DepartmentT
}

export interface EditDepartmentFormValues{
    name:string,
    description:string,
}
export default function EditDepartmentModal({department,opened,onClose}:EditDepartmentModalProps){
    const dispatch = useDispatch();
    const form = useForm<EditDepartmentFormValues>({
        initialValues:{
            description:department.description||"",
            name:department.name,
        },
    });
    function handleSubmit(formValue:EditDepartmentFormValues){
        dispatch(updateDepartmentAction({id:department.id,info:{description:formValue.description,name:formValue.name}}));
      onClose();
    }
    return(
        <Modal opened={opened} onClose={onClose} title="Edit Department">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        required
                        label="Name"
                        placeholder="Department Name"
                        value={form.values.name}
                        onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                        error={form.errors.name && 'Invalid Name'}
                        radius="sm"
                    />
                    <TextInput
                        multiple
                        required
                        label="Description"
                        placeholder="A short description for the department"
                        value={form.values.description}
                        onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
                        error={form.errors.description && 'Invalid Description'}
                        radius="sm"
                    />
                    <Group>
                        <span className="flex-1"/>
                        <Button onClick={onClose} size="sm" leftSection={<IconPlus size={15}/>} bg={'yellow'} radius="xl">
                            Cancel
                        </Button>
                        <Button size="sm" leftSection={<IconPlus size={15}/>} type="submit" radius="xl">
                            Edit
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}