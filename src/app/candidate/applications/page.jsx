import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ApplicationsPage() {
  // Sample applications data
  const applications = [
    {
      id: 1,
      jobTitle: "Frontend Developer",
      company: "TechCorp",
      appliedDate: "2023-04-15",
      status: "Under Review",
      statusColor: "blue",
      tokenMatch: 90,
      feedback: null,
    },
    {
      id: 2,
      jobTitle: "UX Designer",
      company: "DesignHub",
      appliedDate: "2023-04-10",
      status: "Not Matched",
      statusColor: "red",
      tokenMatch: 65,
      feedback: "Your Skills token (6) is below our requirement (8).",
    },
    {
      id: 3,
      jobTitle: "Full Stack Developer",
      company: "WebSolutions",
      appliedDate: "2023-04-05",
      status: "Interview",
      statusColor: "green",
      tokenMatch: 95,
      feedback: "Great match! We'd like to schedule an interview.",
    },
    {
      id: 4,
      jobTitle: "Data Scientist",
      company: "DataTech",
      appliedDate: "2023-03-28",
      status: "Rejected",
      statusColor: "red",
      tokenMatch: 70,
      feedback: "We found candidates with higher token matches.",
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
        <h1 className="text-3xl font-bold">My Applications</h1>
        <p className="text-muted-foreground">Track the status of your job applications</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Application Summary</CardTitle>
          <CardDescription>Overview of your application activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-3xl font-bold">{applications.length}</p>
              <p className="text-sm text-muted-foreground">Total Applications</p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-3xl font-bold">1</p>
              <p className="text-sm text-muted-foreground">Interviews</p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-3xl font-bold">1</p>
              <p className="text-sm text-muted-foreground">Under Review</p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-3xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Application History</CardTitle>
          <CardDescription>Detailed view of all your applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Company
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
                {applications.map((app) => (
                  <tr key={app.id} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium">{app.jobTitle}</td>
                    <td className="px-6 py-4">{app.company}</td>
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
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Application Feedback</CardTitle>
          <CardDescription>Feedback received from recruiters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications
              .filter((app) => app.feedback)
              .map((app) => (
                <div key={app.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{app.jobTitle}</h3>
                      <p className="text-sm text-muted-foreground">{app.company}</p>
                    </div>
                    {renderStatusBadge(app.status, app.statusColor)}
                  </div>
                  <p className="text-sm">{app.feedback}</p>
                </div>
              ))}

            {applications.filter((app) => app.feedback).length === 0 && (
              <p className="text-center text-muted-foreground py-4">No feedback received yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
