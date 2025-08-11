"use client"

import AnimatedWrapper from '@/components/animated-wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/auth-context'
import { useToast } from '@/hooks/use-toast'
import { LogIn } from 'lucide-react'
import { type FormEvent, useState } from 'react'

export default function LoginPage(){

    console.log("en login page");
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth();
    const { toast } = useToast()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (username.trim() !== "" && password.trim() !== "") {
        login(username, password)
        toast({
            title: "Inicio de sesión exitoso",
            description: `¡Bienvenido de nuevo, ${username}!`,
        })
        } else {
        toast({
            title: "Error de validación",
            description: "El nombre de usuario y la contraseña no pueden estar vacíos.",
            variant: "destructive",
        })
        }
    }

    return(
        <AnimatedWrapper>
            <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
                <Card className="w-full max-w-sm border border-border bg-card/50 backdrop-blur-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <LogIn  className='h-5 w-5 text-primary' />
                            Bienvenido
                        </CardTitle>
                        <CardDescription>
                            Ingresa tus credenciales para acceder a tu cuenta
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                            <fieldset className='flex flex-col gap-2'>
                                <Label htmlFor='username'>Usuario</Label>
                                <Input 
                                   id='username'
                                   type='text'
                                   placeholder='usuario123'
                                   required
                                   value={username}
                                   onChange={(e) => setUsername(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="flex flex-col gap-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </fieldset>
                            <Button type="submit" className="mt-2 w-full">
                                Iniciar Sesión
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </section>
        </AnimatedWrapper>
    )
}