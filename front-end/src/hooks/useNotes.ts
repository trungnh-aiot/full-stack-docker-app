import { useQuery } from "@tanstack/react-query";

import { fetchNotes } from "@/api/note.api";

export const useNotes = () =>
  useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });
