import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from '../../hooks/form-hook';
import { useHttpClient } from '../../hooks/http-hook';
import { useAuth } from '../../hooks/auth-hook';
import { ToastContainer, toast } from 'react-toastify';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';
import { VALIDATOR_DATE, VALIDATOR_MINLENGTH, VALIDATOR_PASSWORD, VALIDATOR_REQUIRE } from '../../utils/validators';
import Input from '../../components/form/Input';
import ImageUpload from '../../components/form/ImageUpload';
import Button from '../../components/Button';

function UpdateUser() {

  const [roles, setRoles] = useState([]);
  const { token } = useAuth();
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const id = useParams().id;

  const [formState, inputHandle, setFormData] = useForm({
    name: {
      value: '',
      isValid: false
    },
    surname: {
      value: '',
      isValid: false
    },
    dateBorn: {
      value: '',
      isValid: false
    },
    picture: {
      value: '',
      isValid: false
    },
    phone: {
      value: '',
      isValid: false
    },
    role: {
      value: '',
      isValid: false
    }
  },
    false
  );

  useEffect(() => {
    const getUserData = async () => {

      try {
        const responseData = await sendRequest(`http://localhost:3500/api/user/${id}`);
        setFormData({
          name: {
            value: responseData.user.name,
            isValid: true
          },
          surname: {
            value: responseData.user.surname,
            isValid: true
          },
          dateBorn: {
            value: responseData.user.dateBorn,
            isValid: true
          },
          picture: {
            value: responseData.user.picture,
            isValid: true
          },
          phone: {
            value: responseData.user.phone,
            isValid: true
          },
          role: {
            value: responseData.user.role,
            isValid: true
          }
        }, true);
      } catch (err) { }

    }
    getUserData();
  }, [sendRequest, id, setFormData])

  useEffect(() => {

    const getRoleData = async () => {
      let responseRoleData;
      try {
        responseRoleData = await sendRequest(`http://localhost:3500/api/role/get`)
        setRoles(responseRoleData.roles);
      } catch (err) { }
    }

    getRoleData();

  }, [sendRequest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData;
    formData.append('name', formState.inputs.name.value);
    formData.append('surname', formState.inputs.surname.value);
    formData.append('dateBorn', formState.inputs.dateBorn.value);
    formData.append('picture', formState.inputs.picture.value);
    formData.append('phone', formState.inputs.phone.value);
    formData.append('role', formState.inputs.role.value);
    
    try {
        const response = await sendRequest(`http://localhost:3500/api/user/update/${id}`,
            'PUT', formData, {
            "Authorization": "Bearer " + token
        });
        console.log(response.user)
        toast.success(response.message);
    } catch (err) { }

}

  return (
    <React.Fragment>
      <ToastContainer autoClose={2000} />
      {isLoading && <LoadingSpinner />}
      <ErrorModal error={error} onClose={clearError} />
      <div className=" bg-transparent w-full p-4 my-6 divide-y-2">
        <div className="text-align-center pb-2">
          <h1 className="text-xl text-gray-800 font-semibold font-sans">Update User</h1>
        </div>
        <form className='pt-3 relative' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <Input
              element="input"
              type="text"
              label="Name"
              placeholder="Name"
              id="name"
              errorText="please enter the valid name."
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2)]}
              onInput={inputHandle}
              initialValue={formState.inputs.name.value}
              initialValid={formState.inputs.name.isValid}
            />
            <Input
              element="input"
              type="text"
              label="Surname"
              placeholder="Surname"
              id="surname"
              errorText="please enter the valid surname."
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2)]}
              onInput={inputHandle}
              initialValue={formState.inputs.surname.value}
              initialValid={formState.inputs.surname.isValid}
            />
          </div>
          <div className='grid grid-cols-1'>
            <Input
              element="input"
              type="date"
              label="Birthday"
              id="dateBorn"
              errorText="please enter the valid birthday."
              validators={[VALIDATOR_DATE(), VALIDATOR_REQUIRE()]}
              onInput={inputHandle}
              initialValue={formState.inputs.dateBorn.value}
              initialValid={formState.inputs.dateBorn.isValid}
            />
          </div>

          <div className="my-3">
            <ImageUpload
              center
              id="picture"
              onInput={inputHandle}
              initialValue={formState.inputs.picture.value}
              initialValid={formState.inputs.picture.isValid}
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <Input
              element="input"
              label="Phone"
              type="tel"
              placeholder="Phone"
              id="phone"
              errorText="please enter the valid phone number."
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandle}
              initialValue={formState.inputs.phone.value}
              initialValid={formState.inputs.phone.isValid}
            />
            <Input
              element="select"
              label="Role"
              id="role"
              errorText="please choice the role"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandle}
              items={roles}
              initialValue={formState.inputs.role.value}
              initialValid={formState.inputs.role.isValid}
            />
          </div>

          <Button type="submit" bgColor="bg-orange-600" bgColorHover="bg-orange-500" disabled={!formState.isValid}>Save</Button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default UpdateUser