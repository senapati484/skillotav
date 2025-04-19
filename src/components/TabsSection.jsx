"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  LuGraduationCap,
  LuBriefcase,
  LuCode,
  LuBook,
  LuTrophy,
} from "react-icons/lu";

export function TabsDemo() {
  return (
    <div className="min-h-[600px] relative flex flex-col max-w-6xl mx-auto w-full items-center justify-start px-4 bg-secondary-background">
      {/* <h2 className="text-3xl font-bold mb-8 text-center">
        Explore Our Platform
      </h2> */}
      <Tabs defaultValue="academics" className="w-full">
        <TabsList className="grid w-full h-16 grid-cols-2 md:grid-cols-5 gap-2 mb-8 bg-secondary-background rounded-2xl border-2 border-border shadow-shadow">
          <TabsTrigger
            value="academics"
            className="flex items-center gap-2 py-3"
          >
            <LuGraduationCap className="h-5 w-5" />
            <span className="hidden md:inline">Academics</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2 py-3">
            <LuBriefcase className="h-5 w-5" />
            <span className="hidden md:inline">Skills</span>
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="flex items-center gap-2 py-3"
          >
            <LuCode className="h-5 w-5" />
            <span className="hidden md:inline">Projects</span>
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2 py-3">
            <LuBook className="h-5 w-5" />
            <span className="hidden md:inline">Courses</span>
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="flex items-center gap-2 py-3"
          >
            <LuTrophy className="h-5 w-5" />
            <span className="hidden md:inline">Achievements</span>
          </TabsTrigger>
        </TabsList>

        <div className="grid gap-6 transition-all duration-300 ease-in-out">
          <TabsContent value="academics" className="mt-0">
            <div className="overflow-hidden rounded-xl border-2 border-border bg-card p-6 shadow-shadow">
              <h3 className="text-2xl font-bold mb-4">Academic Credentials</h3>
              <p className="text-muted-foreground mb-6">
                Securely store and verify your academic achievements, from
                degrees to certifications.
              </p>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white flex items-center justify-center">
                <span className="text-xl font-semibold">
                  Academic Portfolio Demo
                </span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="mt-0">
            <div className="overflow-hidden rounded-xl border-2 border-border bg-card p-6 shadow-shadow">
              <h3 className="text-2xl font-bold mb-4">Skill Verification</h3>
              <p className="text-muted-foreground mb-6">
                Get your skills endorsed by industry experts and showcase your
                expertise.
              </p>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-green-500 to-teal-600 p-8 text-white flex items-center justify-center">
                <span className="text-xl font-semibold">
                  Skill Assessment Platform
                </span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-0">
            <div className="overflow-hidden rounded-xl border-2 border-border bg-card p-6 shadow-shadow">
              <h3 className="text-2xl font-bold mb-4">Project Showcase</h3>
              <p className="text-muted-foreground mb-6">
                Build and showcase your portfolio with verified project
                experiences.
              </p>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white flex items-center justify-center">
                <span className="text-xl font-semibold">Project Gallery</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-0">
            <div className="overflow-hidden rounded-xl border-2 border-border bg-card p-6 shadow-shadow">
              <h3 className="text-2xl font-bold mb-4">Learning Path</h3>
              <p className="text-muted-foreground mb-6">
                Access curated courses and track your learning progress.
              </p>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white flex items-center justify-center">
                <span className="text-xl font-semibold">Course Catalog</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-0">
            <div className="overflow-hidden rounded-xl border-2 border-border bg-card p-6 shadow-shadow">
              <h3 className="text-2xl font-bold mb-4 font-clash">
                Achievements & Rewards
              </h3>
              <p className="text-muted-foreground mb-6">
                Track your milestones and earn rewards for your accomplishments.
              </p>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 p-8 text-white flex items-center justify-center">
                <span className="text-xl font-semibold">
                  Achievement Showcase
                </span>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
