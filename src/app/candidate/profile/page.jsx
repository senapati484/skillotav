"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/provider/AuthProvider";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
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
  const [credentials, setCredentials] = useState({
    education: [],
    experience: [],
    skills: [],
    extracurricular: [],
  });
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    bio: "",
    links: {
      linkedin: "",
      github: "",
      portfolio: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [tokenStats, setTokenStats] = useState({
    academic: { quantity: 0, quality: 0, microTokens: [] },
    skills: { quantity: 0, quality: 0, microTokens: [] },
    experience: { quantity: 0, quality: 0, microTokens: [] },
    extracurricular: { quantity: 0, quality: 0, microTokens: [] },
  });

  useEffect(() => {
    if (user) {
      // Fetch user profile data
      const userProfileRef = ref(db, `users/${user.uid}/profile`);
      const unsubscribeProfile = onValue(userProfileRef, (snapshot) => {
        if (snapshot.exists()) {
          const profileData = snapshot.val();
          setUserProfile(profileData);
        }
      });

      // Fetch credentials data
      const credentialsRef = ref(db, `credentials/${user.uid}`);
      const unsubscribeCredentials = onValue(credentialsRef, (snapshot) => {
        if (snapshot.exists()) {
          const credentialsData = snapshot.val();
          const formattedCredentials = {
            education: [],
            experience: [],
            skills: [],
            extracurricular: [],
          };

          // Calculate token statistics
          const stats = {
            academic: { quantity: 0, quality: 0, microTokens: [] },
            skills: { quantity: 0, quality: 0, microTokens: [] },
            experience: { quantity: 0, quality: 0, microTokens: [] },
            extracurricular: { quantity: 0, quality: 0, microTokens: [] },
          };

          // Convert Firebase object to arrays and calculate token stats
          Object.values(credentialsData).forEach((cred) => {
            switch (cred.type) {
              case "academic":
                formattedCredentials.education.push({
                  degree: cred.title,
                  institution: cred.organization,
                  year: `${new Date(cred.startDate).getFullYear()} - ${
                    cred.endDate
                      ? new Date(cred.endDate).getFullYear()
                      : "Present"
                  }`,
                  verified: cred.status === "verified",
                });
                if (cred.status === "verified") {
                  stats.academic.quantity++;
                  // Calculate quality based on grade if available
                  const qualityScore = cred.grade
                    ? calculateGradeQuality(cred.grade)
                    : 85;
                  stats.academic.quality =
                    (stats.academic.quality * (stats.academic.quantity - 1) +
                      qualityScore) /
                    stats.academic.quantity;
                  stats.academic.microTokens.push({
                    name: cred.title,
                    value: qualityScore,
                  });
                }
                break;

              case "experience":
                formattedCredentials.experience.push({
                  position: cred.title,
                  company: cred.organization,
                  duration: `${new Date(cred.startDate).getFullYear()} - ${
                    cred.endDate
                      ? new Date(cred.endDate).getFullYear()
                      : "Present"
                  }`,
                  description: cred.description,
                  verified: cred.status === "verified",
                });
                if (cred.status === "verified") {
                  stats.experience.quantity++;
                  const expQuality = calculateExperienceQuality(cred);
                  stats.experience.quality =
                    (stats.experience.quality *
                      (stats.experience.quantity - 1) +
                      expQuality) /
                    stats.experience.quantity;
                  stats.experience.microTokens.push({
                    name: cred.title,
                    value: expQuality,
                  });
                }
                break;

              case "skills":
                formattedCredentials.skills.push({
                  name: cred.title,
                  level: cred.proficiency,
                  verified: cred.status === "verified",
                });
                if (cred.status === "verified") {
                  stats.skills.quantity++;
                  const skillQuality = calculateSkillQuality(cred.proficiency);
                  stats.skills.quality =
                    (stats.skills.quality * (stats.skills.quantity - 1) +
                      skillQuality) /
                    stats.skills.quantity;
                  stats.skills.microTokens.push({
                    name: cred.title,
                    value: skillQuality,
                  });
                }
                break;

              case "extracurricular":
                formattedCredentials.extracurricular.push({
                  title: cred.title,
                  organization: cred.organization,
                  duration: `${new Date(cred.startDate).getFullYear()} - ${
                    cred.endDate
                      ? new Date(cred.endDate).getFullYear()
                      : "Present"
                  }`,
                  description: cred.description,
                  verified: cred.status === "verified",
                  tokenValue: calculateActivityTokenValue(cred),
                });
                if (cred.status === "verified") {
                  stats.extracurricular.quantity++;
                  const activityQuality = calculateActivityQuality(cred);
                  stats.extracurricular.quality =
                    (stats.extracurricular.quality *
                      (stats.extracurricular.quantity - 1) +
                      activityQuality) /
                    stats.extracurricular.quantity;
                  stats.extracurricular.microTokens.push({
                    name: cred.title,
                    value: activityQuality,
                  });
                }
                break;
            }
          });

          setCredentials(formattedCredentials);
          setTokenStats(stats);
        }
        setLoading(false);
      });

      return () => {
        unsubscribeProfile();
        unsubscribeCredentials();
      };
    }
  }, [user]);

  // Token calculation helper functions
  const calculateGradeQuality = (grade) => {
    // Convert different grade formats to a 0-100 scale
    if (typeof grade === "string") {
      if (grade.includes("/")) {
        const [score, total] = grade.split("/").map(Number);
        return (score / total) * 100;
      }
      // Add more grade format conversions as needed
      return 85; // Default for verified credentials
    }
    return 85;
  };

  const calculateExperienceQuality = (exp) => {
    let quality = 80; // Base quality for verified experience

    // Add bonuses based on various factors
    if (exp.achievements) quality += 10;
    if (exp.referenceContact) quality += 5;

    return Math.min(quality, 100);
  };

  const calculateSkillQuality = (level) => {
    switch (level?.toLowerCase()) {
      case "expert":
        return 95;
      case "advanced":
        return 85;
      case "intermediate":
        return 75;
      case "beginner":
        return 65;
      default:
        return 70;
    }
  };

  const calculateActivityTokenValue = (activity) => {
    let value = 2; // Base token value

    // Adjust based on activity type and duration
    if (activity.activityType === "leadership") value++;
    if (activity.impact) value++;

    return value;
  };

  const calculateActivityQuality = (activity) => {
    let quality = 70; // Base quality

    // Add bonuses for various factors
    if (activity.impact) quality += 15;
    if (activity.description) quality += 10;

    return Math.min(quality, 100);
  };

  // Replace the static profile data with credentials from Firebase
  const profile = {
    ...userProfile,
    email: user?.email || "",
    ...credentials, // Spread the credentials from Firebase
  };

  // Replace the static allTokens with dynamic tokenStats
  const allTokens = [
    {
      category: "Academic",
      color: "#ef4444",
      quantity: tokenStats.academic.quantity,
      quality: Math.round(tokenStats.academic.quality),
      microTokens: tokenStats.academic.microTokens,
    },
    {
      category: "Skills",
      color: "#3b82f6",
      quantity: tokenStats.skills.quantity,
      quality: Math.round(tokenStats.skills.quality),
      microTokens: tokenStats.skills.microTokens,
    },
    {
      category: "Experience",
      color: "#22c55e",
      quantity: tokenStats.experience.quantity,
      quality: Math.round(tokenStats.experience.quality),
      microTokens: tokenStats.experience.microTokens,
    },
    {
      category: "Extracurricular",
      color: "#eab308",
      quantity: tokenStats.extracurricular.quantity,
      quality: Math.round(tokenStats.extracurricular.quality),
      microTokens: tokenStats.extracurricular.microTokens,
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
                    <Link href={profile.links?.linkedin || "#"} target="_blank">
                      LinkedIn
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                    asChild
                  >
                    <Link href={profile.links?.github || "#"} target="_blank">
                      GitHub
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                    asChild
                  >
                    <Link
                      href={profile.links?.portfolio || "#"}
                      target="_blank"
                    >
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
