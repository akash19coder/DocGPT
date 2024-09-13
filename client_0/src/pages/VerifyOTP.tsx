import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { toast } from 'react-hot-toast';
import '../../src/assets/css/Form.css';
import { sendOTP } from '../helpers/api-communicator';
import { useParams } from 'react-router';

const VerifyOTP = () => {

    const {otp} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        const otp = formdata.get('otp') as string;
        try {
            toast.loading("Verifying OTP...", { id: 'otp' });
            sendOTP(otp);
            toast.success("Verified", { id: 'otp' });
            window.location.href = 'http://localhost:5173/'
        } catch (error) {
            toast.error("Verification failed", { id: 'otp' });
        }
    }
    return (
        <div className="container">
            <div>
                <h1>DocGPT</h1>
                <h4>Verify Email</h4>
                <form onSubmit={handleSubmit} >
                    <Input
                        type="text"
                        value={otp == undefined ? '' : otp}
                        name="otp"
                        label="OTP"
                    />
                    <Button type='submit' buttonName="Continue"></Button>
                </form>
                <div>
                    <h4>
                        Didn't receive?{' '}
                        <a href="/auth/signup">Resend OTP</a>
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
    );
};

export default VerifyOTP;
