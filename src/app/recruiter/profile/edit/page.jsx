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

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    size: "",
    website: "",
    location: "",
    description: "",
    mission: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    founded: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
    },
    openPositions: 0,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user?.uid && !initialDataLoaded) {
        try {
          const profileRef = ref(db, `users/${user.uid}/profile`);
          const snapshot = await get(profileRef);

          if (snapshot.exists()) {
            const profileData = snapshot.val();
            setFormData((prevData) => ({
              ...prevData,
              ...profileData,
            }));
          }
          setInitialDataLoaded(true);
        } catch (error) {
          console.error("Error fetching profile data:", error);
          toast.error("Failed to load profile data");
        }
      }
    };

    fetchProfileData();
  }, [user, initialDataLoaded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
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
    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    setIsLoading(true);
    try {
      const profileRef = ref(db, `users/${user.uid}/profile`);
      await set(profileRef, formData);
      toast.success("Profile updated successfully");
      router.push("/recruiter/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Company Profile</h1>
        <p className="text-muted-foreground">
          Update your company information and details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>
              Basic information about your company
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="size">Company Size</Label>
                <Input
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="e.g., 51-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="founded">Founded Year</Label>
                <Input
                  id="founded"
                  name="founded"
                  value={formData.founded}
                  onChange={handleChange}
                  placeholder="e.g., 2010"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="openPositions">Open Positions</Label>
                <Input
                  id="openPositions"
                  name="openPositions"
                  type="number"
                  value={formData.openPositions}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Company Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mission">Company Mission</Label>
              <Textarea
                id="mission"
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Contact details for your company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>
              Your company's social media presence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                name="socialLinks.linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/company/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                name="socialLinks.twitter"
                value={formData.socialLinks.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/..."
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
