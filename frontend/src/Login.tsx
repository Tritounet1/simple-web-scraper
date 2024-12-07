import { Input } from "@chakra-ui/react"
import { useState} from "react";
import {Button} from "./components/ui/button.tsx";
import { SimpleGrid } from "@chakra-ui/react"
import {Center} from "@chakra-ui/react";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:5000";

    const handleLogin = async () => {
        setError('');
        try {
            const response = await fetch(`${backendUrl}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! Status: ${response.status}`);
            }
            // const data = await response.json();

            localStorage.setItem('authenticated', 'true');
            window.location.href = '/home';

        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError('Erreur lors de la connexion. Veuillez réessayer.');
        }
    };

    return (
        <div>
            <Center>
                <SimpleGrid columns={1} gap="40px">
                    <h2 style={{textAlign: "center", marginTop: "120%"}}>Se connecter</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Afficher l'erreur si elle existe */}
                    <Input
                        placeholder="Entrer votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />
                    <Input
                        placeholder="Entrer votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                    />
                    <Button onClick={() => {
                        handleLogin();
                    }}>
                        Se connecter
                    </Button>
                </SimpleGrid>
            </Center>
        </div>
    );
}

export default Login;