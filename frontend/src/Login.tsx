import { Input } from "@chakra-ui/react"
import {useState} from "react";
import {Button} from "./components/ui/button.tsx";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://51.195.151.110:49103/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(`Erreur HTTP! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Login success:', data);

            /*
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard';
            */
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError('Erreur lors de la connexion. Veuillez réessayer.');
        } finally {
            setLoading(false);
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
                    setLoading(true);
                    handleLogin();
                }}>
                    Se connecter
                </Button>
        </div>
    );
}

export default Login;