"use client";

import HeroSection from "@/components/HeroSection";
import AnimatedFeatureGrid from "@/components/AnimatedFeatureGrid";
import { TabsDemo } from "@/components/TabsSection";
import FlowingMenu from "@/components/ui/flowingmenu";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const demoItems = [
  {
    link: "#",
    text: "Mojave",
    image: "https://picsum.photos/600/400?random=1",
  },
  {
    link: "#",
    text: "Sonoma",
    image: "https://picsum.photos/600/400?random=2",
  },
  {
    link: "#",
    text: "Monterey",
    image: "https://picsum.photos/600/400?random=3",
  },
  {
    link: "#",
    text: "Sequoia",
    image: "https://picsum.photos/600/400?random=4",
  },
];

export default function Home() {
  return (
    <>
      {/* Geometric Pattern Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.05] -z-10 bg-[length:50px_50px]" />
        <div className="absolute -top-[40%] -left-[40%] -z-10 h-[600px] w-[600px] rounded-full bg-main/20 blur-3xl" />
        <div className="absolute -bottom-[40%] -right-[40%] -z-10 h-[600px] w-[600px] rounded-full bg-primary/20 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <HeroSection />
      </section>

      {/* Animated Feature Grid Section */}
      <AnimatedFeatureGrid />

      {/* Flowing Menu Section */}
      <section className="relative z-30 pt-14 bg-background">
        <div style={{ height: "400px", position: "relative" }}>
          <FlowingMenu items={demoItems} />
        </div>
      </section>

      {/* Tabs Section (Demo) */}
      <section className="relative z-40 pt-30 pb-20 bg-secondary-background">
        <TabsDemo />
      </section>

      {/* Contact Section */}
      <section className="relative z-50 py-20 bg-secondary-background">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="mb-6 text-muted-foreground">
            Have questions or want to join? Reach out to our team!
          </p>
          <a
            href="mailto:info@skillotav.com"
            className="inline-block px-8 py-4 bg-main text-main-foreground rounded-lg font-bold text-lg shadow-shadow border-2 border-border"
          >
            Email Us
          </a>
        </div>
      </section>
    </>
  );
}
