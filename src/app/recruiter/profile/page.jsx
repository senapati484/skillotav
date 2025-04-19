import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, MapPin, Globe, Mail, Phone } from "lucide-react";

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
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-clash">Company Profile</h1>
          <p className="text-muted-foreground font-satoshi">
            View your company information and details
          </p>
        </div>
        <Button
          asChild
          className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
        >
          <Link href="/recruiter/profile/edit">Edit Profile</Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="border-2 border-border shadow-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-32 h-32 mb-4 border-2 border-border">
                  <AvatarImage src="/placeholder.svg" alt="Company Logo" />
                  <AvatarFallback className="text-4xl font-clash">
                    AC
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold font-clash">
                  {profile.companyName}
                </h2>
                <p className="text-muted-foreground font-satoshi">
                  {profile.industry}
                </p>
                <div className="w-full border-t my-4" />
                <div className="w-full space-y-3 text-sm font-satoshi">
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
                      className="text-primary hover:underline"
                    >
                      {profile.website.replace("https://", "")}
                    </a>
                  </div>
                </div>
                <div className="w-full border-t my-4" />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                  >
                    <Link href={profile.socialLinks.linkedin} target="_blank">
                      LinkedIn
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                  >
                    <Link href={profile.socialLinks.twitter} target="_blank">
                      Twitter
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 border-2 border-border shadow-shadow">
            <CardHeader>
              <CardTitle className="font-clash">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="font-satoshi">
              <div className="space-y-3">
                <div>
                  <p className="font-medium">{profile.contactName}</p>
                  <p className="text-sm text-muted-foreground">
                    Primary Contact
                  </p>
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
          <Tabs
            defaultValue="about"
            className="border-2 border-border rounded-lg p-1"
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="about" className="font-clash">
                About
              </TabsTrigger>
              <TabsTrigger value="mission" className="font-clash">
                Mission
              </TabsTrigger>
              <TabsTrigger value="jobs" className="font-clash">
                Open Positions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <Card className="border-2 border-border shadow-shadow">
                <CardHeader>
                  <CardTitle className="font-clash">
                    About {profile.companyName}
                  </CardTitle>
                  <CardDescription className="font-satoshi">
                    Founded in {profile.founded}
                  </CardDescription>
                </CardHeader>
                <CardContent className="font-satoshi">
                  <p>{profile.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mission" className="mt-6">
              <Card className="border-2 border-border shadow-shadow">
                <CardHeader>
                  <CardTitle className="font-clash">Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="font-satoshi">
                  <p>{profile.mission}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs" className="mt-6">
              <Card className="border-2 border-border shadow-shadow">
                <CardHeader>
                  <CardTitle className="font-clash">Open Positions</CardTitle>
                  <CardDescription className="font-satoshi">
                    Currently hiring for {profile.openPositions} positions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="font-clash font-semibold">
                        Frontend Developer
                      </h3>
                      <p className="text-sm text-muted-foreground font-satoshi">
                        Remote • Full-time
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm font-satoshi">18 applicants</p>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                        >
                          <Link href="/recruiter/jobs/1">View</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="border-b pb-4">
                      <h3 className="font-clash font-semibold">UX Designer</h3>
                      <p className="text-sm text-muted-foreground font-satoshi">
                        San Francisco, CA • Full-time
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm font-satoshi">12 applicants</p>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                        >
                          <Link href="/recruiter/jobs/2">View</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="border-b pb-4">
                      <h3 className="font-clash font-semibold">
                        Product Manager
                      </h3>
                      <p className="text-sm text-muted-foreground font-satoshi">
                        San Francisco, CA • Full-time
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm font-satoshi">8 applicants</p>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                        >
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
