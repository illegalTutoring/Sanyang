'use client'

import useDarkModeStore from '@/utils/store/useThemaStore'

export default function NotFound() {
    const { isDarkMode } = useDarkModeStore()

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'column',
                backgroundColor: isDarkMode ? '#333' : 'white',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <img
                    style={{
                        width: '200px',
                        marginBottom: '10px',
                    }}
                    src={
                        isDarkMode
                            ? '/svgs/404_white.svg'
                            : '/svgs/404_black.svg'
                    }
                />
            </div>
            <div
                style={{
                    fontFamily: 'Stalemate-Regular',
                    fontSize: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                    color: isDarkMode ? 'white' : 'black',
                }}
            >
                Not Found
            </div>
            <div
                style={{
                    fontFamily: 'Stalemate-Regular',
                    fontSize: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    color: isDarkMode ? 'white' : 'black',
                    marginTop: '-20px',
                }}
            >
                I searched hard for that page, but couldn't find it..
            </div>
        </div>
    )
}
