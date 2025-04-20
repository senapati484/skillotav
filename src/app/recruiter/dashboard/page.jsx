import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RecruiterDashboard() {
  // Sample data for dashboard
  const metrics = {
    postedJobs: 5,
    activeJobs: 3,
    totalApplicants: 42,
    newApplicants: 12,
  };

  // Sample recent applicants
  const recentApplicants = [
    {
      id: 1,
      name: "John Doe",
      position: "Frontend Developer",
      appliedDate: "2023-04-15",
      tokenMatch: 90,
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "UX Designer",
      appliedDate: "2023-04-14",
      tokenMatch: 75,
    },
    {
      id: 3,
      name: "Alex Johnson",
      position: "Full Stack Developer",
      appliedDate: "2023-04-13",
      tokenMatch: 95,
    },
  ];

  // Sample job listings
  const jobListings = [
    {
      id: 1,
      title: "Frontend Developer",
      applicants: 18,
      posted: "2023-04-01",
      status: "Active",
    },
    {
      id: 2,
      title: "UX Designer",
      applicants: 12,
      posted: "2023-04-05",
      status: "Active",
    },
    {
      id: 3,
      title: "Product Manager",
      applicants: 8,
      posted: "2023-04-10",
      status: "Active",
    },
    {
      id: 4,
      title: "Data Scientist",
      applicants: 4,
      posted: "2023-03-15",
      status: "Closed",
    },
    {
      id: 5,
      title: "Backend Developer",
      applicants: 0,
      posted: "2023-03-01",
      status: "Closed",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome, Acme Corp</h1>
        <Button asChild>
          <Link href="/recruiter/post-job">Post New Job</Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{metrics.postedJobs}</div>
            <p className="text-sm text-muted-foreground">Posted Jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{metrics.activeJobs}</div>
            <p className="text-sm text-muted-foreground">Active Jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{metrics.totalApplicants}</div>
            <p className="text-sm text-muted-foreground">Total Applicants</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{metrics.newApplicants}</div>
            <p className="text-sm text-muted-foreground">New Applicants</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applicants</CardTitle>
            <CardDescription>
              Candidates who recently applied to your job postings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{applicant.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {applicant.position} • Applied {applicant.appliedDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        applicant.tokenMatch >= 90
                          ? "bg-green-100 text-green-800"
                          : applicant.tokenMatch >= 70
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {applicant.tokenMatch}% Match
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/recruiter/applicants/${applicant.id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Job Listings</CardTitle>
            <CardDescription>
              Overview of your current and past job postings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobListings.map((job) => (
                <div
                  key={job.id}
                  className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.applicants} applicants • Posted {job.posted}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        job.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {job.status}
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/recruiter/jobs/${job.id}`}>Manage</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Token Match Analysis</CardTitle>
          <CardDescription>
            Overview of token matches across all applicants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center border rounded-md bg-muted/20">
            <p className="text-muted-foreground">
              Token match visualization would appear here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
