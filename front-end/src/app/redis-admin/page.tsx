"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { fetchAllKeys } from "@/api/redis.api";
import { BACK_END_URL } from "@/constants/env.constants";

const API_BASE = `${BACK_END_URL}/api/redis`;

export default function RedisAdmin() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [entries, setEntries] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const handleFetchAllKeys = async () => {
    try {
      const res = await fetchAllKeys();

      setEntries(res);
    } catch (error) {
      console.error("Lỗi khi load Redis keys:", error);
    }
  };

  const handleAdd = async () => {
    try {
      await fetch(`${API_BASE}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });

      setMessage("Thêm thành công");
      setKey("");
      setValue("");
      handleFetchAllKeys();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (keyToDelete: string) => {
    try {
      await fetch(`${API_BASE}/keys/${encodeURIComponent(keyToDelete)}`, {
        method: "DELETE",
      });

      setMessage("Đã xoá key");
      handleFetchAllKeys();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleFetchAllKeys();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Redis Admin</h1>

      <div className="grid md:grid-cols-3 gap-3">
        <input
          className="border p-2"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Thêm Key-Value
        </button>
      </div>

      {message && <div className="text-green-600">{message}</div>}

      <hr />
      <div className="pt-6">
        <Link href="/home" className="text-gray-600 underline">
          ← Quay lại trang chủ
        </Link>
      </div>
      <h2 className="text-xl font-semibold">Danh sách Key - Value</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Key</th>
            <th className="border px-4 py-2 text-left">Value</th>
            <th className="border px-4 py-2 text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(entries).map(([k, v]) => (
            <tr key={k}>
              <td className="border px-4 py-2">{k}</td>
              <td className="border px-4 py-2">{v}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(k)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
