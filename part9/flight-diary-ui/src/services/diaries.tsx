import axios from "axios";
import { Diary } from "../types";

const apiBaseUrl = 'http://localhost:3000'

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/api/diaries`);
  return data;
};

// const create = async (object: PatientFormValues) => {
//   const { data } = await axios.post<Patient>(
//     `${apiBaseUrl}/patients`,
//     object
//   );

//   return data;
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    // create
};