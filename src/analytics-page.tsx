import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const revenueData = [
  { name: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
  { name: "Feb", revenue: 3000, expenses: 1398, profit: 1602 },
  { name: "Mar", revenue: 2000, expenses: 9800, profit: -7800 },
  { name: "Apr", revenue: 2780, expenses: 3908, profit: -1128 },
  { name: "May", revenue: 1890, expenses: 4800, profit: -2910 },
  { name: "Jun", revenue: 2390, expenses: 3800, profit: -1410 },
  { name: "Jul", revenue: 3490, expenses: 4300, profit: -810 },
]

const customerData = [
  { name: "Jan", newCustomers: 45, churnedCustomers: 20 },
  { name: "Feb", newCustomers: 52, churnedCustomers: 18 },
  { name: "Mar", newCustomers: 48, churnedCustomers: 22 },
  { name: "Apr", newCustomers: 61, churnedCustomers: 15 },
  { name: "May", newCustomers: 55, churnedCustomers: 21 },
  { name: "Jun", newCustomers: 67, churnedCustomers: 19 },
  { name: "Jul", newCustomers: 72, churnedCustomers: 17 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>
      <Tabs defaultValue="financial" className="w-full">
        <TabsList>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        <TabsContent value="financial" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Total revenue this month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$12,345</p>
                <p className="text-sm text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Expenses</CardTitle>
                <CardDescription>Total expenses this month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$8,765</p>
                <p className="text-sm text-muted-foreground">-5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Profit</CardTitle>
                <CardDescription>Net profit this month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$3,580</p>
                <p className="text-sm text-muted-foreground">+25% from last month</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Revenue, Expenses, and Profit over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                    <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="profit" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Customers</CardTitle>
                <CardDescription>Active customers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,234</p>
                <p className="text-sm text-muted-foreground">+10% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>New Customers</CardTitle>
                <CardDescription>New sign-ups this month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">72</p>
                <p className="text-sm text-muted-foreground">+20% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Churn Rate</CardTitle>
                <CardDescription>Customer churn this month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">2.5%</p>
                <p className="text-sm text-muted-foreground">-1% from last month</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
              <CardDescription>New and churned customers over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="newCustomers" fill="#8884d8" name="New Customers" />
                    <Bar dataKey="churnedCustomers" fill="#82ca9d" name="Churned Customers" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
