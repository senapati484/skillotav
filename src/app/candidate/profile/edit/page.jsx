"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/provider/AuthProvider";
import { ref, get, set } from "firebase/database";
import { db } from "@/lib/firebase";
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
import { toast } from "sonner";

export default function EditProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: {
      firstName: user?.displayName?.split(" ")[0] || "",
      lastName: user?.displayName?.split(" ")[1] || "",
    },
    email: user?.email || "",
    phone: "",
    location: "",
    title: "Frontend Developer",
    bio: "",
    links: {
      linkedin: "",
      github: "",
      portfolio: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid && !initialDataLoaded) {
        try {
          const userRef = ref(db, `users/${user.uid}/profile`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.val();
            setFormData((prevData) => ({
              ...prevData,
              ...userData,
              email: user.email, // Keep email from auth
              name: {
                firstName: user.displayName?.split(" ")[0] || "",
                lastName: user.displayName?.split(" ")[1] || "",
              },
            }));
          }
          setInitialDataLoaded(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load profile data");
        }
      }
    };

    fetchUserData();
  }, [user, initialDataLoaded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("name.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          [field]: value,
        },
      }));
    } else if (name.startsWith("links.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        links: {
          ...prev.links,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userRef = ref(db, `users/${user.uid}/profile`);
      await set(userRef, {
        ...formData,
        updatedAt: new Date().toISOString(),
      });

      toast.success("Profile updated successfully");
      router.push("/candidate/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!initialDataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-clash font-bold">Edit Profile</h1>
          <p className="text-muted-foreground font-satoshi">
            Update your personal information
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit}>
          <Card className="border-2 border-border shadow-shadow">
            <CardHeader>
              <CardTitle className="font-clash">Personal Information</CardTitle>
              <CardDescription className="font-satoshi">
                Your basic profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-clash">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="name.firstName"
                    value={formData.name.firstName}
                    onChange={handleChange}
                    className="border-2 border-border"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-clash">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="name.lastName"
                    value={formData.name.lastName}
                    onChange={handleChange}
                    className="border-2 border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-clash">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-2 border-border"
                  required
                  disabled
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-clash">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-2 border-border"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="font-clash">
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border-2 border-border"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="font-clash">
                  Professional Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border-2 border-border"
                  placeholder="e.g., Frontend Developer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="font-clash">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="border-2 border-border min-h-[100px]"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border shadow-shadow mt-6">
            <CardHeader>
              <CardTitle className="font-clash">Social Links</CardTitle>
              <CardDescription className="font-satoshi">
                Your professional social media profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="font-clash">
                  LinkedIn Profile
                </Label>
                <Input
                  id="linkedin"
                  name="links.linkedin"
                  type="url"
                  value={formData.links.linkedin}
                  onChange={handleChange}
                  className="border-2 border-border"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github" className="font-clash">
                  GitHub Profile
                </Label>
                <Input
                  id="github"
                  name="links.github"
                  type="url"
                  value={formData.links.github}
                  onChange={handleChange}
                  className="border-2 border-border"
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio" className="font-clash">
                  Portfolio Website
                </Label>
                <Input
                  id="portfolio"
                  name="links.portfolio"
                  type="url"
                  value={formData.links.portfolio}
                  onChange={handleChange}
                  className="border-2 border-border"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
