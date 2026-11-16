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

// No.2
interface Profile {
  firstName?: string;
  lastName?: string;
  age?: number;
}
type RequiredProfile = Required<Profile>;

const userProps: RequiredProfile = {
  firstName: 'Tom',
  lastName: 'Mike',
  age: 28,
};
console.log(userProps);

// No.3
interface Book {
  title: string;
  author: string;
  published: number;
}

type ReadonlyBook = Readonly<Book>;

const myBook: ReadonlyBook = {
  title: "ハリーポッター",
  author: "J・K ローリング",
  published: 1999,
};

console.log(myBook);

// No.4
interface Student {
  name: string;
  grade: number;
}

type hasStudent = Record<number, Student>;

const students: hasStudent = {
  1: { name: "Tom", grade: 3 },
  2: { name: "Mike", grade: 2 },
};

console.log(students[1]);

// No.5
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

type newProduct = Pick<Product, 'name' | 'price'>;

const preview: newProduct = {
  name: '掃除機',
  price: 8000,
}

console.log(preview.name);

// No.6
interface Employee {
  id: number;
  name: string;
  salary: number;
  department: string;
}

type EmployeeProps = Omit<Employee, 'salary' | 'department'>

const isPreview: EmployeeProps = {
  id: 1,
  name: 'Tom',
};

console.log(isPreview.name);

// No.7
function getUser() {
  return {
    id: 1,
    name: "Alice",
    age: 25
  };
}

type Result = ReturnType<typeof getUser>;

console.log(typeof getUser);