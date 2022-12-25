import {
    Autocomplete,
    Button,
    Flex,
    Modal,
    Text,
    TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function JoinChat({ userInfo, contacts }: any) {
    const [opened, setOpened] = useState(false)
    const navigate = useNavigate()

    const form = useForm({
        initialValues: {
            chatcode: '',
        },
    })

    async function chatcodeExists(value: any) {
        const response = await fetch(
            `https://chat-app-backend-9ub7.onrender.com/chatcode/${value}`
        )
        const parsed = await response.json()
        if (parsed.success === true) {
            return parsed.exists
        } else {
            return false
        }
    }

    return (
        <div>
            <Flex justify="end" my="sm">
                <Modal
                    opened={opened}
                    title="Start Conversing"
                    onClose={() => setOpened(false)}
                >
                    <form
                        onSubmit={form.onSubmit(async (values) => {
                            console.log('checking chatcode')
                            if (await chatcodeExists(values.chatcode)) {
                                navigate('/chat', {
                                    state: {
                                        user: userInfo,
                                        chatcode: values.chatcode,
                                    },
                                })
                            }
                        })}
                    >
                        <TextInput
                            my="sm"
                            label="Enter chat code"
                            withAsterisk
                            {...form.getInputProps('chatcode')}
                        />
                        <Button type="submit">Start Chat</Button>
                    </form>
                </Modal>
                <Button onClick={() => setOpened(true)}>Join Chat</Button>
            </Flex>
        </div>
    )
}

export default JoinChat
