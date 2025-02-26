
// 登入 -----------------------------------------------------------------------------------------------
interface SignInParams {
  account: string // 帳號
  password: string // 密碼
}

interface SignInRes extends DefaultRes {
  data: {
    token: string
  }
}
