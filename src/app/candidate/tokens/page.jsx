"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenGrid } from "@/components/token-display";

export default function TokensPage() {
  const [activeTab, setActiveTab] = useState("all");

  // Sample token data
  const allTokens = [
    {
      category: "Academic",
      color: "#ef4444", // red-500
      quantity: 7,
      quality: 85,
      microTokens: [
        { name: "Bachelor's Degree", value: 90 },
        { name: "Certifications", value: 80 },
        { name: "Courses", value: 85 },
      ],
    },
    {
      category: "Skills",
      color: "#3b82f6", // blue-500
      quantity: 8,
      quality: 75,
      microTokens: [
        { name: "Programming", value: 85 },
        { name: "Design", value: 70 },
        { name: "Communication", value: 65 },
        { name: "Problem Solving", value: 80 },
        { name: "Data Analysis", value: 75 },
      ],
    },
    {
      category: "Experience",
      color: "#22c55e", // green-500
      quantity: 6,
      quality: 80,
      microTokens: [
        { name: "Internship", value: 75 },
        { name: "Part-time", value: 80 },
        { name: "Projects", value: 85 },
      ],
    },
    {
      category: "Extracurricular",
      color: "#eab308", // yellow-500
      quantity: 5,
      quality: 70,
      microTokens: [
        { name: "Volunteering", value: 75 },
        { name: "Leadership", value: 65 },
        { name: "Sports", value: 70 },
      ],
    },
  ];

  // Filter tokens based on active tab
  const getFilteredTokens = () => {
    if (activeTab === "all") return allTokens;
    return allTokens.filter(
      (token) => token.category.toLowerCase() === activeTab.toLowerCase()
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-clash font-bold">Your Tokens</h1>
        <p className="text-muted-foreground font-satoshi">
          Visualize your verified credentials as tokens
        </p>
      </div>
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full border-2 border-border">
          <TabsTrigger value="all">All Tokens</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="extracurricular">Extracurricular</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card className="border-2 border-border shadow-shadow">
            <CardHeader>
              <CardTitle className="font-clash">
                {activeTab === "all"
                  ? "All Tokens"
                  : `${
                      activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                    } Tokens`}
              </CardTitle>
              <CardDescription className="font-satoshi">
                Click on a token to see its constituent micro-tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TokenGrid tokens={getFilteredTokens()} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Card className="border-2 border-border shadow-shadow">
        <CardHeader>
          <CardTitle className="font-clash">Token Growth Over Time</CardTitle>
          <CardDescription className="font-satoshi">
            Track how your tokens have grown as you add more credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center border-2 border-border rounded-md bg-muted/20">
            <p className="text-muted-foreground font-satoshi">
              Token growth visualization would appear here
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="border-2 border-border shadow-shadow">
        <CardHeader>
          <CardTitle className="font-clash">
            Understanding Your Tokens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 font-satoshi">
            <div>
              <h3 className="font-clash font-semibold mb-2">
                Quantity Dimension
              </h3>
              <p className="text-sm text-muted-foreground">
                The number displayed on each token (1-10) represents the overall
                score in that domain. For example, a token with the number 7
                indicates a 70% score in that domain.
              </p>
            </div>
            <div>
              <h3 className="font-clash font-semibold mb-2">
                Quality Dimension
              </h3>
              <p className="text-sm text-muted-foreground">
                The opacity/intensity of the token represents the quality of
                your achievements. Higher opacity indicates higher quality
                credentials in that domain.
              </p>
            </div>
            <div>
              <h3 className="font-clash font-semibold mb-2">Micro-tokens</h3>
              <p className="text-sm text-muted-foreground">
                Each main token is comprised of micro-tokens representing
                individual achievements. Click on a token to see its constituent
                micro-tokens and their individual scores.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
