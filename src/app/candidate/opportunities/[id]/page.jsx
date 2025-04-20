"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Building, Clock, Briefcase } from "lucide-react";

export default function OpportunityPage({ params }) {
  const router = useRouter();
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);

  // In a real application, you would fetch this data based on the ID
  const job = {
    id: parseInt(params.id),
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
    responsibilities: [
      "Develop and maintain web applications using React and Next.js",
      "Collaborate with designers to implement UI/UX designs",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and team discussions",
      "Optimize applications for maximum performance",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Flexible work hours and remote work options",
      "Professional development budget",
      "Regular team events and activities",
    ],
    imageUrl: "/placeholder.svg?height=200&width=300",
    tokens: [
      { category: "Skills", required: 7, color: "#3b82f6" },
      { category: "Experience", required: 5, color: "#22c55e" },
    ],
    match: 90,
  };

  const handleApply = () => {
    // In a real application, you would handle the application submission here
    alert("Application submitted successfully!");
    setIsApplyDialogOpen(false);
    router.push("/candidate/applications");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-clash font-bold">{job.title}</h1>
          <p className="text-muted-foreground font-satoshi">{job.company}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-2 border-border shadow-shadow">
            <CardContent className="p-6">
              <div className="relative aspect-video rounded-md overflow-hidden mb-6 border-2 border-border">
                <Image
                  src={job.imageUrl}
                  alt={job.company}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground font-satoshi mb-6">
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
              <div className="prose max-w-none">
                <p className="text-muted-foreground font-satoshi">
                  {job.description}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border shadow-shadow">
            <CardHeader>
              <CardTitle className="font-clash">Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground font-satoshi">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-border shadow-shadow">
            <CardHeader>
              <CardTitle className="font-clash">Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground font-satoshi">
                {job.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-border shadow-shadow">
            <CardHeader>
              <CardTitle className="font-clash">Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground font-satoshi">
                {job.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="h-full md:col-span-1">
          <div className="space-y-6 sticky top-6">
            <Card className="border-2 border-border shadow-shadow">
              <CardHeader>
                <CardTitle className="font-clash">Token Match</CardTitle>
                <CardDescription className="font-satoshi">
                  Your profile match for this position
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-center p-4 border-2 border-border rounded-base">
                    <div className="text-center">
                      <div className="text-4xl font-bold font-clash mb-1">
                        {job.match}%
                      </div>
                      <div className="text-sm text-muted-foreground font-satoshi">
                        Overall Match
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-clash font-medium">
                      Required Tokens:
                    </h4>
                    <div className="space-y-3">
                      {job.tokens.map((token, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-base flex items-center justify-center border-2 border-border"
                            style={{ backgroundColor: token.color }}
                          >
                            <span className="text-white font-bold">
                              {token.required}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              {token.category}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Required Level
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Dialog
              open={isApplyDialogOpen}
              onOpenChange={setIsApplyDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="w-full border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all">
                  Apply Now
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-clash">
                    Apply for {job.title}
                  </DialogTitle>
                  <DialogDescription className="font-satoshi">
                    Your profile and tokens will be shared with {job.company}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Token Match:{" "}
                    <span className="font-medium">{job.match}%</span>
                  </p>
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsApplyDialogOpen(false)}
                      className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleApply}
                      className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                    >
                      Confirm Application
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              className="w-full border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
              asChild
            >
              <Link href={`/candidate/opportunities`}>View Similar Jobs</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
