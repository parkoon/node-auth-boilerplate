const authMiddleware = require('../../middleware/auth')

describe('Auth middleware test', () => {
  it('auth 라는 함수가 정의되어 있습니다.', () => {
    expect(typeof authMiddleware.auth).toBe('function')
  })
})
