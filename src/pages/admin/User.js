import React, { useState, useEffect } from 'react'
import { useHttpClient } from '../../hooks/http-hook';
import ErrorModal from '../../components/ErrorModal';
import LoadingSpinner from '../../components/LoadingSpinner';
import UserList from '../../components/UserList';
import { useAuth } from '../../hooks/auth-hook';

function User() {

  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [users, setUsers] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const getUsersData = async () => {
      let responseData;
      try{
        responseData = await sendRequest(`http://localhost:3500/api/user/get`, 
          'GET', null, {
          "Authorization": "Bearer " + token
        });
        setUsers(responseData.users);
      }catch(err) {}
    }

    getUsersData()
  }, [sendRequest, token]);

  const userDeleteHandle = (deleteUserId) => {
      setUsers(prevUser =>
          prevUser.filter(users => users._id !== deleteUserId)
      );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClose={clearError} />
      { isLoading && <LoadingSpinner /> }

      { users && <UserList users={users} userDeleteHandle={userDeleteHandle}/>  }
      
    </React.Fragment>
  )
}

export default User