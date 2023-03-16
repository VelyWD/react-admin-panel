import React from 'react';

function UserItem(props) {
    const {name, email, isGoldClient, salary, image, deleteUser, id} = props;

    return (
        <div class="user-item">
            <h3>{ name }</h3>
            <p>{ email }</p>
            { isGoldClient
                ? <h3 class="is-gold-client">Client GOLD</h3>
                : null
            }
            <p>Salary: { salary }</p>
            <img src={ image } alt={ 'Poza de profil a lui ' + name } height='300' width='300'/>
            <br/>
            <button onClick={(event) => deleteUser(event, id)}>Sterge Client</button>
        </div>
    );
}

export default UserItem;