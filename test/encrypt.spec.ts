// import { it, expect, describe } from 'node:test';
import { encryptPassword, checkPassword, createToken } from '../app/utils/encrypt'
import jwt from 'jsonwebtoken'

describe('encrypt',  () => {
   let pass:string;
   it("encryptPassword Should return string", async() => {
      pass = await encryptPassword("123")
      expect(pass).toEqual(expect.stringMatching(/\$2a\$10\$.+/))
   })

   it("checkPassword Should return true", async() => {
      const result = await checkPassword(pass, "123")
      expect(result).toBe(true)
   })
   it("checkPassword Should return false", async() => {
      const result = await checkPassword(pass, "1234")
      expect(result).toBe(false)
   })
})

describe('JWT',  () => {
   const userObject = {
      name: 'andi',
      email: 'andi@mail.com'
   }
   it("createToken Should return object", async() => {
      const token = await createToken(userObject)
      const verify = jwt.verify(token, "Rahasia")
      expect(verify).toEqual(expect.objectContaining({
         name: 'andi',
         email: 'andi@mail.com',
         exp: expect.any(Number),
         iat: expect.any(Number)
      }))
   })
})