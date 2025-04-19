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
  // Sample profile data
  const profile = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Frontend developer with 3 years of experience specializing in React and Next.js. Passionate about creating intuitive user interfaces and accessible web applications.",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
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
        <Button
          className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
          asChild
        >
          <Link href="/candidate/profile/edit">Edit Profile</Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="border-2 border-border shadow-shadow sticky top-6">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-32 h-32 mb-4 border-2 border-border">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback className="text-4xl font-clash">
                    JD
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-clash font-bold">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-muted-foreground font-satoshi">
                  Frontend Developer
                </p>
                <div className="w-full border-t-2 border-border my-4" />
                <div className="w-full space-y-2 text-sm font-satoshi">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Email:</span>
                    <span className="text-muted-foreground">
                      {profile.email}
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
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
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
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 font-satoshi">
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
                        <p className="text-muted-foreground">
                          {edu.institution}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {edu.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="mt-6">
              <Card className="border-2 border-border shadow-shadow">
                <CardHeader>
                  <CardTitle className="font-clash">Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
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
                        <p className="text-muted-foreground">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">
                          {exp.duration}
                        </p>
                        <p className="text-sm mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="mt-6">
              <Card className="border-2 border-border shadow-shadow">
                <CardHeader>
                  <CardTitle className="font-clash">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-b-2 border-border pb-3 last:border-0 last:pb-0"
                      >
                        <div>
                          <h3 className="font-medium">{skill.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {skill.level}
                          </p>
                        </div>
                        <VerificationBadge verified={skill.verified} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokens" className="mt-6">
              <Card className="border-2 border-border shadow-shadow">
                <CardHeader>
                  <CardTitle className="font-clash">Your Tokens</CardTitle>
                  <CardDescription className="font-satoshi">
                    Visualize your verified credentials as tokens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Tabs defaultValue="all">
                      <TabsList className="grid grid-cols-5 w-full border-2 border-border">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="academic">Academic</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                        <TabsTrigger value="extracurricular">
                          Extracurricular
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="all" className="mt-6">
                        <TokenGrid tokens={getFilteredTokens("all")} />
                      </TabsContent>
                      <TabsContent value="academic" className="mt-6">
                        <TokenGrid tokens={getFilteredTokens("academic")} />
                      </TabsContent>
                      <TabsContent value="skills" className="mt-6">
                        <TokenGrid tokens={getFilteredTokens("skills")} />
                      </TabsContent>
                      <TabsContent value="experience" className="mt-6">
                        <TokenGrid tokens={getFilteredTokens("experience")} />
                      </TabsContent>
                      <TabsContent value="extracurricular" className="mt-6">
                        <TokenGrid
                          tokens={getFilteredTokens("extracurricular")}
                        />
                      </TabsContent>
                    </Tabs>

                    <Card className="border-2 border-border shadow-shadow">
                      <CardHeader>
                        <CardTitle className="font-clash">
                          Token Growth Over Time
                        </CardTitle>
                        <CardDescription className="font-satoshi">
                          Track how your tokens have grown as you add more
                          credentials
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
                              The number displayed on each token (1-10)
                              represents the overall score in that domain. For
                              example, a token with the number 7 indicates a 70%
                              score in that domain.
                            </p>
                          </div>
                          <div>
                            <h3 className="font-clash font-semibold mb-2">
                              Quality Dimension
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              The opacity/intensity of the token represents the
                              quality of your achievements. Higher opacity
                              indicates higher quality credentials in that
                              domain.
                            </p>
                          </div>
                          <div>
                            <h3 className="font-clash font-semibold mb-2">
                              Micro-tokens
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Each main token is comprised of micro-tokens
                              representing individual achievements. Click on a
                              token to see its constituent micro-tokens and
                              their individual scores.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
