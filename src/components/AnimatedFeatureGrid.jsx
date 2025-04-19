import { motion } from "framer-motion";

import {
  FaGraduationCap,
  FaShieldAlt,
  FaTrophy,
  FaLink,
  FaGlobe,
  FaBolt,
} from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const features = [
  {
    icon: FaGraduationCap,
    title: "Academic Credentials",
    desc: "Transform your academic achievements into secure, verifiable digital credentials that are globally recognized.",
  },
  {
    icon: FaShieldAlt,
    title: "Skill Verification",
    desc: "Get your skills validated by industry experts through our comprehensive verification system.",
  },
  {
    icon: FaTrophy,
    title: "Reward System",
    desc: "Earn rewards and recognition for your contributions while building a trusted professional network.",
  },
  {
    icon: FaLink,
    title: "Blockchain Security",
    desc: "All credentials are secured on blockchain for tamper-proof, instant verification.",
  },
  {
    icon: FaGlobe,
    title: "Global Recognition",
    desc: "Showcase your skills to a global audience and unlock new opportunities.",
  },
  {
    icon: FaBolt,
    title: "Instant Access",
    desc: "Access and share your verified credentials anytime, anywhere.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

export default function AnimatedFeatureGrid() {
  return (
    <section className="relative z-20 py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground"
          style={{ fontFamily: "ClashDisplay-Medium, sans-serif" }}
        >
          Platform Features
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 [grid-auto-rows:1fr]"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            // Offset effect for unique grid
            const offset = idx % 2 === 1 ? "md:translate-y-6" : "";
            return (
              <motion.div
                key={feature.title}
                variants={item}
                className={`transition-transform ${offset}`}
              >
                <Card className="flex flex-col items-center h-full">
                  <CardHeader className="flex flex-col items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-14 h-14 rounded-full bg-muted text-primary text-3xl mb-2">
                      <Icon />
                    </span>
                    <CardTitle
                      className="text-lg text-center"
                      style={{ fontFamily: "ClashDisplay-Regular, sans-serif" }}
                    >
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 justify-center">
                    <CardDescription className="text-base text-muted-foreground text-center">
                      {feature.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
