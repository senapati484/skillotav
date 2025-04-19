"use client";
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CredentialsPage() {
  const [activeTab, setActiveTab] = useState("academic")

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, we would submit the form data to the server
    alert("Credential submitted for verification!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Submit Credentials</h1>
        <p className="text-muted-foreground">Add your credentials for verification and tokenization</p>
      </div>
      <Tabs defaultValue="academic" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="extracurricular">Extracurricular</TabsTrigger>
        </TabsList>

        <TabsContent value="academic" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Credentials</CardTitle>
              <CardDescription>Add your degrees, courses, and certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="institution">Institution</Label>
                      <Input id="institution" placeholder="University or School Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="degree-type">Degree Type</Label>
                      <Select>
                        <SelectTrigger id="degree-type">
                          <SelectValue placeholder="Select degree type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                          <SelectItem value="certificate">Certificate</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="course">Course</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="field">Field of Study</Label>
                    <Input id="field" placeholder="e.g., Computer Science, Business" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input id="end-date" type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade/GPA</Label>
                    <Input id="grade" placeholder="e.g., 3.8/4.0, First Class" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="document">Upload Certificate/Transcript</Label>
                    <Input id="document" type="file" />
                    <p className="text-xs text-muted-foreground mt-1">Accepted formats: PDF, JPG, PNG (max 5MB)</p>
                  </div>
                </div>

                <Button type="submit">Submit for Verification</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills Credentials</CardTitle>
              <CardDescription>Add your technical and soft skills</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="skill-name">Skill Name</Label>
                    <Input id="skill-name" placeholder="e.g., JavaScript, Project Management" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="skill-type">Skill Type</Label>
                      <Select>
                        <SelectTrigger id="skill-type">
                          <SelectValue placeholder="Select skill type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical/Hard Skill</SelectItem>
                          <SelectItem value="soft">Soft Skill</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proficiency">Proficiency Level</Label>
                      <Select>
                        <SelectTrigger id="proficiency">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-links">Project Links</Label>
                    <Input
                      id="project-links"
                      placeholder="e.g., https://github.com/yourusername/project" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Add links to projects that demonstrate this skill
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skill-description">Description</Label>
                    <Textarea
                      id="skill-description"
                      placeholder="Describe how you've used this skill and your achievements"
                      rows={4} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skill-certificate">Upload Certification (if available)</Label>
                    <Input id="skill-certificate" type="file" />
                    <p className="text-xs text-muted-foreground mt-1">Accepted formats: PDF, JPG, PNG (max 5MB)</p>
                  </div>
                </div>

                <Button type="submit">Submit for Verification</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Experience Credentials</CardTitle>
              <CardDescription>Add your work experience and professional achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input id="company" placeholder="Company Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position/Title</Label>
                      <Input id="position" placeholder="e.g., Software Engineer" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="exp-start-date">Start Date</Label>
                      <Input id="exp-start-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exp-end-date">End Date</Label>
                      <Input id="exp-end-date" type="date" />
                      <div className="flex items-center mt-1">
                        <input type="checkbox" id="current-position" className="mr-2" />
                        <label htmlFor="current-position" className="text-xs text-muted-foreground">
                          I currently work here
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="responsibilities">Responsibilities</Label>
                    <Textarea
                      id="responsibilities"
                      placeholder="Describe your key responsibilities in this role"
                      rows={3} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="achievements">Achievements</Label>
                    <Textarea
                      id="achievements"
                      placeholder="Describe your key achievements and impact in this role"
                      rows={3} />
                  </div>

                  <div className="space-y-2">
                    <Label>Reference Contact</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input placeholder="Reference Name" />
                      <Input placeholder="Reference Email" type="email" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exp-document">Upload Supporting Document</Label>
                    <Input id="exp-document" type="file" />
                    <p className="text-xs text-muted-foreground mt-1">Accepted formats: PDF, JPG, PNG (max 5MB)</p>
                  </div>
                </div>

                <Button type="submit">Submit for Verification</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extracurricular" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Extracurricular Activities</CardTitle>
              <CardDescription>Add your volunteer work, leadership roles, and other activities</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="activity-type">Activity Type</Label>
                      <Select>
                        <SelectTrigger id="activity-type">
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="volunteer">Volunteer Work</SelectItem>
                          <SelectItem value="leadership">Leadership Role</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="club">Club/Society</SelectItem>
                          <SelectItem value="community">Community Service</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input id="organization" placeholder="Organization Name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role</Label>
                    <Input id="role" placeholder="e.g., Volunteer, Team Captain, President" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="activity-start-date">Start Date</Label>
                      <Input id="activity-start-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="activity-end-date">End Date</Label>
                      <Input id="activity-end-date" type="date" />
                      <div className="flex items-center mt-1">
                        <input type="checkbox" id="current-activity" className="mr-2" />
                        <label htmlFor="current-activity" className="text-xs text-muted-foreground">
                          This is ongoing
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activity-description">Description</Label>
                    <Textarea
                      id="activity-description"
                      placeholder="Describe the activity and your involvement"
                      rows={3} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="impact">Impact & Outcomes</Label>
                    <Textarea
                      id="impact"
                      placeholder="Describe the impact of your involvement and any outcomes achieved"
                      rows={3} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activity-document">Upload Evidence/Certificate</Label>
                    <Input id="activity-document" type="file" />
                    <p className="text-xs text-muted-foreground mt-1">Accepted formats: PDF, JPG, PNG (max 5MB)</p>
                  </div>
                </div>

                <Button type="submit">Submit for Verification</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle>Submitted Credentials</CardTitle>
          <CardDescription>Track the status of your submitted credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Credential
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Submitted
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium">Bachelor's Degree in Computer Science</td>
                  <td className="px-6 py-4">Academic</td>
                  <td className="px-6 py-4">Jan 15, 2023</td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  </td>
                </tr>
                <tr className="bg-muted/50 border-b">
                  <td className="px-6 py-4 font-medium">Web Development Certification</td>
                  <td className="px-6 py-4">Skills</td>
                  <td className="px-6 py-4">Mar 22, 2023</td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                      In Progress
                    </span>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium">Software Engineer at TechStart Inc.</td>
                  <td className="px-6 py-4">Experience</td>
                  <td className="px-6 py-4">Apr 10, 2023</td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
