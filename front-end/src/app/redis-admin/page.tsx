"use client";

import { BACK_END_URL } from "@/constants/env.constants";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_BASE = `${BACK_END_URL}/api/redis`;

export default function RedisAdmin() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [entries, setEntries] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const fetchAllKeys = async () => {
    try {
      const res = await fetch(`${API_BASE}/keys`);
      const data = await res.json();

      const keys: string[] = data.data || [];
      const newEntries: Record<string, string> = {};

      await Promise.all(
        keys.map(async (k) => {
          const resVal = await fetch(
            `${API_BASE}/keys/${encodeURIComponent(k)}`
          );
          const valData = await resVal.json();
          newEntries[k] = valData.data?.value || "(null)";
        })
      );

      setEntries(newEntries);
    } catch (error) {
      console.error("Lỗi khi load Redis keys:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await fetch(`${API_BASE}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      const data = await res.json();
      setMessage(data.message || "Thêm thành công");
      setKey("");
      setValue("");
      fetchAllKeys();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (keyToDelete: string) => {
    try {
      const res = await fetch(
        `${API_BASE}/keys/${encodeURIComponent(keyToDelete)}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      setMessage(data.message || "Đã xoá key");
      fetchAllKeys();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllKeys();
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
