import type { LoginCharacterProps } from '../../../types/LogInCharacterProops'

export default function LoginCharacter({ passwordFocused, showingPassword }: LoginCharacterProps) {

    const isCover = passwordFocused && !showingPassword
    const isPeek = passwordFocused && showingPassword

    const handLeftStyle = isCover
    ? { transform: 'translateX(32px) translateY(-8px) rotate(-20deg)' }
    : isPeek
        ? { transform: 'translateX(32px) translateY(-8px) rotate(-20deg)' }  // ← sigue tapando
        : { transform: 'translateX(-18px) translateY(60px) rotate(10deg)' }

    const handRightStyle = isCover
        ? { transform: 'translateX(-32px) translateY(-8px) rotate(20deg)' }
        : isPeek
            ? { transform: 'translateX(18px) translateY(60px) rotate(-10deg)' }  // ← baja
            : { transform: 'translateX(18px) translateY(60px) rotate(-10deg)' }

    const leftEyeRy = isCover ? 1 : isPeek ? 3.5 : 8
    const rightEyeRy = isCover ? 1 : isPeek ? 3.5 : 8
    const rightEyeCy = isPeek ? 58 : 55
    const rightPupilCx = isPeek ? 74 : 81
    const rightPupilCy = isPeek ? 58 : 52
    const leftPupilOpacity = isCover || isPeek ? 0 : 1

    const mouthD = isCover
        ? 'M44 82 Q60 76 76 82'
        : isPeek
            ? 'M47 80 Q60 86 73 80'
            : 'M44 78 Q60 90 76 78'

    return (
        <div style={{ position: 'relative', width: 120, height: 120 }}>
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="54" fill="#FEFCD9" stroke="#FF4747" strokeWidth="3"/>

                {/* Ojo izquierdo */}
                <ellipse
                    cx="42" cy="55" rx="7"
                    ry={leftEyeRy}
                    fill="#1A1A1A"
                    style={{ transition: 'all 0.3s ease' }}
                />
                <circle cx="45" cy="52" r="2.5" fill="white" opacity={leftPupilOpacity} style={{ transition: 'opacity 0.3s' }}/>

                {/* Ojo derecho */}
                <ellipse
                    cx="78" cy={rightEyeCy} rx="7"
                    ry={rightEyeRy}
                    fill="#1A1A1A"
                    style={{ transition: 'all 0.3s ease' }}
                />
                <circle
                    cx={rightPupilCx} cy={rightPupilCy}
                    r="2.5" fill="white"
                    style={{ transition: 'all 0.3s ease' }}
                />

                {/* Boca */}
                <path
                    d={mouthD}
                    stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none"
                    style={{ transition: 'd 0.3s ease' }}
                />

                {/* Mejillas */}
                <circle cx="35" cy="68" r="8" fill="#FF4747" opacity="0.3"/>
                <circle cx="85" cy="68" r="8" fill="#FF4747" opacity="0.3"/>
            </svg>

            {/* Mano izquierda */}
            <svg
                width="48" height="48" viewBox="0 0 48 48" fill="none"
                style={{
                    position: 'absolute',
                    left: -18, top: 30,
                    transformOrigin: 'right center',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    ...handLeftStyle
                }}
            >
                <rect x="4" y="8" width="40" height="32" rx="10" fill="#FEFCD9" stroke="#FF4747" strokeWidth="2.5"/>
                <rect x="10" y="4" width="8" height="14" rx="4" fill="#FEFCD9" stroke="#FF4747" strokeWidth="2"/>
                <rect x="20" y="2" width="8" height="16" rx="4" fill="#FEFCD9" stroke="#FF4747" strokeWidth="2"/>
                <rect x="30" y="4" width="8" height="14" rx="4" fill="#FEFCD9" stroke="#FF4747" strokeWidth="2"/>
            </svg>

            {/* Mano derecha */}
            <svg
                width="48" height="48" viewBox="0 0 48 48" fill="none"
                style={{
                    position: 'absolute',
                    right: -18, top: 30,
                    transformOrigin: 'left center',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    ...handRightStyle
                }}
            >
                <rect x="4" y="8" width="40" height="32" rx="10" fill="#FEFCD9" stroke="#FF4747" strokeWidth="2.5"/>
                <rect x="10" y="4" width="8" height="14" rx="4" fill="#FEFCD9" stroke="#FF4747" strokeWidth="2"/>
                <rect x="20" y="2" width="8" height="16" rx="4" fill="#FEFCD9" stroke="#FF4747" strokeWidth="2"/>
                <rect x="30" y="4" width="8" height="14" rx="4" fill="#FEFCD9" stroke="#FF4747" strokeWidth="2"/>
            </svg>
        </div>
    )
}