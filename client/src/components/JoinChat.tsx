import {
    Button,
    Flex,
    LoadingOverlay,
    Modal,
    Notification,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinChat({ userInfo }: any) {
    const [opened, setOpened] = useState(false);
    const [checkingCode, setCheckingCode] = useState(false);
    const [codeError, setCodeError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('An error occurred');
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            chatcode: '',
        },
    });

    async function chatcodeExists(value: any) {
        setCheckingCode(true);
        const response = await fetch(`http://localhost:3000/chatcode/${value}`);
        const parsed = await response.json();
        setCheckingCode(false);
        console.log('parsed: ', parsed);
        if (parsed.success === true) {
            return parsed.exists;
        } else {
            setErrorMessage(parsed.errorMessage);
            setCodeError(true);
            return false;
        }
    }

    return (
        <div>
            <Flex
                justify="end"
                my="sm"
            >
                <Modal
                    opened={opened}
                    title="Start Conversing"
                    onClose={() => setOpened(false)}
                >
                    <LoadingOverlay visible={checkingCode} />
                    {codeError ? (
                        <Notification
                            color="red"
                            title="Error joining the chat"
                            onClose={() => setCodeError(false)}
                        >
                            {errorMessage}
                        </Notification>
                    ) : null}

                    <form
                        onSubmit={form.onSubmit(async (values) => {
                            console.log('checking chatcode');
                            if (await chatcodeExists(values.chatcode)) {
                                navigate('/chat', {
                                    state: {
                                        user: userInfo,
                                        chatcode: values.chatcode,
                                    },
                                });
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
    );
}

export default JoinChat;
