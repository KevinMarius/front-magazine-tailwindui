import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../../components/LoadingSpinner';
import RoleList from '../../components/RoleList';
import ErrorModal from '../../components/ErrorModal';

function Role() {

    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const getRolesData = async () => {
            let responseData;
            try {
                responseData = await sendRequest(`http://localhost:3500/api/role/get`);
                setRoles(responseData.roles);
            } catch (err) { }
        }

        getRolesData();
    }, [sendRequest]);

    const roleDeleteHandle = (deleteRoleId) => {
        setRoles(prevRole =>
            prevRole.filter(roles => roles._id !== deleteRoleId)
        );
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClose={clearError} />
            {isLoading && <LoadingSpinner />}

            {roles && <RoleList roles={roles} roleDeleteHandle={roleDeleteHandle} />}
        </React.Fragment>
    )
}

export default Role