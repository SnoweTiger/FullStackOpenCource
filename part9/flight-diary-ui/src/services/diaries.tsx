import axios from "axios";
import { Diary, DiaryFormValues } from "../types";

const apiBaseUrl = 'http://localhost:3000'

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/api/diaries`);
  return data;
};

const addNew = async (object: DiaryFormValues) => {
  console.log(object)
  const { data } = await axios.post<Diary>(`${apiBaseUrl}/api/diaries`, { ...object, comment:'' });
  console.log(data)
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    addNew
};