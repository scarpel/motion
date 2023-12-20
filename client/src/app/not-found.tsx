import { redirect } from "next/navigation";
import React from "react";

export default function NotFoundPage() {
  redirect("/");

  return <div></div>;
}
