import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import '../../src/assets/css/Form.css';
import { useState } from 'react';
import { sendOTP } from '../helpers/api-communicator';

const Authentication = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [verified, setVerified] = useState<boolean>(false); 

    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [otp, setOtp] = useState<string>();
  
    
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!isLogged) {
                if (username && email && password) {
                    toast.loading('Signing Up...', { id: 'signup' })
                    const data = await auth?.signup(username, email, password);
                    toast.success(`${data.name.toUpperCase() }, Please verify your email`, { id: 'signup' })
                    setVerified(true);
                    navigate('/verifyOTP')
        
                }
                else {
                    toast.error('Enter email or password', { id: 'signup' })
                }
            }
            else if (verified) {
                toast.loading('Verifying', { id: 'otp' });
                console.log('sending otp to the server...');
                const data = await sendOTP(otp);
                console.log(data);
                toast.success(`${data.message}`, { id: 'otp' });
                navigate('/')
            }
            else{
                if (email && password) {
                    toast.loading('Logining in...', { id: 'login' })
                    const data = await auth?.login(email, password);
                    toast.success(`Welcome back,${data.name.toUpperCase()},`, { id: 'login' })
                    setVerified(true);
                    navigate('/')
                }
                else {
                    toast.error('Enter email or password', { id: 'login' })
                }
            }

        } catch (error) {
            toast.error('Invalid Email or Password');
        }
    }
    return (
        <div className="container">
            <div>
                <h1>DocGPT</h1>
                <h4>Hey folks! Welcome Back</h4>
                <form onSubmit={handleSubmit}>
                    {verified ? (
                        <>
                            <label htmlFor="">Enter OTP</label>
                            <input value={otp} type="text" name='otp' onChange={(e) => setOtp(e.target.value)} />
                            <Button type="submit" buttonName="Continue" />
                        </>
                    ) : (
                        <>
                            {!isLogged && (
                                <>
                                    <label htmlFor="">Username</label>
                                    <input
                                        value={username}
                                        type="name"
                                        name="name"
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                    />
                                </>
                            )}
                            <label htmlFor="">Email</label>
                            <input
                                value={email}
                                type="email"
                                name="email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <label htmlFor="">Password</label>
                            <input
                                value={password}
                                type="password"
                                name="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <Button type="submit" buttonName="Continue" />
                        </>
                    )}
                </form>
                <div>
                    <h4>
                        {isLogged ? 'Don\'t have one? ' : 'Already have one? '}
                        <span onClick={() => {
                            setIsLogged(!isLogged);
                            navigate(isLogged ? '/signup' : '/login');
                        }}>{isLogged ? 'Create One' : 'Sign in'}
                        </span>
                    </h4>
                </div>
                <div>
                    <h3>
                        By continuing you agree to our{' '}
                        <a href="">Terms</a> and{' '}
                        <a href="">Privacy Policy</a>
                    </h3>
                </div>
            </div>
        </div >
    );
};

export default Authentication;
