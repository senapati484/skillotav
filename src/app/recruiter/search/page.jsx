"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

export default function SearchCandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tokenFilters, setTokenFilters] = useState({
    academic: { min: 0, enabled: false },
    skills: { min: 0, enabled: false },
    experience: { min: 0, enabled: false },
    extracurricular: { min: 0, enabled: false },
  });

  // Sample candidates data
  const candidates = [
    {
      id: 1,
      name: "John Doe",
      title: "Frontend Developer",
      location: "New York, NY",
      tokens: [
        { category: "Academic", quantity: 7, quality: 85, color: "#ef4444" },
        { category: "Skills", quantity: 8, quality: 75, color: "#3b82f6" },
        { category: "Experience", quantity: 6, quality: 80, color: "#22c55e" },
        {
          category: "Extracurricular",
          quantity: 5,
          quality: 70,
          color: "#eab308",
        },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "UX Designer",
      location: "Remote",
      tokens: [
        { category: "Academic", quantity: 8, quality: 90, color: "#ef4444" },
        { category: "Skills", quantity: 9, quality: 85, color: "#3b82f6" },
        { category: "Experience", quantity: 5, quality: 75, color: "#22c55e" },
        {
          category: "Extracurricular",
          quantity: 4,
          quality: 65,
          color: "#eab308",
        },
      ],
    },
    {
      id: 3,
      name: "Alex Johnson",
      title: "Full Stack Developer",
      location: "San Francisco, CA",
      tokens: [
        { category: "Academic", quantity: 6, quality: 80, color: "#ef4444" },
        { category: "Skills", quantity: 9, quality: 90, color: "#3b82f6" },
        { category: "Experience", quantity: 7, quality: 85, color: "#22c55e" },
        {
          category: "Extracurricular",
          quantity: 3,
          quality: 60,
          color: "#eab308",
        },
      ],
    },
    {
      id: 4,
      name: "Emily Chen",
      title: "Product Manager",
      location: "Boston, MA",
      tokens: [
        { category: "Academic", quantity: 9, quality: 95, color: "#ef4444" },
        { category: "Skills", quantity: 7, quality: 80, color: "#3b82f6" },
        { category: "Experience", quantity: 8, quality: 90, color: "#22c55e" },
        {
          category: "Extracurricular",
          quantity: 6,
          quality: 75,
          color: "#eab308",
        },
      ],
    },
    {
      id: 5,
      name: "Michael Brown",
      title: "Data Scientist",
      location: "Remote",
      tokens: [
        { category: "Academic", quantity: 10, quality: 95, color: "#ef4444" },
        { category: "Skills", quantity: 8, quality: 85, color: "#3b82f6" },
        { category: "Experience", quantity: 5, quality: 75, color: "#22c55e" },
        {
          category: "Extracurricular",
          quantity: 4,
          quality: 65,
          color: "#eab308",
        },
      ],
    },
  ];

  // Filter candidates based on search term and token filters
  const filteredCandidates = candidates.filter((candidate) => {
    // Filter by search term
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by token requirements
    let matchesTokens = true;

    for (const [category, filter] of Object.entries(tokenFilters)) {
      if (filter.enabled) {
        const token = candidate.tokens.find(
          (t) => t.category.toLowerCase() === category.toLowerCase()
        );
        if (!token || token.quantity < filter.min) {
          matchesTokens = false;
          break;
        }
      }
    }

    return matchesSearch && matchesTokens;
  });

  const handleTokenFilterChange = (category, field, value) => {
    setTokenFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Search Candidates</h1>
        <p className="text-muted-foreground">
          Find candidates based on their token profiles
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, title, or location"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <h3 className="font-medium mb-4">Token Filters</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(tokenFilters).map(([category, filter]) => (
                  <div
                    key={category}
                    className="space-y-2 border rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`${category}-filter`}
                          checked={filter.enabled}
                          onChange={(e) =>
                            handleTokenFilterChange(
                              category,
                              "enabled",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label
                          htmlFor={`${category}-filter`}
                          className="capitalize font-medium"
                        >
                          {category} Tokens
                        </Label>
                      </div>
                    </div>

                    {filter.enabled && (
                      <div className="space-y-2 mt-2">
                        <div className="flex justify-between">
                          <Label htmlFor={`${category}-min`}>
                            Minimum Quantity
                          </Label>
                          <span className="text-sm">{filter.min}</span>
                        </div>
                        <Slider
                          id={`${category}-min`}
                          min={0}
                          max={10}
                          step={1}
                          value={[filter.min]}
                          onValueChange={(value) =>
                            handleTokenFilterChange(category, "min", value[0])
                          }
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Apply Filters</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => (
            <Card key={candidate.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {candidate.title} • {candidate.location}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    <Button asChild>
                      <Link href={`/recruiter/candidates/${candidate.id}`}>
                        View Profile
                      </Link>
                    </Button>
                    <Button variant="outline">Contact</Button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm mb-2">Token profile:</p>
                  <div className="flex flex-wrap gap-4">
                    {candidate.tokens.map((token, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: token.color,
                            opacity: 0.5 + (token.quality / 100) * 0.5,
                          }}
                        >
                          <span className="text-white text-xs">
                            {token.quantity}
                          </span>
                        </div>
                        <span className="text-xs">{token.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No candidates match your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Label({ htmlFor, className, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium ${className || ""}`}
    >
      {children}
    </label>
  );
}
