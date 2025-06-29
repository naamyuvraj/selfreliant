"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { state } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[1400px] px-2">
      <nav className="bg-white/30 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl">
        <div className="px-8 lg:px-12">
          <div className="flex justify-center items-center h-16">
            <div
              className="hidden md:flex items-center justify-center space-x-16"
              ref={dropdownRef}
            >
              {/* Centered Desktop Menu */}

              <Link
                href="/"
                className="text-white hover:text-[#C3592B] transition-colors font-medium text-lg"
              >
                Home
              </Link>

              {/* Handy Crafts Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("handycrafts")}
                  className="flex items-center text-white hover:text-[#C3592B] transition-colors font-medium text-lg"
                >
                  Handy Crafts <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === "handycrafts" && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl py-2 z-10 border border-white/20">
                    <Link
                      href="/sections/Handycrafts/papercraft"
                      className="block px-4 py-3 text-sm text-accent-green hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Paper Crafts
                    </Link>
                    <Link
                      href="/sections/Handycrafts/photoframes"
                      className="block px-4 py-3 text-sm text-accent-green hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Photo Frames
                    </Link>
                    <Link
                      href="/sections/Handycrafts/greetingcards"
                      className="block px-4 py-3 text-sm text-accent-green hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Greeting Cards
                    </Link>
                  </div>
                )}
              </div>

              {/* Hand Made Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("handmade")}
                  className="flex items-center text-white hover:text-[#C3592B] transition-colors font-medium text-lg"
                >
                  Hand Made <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === "handmade" && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl py-2 z-10 border border-white/20">
                    <Link
                      href="/sections/HandMade/wovenbaskets"
                      className="block px-4 py-3 text-sm text-accent-green hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Woven Baskets
                    </Link>
                    <Link
                      href="/sections/HandMade/threadembroidery"
                      className="block px-4 py-3 text-sm text-accent-green hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Thread Embroidery
                    </Link>
                    <Link
                      href="/sections/HandMade/handmadejewellery"
                      className="block px-4 py-3 text-sm text-accent-green hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Handmade Jewellery
                    </Link>
                    <Link
                      href="/sections/HandMade/Pottery"
                      className="block px-4 py-3 text-sm text-accent-green hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Ceramic Pottery
                    </Link>
                    <Link
                      href="/sections/HandMade/Handloom"
                      className="block px-4 py-3 text-sm text-accent-green hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Handwoven Textiles
                    </Link>
                  </div>
                )}
              </div>

              {/* Art Design Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("artdesign")}
                  className="flex items-center text-white hover:text-[#C3592B] transition-colors font-medium text-lg"
                >
                  Art Design <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === "artdesign" && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl py-2 z-10 border border-white/20">
                    <Link
                      href="/sections/ArtandDesign/Sculptures"
                      className="block px-4 py-3 text-sm text-accent-green hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Sculptures
                    </Link>
                    <Link
                      href="/sections/ArtandDesign/Traditional"
                      className="block px-4 py-3 text-sm text-accent-green hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Traditional Paintings & Artworks
                    </Link>
                    <Link
                      href="/sections/ArtandDesign/WallArt"
                      className="block px-4 py-3 text-sm text-accent-green hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Wall Art
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className="text-white hover:text-[#C3592B] transition-colors font-medium text-lg"
              >
                Contact Us
              </Link>
              <Link
                href="/customerservice"
                className="text-white hover:text-[#C3592B] transition-colors font-medium text-lg"
              >
                Customer Service
              </Link>
            </div>

            {/* Right side icons - positioned absolutely */}
            <div className="absolute right-6 flex items-center space-x-6">
              {/* <Link
                href="/"
                className="text-white hover:text-[#C3592B] transition-colors"
              > Home</Link> */}
              <Link
                href="/cart"
                className="relative text-white hover:text-[#C3592B] transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {state.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Link>
              {/* Profile Dropdown */}
              <div className="relative">
                <Link
                  href="/profile"
                  className="text-white hover:text-[#C3592B] transition-colors"
                >
                  <User className="h-6 w-6" />
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-white hover:text-primary-gold transition-colors"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
{isOpen && (
  <div
    className="md:hidden border-t border-white/20 mt-4"
    ref={dropdownRef} // ✅ so outside click detection works
  >
              <div className="px-2 pt-2 pb-3 space-y-2">
                <Link
                  href="/"
                  className="block px-3 py-2 text-accent-green/80 hover:text-[#d69264] font-medium rounded-lg"
                >
                  Home
                </Link>
                <div className="px-3 py-2">
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown("handycrafts")}
                      className="flex items-center text-sm font-semibold text-accent-green/80 uppercase tracking-wider"
                    >
                      Handy Crafts <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === "handycrafts" && (
                      <div className="bg-white/40 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl mt-2">
                        <Link
                          href="/sections/Handycrafts/papercraft"
                          className="block px-4 py-3 text-sm text-primary-gold hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                          onClick={() => setActiveDropdown(null)}
                          
                        >
                          Paper Crafts
                        </Link>
                        <Link
                          href="/sections/Handycrafts/photoframes"
                          className="block px-4 py-3 text-sm text-primary-gold hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Photo Frames
                        </Link>
                        <Link
                          href="/sections/Handycrafts/greetingcards"
                          className="block px-4 py-3 text-sm text-primary-gold hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Greeting Cards
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-3 py-2">
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown("handmade")}
                      className="flex items-center text-sm font-semibold text-accent-green/80 uppercase tracking-wider"
                    >
                      Hand Made <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === "handmade" && (
                      // <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl py-2 z-10 border border-white/20">
                      <div className="bg-white/40 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl mt-2">
                        <Link
                          href="/sections/HandMade/wovenbaskets"
                          className="block px-4 py-3 text-sm text-primary-gold hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Woven Baskets
                        </Link>
                        <Link
                          href="/sections/HandMade/threadembroidery"
                          className="block px-4 py-3 text-sm text-primary-gold hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Thread Embroidery
                        </Link>
                        <Link
                          href="/sections/HandMade/handmadejewellery"
                          className="block px-4 py-3 text-sm text-primary-gold hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Handmade Jewellery
                        </Link>
                        <Link
                          href="/sections/HandMade/Pottery"
                          className="block px-4 py-3 text-sm text-primary-gold hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Ceramic Pottery
                        </Link>
                        <Link
                          href="/sections/HandMade/Handloom"
                          className="block px-4 py-3 text-sm text-primary-gold hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Handwoven Textiles
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-3 py-2">
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown("artdesign")}
                      className="flex items-center text-sm font-semibold text-accent-green/80 uppercase tracking-wider"
                    >
                      Art Design <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === "artdesign" && (
                      <div className="bg-white/40 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl mt-2">
                        <Link
                          href="/sections/ArtandDesign/Sculptures"
                          className="block px-4 py-3 text-sm text-primary-gold hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Sculptures
                        </Link>
                        <Link
                          href="/sections/ArtandDesign/Traditional"
                          className="block px-4 py-3 text-sm text-primary-gold hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Traditional Paintings & Artworks
                        </Link>
                        <Link
                          href="/sections/ArtandDesign/WallArt"
                          className="block px-4 py-3 text-sm text-primary-gold hover:bg-white/50 hover:text-primary-gold transition-colors rounded-lg mx-2"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Wall Art
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-sm font-semibold text-accent-green/80 uppercase tracking-wider"
                >
                  Contact Us
                </Link>
                <Link
                  href="/customerservice"
                  className="block px-3 py-2 text-sm font-semibold text-accent-green/80 uppercase tracking-wider"
                >
                  Customer Service
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
