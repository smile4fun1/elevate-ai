import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users } from "lucide-react"

interface Project {
  id: number
  name: string
  description: string
  status: "active" | "completed" | "on-hold"
  dueDate: string
  team: string[]
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Overhaul the company website to improve user experience and conversion rates.",
    status: "active",
    dueDate: "2023-08-15",
    team: ["John Doe", "Jane Smith"]
  },
  {
    id: 2,
    name: "Market Expansion",
    description: "Research and plan expansion into new market segments.",
    status: "on-hold",
    dueDate: "2023-09-30",
    team: ["Alice Johnson", "Bob Brown"]
  },
  {
    id: 3,
    name: "Product Launch",
    description: "Prepare and execute the launch of our new flagship product.",
    status: "completed",
    dueDate: "2023-07-01",
    team: ["Eve Wilson", "Charlie Davis"]
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [newProject, setNewProject] = useState<Partial<Project>>({})

  const handleCreateProject = () => {
    if (newProject.name && newProject.description) {
      setProjects([...projects, { ...newProject, id: projects.length + 1, status: "active", team: [] } as Project])
      setNewProject({})
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Add a new project to your dashboard.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  value={newProject.name || ""}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="project-description">Description</Label>
                <Input
                  id="project-description"
                  value={newProject.description || ""}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="project-due-date">Due Date</Label>
                <Input
                  id="project-due-date"
                  type="date"
                  value={newProject.dueDate || ""}
                  onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="on-hold">On Hold</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          {projects.filter(p => p.status === "active").map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {projects.filter(p => p.status === "completed").map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </TabsContent>
        <TabsContent value="on-hold" className="space-y-4">
          {projects.filter(p => p.status === "on-hold").map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {project.name}
          <Badge variant={project.status === "completed" ? "secondary" : project.status === "on-hold" ? "destructive" : "default"}>
            {project.status}
          </Badge>
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            Due: {project.dueDate}
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            Team: {project.team.join(", ")}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  )
}
