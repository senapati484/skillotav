"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/provider/AuthProvider";
import { ethers } from "ethers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MapPin, Building, Clock, Briefcase } from "lucide-react";

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [githubUsername, setGithubUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask!");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balanceWei = await provider.getBalance(address);
      const balanceEth = ethers.formatEther(balanceWei);
      setWalletAddress(address);
      setBalance(parseFloat(balanceEth).toFixed(4));
    } catch (err) {
      console.error(err);
      alert("Failed to connect wallet.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile || !githubUsername.trim()) {
      setError("Please upload a resume and enter your GitHub username.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("resume", resumeFile);
      fd.append("username", githubUsername.trim());
      const res = await fetch("/api/analyze", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setAnalysisResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Sample job opportunities
  const recommendedOpportunities = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      type: "Full-time",
      salary: "$80,000 - $100,000",
      posted: "2 days ago",
      description:
        "We're looking for a skilled Frontend Developer to join our team and help build amazing user experiences.",
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
        "Join our design team to create intuitive and engaging user experiences for our clients.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      tokens: [
        { category: "Skills", required: 8, color: "#3b82f6" },
        { category: "Academic", required: 6, color: "#ef4444" },
      ],
      match: 75,
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "WebSolutions",
      location: "Remote",
      type: "Contract",
      salary: "$70 - $90 per hour",
      posted: "5 days ago",
      description:
        "Develop and maintain web applications using modern technologies and frameworks.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      tokens: [
        { category: "Skills", required: 8, color: "#3b82f6" },
        { category: "Experience", required: 6, color: "#22c55e" },
        { category: "Academic", required: 5, color: "#ef4444" },
      ],
      match: 95,
    },
  ];

  // Sample all opportunities
  const allOpportunities = [
    ...recommendedOpportunities,
    {
      id: 4,
      title: "Data Scientist",
      company: "DataTech",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      posted: "1 day ago",
      description:
        "Analyze complex data sets and develop machine learning models to drive business insights.",
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
      title: "Product Manager",
      company: "InnovateCo",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      posted: "3 days ago",
      description:
        "Lead product development and strategy for our growing tech company.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      tokens: [
        { category: "Experience", required: 7, color: "#22c55e" },
        { category: "Skills", required: 6, color: "#3b82f6" },
        { category: "Academic", required: 7, color: "#ef4444" },
      ],
      match: 60,
    },
  ];

  // Sample recent applications
  const recentApplications = [
    {
      id: 1,
      jobTitle: "Frontend Developer",
      company: "TechCorp",
      appliedDate: "2023-04-15",
      status: "Under Review",
      statusColor: "blue",
    },
    {
      id: 2,
      jobTitle: "UX Designer",
      company: "DesignHub",
      appliedDate: "2023-04-10",
      status: "Not Matched",
      statusColor: "red",
    },
  ];

  // Function to render status badge with appropriate color
  const renderStatusBadge = (status, color) => {
    const colorClasses = {
      blue: "bg-blue-100 text-blue-800",
      green: "bg-green-100 text-green-800",
      yellow: "bg-yellow-100 text-yellow-800",
      red: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClasses[color]}`}
      >
        {status}
      </span>
    );
  };

  // Function to render job card
  const renderJobCard = (job) => (
    <Card
      key={job.id}
      className="overflow-hidden border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all cursor-pointer"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 lg:w-1/4 relative h-48 md:h-auto">
          <img
            src={job.imageUrl || "/placeholder.svg"}
            alt={job.company}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-xl">{job.title}</h3>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                  {job.match}% Match
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
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
              <p className="text-sm mb-4 line-clamp-2">{job.description}</p>
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
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm mb-2">Required tokens:</p>
            <div className="flex flex-wrap gap-4">
              {job.tokens.map((token, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: token.color }}
                  >
                    <span className="text-white text-xs">{token.required}</span>
                  </div>
                  <span className="text-xs">{token.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 space-y-8">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.displayName?.split(" ")[0] || "User"}
        </h1>

        <Card className="border-2 border-border shadow-shadow p-6">
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>View and manage your credentials</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center text-center md:w-1/3">
              <Avatar className="w-32 h-32 mb-4 border-2 border-border">
                <AvatarImage
                  src={user?.photoURL || "/placeholder.svg"}
                  alt="Profile"
                />
                <AvatarFallback>
                  {user?.displayName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "JD"}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user?.displayName}</h2>
              <p className="text-sm text-muted-foreground">
                Frontend Developer
              </p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={connectWallet}>
                  {walletAddress ? "Wallet Connected" : "Connect Wallet"}
                </Button>
              </div>
              {walletAddress && (
                <p className="mt-2 text-sm">
                  {walletAddress} • {balance} ETH
                </p>
              )}
            </div>
            <div className="flex-1">
              <Tabs defaultValue="about">
                <TabsList className="grid grid-cols-5 w-full border-2 border-border">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="extracurricular">
                    Extracurricular
                  </TabsTrigger>
                </TabsList>
                {/* Add TabsContent components here */}
              </Tabs>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border shadow-shadow p-6">
          <CardHeader>
            <CardTitle>Analyze Your Profile</CardTitle>
            <CardDescription>
              Upload resume & GitHub for fit analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Resume (DOCX)
                </label>
                <input
                  type="file"
                  accept=".docx"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="mt-1 block w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  GitHub Username
                </label>
                <input
                  type="text"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="e.g. arkokundu500"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <Button type="submit" disabled={loading}>
                {loading ? "Analyzing…" : "Analyze Profile"}
              </Button>
            </form>
            {analysisResult && (
              <Card className="mt-6 border-2 border-border shadow-shadow">
                <CardHeader>
                  <CardTitle>Analysis Result</CardTitle>
                  <CardDescription>Resume & GitHub fit</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Fit Score:</strong> {analysisResult.fitPercentage}%
                  </p>
                  <p>
                    <strong>Role:</strong> {analysisResult.finalRole}
                  </p>
                  <p>
                    <strong>Skills:</strong> {analysisResult.skills?.join(", ")}
                  </p>
                  {analysisResult.recommendations?.length > 0 && (
                    <ul className="list-disc list-inside mt-2">
                      {analysisResult.recommendations.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Recommended Opportunities</h2>
          {recommendedOpportunities.map(renderJobCard)}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">All Opportunities</h2>
          {allOpportunities.map(renderJobCard)}
        </div>
      </div>

      <div className="md:w-80 shrink-0">
        <div className="sticky top-6">
          <Card className="border-2 border-border shadow-shadow">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Track your job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{app.jobTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          {app.company}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Applied on {app.appliedDate}
                        </p>
                      </div>
                      {renderStatusBadge(app.status, app.statusColor)}
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                  asChild
                >
                  <Link href="/candidate/applications">
                    View All Applications
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
