export class UsersDTO {
  constructor(user){
    this.firstName = user.firstName;
    this.lastName  = user.lastName;
    this.age = user.age;
    this.email = user.email;
    this.role = user.role;
    this.password = user.password;
    this.premium = user.premium;
    this.cartId = user.cartId;
    }
}