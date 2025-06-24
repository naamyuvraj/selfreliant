import { useState, useEffect } from "react";
import Navbar from "@/app/component/Navbar";

export default function Contact() {
  return (
    <div className="bg-[#d69264] min-h-screen">
      <Navbar />
      <div className="p-6 text-white text-2xl">Contact Us</div>
    </div>
  );
}
