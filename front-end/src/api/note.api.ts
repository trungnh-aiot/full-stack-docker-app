import { BACK_END_URL } from "@/constants/env.constants";
import { SuccessResponse } from "@/type/apiResponse.type";
import { Note } from "@/type/note.type";

export const fetchNotes = async () => {
  const res = await fetch(`${BACK_END_URL}/api/notes`);
  const data = (await res.json()) as SuccessResponse<Note[]>;
  return data.data;
};
