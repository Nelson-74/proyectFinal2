export const generateUserErrorInfo = (user) => {
  return `
  firstName: Must be a string. (${user.firstName}),
  lastName: Must be a string. (${user.lastName}),
  email: Must be a string. (${user.email}),,
  password: <PASSWORD> || '',
  `
      
}