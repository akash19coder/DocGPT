import Input from '../components/Input';
import Button from '../components/Button';
import '../../src/assets/css/Form.css'
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const SignupPage = () => {

    const auth = useAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        toast.loading("Signing Up", { id: 'signup' });
        await auth?.signup(name,email,password);
        toast.success("Signed Up", { id: 'signup' });
        window.location.href = 'http://localhost:5173/verifyOTP/';
    }
    return (
        <div className="container">
            <div className="flex-item-1">
                <div>
                    <h1>DocGPT</h1>
                    <h4>
                        Join DocGPT and initiate conversation with
                        your documents
                    </h4>
                    <form onSubmit={handleSubmit}>
                        
                            <Input name='name' type="text" label='Username' />
                        
                        
                            <Input name="email" type="email" label='Email' />
                        
                        
                            <Input name="password" type="password" label='Password' />
                        
                        <Button type='submit' buttonName='Create your account'></Button>
                    </form>
                    <div>
                        <h4>
                            Already have one?{' '}
                            <a href="/auth/signin">Sign In</a>
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
            </div>
        </div>
    );
};

export default SignupPage;
