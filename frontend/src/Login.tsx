import { Input } from "@chakra-ui/react"
import {useEffect, useState} from "react";
import {Button} from "./components/ui/button.tsx";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:5000";

    useEffect(() => {
        const authenticated = localStorage.getItem('authenticated');
        if (authenticated) {
            window.location.href = '/home';
        }
    }, []);

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

            const data = await response.json();

            localStorage.setItem('authenticated', 'true');
            window.location.href = '/home';

        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError('Erreur lors de la connexion. Veuillez réessayer.');
        }
    };

    return (
        <div>
            <h2>Se connecter</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Afficher l'erreur si elle existe */}
                <div>
                    <Input
                        placeholder="Entrer votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />
                </div>
                <div>
                    <Input
                        placeholder="Entrer votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                    />
                </div>
                <Button onClick={() => {
                    handleLogin();
                }}>
                    Se connecter
                </Button>
        </div>
    );
}

export default Login;