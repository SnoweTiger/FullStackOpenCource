
export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type DiaryFormValues = Omit<Diary, "id" | "comment">;