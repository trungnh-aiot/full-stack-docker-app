import { BACK_END_URL } from "@/constants/env.constants";
import { SuccessResponse } from "@/type/apiResponse.type";

export const fetchAllKeys = async (): Promise<Record<string, string>> => {
  const API_BASE = `${BACK_END_URL}/api/redis`;

  const res = await fetch(`${API_BASE}/keys`);
  const data = (await res.json()) as SuccessResponse<{ data: string[] }>;
  const keys: string[] = Array.isArray(data.data) ? data.data : [];

  const newEntries: Record<string, string> = {};

  await Promise.all(
    keys.map(async (k) => {
      const resVal = await fetch(`${API_BASE}/keys/${encodeURIComponent(k)}`);
      const valData = (await resVal.json()) as SuccessResponse<{
        value: string;
      }>;
      newEntries[k] = valData.data?.value ?? "(null)";
    })
  );

  return newEntries;
};
