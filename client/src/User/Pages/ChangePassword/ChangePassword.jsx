
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ChangePassword = () => {
    
  const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confPwd, setConfPwd] = useState('');
      const [user, setUser] = useState(null);
    
  const USER_ID = sessionStorage.getItem("user_id");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/UserGetById/${USER_ID}`);
      const users = res.data.user ;

     

      setUser(users);
    } catch (err) {
      console.error("Profile fetch error", err);
    } finally {
    }
  };
  

    const handleChange = () => {
      console.log(user);
      
        if (newPwd !== confPwd)
            return alert('New passwords do not match');
        if (oldPwd !== user.user_password)
            return alert('Old and New password cannot be same');

        axios.put(`http://127.0.0.1:8000/Userpassword/${USER_ID}/`,
            { new_password: newPwd })
            .then(res => {
                alert(res.data.message)
                setOldPwd('');
                setNewPwd('');
                setConfPwd('');
            })
            .catch(() => alert('Update failed'));
    };

    return (
        <div>
            <h3>Change Password</h3>
            <table border="1" cellPadding="8">
                <tbody>
                    <tr>
                        <td>Old Password</td>
                        <td><input type="password" value={oldPwd} onChange={e => setOldPwd(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>New Password</td>
                        <td><input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Confirm Password</td>
                        <td><input type="password" value={confPwd} onChange={e => setConfPwd(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td colSpan="2" align="center">
                            <button onClick={handleChange}>Change</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ChangePassword;