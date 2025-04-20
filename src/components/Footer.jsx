"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

// Import icons
import {
  LuGithub,
  LuTwitter,
  LuInstagram,
  LuLinkedin,
  LuYoutube,
  LuMail,
  LuMapPin,
  LuPhone,
  LuArrowRight,
} from "react-icons/lu";
import { usePathname } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isAuth =
    pathname.includes("/auth/login") || pathname.includes("/auth/register");

  if (isAuth) {
    return null;
  }

  return (
    <footer className="bg-background border-t-2 border-border mt-10 pt-10 pb-6">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Company info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold font-clash">
              SKILLOTAV
            </h3>
            <p className="text-sm font-base max-w-xs">
              Showcase your skills and connect with professionals around the
              world. Build your portfolio and grow your network.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" variant="neutral" className="rounded-full">
                <LuTwitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="neutral" className="rounded-full">
                <LuInstagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="neutral" className="rounded-full">
                <LuGithub className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="neutral" className="rounded-full">
                <LuLinkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:underline hover:underline-offset-4 transition-all"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:underline hover:underline-offset-4 transition-all"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm hover:underline hover:underline-offset-4 transition-all"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm hover:underline hover:underline-offset-4 transition-all"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:underline hover:underline-offset-4 transition-all"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-bold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <LuMapPin className="h-4 w-4 flex-shrink-0" />
                <span>Amta, Howrah, West Bengal</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <LuPhone className="h-4 w-4 flex-shrink-0" />
                <span>+91 8653420095</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <LuMail className="h-4 w-4 flex-shrink-0" />
                <span>sayansenapati2544@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-bold">Newsletter</h3>
            <p className="text-sm font-base">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="border-2 border-border shadow-shadow"
              />
              <Button variant="default">
                <LuArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Neobrutalism card banner */}
        <Card className="mb-8 overflow-hidden border-2 border-border shadow-shadow">
          <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-heading font-bold mb-2 font-clash">
                Ready to showcase your skills?
              </h3>
              <p className="text-sm">
                Join our community today and start building your professional
                portfolio.
              </p>
            </div>
            <Button className="shadow-shadow border-2 border-border" size="lg">
              Get Started
            </Button>
          </CardContent>
        </Card>

        {/* Copyright */}
        <div className="border-t-2 border-border pt-6 mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-base">
            © {currentYear} SKILLOTAV. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link
              href="/privacy"
              className="hover:underline hover:underline-offset-4 transition-all"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:underline hover:underline-offset-4 transition-all"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:underline hover:underline-offset-4 transition-all"
            >
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
