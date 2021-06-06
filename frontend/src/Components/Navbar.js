import React, { useContext } from 'react'
import { AuthContext } from './Register'

const Navbar = () => {
    
    const {getLoggedIn} = useContext(AuthContext)
    const logout = async () =>{
        try{
            const res = await fetch("/user/logout",{
                method:"GET"
            })
            await getLoggedIn();
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <button className="btn btn-danger m-2" onClick={logout}>Log out</button>
        </>
    )
}

export default Navbar
