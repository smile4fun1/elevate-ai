import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, Users, DollarSign, TrendingUp, AlertCircle, CheckCircle2, XCircle } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+10% from last month</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,678</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
            <Progress value={80} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">2 completed this month</p>
            <Progress value={60} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24 / 50</div>
            <p className="text-xs text-muted-foreground">48% completion rate</p>
            <Progress value={48} className="mt-2" />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest business activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span className="flex-1">New client onboarded: XYZ Corp</span>
                <span className="text-sm text-muted-foreground">2h ago</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span className="flex-1">Project milestone achieved: Phase 1 complete</span>
                <span className="text-sm text-muted-foreground">1d ago</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span className="flex-1">Invoice #1234 paid by client</span>
                <span className="text-sm text-muted-foreground">3d ago</span>
              </li>
              <li className="flex items-center">
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="flex-1">Missed deadline: Project Y report</span>
                <span className="text-sm text-muted-foreground">4d ago</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>Actionable recommendations for your business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Improve Customer Retention</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Our analysis shows a 5% increase in customer churn. Consider implementing a loyalty program to improve retention.
              </p>
              <Button size="sm">
                View Details
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Optimize Pricing Strategy</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Based on market trends, adjusting your pricing model could potentially increase revenue by 12%.
              </p>
              <Button size="sm">
                Explore Options
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Expand Marketing Channels</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Your competitors are gaining traction on emerging social platforms. Consider expanding your marketing efforts.
              </p>
              <Button size="sm">
                Learn More
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
