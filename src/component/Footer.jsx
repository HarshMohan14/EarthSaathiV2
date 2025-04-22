import React from "react";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Youtube, Instagram } from "lucide-react";
import { Link } from "react-router";

const socialLinks = [
  { icon: <Twitter size={28} />, url: "https://twitter.com/" },
  { icon: <Linkedin size={28} />, url: "https://www.linkedin.com/company/earthsaathi/posts/?feedView=all" },
  { icon: <Youtube size={28} />, url: "https://www.youtube.com/@EarthSaathi" },
  { icon: <Instagram size={28} />, url: "https://www.instagram.com/earthsaathi?igsh=MWIwazRjODB1ajR3Mg==" },
];

const pageLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Career", href: "/career" },

];

const Footer = () => {
  return (
    <footer className="w-full bg-[#0C1F5E] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-10 ">
        {/* 1. Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, type: "spring" }}
          className="flex flex-col items-center md:items-start gap-3"
        >
          <span className="text-[#01DC98] font-bold text-lg mb-2">Follow Us</span>
          <div className="flex gap-4">
            {socialLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#01DC98" }}
                className="text-2xl hover:text-[#01DC98] transition-colors"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* 2. Page Links */}
        <motion.nav
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
          className="flex flex-col items-center md:items-start"
        >
          <span className="text-[#01DC98] font-bold text-lg mb-2">Pages</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {pageLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.href}
                  className="text-white hover:text-[#01DC98] transition-colors font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* 3. Logo */}

        {/* 4. Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
          className="flex flex-col items-center md:items-end gap-3"
        >
          <span className="text-[#01DC98] font-bold text-lg mb-2">Newsletter</span>
          <form
            className="flex w-full max-w-xs"
            onSubmit={e => {
              e.preventDefault();
              // handle subscribe
            }}
          >
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered rounded-l bg-white text-black focus:outline-none"
              required
            />
            <button
              type="submit"
              className="btn rounded-r bg-[#01DC98] text-[#0C1F5E] border-none hover:bg-white hover:text-[#0C1F5E] transition"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
      {/* Bottom bar */}
      <div className="mt-12 text-center text-sm text-white/70">
        &copy; {new Date().getFullYear()} EarthSaathi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
