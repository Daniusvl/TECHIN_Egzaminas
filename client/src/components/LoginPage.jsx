import { usersModel } from "../shared/api/usersModel.mjs";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../shared/hooks/useAuth";

export default function LoginPage() {
    
    const navigate = useNavigate();
    const {authenticate} = useAuth();
    const {
        register,
        setError,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm();


    const onSubmit = async (formData) => {
        const [status, data] = await usersModel.login(formData);
        if(status === 200){
            authenticate(data.token);
            navigate("/");
        } else {
            if(data.errors){
                const errors = data.errors;
                for (let i = 0; i < errors.length; i++) {
                    setError(errors[i].path, {
                        message: errors[i].msg
                    });
                }
            }
            else{
                alert(data.message);
            }
        }
    }
    
    return (
    <div className="center-container">
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
            <div className="input-form">
                <label>email</label>
                <input {...register("email", {required: true})} />
            </div>
                {errors.email && <p>{errors.email.message}</p>}
            <div  className="input-form">
                <label>password</label>
                <input {...register("password", {required: true})} type="password"/>
            </div>
                {errors.password && <p>{errors.password.message}</p>}
            <button>Login</button>
        </form>
    </div>
    )
}