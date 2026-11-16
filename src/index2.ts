// TypeScript課題2
// No.1
interface User {
  name: string;
  age: number;
  email: string;
}
const user: Partial<User> = {
  name: "Tom"
};
console.log(user);