export class customInfo{
  generateUserErrorInfo = (user) => {
  return `
  firstName: Must be a string. (${user.firstName}),
  lastName: Must be a string. (${user.lastName}),
  email: Must be a string. (${user.email}),,
  password: <PASSWORD> || '',
  `
};
  generateProductErrorInfo = (product) => {
  return `
One or more product properties are not being received correctly:
List of properties:
* title: must be string. Received       : ${product.title}
* description: must be string. Received : ${product.description}
* price: must be number. Received       : ${product.price}
* stock: must be number. Received       : ${product.stock}
* thumbnails: must be string. Received  : ${product.thumbnails}
* code: must be string. Received        : ${product.code}
* category: must be string. Received    : ${product.category}
`;
};
      
}