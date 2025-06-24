"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { fetchCounter } from "@/api/page.api";
import Counter from "@/components/home/counter";

export default function Home() {
  const [counter, setCounter] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCounter()
      .then((data) => {
        setCounter(data.count);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-4">
      {loading ? "Loading..." : <Counter target={counter} />}
      <div className="flex gap-4">
        <Link href="/notes" className="text-blue-500 underline">
          Ghi chú
        </Link>
        <Link href="/redis-admin" className="text-blue-500 underline">
          Redis Admin
        </Link>
      </div>
    </main>
  );
}
