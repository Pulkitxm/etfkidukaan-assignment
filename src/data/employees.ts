// // import { faker } from "@faker-js/faker";

// import axios from "axios";
// import { z } from "zod";

// type WorkTime = {
//   [month: string]: number;
// };

// export const validateEmployee = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   pictureUrl: z.string().url(),
//   phone: z.string(),
//   jobTitle: z.string(),
//   department: z.string(),
//   address: z.object({
//     street: z.string(),
//     city: z.string(),
//     state: z.string(),
//     zipCode: z.string(),
//   }),
//   workTime: z.record(z.string(), z.number()),
//   hireDate: z.string(),
// });

// export type Employee = z.infer<typeof validateEmployee>;

// export const months = [
//   "january",
//   "february",
//   "march",
//   "april",
//   "may",
//   "june",
//   "july",
//   "august",
//   "september",
//   "october",
//   "november",
//   "december",
// ];

// async function initEmployees() {
//   const res = await axios.get("/employees.json");
//   const es: Employee[] = [];
//   for (const e of res.data) {
//     const val = validateEmployee.safeParse(e);
//     if (val.success) es.push(val.data);
//   }
//   return es;
// }

// export let employees: Employee[] = [];

// initEmployees().then((res) => {
//   employees = res;
// });

// // export const employees: Employee[] = [];
// // const UNSPLASH_API_URL = "https://api.unsplash.com/photos/random";
// // const ACCESS_KEY = "";
// // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
// // const fetchEmployeePicture = async (): Promise<string> => {
// //   try {
// //     const response = await axios.get(UNSPLASH_API_URL, {
// //       params: {
// //         client_id: ACCESS_KEY,
// //         count: 1,
// //         query: "portrait",
// //       },
// //     });

// //     return response.data[0]?.urls?.small || "";
// //   } catch (error) {
// //     console.error("Error fetching Unsplash image:", error);
// //     return "";
// //   }
// // };

// // const generateEmployeeData = (count: number): void => {
// //   for (let i = 0; i < count; i++) {
// //     const employee: Employee = {
// //       name: faker.person.fullName(),
// //       email: faker.internet.email(),
// //       phone: faker.phone.number({ style: "international" }),
// //       jobTitle: faker.person.jobTitle(),
// //       department: faker.commerce.department(),
// //       address: {
// //         street: faker.location.streetAddress(),
// //         city: faker.location.city(),
// //         state: faker.location.state(),
// //         zipCode: faker.location.zipCode(),
// //       },
// //       workTime: months.reduce((acc, month) => {
// //         acc[month] = faker.number.int({ min: 0, max: 200 });
// //         return acc;
// //       }, {} as WorkTime),
// //       hireDate: faker.date.past({ years: 10 }).toISOString().split("T")[0],
// //     };
// //     employees.push(employee);
// //   }
// // };

// // generateEmployeeData(500);

// export function getMonthWiseWorkTime() {
//   const allTimeWork: { [key: string]: number } = {};
//   for (const month of months) {
//     allTimeWork[month] = employees.reduce(
//       (prevEmployeeTime, employee) =>
//         prevEmployeeTime + employee.workTime[month],
//       0
//     );
//   }
//   return { months, allTimeWork };
// }
