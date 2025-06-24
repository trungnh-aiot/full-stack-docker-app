"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { fetchNotes } from "@/api/note.api";
import { BACK_END_URL } from "@/constants/env.constants";
import { Note } from "@/type/note.type";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleFetchNotes = async () => {
    const data = await fetchNotes();
    setNotes(data);
  };

  const handleSubmit = async () => {
    if (editingNote) {
      await fetch(`${BACK_END_URL}/api/notes/${editingNote.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      setEditingNote(null);
    } else {
      await fetch(`${BACK_END_URL}/api/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
    }
    setContent("");
    await handleFetchNotes();
  };

  const handleDelete = async (id: string) => {
    await fetch(`${BACK_END_URL}/api/notes/${id}`, { method: "DELETE" });
    await handleFetchNotes();
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setContent(note.content);
  };

  useEffect(() => {
    void handleFetchNotes();
  }, []);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Quản lý ghi chú</h1>

      <div className="flex gap-2">
        <input
          className="border rounded px-2 py-1 w-1/2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập ghi chú"
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={handleSubmit}
        >
          {editingNote ? "Cập nhật" : "Thêm"}
        </button>
      </div>

      <ul className="space-y-2">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex items-center justify-between border px-3 py-2 rounded"
          >
            <span>{note.content}</span>
            <div className="flex gap-2">
              <button
                className="text-blue-500 underline"
                onClick={() => handleEdit(note)}
              >
                Sửa
              </button>
              <button
                className="text-red-500 underline"
                onClick={() => handleDelete(note.id)}
              >
                Xoá
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="pt-6">
        <Link href="/home" className="text-gray-600 underline">
          ← Quay lại trang chủ
        </Link>
      </div>
    </main>
  );
}
