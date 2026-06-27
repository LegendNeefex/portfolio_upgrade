"use client";

import { useEffect } from "react";
import { supabase } from "../lib/supabase";


export default function TestPage() {
  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);
    }

    fetchProjects();
  }, []);

  return <h1>Testing Supabase...</h1>;
}