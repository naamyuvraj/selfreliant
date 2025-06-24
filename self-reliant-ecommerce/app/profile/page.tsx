"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/UserContext";
import { supabase } from "@/lib/supabaseClient";
import MandalaPattern from "../component/MandalaPatterns";
import Image from "next/image";
import { useRouter } from "next/navigation";

const tabs = [
  "Personal Info",
  "Address Book",
  "Order History",
  "Customer Care",
  "Logout",
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("MALE");
  const router = useRouter();
  const [addressList, setAddressList] = useState<any[]>([]);
  const [newAddress, setNewAddress] = useState({
    label: "HOME",
    line1: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const { user, loading } = useAuth();

  const [orders, setOrders] = useState<any[]>([]);
  const [orderItemsMap, setOrderItemsMap] = useState<Record<string, any[]>>({});
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
    if (user) {
      fetchCustomerProfile();
    }
  }, [user, loading]);

  useEffect(() => {
    if (user && activeTab === "Address Book") fetchAddresses();
    if (user && activeTab === "Order History") fetchOrdersAndItems();
  }, [user, activeTab]);

  async function fetchCustomerProfile() {
    const { data } = await supabase
      .from("customers")
      .select("name, phone, gender")
      .eq("id", user?.id)
      .single();

    if (data) {
      setFullName(data.name || "");
      setPhone(data.phone || "");
      setGender(data.gender || "MALE");
    }
  }

  async function fetchAddresses() {
    const { data } = await supabase
      .from("customer_addresses")
      .select("*")
      .eq("customer_id", user?.id);
    if (data) setAddressList(data || []);
  }
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      alert("Failed to logout.");
    } else {
      router.replace("/login"); // or use router.replace('/login')
    }
  }

  async function fetchOrdersAndItems() {
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .eq("customer_id", user?.id)
      .eq("status", "Paid")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error.message);
      return;
    }

    setOrders(orders);

    const { data: orderItems, error: itemsErr } = await supabase
      .from("order_items")
      .select(`*, inventory ( name, image_urls, description )`)
      .in(
        "order_id",
        orders.map((o) => o.id)
      );

    if (itemsErr) {
      console.error("Error fetching order items:", itemsErr.message);
      return;
    }

    const grouped = orderItems.reduce((acc, item) => {
      if (!acc[item.order_id]) acc[item.order_id] = [];
      acc[item.order_id].push(item);
      return acc;
    }, {});

    setOrderItemsMap(grouped);
    setLoadingOrders(false);
  }

  async function handleProfileUpdate() {
    const { error } = await supabase.from("customers").upsert({
      id: user.id,
      name: fullName,
      email: user.email,
      phone,
      gender,
    });

    if (error) {
      alert("Failed to update profile");
    } else {
      alert("Profile updated successfully");
    }
  }

  async function handleAddAddress() {
    const { label, line1, city, state, pincode, phone } = newAddress;
    if (!label || !line1 || !city || !state || !pincode || !phone)
      return alert("All fields required");

    const { error } = await supabase.from("customer_addresses").insert({
      customer_id: user?.id,
      label,
      line1,
      city,
      state,
      pincode,
      phone,
    });

    if (error) {
      alert("Failed to add address");
    } else {
      setNewAddress({
        label: "HOME",
        line1: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
      });
      setShowAddressForm(false);
      fetchAddresses();
    }
  }
  return (
    <div className="min-h-screen bg-[#d69264] text-gray-800">
      <>
        {/* Original Patterns + New Additions */}
        <div className="absolute inset-0 pointer-events-none z-0">
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

          {/* New Additions */}
          <div className="absolute top-10 left-10">
            <MandalaPattern type="mandala1" size="xl" opacity={0.08} />
          </div>
          <div className="absolute top-[60%] left-[60%]">
            <MandalaPattern type="lippan1" size="sm" opacity={0.12} />
          </div>
          <div className="absolute top-[20%] right-[20%]">
            <MandalaPattern type="mandala2" size="sm" opacity={0.15} />
          </div>
          <div className="absolute bottom-[12%] left-[25%]">
            <MandalaPattern type="mandala3" size="md" opacity={0.1} />
          </div>
          <div className="absolute top-[40%] right-[10%]">
            <MandalaPattern type="lippan2" size="xl" opacity={0.1} />
          </div>
        </div>
      </>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-8">My Account</h2>
            <ul className="space-y-6">
              {tabs.map((tab) => (
                <li
                  key={tab}
                  className={`cursor-pointer text-lg font-semibold py-3 px-5 rounded-xl transition-all duration-200 hover:bg-[#E2725B]/10 ${
                    activeTab === tab
                      ? "text-[#E2725B] bg-[#E2725B]/10"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    if (tab === "Logout") handleLogout();
                    else setActiveTab(tab);
                  }}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 bg-white rounded-2xl shadow-lg p-10">
            {activeTab === "Personal Info" && (
              <div className="space-y-10">
                <h3 className="text-3xl font-bold">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-base font-semibold mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E2725B]"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full border border-gray-200 rounded-xl px-5 py-4 bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold mb-3">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E2725B]"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold mb-3">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E2725B]"
                    >
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                      <option value="OTHER">OTHER</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleProfileUpdate}
                  className="bg-[#E2725B] text-white px-10 py-4 rounded-xl text-base font-semibold hover:bg-[#c85c48]"
                >
                  Update Profile
                </button>
              </div>
            )}

            {activeTab === "Address Book" && (
              <div className="space-y-10">
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-bold">Address Book</h3>
                  <button
                    className="text-[#E2725B] text-base font-semibold hover:underline"
                    onClick={() => setShowAddressForm(true)}
                  >
                    + Add new address
                  </button>
                </div>

                {showAddressForm && (
                  <div className="bg-[#FFF5F0] border border-[#E2725B] p-6 rounded-xl space-y-4">
                    <input
                      type="text"
                      placeholder="Full Address"
                      value={newAddress.line1}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, line1: e.target.value })
                      }
                      className="w-full border px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E2725B]"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, city: e.target.value })
                      }
                      className="w-full border px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E2725B]"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, state: e.target.value })
                      }
                      className="w-full border px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E2725B]"
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={newAddress.pincode}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          pincode: e.target.value,
                        })
                      }
                      className="w-full border px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E2725B]"
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={newAddress.phone}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, phone: e.target.value })
                      }
                      className="w-full border px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E2725B]"
                    />
                    <div>
                      <label className="block text-base font-semibold mb-3">
                        Address Type
                      </label>
                      <select
                        value={newAddress.label}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            label: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E2725B]"
                      >
                        <option value="HOME">HOME</option>
                        <option value="OFFICE">OFFICE</option>
                        <option value="OTHER">OTHER</option>
                      </select>
                    </div>

                    <button
                      className="bg-[#E2725B] text-white px-6 py-3 rounded-lg hover:bg-[#c85c48]"
                      onClick={handleAddAddress}
                    >
                      Save Address
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {addressList.length === 0 && (
                    <div
                      onClick={() => setShowAddressForm(true)}
                      className="border border-dashed border-[#E2725B] rounded-xl p-6 shadow-md bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-[#FFF5F0]"
                    >
                      <span className="text-4xl text-[#E2725B]">+</span>
                      <p className="mt-2 text-[#E2725B] font-semibold">
                        Add New Address
                      </p>
                    </div>
                  )}

                  {addressList.map((addr) => (
                    <div
                      key={addr.id}
                      className="border border-gray-200 rounded-xl p-6 shadow-md bg-white"
                    >
                      <h4 className="font-bold text-lg mb-2">
                        <span className="ml-2 text-xs text-gray-500">
                          {addr.label}
                        </span>
                      </h4>
                      <p className="text-base text-gray-700 leading-relaxed">
                        {addr.line1}, {addr.city}, {addr.state}, India -{" "}
                        {addr.pincode}
                      </p>
                      <p className="text-base text-gray-700 mt-2 font-semibold">
                        Phone: {addr.phone}
                      </p>
                      <div className="mt-4 flex gap-6 text-base text-[#E2725B]">
                        <button className="hover:underline">Edit</button>
                        <button className="hover:underline">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Order History Tab */}
            {activeTab === "Order History" && (
              <div className="space-y-6">
                <h3 className="text-3xl font-bold mb-6">Order History</h3>

                {loadingOrders ? (
                  <p className="text-gray-500">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <p className="text-gray-500">No completed orders found.</p>
                ) : (
                  orders.map((order) => {
                    const items = orderItemsMap[order.id] || [];
                    const firstItem = items[0];
                    const img = firstItem?.inventory?.image_urls?.[0];

                    return (
                      <div
                        key={order.id}
                        className="bg-gray-100 rounded-xl shadow-md p-5 mb-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-green-600 font-semibold">
                            Delivered
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(order.created_at).toDateString()}
                          </span>
                        </div>

                        <div className="flex gap-4">
                          {img && (
                            <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={img}
                                alt="product"
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-[#E2725B]">
                              {firstItem?.inventory?.name}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              Qty: {firstItem?.quantity}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              ₹{firstItem?.price}
                            </p>
                            <p className="text-xs text-gray-400">
                              Exchange/Return closed on{" "}
                              {new Date(
                                new Date(order.created_at).getTime() +
                                  14 * 24 * 60 * 60 * 1000
                              ).toDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {activeTab === "Customer Care" && (
              <div className="space-y-6">
                <h3 className="text-3xl font-bold">Customer Care</h3>
                <p className="text-lg text-gray-700">
                  Need help? Reach out to us at{" "}
                  <a
                    href="mailto:support@selfreliant.com"
                    className="text-[#E2725B] hover:underline"
                  >
                    support@selfreliant.com
                  </a>{" "}
                  or call us at{" "}
                  <span className="font-semibold">+91-99999-99999</span>.
                </p>
                <p className="text-lg text-gray-700">
                  Our support team is available Monday to Saturday, 10 AM - 6
                  PM.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
