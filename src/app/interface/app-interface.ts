export interface User {
  id: string;
  name : string;
  family : string;
  birthday : string;
  age : string;
  city : string;
  website : string;
  degree : string;
  description: string;
  phonenumber : string;
  email : string;
  password : string;
  username: string;
  img_url: string;
};
export interface IEducational {
  id: string,
  year: string;
  title: string;
  text: string;
  period: string;

}
// export interface IEducational {
//   year: string;
//   groupItem: [{
//     id: string,
//     title: string,
//     text: string,
//     period: string,
//   }]
// }
export interface ISkill {
  id: string;
  name:string;
  percent: string;
}
export interface IContact {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  created_at: string;
}
