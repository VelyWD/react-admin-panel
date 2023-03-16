import React from 'react';
import UserItem from './UserItem';

function UserList(props) {
    const { deleteUser, users } = props;

    return (
        <div>
            <h2>Lista utilizatorilor:</h2>
            { users.map((user, index) => {
                return <UserItem
                    id={ user.id }
                    name={ user.name }
                    email={ user.email }
                    isGoldClient={ user.isGoldClient }
                    salary={ user.salary }
                    image={ user.image }
                    key={ index }
                    deleteUser={(event, id) => deleteUser(event, id)}
                />
            })}
        </div>
    );
}

export default UserList;