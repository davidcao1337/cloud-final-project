import React, { useState, useEffect} from "react"
import './profile.css';
import DefaultAvatar from "../../assets/circle-user-solid.svg"

const BASE_URL = 'https://cloud-backend-sqiw.onrender.com'

const Profile = () => {
    var user_id = ""
    if (localStorage.getItem('user') != null) {
        user_id = JSON.parse(localStorage.getItem('user')).user_id
    }

    const [user, setUser] = useState([])

    useEffect( ()=> {
        const fetchUser = async() => {
            const userData = await fetch(BASE_URL + '/api/user/' + user_id);
            const user = await userData.json();
            setUser(user)
        }

        fetchUser();
    }, [user_id]);

    // Fetched Values
    const username = user.username || "N/A"
    const email = user.email || "N/A"

    return (
        <div>
            <h1 className="Title mt-5 mb-5 ml-5 font-bold text-3xl text-[#525252]">Profile</h1>
            <div className="profile-container card bg-base-100">
                <div className="card-body flex flex-col">
                    <div className="profile-image flex justify-center">
                        <img src={DefaultAvatar} alt="" width="160" height="160"></img>
                    </div>
                    <div className="profile-info mt-5 flex flex-row space-x-10 justify-center">
                        <div className="profile-labels flex flex-col space-y-3">
                            <p>Username</p>
                            <p>Email</p>
                        </div>
                        <div className="profile-values text-[#748AA1] flex flex-col space-y-3">
                            <p>{username}</p>
                            <p>{email}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile