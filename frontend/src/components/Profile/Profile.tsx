import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


function Profile() {
    // const storeState = useSelector((state: RootState) => state);
    // const userNameEmail = storeState.login.email;

    const dummyTemplateProfileData = [{
        name: 'John Doe',
        email: 'johndoe@johndoe.com',
        address: 'Some John Doe address',
        accountType: "Admin"
    }]

    return (
        <div style={{
            margin: "200px auto",
            position: "relative",
            display: "block",
            textAlign: "center",
            width: "200px",
            height: "250px",
            border: "1px solid black"
        }}
        >
            {dummyTemplateProfileData.map((item) => (
                <div key={item.name}>
                    <p>Name:{item.name}</p>
                    <p>Email:{item.email}</p>
                    <p>Address:{item.address}</p>
                    <p>Account Type:{item.accountType}</p>
                </div>
            ))}
        </div>
    );
}

export default Profile;
