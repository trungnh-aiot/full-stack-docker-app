"use client";
import Counter from "@/components/home/counter";
import { BACK_END_URL } from "@/constants/env.constants";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [counter, setCounter] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch(`${BACK_END_URL}/api/counter`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Counter data:", data);
        setCounter(data.data.count);
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
