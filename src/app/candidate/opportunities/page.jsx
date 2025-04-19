"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Building, Clock, Briefcase } from "lucide-react";

export default function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample job opportunities
  const opportunities = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      type: "Full-time",
      salary: "$80,000 - $100,000",
      posted: "2 days ago",
      description:
        "We're looking for a skilled Frontend Developer to join our team and help build amazing user experiences. You'll be working with React, Next.js, and TypeScript to create responsive and accessible web applications.",
      requirements: [
        "3+ years of experience with React",
        "Experience with Next.js and TypeScript",
        "Strong understanding of web accessibility",
        "Experience with responsive design",
      ],
      imageUrl: "/placeholder.svg?height=200&width=300",
      tokens: [
        { category: "Skills", required: 7, color: "#3b82f6" },
        { category: "Experience", required: 5, color: "#22c55e" },
      ],
      match: 90,
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignHub",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90,000 - $110,000",
      posted: "1 week ago",
      description:
        "Join our design team to create intuitive and engaging user experiences for our clients. You'll be responsible for user research, wireframing, prototyping, and collaborating with developers to implement your designs.",
      requirements: [
        "4+ years of UX design experience",
        "Proficiency in Figma and Adobe Creative Suite",
        "Experience conducting user research",
        "Portfolio demonstrating your design process",
      ],
      imageUrl: "/placeholder.svg?height=200&width=300",
      tokens: [
        { category: "Skills", required: 8, color: "#3b82f6" },
        { category: "Academic", required: 6, color: "#ef4444" },
      ],
      match: 75,
    },
    {
      id: 3,
      title: "Product Manager",
      company: "InnovateCo",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      posted: "3 days ago",
      description:
        "Lead product development and strategy for our growing tech company. You'll work closely with engineering, design, and marketing teams to define product vision, roadmap, and features that meet customer needs.",
      requirements: [
        "5+ years of product management experience",
        "Experience with agile methodologies",
        "Strong analytical and problem-solving skills",
        "Excellent communication and leadership abilities",
      ],
      imageUrl: "/placeholder.svg?height=200&width=300",
      tokens: [
        { category: "Experience", required: 7, color: "#22c55e" },
        { category: "Skills", required: 6, color: "#3b82f6" },
        { category: "Academic", required: 7, color: "#ef4444" },
      ],
      match: 60,
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "DataTech",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      posted: "1 day ago",
      description:
        "Analyze complex data sets and develop machine learning models to drive business insights. You'll be working with large datasets to extract meaningful patterns and create predictive models that inform business decisions.",
      requirements: [
        "Master's or PhD in Computer Science, Statistics, or related field",
        "Experience with Python, R, and SQL",
        "Knowledge of machine learning algorithms",
        "Experience with data visualization tools",
      ],
      imageUrl: "/placeholder.svg?height=200&width=300",
      tokens: [
        { category: "Academic", required: 8, color: "#ef4444" },
        { category: "Skills", required: 7, color: "#3b82f6" },
        { category: "Experience", required: 4, color: "#22c55e" },
      ],
      match: 85,
    },
    {
      id: 5,
      title: "Full Stack Developer",
      company: "WebSolutions",
      location: "Remote",
      type: "Contract",
      salary: "$70 - $90 per hour",
      posted: "5 days ago",
      description:
        "Develop and maintain web applications using modern technologies and frameworks. You'll be responsible for both frontend and backend development, working with React, Node.js, and PostgreSQL.",
      requirements: [
        "4+ years of full stack development experience",
        "Proficiency in React, Node.js, and SQL",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
        "Knowledge of DevOps practices",
      ],
      imageUrl: "/placeholder.svg?height=200&width=300",
      tokens: [
        { category: "Skills", required: 8, color: "#3b82f6" },
        { category: "Experience", required: 6, color: "#22c55e" },
        { category: "Academic", required: 5, color: "#ef4444" },
      ],
      match: 95,
    },
  ];

  // Filter opportunities based on search term
  const filteredOpportunities = opportunities.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-clash font-bold">Opportunities</h1>
        <p className="text-muted-foreground font-satoshi">
          Find job opportunities that match your token profile
        </p>
      </div>
      <Card className="border-2 border-border shadow-shadow">
        <CardHeader>
          <CardTitle className="font-clash">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, company, or location"
                className="pl-8 border-2 border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[180px] border-2 border-border">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="new-york">New York, NY</SelectItem>
                <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                <SelectItem value="boston">Boston, MA</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[180px] border-2 border-border">
                <SelectValue placeholder="Token Match" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Matches</SelectItem>
                <SelectItem value="90">90%+ Match</SelectItem>
                <SelectItem value="80">80%+ Match</SelectItem>
                <SelectItem value="70">70%+ Match</SelectItem>
                <SelectItem value="60">60%+ Match</SelectItem>
              </SelectContent>
            </Select>
            <Button className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all">
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-6">
        {filteredOpportunities.map((job) => (
          <Card
            key={job.id}
            className="overflow-hidden border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all cursor-pointer"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 lg:w-1/4 relative h-48 md:h-auto border-r-2 border-border">
                <Image
                  src={job.imageUrl || "/placeholder.svg"}
                  alt={job.company}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-clash font-bold text-xl">
                        {job.title}
                      </h3>
                      <span className="inline-flex items-center rounded-base px-2.5 py-0.5 text-xs font-medium bg-main/10 text-main border-2 border-border">
                        {job.match}% Match
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground font-satoshi mb-4">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Posted {job.posted}</span>
                      </div>
                    </div>
                    <p className="text-sm mb-4 line-clamp-2 font-satoshi">
                      {job.description}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-clash font-medium mb-2">
                        Requirements:
                      </p>
                      <ul className="text-sm list-disc pl-5 space-y-1 font-satoshi">
                        {job.requirements.slice(0, 2).map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                        {job.requirements.length > 2 && (
                          <li>+ {job.requirements.length - 2} more</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 min-w-[120px]">
                    <Button
                      asChild
                      className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                    >
                      <Link href={`/candidate/opportunities/${job.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t-2 border-border">
                  <p className="text-sm mb-2 font-clash">Required tokens:</p>
                  <div className="flex flex-wrap gap-4">
                    {job.tokens.map((token, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-base flex items-center justify-center border-2 border-border"
                          style={{ backgroundColor: token.color }}
                        >
                          <span className="text-white text-xs">
                            {token.required}
                          </span>
                        </div>
                        <span className="text-xs font-satoshi">
                          {token.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
