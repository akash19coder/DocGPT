import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Instagram,
  Github,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

export function FooterBw() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-40 transform translate-y-1/2"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillOpacity="0.05"
            fill="currentColor"
            d="M0,224L60,208C120,192,240,160,360,165.3C480,171,600,213,720,213.3C840,213,960,171,1080,149.3C1200,128,1320,128,1380,128L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">DocGPT</h2>
            <p className="mb-4 max-w-md text-gray-300">
              Empowering developers with AI-driven documentation assistance.
              Simplify your workflow and boost productivity with DocGPT.
            </p>
            <form className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white"
              />
              <Button
                type="submit"
                variant="secondary"
                className="bg-white text-black hover:bg-gray-200 transition-colors"
              >
                Subscribe
              </Button>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/features"
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <Mail size={18} className="mr-2" />
                  <a
                    href="mailto:info@docgpt.com"
                    className="hover:text-white transition-colors"
                  >
                    info@docgpt.com
                  </a>
                </li>
                <li className="flex items-center text-gray-300">
                  <Phone size={18} className="mr-2" />
                  <a
                    href="tel:+1234567890"
                    className="hover:text-white transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-center text-gray-300">
                  <MapPin size={18} className="mr-2" />
                  <span>123 AI Street, Tech City</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} DocGPT. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Facebook size={24} />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter size={24} />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
