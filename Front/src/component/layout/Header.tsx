'use client'

import { useState } from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import useAuthStore from '@/utils/store/useAuthStore'
import useDarkModeStore from '@/utils/store/useThemaStore'
import useEditModeStore from '@/utils/store/useEditModeStore'
import Profile from '@/component/Profile'
import Modal from '@/component/layout/Modal'
import { login } from '@/utils/api/user'
import { WiDayCloudy } from 'react-icons/wi'

const Header: React.FC = () => {
    // 상태관리
    const [loginModalVisible, setLoginModalVisible] = useState(false)
    const [profileMenuVisible, setProfileMenuVisible] = useState(false)

    // 전역 상태관리
    const { isDarkMode, toggleDarkMode } = useDarkModeStore()
    const { isLoggedIn, logIn, logOut } = useAuthStore()
    const { isEditMode, toggleEditMode } = useEditModeStore()

    // 함수
    const toggleLoginModal = () => setLoginModalVisible(!loginModalVisible)

    const handleProfileClick = () => {
        setProfileMenuVisible(!profileMenuVisible)
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const username = event.currentTarget.username.value
        const password = event.currentTarget.password.value

        const { statusCode } = await login({ username, password })
        if (statusCode == 200) {
            toggleLoginModal()
            logIn()
        } else if (statusCode == 401) {
            /**
             * @todo 아이디, 비밀번호 입력 오류 시 화면 전환 등
             */
        }
    }

    return (
        <header className={`${styles.header} ${isDarkMode ? 'dark' : 'light'}`}>
            <h2 style={{ fontFamily: 'Pacifico-Regular' }}>
                <Link href="/">CanvEarth</Link>
            </h2>
            <div></div>

            <img
                onClick={toggleDarkMode}
                className={styles.toggleDarkModeButton}
                src={
                    isDarkMode ? '/svgs/moon_white.svg' : '/svgs/sun_black.svg'
                }
                style={isDarkMode ? { width: '20px' } : { width: '25px' }}
                alt={
                    isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
                }
            />

            {isLoggedIn ? (
                <>
                    <div
                        className={`${styles.profile} ${isDarkMode ? styles.profileDark : styles.profileLight}`}
                        onClick={handleProfileClick}
                    >
                        <Profile
                            src="https://pbs.twimg.com/media/FxeXXAeaEAATIVE?format=jpg&name=900x900"
                            size={35}
                            border="2px solid black"
                            alt="profile image"
                            radius={50}
                        />
                        <h3 style={{ marginLeft: '10px' }}>관리자</h3>
                    </div>

                    {profileMenuVisible && (
                        <div
                            className={`${styles.profileMenu} ${isDarkMode ? 'dark' : 'light'}`}
                        >
                            <div
                                className={styles.profileItem}
                                onClick={logOut}
                            >
                                <img
                                    className={styles.toggleLoginButton}
                                    src={
                                        isDarkMode
                                            ? '/svgs/key_white.svg'
                                            : '/svgs/key_black.svg'
                                    }
                                    alt="login"
                                />
                                <h3>로그아웃</h3>
                            </div>
                            {isEditMode ? (
                                <div
                                    className={styles.profileItem}
                                    onClick={toggleEditMode}
                                >
                                    <img
                                        className={styles.toggleLoginButton}
                                        src={
                                            isDarkMode
                                                ? '/svgs/edit_white.svg'
                                                : '/svgs/edit_black.svg'
                                        }
                                        alt="login"
                                    />
                                    <h3>수정모드</h3>
                                </div>
                            ) : (
                                <div
                                    className={styles.profileItem}
                                    onClick={toggleEditMode}
                                >
                                    <img
                                        className={styles.toggleLoginButton}
                                        src={
                                            isDarkMode
                                                ? '/svgs/view_white.svg'
                                                : '/svgs/view_black.svg'
                                        }
                                        alt="login"
                                    />
                                    <h3>일반모드</h3>
                                </div>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div
                    className={`${styles.profile} ${isDarkMode ? styles.profileDark : styles.profileLight}`}
                    onClick={toggleLoginModal}
                >
                    <img
                        className={styles.toggleLoginButton}
                        style={{ width: '25px' }}
                        src={
                            isDarkMode
                                ? '/svgs/key_white.svg'
                                : '/svgs/key_black.svg'
                        }
                        alt="login"
                    />
                    <h3 style={{ marginLeft: '10px' }}>로그인</h3>
                </div>
            )}

            {loginModalVisible && (
                <>
                    <Modal
                        isVisible={loginModalVisible}
                        toggleModal={toggleLoginModal}
                        width="400px"
                        //height="320px" sign up 링크 존재 시
                        height="300px"
                    >
                        <div className={styles.loginModal}>
                            <h1 style={{ fontFamily: 'Pacifico-Regular' }}>
                                CanvEarth
                            </h1>
                            <form
                                className={styles.loginForm}
                                onSubmit={handleLogin}
                            >
                                <label htmlFor="username">아이디</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    required
                                />
                                <label htmlFor="password">비밀번호</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                />
                                <button type="submit">로그인</button>
                            </form>
                            <div
                                style={{
                                    marginTop: '5px',
                                    fontSize: '12px',
                                    textAlign: 'center',
                                }}
                            >
                                {/* 계정 생성을 원한다면{' '}
                                <Link
                                    style={
                                        isDarkMode
                                            ? { color: '#40a1E8' }
                                            : { color: '#0051b8' }
                                    }
                                    href="/signup"
                                >
                                    클릭하세요
                                </Link> */}
                            </div>
                        </div>
                    </Modal>
                </>
            )}
        </header>
    )
}

export default Header
