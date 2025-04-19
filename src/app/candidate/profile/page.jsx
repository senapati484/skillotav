import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle } from "lucide-react"

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
        description: "Developing and maintaining web applications using React and Next.js.",
        verified: true,
      },
      {
        position: "Web Development Intern",
        company: "Digital Solutions",
        duration: "2021 - 2022",
        description: "Assisted in the development of client websites and internal tools.",
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
  }

  // Function to render verification badge
  const VerificationBadge = ({
    verified
  }) => {
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
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">View your personal information and credentials</p>
        </div>
        <Button asChild>
          <Link href="/candidate/profile/edit">Edit Profile</Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback className="text-4xl">JD</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-muted-foreground">Frontend Developer</p>
                <div className="w-full border-t my-4" />
                <div className="w-full space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Email:</span>
                    <span className="text-muted-foreground">{profile.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Phone:</span>
                    <span className="text-muted-foreground">{profile.phone}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Location:</span>
                    <span className="text-muted-foreground">{profile.location}</span>
                  </div>
                </div>
                <div className="w-full border-t my-4" />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={profile.linkedin} target="_blank">
                      LinkedIn
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={profile.github} target="_blank">
                      GitHub
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
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
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{profile.bio}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.education.map((edu, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{edu.degree}</h3>
                          <VerificationBadge verified={edu.verified} />
                        </div>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.experience.map((exp, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{exp.position}</h3>
                          <VerificationBadge verified={exp.verified} />
                        </div>
                        <p className="text-muted-foreground">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">{exp.duration}</p>
                        <p className="text-sm mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                        <div>
                          <h3 className="font-medium">{skill.name}</h3>
                          <p className="text-sm text-muted-foreground">{skill.level}</p>
                        </div>
                        <VerificationBadge verified={skill.verified} />
                      </div>
                    ))}
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
