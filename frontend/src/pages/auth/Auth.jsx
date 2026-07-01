import { useMemo, useState } from 'react'
import { FaBuilding, FaEnvelope, FaEye, FaLeaf, FaLock, FaPhoneAlt, FaRegUser, FaUserTie } from 'react-icons/fa'
import '../../styles/Auth.css'
import logo from 'C:/civikConnect/frontend/public/logo.png'

const categories = ['Animal Welfare', 'Healthcare', 'Education', 'Environment', 'Food Relief', 'Other']

const emptyForm = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'citizen',
    ngoName: '',
    description: '',
    state: '',
    city: '',
    address: '',
    website: '',
    regProof: '',
    logo: '',
}

export default function Auth() {
    const [screen, setScreen] = useState('login')
    const [form, setForm] = useState(emptyForm)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [submitted, setSubmitted] = useState(false)

    const passwordChecks = useMemo(() => ({
        length: form.password.length >= 8,
        special: /[^A-Za-z0-9]/.test(form.password),
        alphanumeric: /[A-Za-z]/.test(form.password) && /\d/.test(form.password),
    }), [form.password])

    const isPasswordValid = passwordChecks.length && passwordChecks.special && passwordChecks.alphanumeric
    const passwordsMatch = form.confirmPassword && form.password === form.confirmPassword

    const updateField = (event) => {
        const { name, value, files } = event.target
        setForm((current) => ({
            ...current,
            [name]: files ? files[0]?.name || '' : value,
        }))
    }

    const switchScreen = (nextScreen) => {
        setScreen(nextScreen)
        setSubmitted(false)
    }

    const toggleCategory = (category) => {
        setSelectedCategories((current) =>
            current.includes(category)
                ? current.filter((item) => item !== category)
                : [...current, category]
        )
    }

    const handleAuthSubmit = (event) => {
        event.preventDefault()
        setSubmitted(true)

        if (screen === 'login') {
            return
        }

        if (!isPasswordValid || !passwordsMatch) {
            return
        }

        if (form.role === 'ngo') {
            switchScreen('ngo')
        }
    }

    const handleNgoSubmit = (event) => {
        event.preventDefault()
        setSubmitted(true)
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
                                
                                <input name="email" type="email" placeholder="Enter your email" value={form.email} onChange={updateField} />
                            </div>
                        </label>

                        <label>
                            Password
                            <div className="auth-input">
                                <input name="password" type="password" placeholder="Enter your password" value={form.password} onChange={updateField} />
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
                    <form className="auth-panel" onSubmit={handleAuthSubmit}>
                        <div className="auth-heading">
                            <h1>Create an Account</h1>
                            <p>Join us to make a difference</p>
                        </div>

                        <label>
                            Full Name
                            <div className="auth-input">
                                <input name="fullName" placeholder="Enter your full name" value={form.fullName} onChange={updateField} />
                            </div>
                        </label>

                        <label>
                            Email
                            <div className="auth-input">
                                <input name="email" type="email" placeholder="Enter your email" value={form.email} onChange={updateField} />
                            </div>
                        </label>

                        <label>
                            Phone Number
                            <div className="auth-input">
                                <input name="phone" placeholder="Enter your phone number" value={form.phone} onChange={updateField} />
                            </div>
                        </label>

                        <label>
                            Password
                            <div className="auth-input">
                                <input name="password" type="password" placeholder="Create a password" value={form.password} onChange={updateField} />
                                <FaEye />
                            </div>
                        </label>

                        <label>
                            Confirm Password
                            <div className="auth-input">
                                <input name="confirmPassword" type="password" placeholder="Confirm your password" value={form.confirmPassword} onChange={updateField} />
                            </div>
                        </label>

                        <div className="password-rules">
                            <span className={passwordChecks.length ? 'valid' : ''}>8+ characters</span>
                            <span className={passwordChecks.special ? 'valid' : ''}>Special character</span>
                            <span className={passwordChecks.alphanumeric ? 'valid' : ''}>Letters and numbers</span>
                            {submitted && form.confirmPassword && !passwordsMatch && <strong>Passwords do not match</strong>}
                        </div>

                        <fieldset className="role-select">
                            <legend>I am registering as</legend>
                            <label className={form.role === 'citizen' ? 'active' : ''}>
                                <input type="radio" name="role" value="citizen" checked={form.role === 'citizen'} onChange={updateField} />
                                <FaRegUser />
                                <span>Citizen</span>
                                <small>Report issues in your area</small>
                            </label>
                            <label className={form.role === 'ngo' ? 'active' : ''}>
                                <input type="radio" name="role" value="ngo" checked={form.role === 'ngo'} onChange={updateField} />
                                <FaUserTie />
                                <span>NGO Representative</span>
                                <small>Help to resolve issues</small>
                            </label>
                        </fieldset>

                        <button className="auth-submit" type="submit">Continue</button>
                        <p className="auth-switch">
                            Already have an account? <button type="button" onClick={() => switchScreen('login')}>Login</button>
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
                            NGO Name
                            <div className="auth-input">
                                <FaBuilding />
                                <input name="ngoName" placeholder="Enter NGO name" value={form.ngoName} onChange={updateField} />
                            </div>
                        </label>

                        <label>
                            Description
                            <textarea name="description" placeholder="Brief description about your NGO" value={form.description} onChange={updateField} />
                        </label>

                        <div className="category-field">
                            <span>Categories</span>
                            <div className="category-grid">
                                {categories.map((category) => (
                                    <button
                                        className={selectedCategories.includes(category) ? 'selected' : ''}
                                        key={category}
                                        type="button"
                                        onClick={() => toggleCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                            <label>
                                State
                                <input name="state" placeholder="Enter state"  value={form.state} onChange={updateField}/>
                            </label>

                            <label>
                                City
                                <input name="city" placeholder="Enter city"  value={form.city} onChange={updateField}/>   
                            </label>

                        <label>
                            Address
                            <input name="address" placeholder="Enter full address" value={form.address} onChange={updateField} />
                        </label>

                        <label>
                            Website
                            <input name="website" placeholder="https://yourngo.org" value={form.website} onChange={updateField} />
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
