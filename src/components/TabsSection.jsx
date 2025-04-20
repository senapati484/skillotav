"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  LuGraduationCap,
  LuBriefcase,
  LuCode,
  LuBook,
  LuTrophy,
} from "react-icons/lu";
import { Card, CardContent, CardHeader } from "./ui/card";

export function TabsDemo() {
  return (
    <div className="min-h-[600px] relative flex flex-col max-w-6xl mx-auto w-full items-center justify-start px-4 bg-secondary-background">
      <Tabs defaultValue="academics" className="w-full">
        <TabsList className="grid w-full md:w-auto h-auto grid-cols-2 md:grid-cols-5 gap-2 mb-8 bg-transparent rounded-xl">
          <TabsTrigger value="academics" className="flex items-center gap-2 py-3">
            <LuGraduationCap className="h-5 w-5" />
            <span className="hidden md:inline">Academics</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2 py-3">
            <LuBriefcase className="h-5 w-5" />
            <span className="hidden md:inline">Skills</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2 py-3">
            <LuCode className="h-5 w-5" />
            <span className="hidden md:inline">Projects</span>
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2 py-3">
            <LuBook className="h-5 w-5" />
            <span className="hidden md:inline">Experience</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2 py-3">
            <LuTrophy className="h-5 w-5" />
            <span className="hidden md:inline">Activities</span>
          </TabsTrigger>
        </TabsList>

        <div className="grid gap-4">
          <TabsContent value="academics">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-clash font-bold">Academic Journey</h3>
                <p className="text-muted-foreground">
                  Track and verify your educational accomplishments.
                </p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white flex items-center justify-center">
                  <span className="text-xl font-semibold">Academic Dashboard</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-clash font-bold">Skill Assessment</h3>
                <p className="text-muted-foreground">
                  Validate and showcase your professional expertise.
                </p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg bg-gradient-to-br from-green-500 to-teal-600 p-8 text-white flex items-center justify-center">
                  <span className="text-xl font-semibold">
                    Skill Assessment Platform
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-clash font-bold">Project Showcase</h3>
                <p className="text-muted-foreground">
                  Build and showcase your portfolio with verified projects.
                </p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white flex items-center justify-center">
                  <span className="text-xl font-semibold">Project Gallery</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-clash font-bold">Experiences</h3>
                <p className="text-muted-foreground">
                Showcase your real-world impact through jobs,internships and hands-on contributions..
                </p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white flex items-center justify-center">
                  <span className="text-xl font-semibold">Experience Lists</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-clash font-bold">
                  Activities and Achievements
                </h3>
                <p className="text-muted-foreground">
                Highlight your extracurricular achievements and leadership experiences beyond academics.
                </p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 p-8 text-white flex items-center justify-center">
                  <span className="text-xl font-semibold">
                    Achievement Showcase
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
