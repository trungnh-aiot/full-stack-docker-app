import { BACK_END_URL } from "@/constants/env.constants";
import { SuccessResponse } from "@/type/apiResponse.type";
import { Counter } from "@/type/counter.type";

export const fetchCounter = async () => {
  const res = await fetch(`${BACK_END_URL}/api/counter`);
  const data = (await res.json()) as SuccessResponse<Counter>;
  return data.data;
};
