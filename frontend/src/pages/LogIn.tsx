import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import LoginCharacter from '../features/user/components/LogInCharacter'
import { UserApi } from '../features/user/api/UserApi'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [passwordFocused, setPasswordFocused] = useState(false)
    const [showingPassword, setShowingPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const data = await UserApi.logIn(email, password)
            localStorage.setItem('token', data.token)
            navigate('/')
        } catch {
            setError('Email o contraseña incorrectos')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4">
            <div className="flex flex-col items-center mb-8">
                <LoginCharacter
                    passwordFocused={passwordFocused}
                    showingPassword={showingPassword}
                />
            </div>

            <div className="bg-white border border-secondary rounded-2xl p-8 w-full max-w-sm shadow-sm shadow-secondary/20">
                <h1 className="text-xl font-semibold text-text text-center mb-6">
                    Bienvenido de nuevo
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-text mb-1.5">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@gmail.com"
                            required
                            className="w-full px-3 py-2.5 text-sm border border-secondary/40 rounded-lg bg-white focus:outline-none focus:border-secondary transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text mb-1.5">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showingPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                className="w-full px-3 py-2.5 pr-10 text-sm border border-secondary/40 rounded-lg bg-white focus:outline-none focus:border-secondary transition-colors"
                            />
                            <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setShowingPassword(!showingPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text/40 hover:text-secondary transition-colors"
                            >
                                {showingPassword
                                    ? <EyeOff size={16} />
                                    : <Eye size={16} />
                                }
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="text-xs text-secondary text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-secondary text-white py-2.5 rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors disabled:opacity-60 mt-1"
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </form>
            </div>
        </div>
    )
}