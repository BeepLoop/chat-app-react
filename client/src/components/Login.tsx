import { Button, Container, LoadingOverlay, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import generateKey from '../utils/generateKey';

type Tkeys = {
    P: number;
    g: number;
};

function Login({ setUser, serverKeys }: any) {
    const [submitting, setSubmitting] = useState(false);

    const form = useForm({
        initialValues: {
            username: '',
        },
        validate: {
            username: (value) =>
                value.length < 1 ? 'Enter a valid username' : null,
        },
    });

    function login(value: any) {
        setSubmitting(true);
        const userKeys = generateKey(serverKeys.P, serverKeys.g);
        setUser({
            username: value.username,
            publicKey: userKeys.public.toString(),
            privateKey: userKeys.private.toString(),
        });
    }

    return (
        <div>
            <LoadingOverlay visible={submitting} />
            <form
                onSubmit={form.onSubmit((values) => {
                    login(values);
                })}
            >
                <Container
                    size="xs"
                    style={{
                        border: '1px solid lightgray',
                    }}
                    p="sm"
                >
                    <TextInput
                        label="Enter a username"
                        my="sm"
                        {...form.getInputProps('username')}
                    />
                    <Button type="submit">Continue</Button>
                </Container>
            </form>
        </div>
    );
}

export default Login;
