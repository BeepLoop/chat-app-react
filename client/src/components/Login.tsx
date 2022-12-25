import { Button, Container, LoadingOverlay, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import generateKey from '../utils/generateKey'

type Tkeys = {
    P: number
    g: number
}

function Login({ setUser }: any) {
    const [submitting, setSubmitting] = useState(false)
    const [keys, setKeys] = useState<Tkeys>({ P: 0, g: 0 })

    useEffect(() => {
        getServerKeys()
    }, [])

    const form = useForm({
        initialValues: {
            username: '',
        },
        validate: {
            username: (value) =>
                value.length < 1 ? 'Enter a valid username' : null,
        },
    })

    async function getServerKeys() {
        const response = await fetch('http://localhost:3000/serverKeys')
        const serverKeys = await response.json()
        setKeys(serverKeys)
    }

    function login(value: any) {
        setSubmitting(true)
        const userKeys = generateKey(keys.P, keys.g)
        setUser({
            username: value.username,
            publicKey: userKeys.public.toString(),
            privateKey: userKeys.private.toString(),
        })
    }

    return (
        <div>
            <LoadingOverlay visible={submitting} />
            <form
                onSubmit={form.onSubmit((values) => {
                    login(values)
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
    )
}

export default Login
