import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

function AddContact({ addContact, closeModal }: any) {
    const form = useForm({
        initialValues: {
            chatname: '',
            chatcode: '',
        },
        validate: {
            chatname: (value) =>
                value.length < 1 ? 'Please enter a name for contact' : null,
            chatcode: (value) =>
                value.length < 8 ? 'Enter a valid chat code' : null,
        },
    })
    return (
        <div>
            <form
                onSubmit={form.onSubmit((values) => {
                    addContact(values)
                    closeModal()
                })}
            >
                <TextInput
                    label="Chat Name"
                    withAsterisk
                    {...form.getInputProps('chatname')}
                />
                <TextInput
                    label="Chat Code"
                    withAsterisk
                    {...form.getInputProps('chatcode')}
                />
                <Button type="submit">Save Chat</Button>
            </form>
        </div>
    )
}

export default AddContact
