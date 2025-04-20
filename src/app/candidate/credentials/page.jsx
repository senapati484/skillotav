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
import { useAuth } from "@/components/provider/AuthProvider";
import { ref, push, set } from "firebase/database";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

// Sample data - in a real app, this would come from an API
const pendingCredentials = [
  {
    id: 1,
    title: "Bachelor of Computer Science",
    issuer: "University of Technology",
  },
  {
    id: 2,
    title: "Advanced JavaScript Certificate",
    issuer: "Tech Academy",
  },
];

const categories = [
  {
    name: "Academic Qualifications",
    description: "Your verified degrees and certifications",
    credentials: [
      {
        id: 1,
        title: "Master of Business Administration",
        issuer: "Business School",
        date: "2023-12-15",
      },
      {
        id: 2,
        title: "Bachelor of Engineering",
        issuer: "Tech University",
        date: "2021-06-30",
      },
    ],
  },
  {
    name: "Professional Certifications",
    description: "Your industry certifications and achievements",
    credentials: [
      {
        id: 3,
        title: "Project Management Professional (PMP)",
        issuer: "PMI",
        date: "2024-01-20",
      },
      {
        id: 4,
        title: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023-11-10",
      },
    ],
  },
];

export default function CredentialsPage() {
  const [activeTab, setActiveTab] = useState("academic");
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to submit credentials");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData(e.target);
      const data = {
        type: activeTab,
        status: "pending",
        submittedAt: new Date().toISOString(),
        userId: user.uid,
        // Common fields
        title: formData.get(
          activeTab === "academic"
            ? "degree-type"
            : activeTab === "skills"
            ? "skill-name"
            : activeTab === "experience"
            ? "position"
            : "role"
        ),
        organization: formData.get(
          activeTab === "academic"
            ? "institution"
            : activeTab === "experience"
            ? "company"
            : "organization"
        ),
        startDate: formData.get(
          activeTab === "academic"
            ? "start-date"
            : activeTab === "experience"
            ? "exp-start-date"
            : "activity-start-date"
        ),
        endDate: formData.get(
          activeTab === "academic"
            ? "end-date"
            : activeTab === "experience"
            ? "exp-end-date"
            : "activity-end-date"
        ),
        description: formData.get(
          activeTab === "skills"
            ? "skill-description"
            : activeTab === "experience"
            ? "responsibilities"
            : "activity-description"
        ),

        // Specific fields based on credential type
        ...(activeTab === "academic" && {
          field: formData.get("field"),
          grade: formData.get("grade"),
        }),
        ...(activeTab === "skills" && {
          skillType: formData.get("skill-type"),
          proficiency: formData.get("proficiency"),
          projectLinks: formData.get("project-links"),
        }),
        ...(activeTab === "experience" && {
          achievements: formData.get("achievements"),
          referenceContact: {
            name: formData.get("reference-name"),
            email: formData.get("reference-email"),
          },
        }),
        ...(activeTab === "extracurricular" && {
          activityType: formData.get("activity-type"),
          impact: formData.get("impact"),
        }),
      };

      const credentialsRef = ref(db, `credentials/${user.uid}`);
      const newCredentialRef = push(credentialsRef);
      await set(newCredentialRef, data);

      toast.success("Credential submitted for verification!");
      e.target.reset();
    } catch (error) {
      console.error("Error submitting credential:", error);
      toast.error("Failed to submit credential");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-clash font-bold">My Credentials</h1>
          <p className="text-muted-foreground font-satoshi">
            View and manage your verified credentials
          </p>
        </div>
        <Button className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all">
          Add Credential
        </Button>
      </div>

      <Tabs
        defaultValue="academic"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-4 w-full border-2 border-border">
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="extracurricular">Extracurricular</TabsTrigger>
        </TabsList>

        <TabsContent value="academic" className="mt-6">
          <Card className="border-2 border-border shadow-shadow">
            <CardHeader>
              <CardTitle className="font-clash">Academic Credentials</CardTitle>
              <CardDescription className="font-satoshi">
                Add your degrees, courses, and certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="institution" className="font-clash">
                        Institution
                      </Label>
                      <Input
                        id="institution"
                        placeholder="University or School Name"
                        className="border-2 border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="degree-type" className="font-clash">
                        Degree Type
                      </Label>
                      <Select>
                        <SelectTrigger
                          id="degree-type"
                          className="border-2 border-border"
                        >
                          <SelectValue placeholder="Select degree type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bachelor">
                            Bachelor's Degree
                          </SelectItem>
                          <SelectItem value="master">
                            Master's Degree
                          </SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                          <SelectItem value="certificate">
                            Certificate
                          </SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="course">Course</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="field" className="font-clash">
                      Field of Study
                    </Label>
                    <Input
                      id="field"
                      placeholder="e.g., Computer Science, Business"
                      className="border-2 border-border"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date" className="font-clash">
                        Start Date
                      </Label>
                      <Input
                        id="start-date"
                        type="date"
                        className="border-2 border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date" className="font-clash">
                        End Date
                      </Label>
                      <Input
                        id="end-date"
                        type="date"
                        className="border-2 border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grade" className="font-clash">
                      Grade/GPA
                    </Label>
                    <Input
                      id="grade"
                      placeholder="e.g., 3.8/4.0, First Class"
                      className="border-2 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="document" className="font-clash">
                      Upload Certificate/Transcript
                    </Label>
                    <Input
                      id="document"
                      type="file"
                      className="border-2 border-border"
                    />
                    <p className="text-xs text-muted-foreground font-satoshi mt-1">
                      Accepted formats: PDF, JPG, PNG (max 5MB)
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                >
                  Submit for Verification
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <Card className="border-2 border-border shadow-shadow">
            <CardHeader>
              <CardTitle className="font-clash">Skills Credentials</CardTitle>
              <CardDescription className="font-satoshi">
                Add your technical and soft skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="skill-name" className="font-clash">
                      Skill Name
                    </Label>
                    <Input
                      id="skill-name"
                      placeholder="e.g., JavaScript, Project Management"
                      className="border-2 border-border"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="skill-type" className="font-clash">
                        Skill Type
                      </Label>
                      <Select>
                        <SelectTrigger
                          id="skill-type"
                          className="border-2 border-border"
                        >
                          <SelectValue placeholder="Select skill type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">
                            Technical/Hard Skill
                          </SelectItem>
                          <SelectItem value="soft">Soft Skill</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proficiency" className="font-clash">
                        Proficiency Level
                      </Label>
                      <Select>
                        <SelectTrigger
                          id="proficiency"
                          className="border-2 border-border"
                        >
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-links" className="font-clash">
                      Project Links
                    </Label>
                    <Input
                      id="project-links"
                      placeholder="e.g., https://github.com/yourusername/project"
                      className="border-2 border-border"
                    />
                    <p className="text-xs text-muted-foreground font-satoshi mt-1">
                      Add links to projects that demonstrate this skill
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skill-description" className="font-clash">
                      Description
                    </Label>
                    <Textarea
                      id="skill-description"
                      placeholder="Describe how you've used this skill and your achievements"
                      rows={4}
                      className="border-2 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skill-certificate" className="font-clash">
                      Upload Certification (if available)
                    </Label>
                    <Input
                      id="skill-certificate"
                      type="file"
                      className="border-2 border-border"
                    />
                    <p className="text-xs text-muted-foreground font-satoshi mt-1">
                      Accepted formats: PDF, JPG, PNG (max 5MB)
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                >
                  Submit for Verification
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="mt-6">
          <Card className="border-2 border-border shadow-shadow">
            <CardHeader>
              <CardTitle className="font-clash">
                Experience Credentials
              </CardTitle>
              <CardDescription className="font-satoshi">
                Add your work experience and professional achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="font-clash">
                        Company/Organization
                      </Label>
                      <Input
                        id="company"
                        placeholder="Company Name"
                        className="border-2 border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position" className="font-clash">
                        Position/Title
                      </Label>
                      <Input
                        id="position"
                        placeholder="e.g., Software Engineer"
                        className="border-2 border-border"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="exp-start-date" className="font-clash">
                        Start Date
                      </Label>
                      <Input
                        id="exp-start-date"
                        type="date"
                        className="border-2 border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exp-end-date" className="font-clash">
                        End Date
                      </Label>
                      <Input
                        id="exp-end-date"
                        type="date"
                        className="border-2 border-border"
                      />
                      <div className="flex items-center mt-1">
                        <input
                          type="checkbox"
                          id="current-position"
                          className="mr-2"
                        />
                        <label
                          htmlFor="current-position"
                          className="text-xs text-muted-foreground font-satoshi"
                        >
                          I currently work here
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="responsibilities" className="font-clash">
                      Responsibilities
                    </Label>
                    <Textarea
                      id="responsibilities"
                      placeholder="Describe your key responsibilities in this role"
                      rows={3}
                      className="border-2 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="achievements" className="font-clash">
                      Achievements
                    </Label>
                    <Textarea
                      id="achievements"
                      placeholder="Describe your key achievements and impact in this role"
                      rows={3}
                      className="border-2 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-clash">Reference Contact</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Reference Name"
                        className="border-2 border-border"
                      />
                      <Input
                        placeholder="Reference Email"
                        type="email"
                        className="border-2 border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exp-document" className="font-clash">
                      Upload Supporting Document
                    </Label>
                    <Input
                      id="exp-document"
                      type="file"
                      className="border-2 border-border"
                    />
                    <p className="text-xs text-muted-foreground font-satoshi mt-1">
                      Accepted formats: PDF, JPG, PNG (max 5MB)
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                >
                  Submit for Verification
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extracurricular" className="mt-6">
          <Card className="border-2 border-border shadow-shadow">
            <CardHeader>
              <CardTitle className="font-clash">
                Extracurricular Activities
              </CardTitle>
              <CardDescription className="font-satoshi">
                Add your volunteer work, leadership roles, and other activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="activity-type" className="font-clash">
                        Activity Type
                      </Label>
                      <Select>
                        <SelectTrigger
                          id="activity-type"
                          className="border-2 border-border"
                        >
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="volunteer">
                            Volunteer Work
                          </SelectItem>
                          <SelectItem value="leadership">
                            Leadership Role
                          </SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="club">Club/Society</SelectItem>
                          <SelectItem value="community">
                            Community Service
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization" className="font-clash">
                        Organization
                      </Label>
                      <Input
                        id="organization"
                        placeholder="Organization Name"
                        className="border-2 border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="font-clash">
                      Your Role
                    </Label>
                    <Input
                      id="role"
                      placeholder="e.g., Volunteer, Team Captain, President"
                      className="border-2 border-border"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="activity-start-date"
                        className="font-clash"
                      >
                        Start Date
                      </Label>
                      <Input
                        id="activity-start-date"
                        type="date"
                        className="border-2 border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="activity-end-date" className="font-clash">
                        End Date
                      </Label>
                      <Input
                        id="activity-end-date"
                        type="date"
                        className="border-2 border-border"
                      />
                      <div className="flex items-center mt-1">
                        <input
                          type="checkbox"
                          id="current-activity"
                          className="mr-2"
                        />
                        <label
                          htmlFor="current-activity"
                          className="text-xs text-muted-foreground font-satoshi"
                        >
                          This is ongoing
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="activity-description"
                      className="font-clash"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="activity-description"
                      placeholder="Describe the activity and your involvement"
                      rows={3}
                      className="border-2 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="impact" className="font-clash">
                      Impact & Outcomes
                    </Label>
                    <Textarea
                      id="impact"
                      placeholder="Describe the impact of your involvement and any outcomes achieved"
                      rows={3}
                      className="border-2 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activity-document" className="font-clash">
                      Upload Evidence/Certificate
                    </Label>
                    <Input
                      id="activity-document"
                      type="file"
                      className="border-2 border-border"
                    />
                    <p className="text-xs text-muted-foreground font-satoshi mt-1">
                      Accepted formats: PDF, JPG, PNG (max 5MB)
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                >
                  Submit for Verification
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-2 border-border shadow-shadow">
        <CardHeader>
          <CardTitle className="font-clash">Pending Verifications</CardTitle>
          <CardDescription className="font-satoshi">
            Credentials waiting for verification from issuers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingCredentials.map((cred) => (
              <div
                key={cred.id}
                className="flex items-center justify-between p-4 border-2 border-border rounded-base"
              >
                <div>
                  <h3 className="font-clash font-semibold">{cred.title}</h3>
                  <p className="text-sm text-muted-foreground font-satoshi">
                    {cred.issuer}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-amber-600">Pending</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                  >
                    Check Status
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Card
            key={category.name}
            className="border-2 border-border shadow-shadow"
          >
            <CardHeader>
              <CardTitle className="font-clash">{category.name}</CardTitle>
              <CardDescription className="font-satoshi">
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.credentials.map((cred) => (
                  <div
                    key={cred.id}
                    className="p-4 border-2 border-border rounded-base cursor-pointer hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-clash font-semibold">
                          {cred.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-satoshi">
                          {cred.issuer}
                        </p>
                        <p className="text-sm text-muted-foreground font-satoshi">
                          Issued: {cred.date}
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-base px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                        Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
