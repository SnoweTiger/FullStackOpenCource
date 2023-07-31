import axios from "axios";
import { Diary, DiaryFormValues } from "../types";
import { AxiosError } from "axios";

const apiBaseUrl = 'http://localhost:3000'

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/api/diaries`);
  return data;
};

const addNew = async (object: DiaryFormValues) => {
  // console.log(object)
  const { data } = await axios.post<Diary>(`${apiBaseUrl}/api/diaries`, { ...object, comment: '' })
  console.log(data)
  return data;


  // try {

  // } catch (e) {
  //   const error = e as AxiosError;
  //   console.log(error)
  //   throw Error(error);
  // }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  addNew
};