"use client";
import { useAuth } from "@/components/provider/AuthProvider";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle } from "lucide-react";
import { TokenGrid } from "@/components/token-display";

export default function CandidateProfilePage() {
  const { user } = useAuth();

  // Sample profile data - keeping other data static for now
  const profile = {
    firstName: user?.displayName?.split(" ")[0] || "",
    lastName: user?.displayName?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "+91 8653420095", // This will remain static for now
    location: "Amta Howrah West Bengal", // This will remain static for now
    bio: "Frontend developer with 3 years of experience specializing in React and Next.js. Passionate about creating intuitive user interfaces and accessible web applications.",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/senapati484",
    portfolio: "https://johndoe.dev",
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Technology",
        year: "2018 - 2022",
        verified: true,
      },
    ],
    experience: [
      {
        position: "Frontend Developer",
        company: "TechStart Inc.",
        duration: "2022 - Present",
        description:
          "Developing and maintaining web applications using React and Next.js.",
        verified: true,
      },
      {
        position: "Web Development Intern",
        company: "Digital Solutions",
        duration: "2021 - 2022",
        description:
          "Assisted in the development of client websites and internal tools.",
        verified: false,
      },
    ],
    skills: [
      { name: "React", level: "Advanced", verified: true },
      { name: "Next.js", level: "Intermediate", verified: true },
      { name: "TypeScript", level: "Intermediate", verified: true },
      { name: "CSS/SCSS", level: "Advanced", verified: false },
      { name: "Node.js", level: "Beginner", verified: false },
    ],
    extracurricular: [
      {
        title: "Student Council President",
        organization: "University of Technology",
        duration: "2021 - 2022",
        description: "Led student initiatives and organized campus-wide events",
        verified: true,
        tokenValue: 3,
      },
      {
        title: "Volunteer Teaching Assistant",
        organization: "Code for Kids",
        duration: "2020 - 2021",
        description:
          "Taught basic programming concepts to underprivileged children",
        verified: true,
        tokenValue: 2,
      },
      {
        title: "Tech Community Lead",
        organization: "Local Developer Meetup",
        duration: "2022 - Present",
        description: "Organizing monthly tech talks and workshops",
        verified: false,
        tokenValue: 2,
      },
    ],
  };

  // Token data from tokens page
  const allTokens = [
    {
      category: "Academic",
      color: "#ef4444",
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
      color: "#3b82f6",
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
      color: "#22c55e",
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
      color: "#eab308",
      quantity: 5,
      quality: 70,
      microTokens: [
        { name: "Volunteering", value: 75 },
        { name: "Leadership", value: 65 },
        { name: "Sports", value: 70 },
      ],
    },
  ];

  // Token filtering function
  const getFilteredTokens = (category) => {
    if (category === "all") return allTokens;
    return allTokens.filter(
      (token) => token.category.toLowerCase() === category.toLowerCase()
    );
  };

  // Function to render verification badge
  const VerificationBadge = ({ verified }) => {
    return verified ? (
      <div className="flex items-center text-green-600">
        <CheckCircle2 className="h-4 w-4 mr-1" />
        <span className="text-xs">Verified</span>
      </div>
    ) : (
      <div className="flex items-center text-amber-600">
        <XCircle className="h-4 w-4 mr-1" />
        <span className="text-xs">Pending</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-clash font-bold">My Profile</h1>
          <p className="text-muted-foreground font-satoshi">
            View your personal information and credentials
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
            asChild
            variant="nuetral"
          >
            <Link href="/candidate/profile/edit">Edit Profile</Link>
          </Button>
          <Button
            className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
            asChild
          >
            <Link href="/candidate/profile/edit">Connect Wallet</Link>
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="border-2 border-border shadow-shadow sticky top-6">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-32 h-32 mb-4 border-2 border-border">
                  <AvatarImage
                    src={user?.photoURL || "/placeholder.svg"}
                    alt="Profile"
                  />
                  <AvatarFallback className="text-4xl font-clash">
                    {`${profile.firstName?.[0] || ""}${
                      profile.lastName?.[0] || ""
                    }`}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-clash font-bold">
                  {user?.displayName || "Loading..."}
                </h2>
                <p className="text-muted-foreground font-satoshi">
                  Frontend Developer
                </p>
                <div className="w-full border-t-2 border-border my-4" />
                <div className="w-full space-y-2 text-sm font-satoshi">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Email:</span>
                    <span className="text-muted-foreground">
                      {user?.email || "Loading..."}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Phone:</span>
                    <span className="text-muted-foreground">
                      {profile.phone}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Location:</span>
                    <span className="text-muted-foreground">
                      {profile.location}
                    </span>
                  </div>
                </div>
                <div className="w-full border-t-2 border-border my-4" />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                    asChild
                  >
                    <Link href={profile.linkedin} target="_blank">
                      LinkedIn
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                    asChild
                  >
                    <Link href={profile.github} target="_blank">
                      GitHub
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                    asChild
                  >
                    <Link href={profile.portfolio} target="_blank">
                      Portfolio
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="grid grid-cols-5 w-full border-2 border-border">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="extracurricular">Extracurricular</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <Card className="border-2 border-border shadow-shadow">
                <CardHeader>
                  <CardTitle className="font-clash">About Me</CardTitle>
                </CardHeader>
                <CardContent className="font-satoshi">
                  <p>{profile.bio}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="mt-6">
              <Card className="border-2 border-border shadow-shadow">
                <CardHeader>
                  <CardTitle className="font-clash">Education</CardTitle>
                  <CardDescription className="font-satoshi">
                    Your academic qualifications and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Academic Token Summary */}
                    <div className="p-4 border-2 border-border rounded-base bg-muted/10">
                      <h3 className="font-clash font-semibold mb-4">
                        Academic Tokens
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-10 h-10 rounded-base flex items-center justify-center border-2 border-border"
                            style={{
                              backgroundColor: "#ef4444",
                              opacity: 0.5 + (85 / 100) * 0.5,
                            }}
                          >
                            <span className="text-white font-bold">7</span>
                          </div>
                          <div>
                            <p className="font-clash font-medium">
                              Academic Score
                            </p>
                            <p className="text-sm text-muted-foreground font-satoshi">
                              85% Quality
                            </p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2">
                            {allTokens
                              .find((t) => t.category === "Academic")
                              ?.microTokens.map((token, i) => (
                                <div
                                  key={i}
                                  className="text-xs px-2 py-1 rounded-full bg-main/10 text-main border border-border"
                                >
                                  {token.name}: {token.value}%
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {profile.education.map((edu, index) => (
                        <div
                          key={index}
                          className="border-b-2 border-border pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between">
                            <h3 className="font-clash font-semibold">
                              {edu.degree}
                            </h3>
                            <VerificationBadge verified={edu.verified} />
                          </div>
                          <p className="text-muted-foreground font-satoshi">
                            {edu.institution}
                          </p>
                          <p className="text-sm text-muted-foreground font-satoshi">
                            {edu.year}
                          </p>
                          <div className="mt-2">
                            <p className="text-xs text-main">
                              Token Value: +3 Academic Points
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="mt-6">
              <Card className="border-2 border-border shadow-shadow">
                <CardHeader>
                  <CardTitle className="font-clash">Work Experience</CardTitle>
                  <CardDescription className="font-satoshi">
                    Your professional experience and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Experience Token Summary */}
                    <div className="p-4 border-2 border-border rounded-base bg-muted/10">
                      <h3 className="font-clash font-semibold mb-4">
                        Experience Tokens
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-10 h-10 rounded-base flex items-center justify-center border-2 border-border"
                            style={{
                              backgroundColor: "#22c55e",
                              opacity: 0.5 + (80 / 100) * 0.5,
                            }}
                          >
                            <span className="text-white font-bold">6</span>
                          </div>
                          <div>
                            <p className="font-clash font-medium">
                              Experience Score
                            </p>
                            <p className="text-sm text-muted-foreground font-satoshi">
                              80% Quality
                            </p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2">
                            {allTokens
                              .find((t) => t.category === "Experience")
                              ?.microTokens.map((token, i) => (
                                <div
                                  key={i}
                                  className="text-xs px-2 py-1 rounded-full bg-main/10 text-main border border-border"
                                >
                                  {token.name}: {token.value}%
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {profile.experience.map((exp, index) => (
                        <div
                          key={index}
                          className="border-b-2 border-border pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between">
                            <h3 className="font-clash font-semibold">
                              {exp.position}
                            </h3>
                            <VerificationBadge verified={exp.verified} />
                          </div>
                          <p className="text-muted-foreground font-satoshi">
                            {exp.company}
                          </p>
                          <p className="text-sm text-muted-foreground font-satoshi">
                            {exp.duration}
                          </p>
                          <p className="text-sm mt-2 font-satoshi">
                            {exp.description}
                          </p>
                          <div className="mt-2">
                            <p className="text-xs text-main">
                              Token Value: +2 Experience Points
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="mt-6">
              <Card className="border-2 border-border shadow-shadow">
                <CardHeader>
                  <CardTitle className="font-clash">Skills</CardTitle>
                  <CardDescription className="font-satoshi">
                    Your technical and professional skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Skills Token Summary */}
                    <div className="p-4 border-2 border-border rounded-base bg-muted/10">
                      <h3 className="font-clash font-semibold mb-4">
                        Skills Tokens
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-10 h-10 rounded-base flex items-center justify-center border-2 border-border"
                            style={{
                              backgroundColor: "#3b82f6",
                              opacity: 0.5 + (75 / 100) * 0.5,
                            }}
                          >
                            <span className="text-white font-bold">8</span>
                          </div>
                          <div>
                            <p className="font-clash font-medium">
                              Skills Score
                            </p>
                            <p className="text-sm text-muted-foreground font-satoshi">
                              75% Quality
                            </p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2">
                            {allTokens
                              .find((t) => t.category === "Skills")
                              ?.microTokens.map((token, i) => (
                                <div
                                  key={i}
                                  className="text-xs px-2 py-1 rounded-full bg-main/10 text-main border border-border"
                                >
                                  {token.name}: {token.value}%
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {profile.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center border-b-2 border-border pb-3 last:border-0 last:pb-0"
                        >
                          <div>
                            <h3 className="font-medium font-clash">
                              {skill.name}
                            </h3>
                            <p className="text-sm text-muted-foreground font-satoshi">
                              {skill.level}
                            </p>
                            <div className="mt-1">
                              <p className="text-xs text-main">
                                Token Value: +
                                {skill.level === "Advanced"
                                  ? "3"
                                  : skill.level === "Intermediate"
                                  ? "2"
                                  : "1"}{" "}
                                Skill Points
                              </p>
                            </div>
                          </div>
                          <VerificationBadge verified={skill.verified} />
                        </div>
                      ))}
                    </div>
                  </div>
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
                    Your leadership and community involvement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Extracurricular Token Summary */}
                    <div className="p-4 border-2 border-border rounded-base bg-muted/10">
                      <h3 className="font-clash font-semibold mb-4">
                        Extracurricular Tokens
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-10 h-10 rounded-base flex items-center justify-center border-2 border-border"
                            style={{
                              backgroundColor: "#eab308",
                              opacity: 0.5 + (70 / 100) * 0.5,
                            }}
                          >
                            <span className="text-white font-bold">5</span>
                          </div>
                          <div>
                            <p className="font-clash font-medium">
                              Activity Score
                            </p>
                            <p className="text-sm text-muted-foreground font-satoshi">
                              70% Quality
                            </p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2">
                            {allTokens
                              .find((t) => t.category === "Extracurricular")
                              ?.microTokens.map((token, i) => (
                                <div
                                  key={i}
                                  className="text-xs px-2 py-1 rounded-full bg-main/10 text-main border border-border"
                                >
                                  {token.name}: {token.value}%
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Extracurricular Activities List */}
                    <div className="space-y-4">
                      {profile.extracurricular.map((activity, index) => (
                        <div
                          key={index}
                          className="border-b-2 border-border pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between">
                            <h3 className="font-clash font-semibold">
                              {activity.title}
                            </h3>
                            <VerificationBadge verified={activity.verified} />
                          </div>
                          <p className="text-muted-foreground font-satoshi">
                            {activity.organization}
                          </p>
                          <p className="text-sm text-muted-foreground font-satoshi">
                            {activity.duration}
                          </p>
                          <p className="text-sm mt-2 font-satoshi">
                            {activity.description}
                          </p>
                          <div className="mt-2">
                            <p className="text-xs text-main">
                              Token Value: +{activity.tokenValue} Activity
                              Points
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
