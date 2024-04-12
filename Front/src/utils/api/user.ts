import axios from 'axios'

const SERVER_URL = process.env.SERVER_URL

// TODO: redux에서 값을 가져오도록 수정할 것.
let token: string = 'TEST_TOKEN_IT_MUST_BE_CHANGED'

export async function login(userId: string, userPw: string) {
    /**
     * 로그인
     *
     * @param userId - 사용자가 입력한 id
     * @param userPw - 사용자가 입력한 pw
     * @returns 성공 시 token, 실패 시 서버 응답 메시지
     *
     * @beta
     */

    const response = await axios({
        method: 'POST',
        url: `${SERVER_URL}/user/login`,
        data: {
            userId,
            userPw,
        },
    })
    return response.data
}

export async function logout() {
    const response = await axios({
        method: 'GET',
        url: `${SERVER_URL}/user/logout`,
        headers: {
            Authorization: token,
        },
    })
}

export async function signin(userId: string, userPw: string, userName: string) {
    /**
     * 회원 가입
     *
     * @param userId - 사용자가 입력한 id
     * @param userPw - 사용자가 입력한 pw
     * @param userName - 사용자가 입력한 이름
     * @returns 서버 응답 메시지
     *
     * @beta
     */

    const response = await axios({
        method: 'POST',
        url: `${SERVER_URL}/user/signin`,
        data: {
            userId,
            userPw,
            userName,
        },
    })
}

export async function getUserInfo() {
    /**
     * 입력한 비밀번호가 올바르다면, 외주 상세 정보를 반환한다.
     *
     * @param token - 로그인 된 사용자의 token
     * @returns 서버 응답 메시지
     *
     * @beta
     */

    const response = await axios({
        method: 'GET',
        url: `${SERVER_URL}/user`,
        headers: {
            Authorization: token,
        },
    })
    return response.data
}

export async function updateUserInfo(
    token: string,
    userPw: string,
    userName: string,
) {
    /**
     * 회원 정보 수정
     *
     * @param token - 로그인 된 사용자의 token
     * @param userPw - 변경하고자 하는 사용자 비밀번호
     * @param userName - 변경하고자 하는 사용자 이름
     * @returns 서버 응답 메시지
     *
     * @beta
     */

    const response = await axios({
        method: 'PUT',
        url: `${SERVER_URL}/user`,
        data: {
            userPw,
            userName,
        },
        headers: {
            Authorization: token,
        },
    })
    return response.data
}
