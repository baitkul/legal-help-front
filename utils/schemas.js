import { morphism } from 'morphism'

export const userSchema = morphism({
  email: ({ email }) => !email ? '' : email,
  phone: ({ phone }) => !phone ? '' : phone,
  password: () => '',
  fullname: ({ fullname }) => !fullname ? '' : fullname,
  role: ({ role }) => !role ? 'CLIENT' : role,
  lastLoginAt: 'lastLoginAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
})

export const appealSchema = morphism({
  fullname: ({ fullname }) => !fullname ? '' : fullname,
  phone: ({ phone }) => !phone ? '' : phone,
  address: ({ address }) => !address ? '' : address,
  description: ({ description }) => !description ? '' : description,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
})
