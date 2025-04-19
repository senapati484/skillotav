"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function PostJobPage() {
  const router = useRouter();
  const [tokenRequirements, setTokenRequirements] = useState({
    academic: { required: true, quantity: 5, quality: 70 },
    skills: { required: true, quantity: 7, quality: 80 },
    experience: { required: true, quantity: 6, quality: 75 },
    extracurricular: { required: false, quantity: 0, quality: 0 },
  });

  const handleTokenChange = (category, field, value) => {
    setTokenRequirements((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would submit the form data to the server
    alert("Job posted successfully!");
    router.push("/recruiter/dashboard");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-clash">Post a New Job</h1>
        <p className="text-muted-foreground font-satoshi">
          Create a new job listing with token requirements
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card className="border-2 border-border shadow-shadow">
            <CardHeader>
              <CardTitle className="font-clash">Basic Job Details</CardTitle>
              <CardDescription className="font-satoshi">
                Enter the basic information about the job
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="job-title" className="font-clash">
                    Job Title
                  </Label>
                  <Input
                    id="job-title"
                    placeholder="e.g., Frontend Developer"
                    required
                    className="border-2 border-border"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-type" className="font-clash">
                      Job Type
                    </Label>
                    <Select>
                      <SelectTrigger
                        id="job-type"
                        className="border-2 border-border"
                      >
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="font-clash">
                      Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="e.g., Remote, New York, NY"
                      required
                      className="border-2 border-border"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary-min" className="font-clash">
                      Salary Range (Min)
                    </Label>
                    <Input
                      id="salary-min"
                      type="number"
                      placeholder="e.g., 50000"
                      className="border-2 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary-max" className="font-clash">
                      Salary Range (Max)
                    </Label>
                    <Input
                      id="salary-max"
                      type="number"
                      placeholder="e.g., 80000"
                      className="border-2 border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline" className="font-clash">
                    Application Deadline
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    className="border-2 border-border"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border shadow-shadow">
            <CardHeader>
              <CardTitle className="font-clash">Job Description</CardTitle>
              <CardDescription className="font-satoshi">
                Provide detailed information about the job
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-clash">
                    Job Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the job role and responsibilities"
                    rows={5}
                    required
                    className="border-2 border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements" className="font-clash">
                    Requirements
                  </Label>
                  <Textarea
                    id="requirements"
                    placeholder="List the requirements for this position"
                    rows={5}
                    required
                    className="border-2 border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits" className="font-clash">
                    Benefits
                  </Label>
                  <Textarea
                    id="benefits"
                    placeholder="Describe the benefits offered with this position"
                    rows={3}
                    className="border-2 border-border"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border shadow-shadow">
            <CardHeader>
              <CardTitle className="font-clash">Token Requirements</CardTitle>
              <CardDescription className="font-satoshi">
                Define the token requirements for this job
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(tokenRequirements).map(([category, data]) => (
                  <div
                    key={category}
                    className="space-y-4 pb-4 border-b last:border-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`${category}-required`}
                          checked={data.required}
                          onChange={(e) =>
                            handleTokenChange(
                              category,
                              "required",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 rounded border-2 border-border"
                        />
                        <Label
                          htmlFor={`${category}-required`}
                          className="capitalize font-medium font-clash"
                        >
                          {category} Tokens
                        </Label>
                      </div>
                      {data.required && (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor:
                                category === "academic"
                                  ? "#ef4444"
                                  : category === "skills"
                                  ? "#3b82f6"
                                  : category === "experience"
                                  ? "#22c55e"
                                  : "#eab308",
                              opacity: 0.5 + (data.quality / 100) * 0.5,
                            }}
                          >
                            <span className="text-white text-xs">
                              {data.quantity}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {data.required && (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label
                              htmlFor={`${category}-quantity`}
                              className="font-clash"
                            >
                              Quantity (1-10)
                            </Label>
                            <span className="text-sm font-satoshi">
                              {data.quantity}
                            </span>
                          </div>
                          <Slider
                            id={`${category}-quantity`}
                            min={1}
                            max={10}
                            step={1}
                            value={[data.quantity]}
                            onValueChange={(value) =>
                              handleTokenChange(category, "quantity", value[0])
                            }
                          />
                          <p className="text-xs text-muted-foreground font-satoshi">
                            Minimum number of tokens required in this category
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label
                              htmlFor={`${category}-quality`}
                              className="font-clash"
                            >
                              Quality (50-100%)
                            </Label>
                            <span className="text-sm font-satoshi">
                              {data.quality}%
                            </span>
                          </div>
                          <Slider
                            id={`${category}-quality`}
                            min={50}
                            max={100}
                            step={5}
                            value={[data.quality]}
                            onValueChange={(value) =>
                              handleTokenChange(category, "quality", value[0])
                            }
                          />
                          <p className="text-xs text-muted-foreground font-satoshi">
                            Minimum quality level required for tokens in this
                            category
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/recruiter/dashboard")}
              className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
            >
              Post Job
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
