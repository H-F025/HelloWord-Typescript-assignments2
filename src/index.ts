// TypeScript課題1
// No.1
const age: number = 25;
console.log(age);

// No.2
const greeting: string = "Hello, TypeScript!"
console.log(greeting);

// No.3
const names: string[] = ["Alice", "Bob", "Charlie"];
console.log(names);

// No.4
const user: {name: string, age: number} = {
  name: "Taro",
  age: 30
};
console.log(user);

// No.5
let value: string | number;
value = "Hello";
value = 42;
console.log(value);

// No.6
function add(a: number, b: number): number{
  return a + b;
}
console.log(add(1, 2));

// No.7
interface person {
  firstName: string;
  lastName: string;
  age: number;
}

const Jone: Partial<person> = {
  firstName: 'Jone',
};
console.log('Doe');

// No.8
type NumberArray = number[];
console.log([1, 2, 3]);

// No.9
const count: number = 10;
const isActive: boolean = true;
const message: string = "Welcome!";

// No.10
interface UserProfile {
  id: number;
  name: string;
  age?: number;
}
const currentUser: UserProfile = {
  id: 1,
  name: 'Tom'
}

// No.11
function printValue(value: number | string){
  console.log('私は' + value + 'です。')
}
printValue('Tom');

// No.12
type StringOrNumber = string | number;

function display(value: StringOrNumber): void {
  console.log(value);
}
display('こんにちは');
display(123);