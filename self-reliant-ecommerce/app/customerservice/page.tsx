"use client";

import Navbar from "@/app/component/Navbar";
import Footer from "../component/Footer";
import MandalaPattern from "../component/MandalaPatterns";
import Link from "next/link";
import { CircleChevronLeft } from "lucide-react";
export default function CustomerService() {
  return (
    <div className="bg-[#d69264] min-h-screen text-white pt-16">
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


      <div className="max-w-4xl  px-6 py-12 relative z-19">
        
                <Link href="/" className="text-white hover:underline font-medium mb-3 ">
          <CircleChevronLeft className="inline-block mr-2 h-8 w-8" />
        </Link>

        <h1 className="text-4xl font-bold mb-4 mt-4">Customer Service</h1>
        <p className="text-lg mb-8">
          We're here to help. For questions about your order, returns, shipping, or anything else, please check below or reach out.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">📦 Order & Shipping</h2>
            <p className="text-base mt-2">
              Track your orders, manage shipping addresses, and view delivery estimates from your account dashboard.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">🔄 Returns & Refunds</h2>
            <p className="text-base mt-2">
              Return requests are accepted within 7 days of delivery. Refunds are processed within 3–5 business days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">📞 Contact Us</h2>
            <p className="text-base mt-2">
              Reach us at <span className="font-medium">selfreliant2025@gmail.com</span> or call <span className="font-medium">+91 9153471582</span>. We're available Mon–Fri, 10am–6pm.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
