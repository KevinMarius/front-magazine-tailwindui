import React, { useContext } from 'react';

import { useForm } from '../hooks/form-hook';

import logo from '../assets/logo.png';
import Input from '../components/form/Input';
import Button from '../components/Button';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_PASSWORD } from '../utils/validators';
import { AuthContext } from '../contexts/AuthContext';
import { useAuth } from '../hooks/auth-hook';
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorModal from '../components/ErrorModal';
import { NotificationManager, NotificationContainer } from 'react-notifications'

function SignIn() {
  //const navigate = useNavigate();
  const { token, login, logout, userId} = useAuth();
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  
  const navigate = useNavigate();

  const location = useLocation();
  const auth = useContext(AuthContext);

  const redirectPath = location.state?.path || '/dashboard';

  const [formState, inputHandle] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  },
    false
  );

  const loginSubmitHandle = async (e) => {
    e.preventDefault();

    const user = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value
    }
    
    try{
      const response = await sendRequest(`http://localhost:3500/api/user/login`, 'post', user, {
        'Content-Type': 'application/json'
      }
);
      console.log(response.message)
      login(response.userId, response.token);
      navigate('/dashboard', { state: { message: response.message } });
    }catch(err) {}

  };

  /* const loginSubmitHandle = async (e) => {
    e.preventDefault();
    const user = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value
    }

    login(user.email, user.password);
    navigate('/dashboard')
  }; */

  return (
    
      <React.Fragment>
        <NotificationContainer />
        <ErrorModal error={error} onClose={clearError}/>
        { isLoading && <LoadingSpinner /> }
        <div className='w-[100%] flex justify-center items-center h-screen bg-slate-100'>
          <div className='relative flex flex-col bg-white p-6 shadow-xl rounded-xl w-[90%] md:w-[50%]'>
            <Link className='mx-auto w-[20%]' to='/'><img className='my-6' src={logo} alt='572-768x591' /></Link>
            <h2 className='text-gray-800 text-3xl font-bold font-alata'>Login</h2>
            <h6 className='text-gray-8 font-semibold text-sm font-sans my-2'>log in to access your account</h6>
            <div className='my-3 border-b border-b-gray-300'></div>
            <form onSubmit={loginSubmitHandle}>
              <Input
                element="input"
                type="email"
                label="Email"
                placeholder='Enter your email address'
                id="email"
                errorText="please enter the valid email."
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                onInput={inputHandle}
              />
              <Input
                element="input"
                type="password"
                label="Password"
                placeholder="Enter your Password"
                id="password"
                errorText="Your password should have more of 7 character the Uppercase, lowercase and the number."
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_PASSWORD()]}
                onInput={inputHandle}
              />
              <Button bgColor="bg-orange-400" type="submit" outlineColor="outline-orange-500" bgColorHover="bg-orange-500" primary disabled={!formState.isValid} pointer={formState.isValid ? 'cursor-pointer' : 'cursor-not-allowed'}>Login</Button>
            </form>
            <Button property="flex justify-end underline text-orange-500" href="#">Forget your password ?</Button>
          </div>
        </div>
      </React.Fragment>
    
  )
}

export default SignIn