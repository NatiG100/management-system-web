import { createDepartmentAction } from "@/context/department-slice/slice";
import { Button, Group, Modal, Stack, TextInput, Title } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { create } from "domain";
import { useDispatch } from "react-redux";

export interface AddDepartmentModalProps{
    parentDepartmentId?:string,
    opened:boolean,
    onClose:()=>void
}

export interface AddDepartmentFormValues{
    name:string,
    description:string,
}
export default function AddDepartmentModal({parentDepartmentId,opened,onClose}:AddDepartmentModalProps){
    const dispatch = useDispatch();
    const form = useForm<AddDepartmentFormValues>({
        initialValues:{
            description:'',
            name:'',
        },
    });
    function handleSubmit(formValue:AddDepartmentFormValues){
        dispatch(createDepartmentAction({
            name:formValue.name,
            description:formValue.description,
            parentId:parentDepartmentId,
        }));
      onClose();
    }
    return(
        <Modal opened={opened} onClose={onClose} title="Add Department">
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
                            Create
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}