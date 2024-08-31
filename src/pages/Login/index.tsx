
import {
    SyntheticEvent,
    useCallback,
    useRef,
    useState
} from 'react'
import styles from './styles.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading';
import { Toast } from '../../components/Toast';


export default function Login() {

    const navigate = useNavigate()

    const refForm = useRef<any>()

    const [isLoading, setIsLoading] = useState(false)

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        if (refForm.current.checkValidity()) {

            setIsLoading(true)
            const target = event.target as typeof event.target & {
                email: { value: string },
                senha: { value: string }
            }

            console.log(target.email.value)
            console.log(target.senha.value)

            axios.post('http://localhost:3001/login',
                {
                    email: target.email.value,
                    password: target.senha.value
                }
            ).then((resposta) => {
                console.log(resposta.data)
                // não usar
                // window.location('/')

                navigate('/dashboard')
            })
            .catch((erro) => {
                console.log(erro)
                setIsLoading(false)
            })

        } else {
            refForm.current.classList.add('was-validated')
        }
    }, [])

    return (
        <>
            <Loading
                visible={isLoading}
                
            />
            <Toast
                message='Credenciais Invalidas'
                onClose={() => {}}
                show={true}
                color='danger'
            />
            
            <div className={styles.main}>
                <div className={styles.border}>
                    <div className='d-flex flex-column align-items-center'>
                        <h1 className='text-primary'>Login</h1>
                        <p className='text-secundary'>
                            Preencha os campos para logar
                        </p>

                    </div>
                    <hr />

                    <form
                        className='needs-validation align-items-center'
                        noValidate
                        onSubmit={submitForm}
                        ref={refForm}
                    >
                        <div
                            className='col-md-12'
                        >
                            <label
                                htmlFor='email'
                                className='form-label'
                            >
                                Email
                            </label>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Digite seu email'
                                id='email'
                                required
                            />
                            <div
                                className='invalid-feedback'
                            >
                                Por favor digite seu email
                            </div>
                        </div>
                        <div
                            className='col-md-12 mt-1'
                        >
                            <label
                                htmlFor='senha'
                                className='form-label'
                            >
                                Senha
                            </label>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Digite sua senha'
                                id='senha'
                                required
                            />
                            <div
                                className='invalid-feedback'
                            >
                                Por favor digite sua senha
                            </div>
                        </div>
                        <div className='col-md-12 mt-3'>
                            <button
                                className='btn btn-primary w-100'
                                type='submit'
                                id='botao'
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}