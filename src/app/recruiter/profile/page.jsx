import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, MapPin, Globe, Mail, Phone } from "lucide-react"

export default function RecruiterProfilePage() {
  // Sample company profile data
  const profile = {
    companyName: "Acme Corp",
    industry: "Technology",
    size: "51-200",
    website: "https://acmecorp.com",
    location: "San Francisco, CA",
    description:
      "Acme Corp is a leading technology company specializing in innovative software solutions for businesses of all sizes. We are committed to creating products that help our customers succeed.",
    mission:
      "Our mission is to empower businesses with cutting-edge technology solutions that drive growth and efficiency.",
    contactName: "Jane Smith",
    contactEmail: "jane.smith@acmecorp.com",
    contactPhone: "+1 (555) 987-6543",
    founded: "2010",
    socialLinks: {
      linkedin: "https://linkedin.com/company/acmecorp",
      twitter: "https://twitter.com/acmecorp",
    },
    openPositions: 5,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Company Profile</h1>
          <p className="text-muted-foreground">View your company information and details</p>
        </div>
        <Button asChild>
          <Link href="/recruiter/profile/edit">Edit Profile</Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src="/placeholder.svg" alt="Company Logo" />
                  <AvatarFallback className="text-4xl">AC</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{profile.companyName}</h2>
                <p className="text-muted-foreground">{profile.industry}</p>
                <div className="w-full border-t my-4" />
                <div className="w-full space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>Company Size: {profile.size} employees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline">
                      {profile.website.replace("https://", "")}
                    </a>
                  </div>
                </div>
                <div className="w-full border-t my-4" />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={profile.socialLinks.linkedin} target="_blank">
                      LinkedIn
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={profile.socialLinks.twitter} target="_blank">
                      Twitter
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">{profile.contactName}</p>
                  <p className="text-sm text-muted-foreground">Primary Contact</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.contactPhone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="mission">Mission</TabsTrigger>
              <TabsTrigger value="jobs">Open Positions</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {profile.companyName}</CardTitle>
                  <CardDescription>Founded in {profile.founded}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{profile.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mission" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{profile.mission}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Open Positions</CardTitle>
                  <CardDescription>Currently hiring for {profile.openPositions} positions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="font-semibold">Frontend Developer</h3>
                      <p className="text-sm text-muted-foreground">Remote • Full-time</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm">18 applicants</p>
                        <Button size="sm" variant="outline" asChild>
                          <Link href="/recruiter/jobs/1">View</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="border-b pb-4">
                      <h3 className="font-semibold">UX Designer</h3>
                      <p className="text-sm text-muted-foreground">San Francisco, CA • Full-time</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm">12 applicants</p>
                        <Button size="sm" variant="outline" asChild>
                          <Link href="/recruiter/jobs/2">View</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="border-b pb-4">
                      <h3 className="font-semibold">Product Manager</h3>
                      <p className="text-sm text-muted-foreground">San Francisco, CA • Full-time</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm">8 applicants</p>
                        <Button size="sm" variant="outline" asChild>
                          <Link href="/recruiter/jobs/3">View</Link>
                        </Button>
                      </div>
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
