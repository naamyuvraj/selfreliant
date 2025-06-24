import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-accent-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">Self</span> Reliant
            </h3>
            <p className="text-gray-100 mb-4">
              Connecting artisans with art lovers worldwide. Discover authentic handcrafted treasures that tell unique
              stories.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 hover:text-primary-gold cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 hover:text-primary-gold cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 hover:text-primary-gold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-100 hover:text-primary-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-100 hover:text-primary-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="text-gray-100 hover:text-primary-gold transition-colors">
                  Our Artisans
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-100 hover:text-primary-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-100 hover:text-primary-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/baskets" className="text-gray-100 hover:text-primary-gold transition-colors">
                  Baskets
                </Link>
              </li>
              <li>
                <Link href="/category/jewellery" className="text-gray-100 hover:text-primary-gold transition-colors">
                  Jewellery
                </Link>
              </li>
              <li>
                <Link href="/category/embroidery" className="text-gray-100 hover:text-primary-gold transition-colors">
                  Embroidery
                </Link>
              </li>
              <li>
                <Link href="/category/mandala" className="text-gray-100 hover:text-primary-gold transition-colors">
                  Mandala Art
                </Link>
              </li>
              <li>
                <Link href="/category/pottery" className="text-gray-100 hover:text-primary-gold transition-colors">
                  Pottery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-white" />
                <span className="text-gray-100">info@selfreliant.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-white" />
                <span className="text-gray-100">+91-9153471582</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-white" />
                <span className="text-gray-100">India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-gray-100">
            © 2025 Self Reliant. All rights reserved. |
            <Link href="/privacy" className="hover:text-primary-gold transition-colors ml-1">
              Privacy Policy
            </Link>{" "}
            |
            <Link href="/terms" className="hover:text-primary-gold transition-colors ml-1">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
