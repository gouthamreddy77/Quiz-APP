import React, { useContext } from 'react'
import { AuthContext } from './Home'
import {useHistory,Link} from "react-router-dom"
const Navbar = () => {
    const history = useHistory()
    const {getLoggedIn} = useContext(AuthContext)
    const logout = async () =>{
        try{
            await fetch("/user/logout",{
                method:"GET"
            })
            await getLoggedIn();
            localStorage.removeItem("user-id"); 
            history.push("/")
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-sm "  style={{"box-shadow":"0 1px 6px #000"}}>
                <div className="container-fluid">

                   <Link className="navbar-brand text-white fs-4" to="/Home"><strong>Quiz</strong>App</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                    <img src="https://img.icons8.com/fluent/35/000000/menu.png"/>
                    </span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ms-auto ">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/Home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/create">Create</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/join">Join</Link>
                        </li>
                        <li class="nav-item dropdown ">
                            <a class="nav-link dropdown-toggle text-white " href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" class="bi bi-person-circle mb-1" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>
                                <span className="ms-1">Hii,User</span>
                            </a>
                            <ul class="dropdown-menu  dropdown-menu-end" >
                                <li>
                                    <button className="dropdown-item" onClick={logout}>
                                        Log out
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Navbar
