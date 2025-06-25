"use client";

import Navbar from "@/app/component/Navbar";
import MandalaPattern from "../component/MandalaPatterns";
import Footer from "../component/Footer";
import Link from "next/link";
import { CircleChevronLeft } from "lucide-react";
export default function Contact() {
  return (
    <div className="bg-[#d69264] min-h-screen text-white pt-14">
      <Navbar />
      <div className="absolute inset-0 pointer-events-none z--2">
        <div className="absolute top-1/4 right-12">
          <MandalaPattern type="mandala3" size="xl" opacity={0.6} />
        </div>
        <div className="absolute bottom-1/3 left-16">
          <MandalaPattern type="lippan2" size="lg" opacity={0.45} />
        </div>
        <div className="absolute top-1/2 left-8">
          <MandalaPattern type="mandala1" size="md" opacity={0.12} />
        </div>
        <div className="absolute bottom-1/4 right-20">
          <MandalaPattern type="lippan1" size="lg" opacity={0.15} />
        </div>
        <div className="absolute top-16 left-1/3">
          <MandalaPattern type="mandala2" size="sm" opacity={0.1} />
        </div>
        <div className="absolute bottom-16 right-1/3">
          <MandalaPattern type="lippan2" size="md" opacity={0.12} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 z-19 ">
                <Link href="/" className="text-white hover:underline font-medium mb-3 ">
          <CircleChevronLeft className="inline-block mr-2 h-8 w-8" />
        </Link>

        <h1 className="text-4xl font-bold mb-4 mt-2">Contact Us</h1>
        <p className="text-lg mb-10">
          We'd love to hear from you! Whether you have a question, feedback, or
          just want to say hello, feel free to reach out.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#864c2f]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#864c2f]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Your message..."
              className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#864c2f]"
            />
          </div>

          <button
            type="submit"
            className="bg-[#864c2f] hover:bg-[#a25b38] text-white px-6 py-2 rounded-md font-medium transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
