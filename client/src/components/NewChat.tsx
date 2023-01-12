import { Button, Flex, Modal, Text } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function NewChat({ userInfo }: any) {
    const [opened, setOpened] = useState(false);
    const navigate = useNavigate();

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
                    <Text
                        my="sm"
                        c="red"
                    >
                        You will be creating a brand new chat
                    </Text>
                    <Button
                        onClick={() => {
                            navigate('/chat', {
                                state: {
                                    user: userInfo,
                                    chatcode: uuidv4(),
                                },
                            });
                        }}
                    >
                        Continue
                    </Button>
                </Modal>
                <Button onClick={() => setOpened(true)}>New Chat</Button>
            </Flex>
        </div>
    );
}

export default NewChat;
