import { useEffect, useMemo, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { FaBuilding, FaEnvelope, FaEye, FaLeaf, FaLock, FaPhoneAlt, FaRegUser, FaUserTie } from 'react-icons/fa'
import '../../styles/Auth.css'
import { register, login } from '../../api/authApi'
import { getAllCategories } from '../../api/issueApi'
import { ngoCreate } from '../../api/ngoApi'
import logo from 'C:/civikConnect/frontend/public/logo.png'




export default function Auth() {

    const navigate= useNavigate();
    const [screen, setScreen] = useState('login')
    const [passwordData, setPasswordData] = useState({
        password: "",
        confirmPassword: "",
    }); 
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [isNgo, setIsNgo] = useState(false)
    const passwordChecks = useMemo(() => ({
        length: passwordData.password.length >= 8,
        special: /[^A-Za-z0-9]/.test(passwordData.password),
        alphanumeric: /[A-Za-z]/.test(passwordData.password) && /\d/.test(passwordData.password),
    }), [passwordData.password])

    const isPasswordValid = passwordChecks.length && passwordChecks.special && passwordChecks.alphanumeric
    const passwordsMatch = passwordData.confirmPassword && passwordData.password === passwordData.confirmPassword



    const switchScreen = (nextScreen) => {
        setScreen(nextScreen)
        setSubmitted(false)
    }



    // category loader
    useEffect(() => {

        const loadCategories = async () => {
            try {
                const res = await getAllCategories();
                console.log(res.data[0]);
                setCategories(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        loadCategories();

    }, []);

    const toggleCategory = (category) => {
        setSelectedCategories((current) =>
            current.includes(category)
                ? current.filter((item) => item !== category)
                : [...current, category]
        )
    }

    const handlePasswordChange = (event) => {
        const { name, value } = event.target
        setPasswordData((current) => ({ ...current, [name]: value }))
    }

    const handleAuthSubmit = async(event) => {
        event.preventDefault()
        setSubmitted(true)
        const form = event.currentTarget
        const formData = new FormData(form)

        const payload = {
            email: formData.get('email') || '',
            password: formData.get('password') || '',
        }
        const res = await login(payload);

        localStorage.setItem("token", res.data.token);

        localStorage.setItem("role", res.data.role);

        if(localStorage.getItem("role")==='NGO') 
            navigate("/ngo")
        if(localStorage.getItem("role")==='REGULAR')
            navigate("/citizen")
        if(localStorage.getItem("role")==='MODERATOR')
            navigate("/mod")

        
    }

    const handleRegisterSubmit = async (event) => {
        event.preventDefault()
        setSubmitted(true)
        console.log("reg")
        if (!isPasswordValid || !passwordsMatch) {
            return
        }

        const form = event.currentTarget
        const formData = new FormData(form)
        const role = formData.get('role') || (isNgo ? 'ngo' : 'regular')

        const payload = {
            name: formData.get('name') || '',
            email: formData.get('email') || '',
            phoneNumber: formData.get('phoneNumber') || '',
            password: formData.get('password') || '',
            role,
        }

        try {

            console.log('Submitting registration payload', payload)
            const res = await register(payload)
            
            localStorage.setItem("userId",res.data.userId)

            if (role === 'ngo') {
                switchScreen('ngo')
                return
            }
            switchScreen('login')
        } catch (error) {
            console.error('Registration failed', error)
        }
    }

    const handleNgoSubmit = async (event) => {
        event.preventDefault()
        setSubmitted(true)
        console.log("reg")
        

        const form = event.currentTarget
        const formData = new FormData(form)
        const role = formData.get('role') || (isNgo ? 'ngo' : 'regular')

        const payload = {
            ngoId: localStorage.getItem("userId"),
            officialWebsite: formData.get('website') || '',
            description: formData.get('description') || '',
            address: formData.get('address') || '',
            state: formData.get('state') || '',
            categoriesId: selectedCategories,
            state: formData.get('state') || '',

        }

        try {

            console.log('Submitting registration payload', payload)
            await ngoCreate(payload)
            
            switchScreen('login')
        } catch (error) {
            console.error('Ngo Registration failed', error)
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                {screen === 'login' && (
                    <form className="auth-panel login-panel" onSubmit={handleAuthSubmit}>
                        <AuthBrand />
                        <div className="auth-heading">
                            <h1>Welcome Back!</h1>
                            <p>Login to continue</p>
                        </div>

                        <label>
                            Email
                            <div className="auth-input">
                                
                                <input name="email" type="email" placeholder="Enter your email"  />
                            </div>
                        </label>

                        <label>
                            Password
                            <div className="auth-input">
                                <input name="password" type="password" placeholder="Enter your password" />
                                <FaEye />
                            </div>
                        </label>

                        <button className="text-link" type="button">Forgot Password?</button>
                        <button className="auth-submit" type="submit">Log in</button>

                        <p className="auth-switch">
                            Don't have an account? <button type="button" onClick={() => switchScreen('register')}>Register</button>
                        </p>
                    </form>
                )}

                {screen === 'register' && (
                    <form className="auth-panel" onSubmit={handleRegisterSubmit}>
                        <div className="auth-heading">
                            <h1>Create an Account</h1>
                            <p>Join us to make a difference</p>
                        </div>

                        <label>
                            Full Name
                            <div className="auth-input">
                                <input name="name" placeholder="Enter your full name"  />
                            </div>
                        </label>

                        <label>
                            Email
                            <div className="auth-input">
                                <input name="email" type="email" placeholder="Enter your email"  />
                            </div>
                        </label>

                        <label>
                            Phone Number
                            <div className="auth-input">
                                <input name="phoneNumber" placeholder="Enter your phone number"  />
                            </div>
                        </label>

                        <label>
                            Password
                            <div className="auth-input">
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={passwordData.password}
                                    onChange={handlePasswordChange}
                                />
                                <FaEye />
                            </div>
                        </label>

                        <label>
                            Confirm Password
                            <div className="auth-input">
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </label>

                        <div className="password-rules">
                            <span className={passwordChecks.length ? 'valid' : ''}>8+ characters</span>
                            <span className={passwordChecks.special ? 'valid' : ''}>Special character</span>
                            <span className={passwordChecks.alphanumeric ? 'valid' : ''}>Letters and numbers</span>
                            {submitted && passwordData.confirmPassword && !passwordsMatch && <strong>Passwords do not match</strong>}
                        </div>

                        <fieldset className="role-select">
                            <legend>I am registering as</legend>
                            <label className={isNgo === false ? 'active' : ''}>
                                <input type="radio" name="role" value="regular" checked={isNgo === false} onChange={()=> setIsNgo(false)} />
                                <FaRegUser />
                                <span>Citizen</span>
                                <small>Report issues in your area</small>
                            </label>
                            <label className={isNgo === true ? 'active' : ''}>
                                <input type="radio" name="role" value="ngo" checked={isNgo === true}  onChange={()=> setIsNgo(true)}/>
                                <FaUserTie />
                                <span>NGO Representative</span>
                                <small>Help to resolve issues</small>
                            </label>
                        </fieldset>

                        <button className="auth-submit" type="submit">Continue</button>
                        <p className="auth-switch">
                            Already have an account? <button type="button" onClick={()=> setScreen("login")}>Login</button>
                        </p>
                    </form>
                )}

                {screen === 'ngo' && (
                    <form className="auth-panel ngo-panel" onSubmit={handleNgoSubmit}>
                        <div className="auth-heading">
                            <h1>Register Your NGO</h1>
                            <p>Fill in the details to register your organization</p>
                        </div>

                        <label>
                            Description
                            <textarea name="description" placeholder="Brief description about your NGO" />
                        </label>

                        <div className="category-field">
                            <span>Categories</span>
                            <div className="category-grid">
                                {categories.map((category) => (
                                    <button
                                        className={selectedCategories.includes(category.name) ? 'selected' : ''}
                                        key={category.id}
                                        type="button"
                                        onClick={() => toggleCategory(category.id)}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                            <label>
                                State
                                <input name="state" placeholder="Enter state"  />
                            </label>

                        <label>
                            Address
                            <input name="address" placeholder="Enter full address"  />
                        </label>

                        <label>
                            Website
                            <input name="website" placeholder="https://yourngo.org" />
                        </label>



                        <button className="auth-submit" type="submit">Submit</button>
                    </form>
                )}
            </section>
        </main>
    )
}

function AuthBrand() {
    return (
        <div className="auth-brand">
            <img src={logo}/>
            <span>Civik Connect</span>
        </div>
    )
}
