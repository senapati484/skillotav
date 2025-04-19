import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function ApplicantsPage() {
  // Sample applicants data
  const applicants = [
    {
      id: 1,
      name: "John Doe",
      position: "Frontend Developer",
      appliedDate: "2023-04-15",
      status: "Under Review",
      statusColor: "blue",
      tokenMatch: 90,
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "UX Designer",
      appliedDate: "2023-04-14",
      status: "Not Matched",
      statusColor: "red",
      tokenMatch: 65,
    },
    {
      id: 3,
      name: "Alex Johnson",
      position: "Full Stack Developer",
      appliedDate: "2023-04-13",
      status: "Interview",
      statusColor: "green",
      tokenMatch: 95,
    },
    {
      id: 4,
      name: "Emily Chen",
      position: "Product Manager",
      appliedDate: "2023-04-10",
      status: "Shortlisted",
      statusColor: "yellow",
      tokenMatch: 85,
    },
    {
      id: 5,
      name: "Michael Brown",
      position: "Data Scientist",
      appliedDate: "2023-04-08",
      status: "Rejected",
      statusColor: "red",
      tokenMatch: 70,
    },
    {
      id: 6,
      name: "Sarah Wilson",
      position: "Frontend Developer",
      appliedDate: "2023-04-05",
      status: "Under Review",
      statusColor: "blue",
      tokenMatch: 80,
    },
  ]

  // Function to render status badge with appropriate color
  const renderStatusBadge = (status, color) => {
    const colorClasses = {
      blue: "bg-blue-100 text-blue-800",
      green: "bg-green-100 text-green-800",
      yellow: "bg-yellow-100 text-yellow-800",
      red: "bg-red-100 text-red-800",
    }

    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClasses[color]}`}>
        {status}
      </span>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Applicants</h1>
        <p className="text-muted-foreground">Manage candidates who have applied to your job postings</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Applicant Summary</CardTitle>
          <CardDescription>Overview of all applicants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-3xl font-bold">{applicants.length}</p>
              <p className="text-sm text-muted-foreground">Total Applicants</p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-3xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Under Review</p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-3xl font-bold">1</p>
              <p className="text-sm text-muted-foreground">Shortlisted</p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-3xl font-bold">1</p>
              <p className="text-sm text-muted-foreground">Interviews</p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-3xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Applicants</TabsTrigger>
          <TabsTrigger value="review">Under Review</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Applicant
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Position
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Applied Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Token Match
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicants.map((app) => (
                      <tr key={app.id} className="bg-white border-b">
                        <td className="px-6 py-4 font-medium">{app.name}</td>
                        <td className="px-6 py-4">{app.position}</td>
                        <td className="px-6 py-4">{app.appliedDate}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              app.tokenMatch >= 90
                                ? "bg-green-100 text-green-800"
                                : app.tokenMatch >= 70
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}>
                            {app.tokenMatch}%
                          </span>
                        </td>
                        <td className="px-6 py-4">{renderStatusBadge(app.status, app.statusColor)}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/recruiter/applicants/${app.id}`}>View</Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              Update
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {applicants
                  .filter((app) => app.status === "Under Review")
                  .map((app) => (
                    <div key={app.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{app.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {app.position} • Applied {app.appliedDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              app.tokenMatch >= 90
                                ? "bg-green-100 text-green-800"
                                : app.tokenMatch >= 70
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}>
                            {app.tokenMatch}% Match
                          </span>
                          {renderStatusBadge(app.status, app.statusColor)}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" asChild>
                          <Link href={`/recruiter/applicants/${app.id}`}>View Profile</Link>
                        </Button>
                        <Button size="sm" variant="outline">
                          Shortlist
                        </Button>
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}

                {applicants.filter((app) => app.status === "Under Review").length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No applicants under review</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Similar content for other tabs */}
        <TabsContent value="shortlisted" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {applicants
                  .filter((app) => app.status === "Shortlisted")
                  .map((app) => (
                    <div key={app.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{app.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {app.position} • Applied {app.appliedDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              app.tokenMatch >= 90
                                ? "bg-green-100 text-green-800"
                                : app.tokenMatch >= 70
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}>
                            {app.tokenMatch}% Match
                          </span>
                          {renderStatusBadge(app.status, app.statusColor)}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" asChild>
                          <Link href={`/recruiter/applicants/${app.id}`}>View Profile</Link>
                        </Button>
                        <Button size="sm" variant="outline">
                          Schedule Interview
                        </Button>
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}

                {applicants.filter((app) => app.status === "Shortlisted").length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No shortlisted applicants</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
