import {
    Text,
    Button,
    Container,
    Flex,
    ScrollArea,
    Textarea,
    Group,
    CopyButton,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DetailsDrawer from './DetailsDrawer';
import { encryptMessage, decryptMessage } from '../utils/encryptor';
import { io } from 'socket.io-client';

function Chat({ keys }: any) {
    const [messages, setMessages] = useState<any[]>([]);
    const [members, setMembers] = useState<any[]>([]);
    const viewport = useRef<HTMLDivElement>(null);
    const socket = io('https://chat-e2ee-backend.onrender.com', {
        reconnectionDelay: 1000,
        reconnection: true,
        transports: ['websocket'],
        agent: false,
        upgrade: false,
        rejectUnauthorized: false,
    });
    const form = useForm({
        initialValues: {
            message: '',
        },
    });
    const location = useLocation();
    const navigate = useNavigate();

    const chatcode = location.state.chatcode;
    const username = location.state.user.username;
    const userPublicKey = location.state.user.publicKey;
    const userPrivateKey = location.state.user.privateKey;

    useEffect(() => {
        socket.emit('joinChat', {
            username: username,
            chatcode: chatcode,
            publicKey: userPublicKey,
        });
    }, []);

    socket.on('notif', (message) => {
        console.log(message);
        setMessages((prevMessages) => [...prevMessages, message]);
        scrollToBottom();
    });

    socket.on('members', (data) => {
        setMembers([]);
        data.members.map((member: any) => {
            setMembers((prevMembers) => [...prevMembers, member]);
        });
        console.log({ members });
    });

    socket.on('privateMessage', (privateMessage) => {
        if (privateMessage.sender !== username) {
            const senderPublicKey = privateMessage.senderPublicKey;

            const decrypted = decryptMessage({
                senderPublicKey: senderPublicKey,
                userPrivateKey: userPrivateKey,
                prime: keys.P,
                encryptedText: privateMessage.message,
            });

            console.log('encrypted message received: ', privateMessage.message);
            console.log('decrypted message: ', decrypted);

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    members: privateMessage.members,
                    chatcode: privateMessage.chatcode,
                    sender: privateMessage.sender,
                    message: decrypted,
                },
            ]);
            scrollToBottom();
        }
    });

    function sendMessage(values: any) {
        const recipient = members.filter(
            (member) => member.username !== username
        );

        const encrypted = encryptMessage({
            recipientPublicKey: recipient[0].publicKey,
            userPrivateKey: userPrivateKey,
            prime: keys.P,
            message: values.message,
        });

        console.log('original message: ', values.message);
        console.log('encrypted message: ', encrypted);

        socket.emit('privateMessage', {
            chatcode: chatcode,
            sender: username,
            message: encrypted,
        });

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                chatcode: chatcode,
                sender: username,
                message: values.message,
            },
        ]);

        scrollToBottom();
    }

    function leaveChat() {
        socket.emit('leave', { username: username, chatcode: chatcode });
    }

    function scrollToBottom() {
        viewport.current.scrollTo({
            top: viewport.current.scrollHeight,
            behavior: 'smooth',
        });
    }

    return (
        <>
            <Container size="sm">
                <DetailsDrawer userInfo={location.state.user} />
                <Flex
                    justify="space-between"
                    align="center"
                    my="sm"
                >
                    <Button
                        onClick={() => {
                            navigate(-1);
                            leaveChat();
                        }}
                    >
                        Leave
                    </Button>
                    <Group>
                        <Text>{chatcode}</Text>
                        <CopyButton
                            value={chatcode}
                            timeout={2000}
                        >
                            {({ copied, copy }) => (
                                <Button
                                    color={copied ? 'teal' : 'blue'}
                                    onClick={copy}
                                    // size="xs"
                                >
                                    {copied ? 'Copied' : 'Copy Code'}
                                </Button>
                            )}
                        </CopyButton>
                    </Group>
                </Flex>
                <ScrollArea
                    style={{ height: '50vh', border: '1px solid lightgray' }}
                    p="sm"
                    viewportRef={viewport}
                    type="always"
                >
                    {messages.map((message, index) => {
                        return (
                            <Flex
                                key={index}
                                my="xs"
                            >
                                <Group p="sm">
                                    <Text fz="sm">{`${message.sender} : ${message.message}`}</Text>
                                </Group>
                            </Flex>
                        );
                    })}
                </ScrollArea>
                <form
                    onSubmit={form.onSubmit((values) => {
                        sendMessage(values);
                        form.reset();
                    })}
                >
                    <Flex
                        align="center"
                        my="sm"
                        gap="sm"
                    >
                        <Textarea
                            label={
                                members.length < 2
                                    ? 'Please wait for other party to join before sending message'
                                    : null
                            }
                            placeholder="message"
                            sx={{ flex: 1 }}
                            disabled={members.length < 2 ? true : false}
                            {...form.getInputProps('message')}
                        />
                        <Button
                            type="submit"
                            disabled={members.length < 2 ? true : false}
                        >
                            Send
                        </Button>
                    </Flex>
                </form>
            </Container>
        </>
    );
}

export default Chat;
