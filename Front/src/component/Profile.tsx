import React from 'react'

interface ProfileProps {
    src: string
    size?: number
    border?: string
    alt?: string
    radius?: number
}

const Profile: React.FC<ProfileProps> = ({
    src,
    size = 100,
    border = '0px solid black',
    alt = '',
    radius = 0,
}) => {
    const styles = {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${radius}%`,
        border: border,
        objectFit: 'cover' as 'cover',
    }

    return <img src={src} alt={alt} style={styles} />
}

export default Profile
