import React, { useState } from "react"
import { Bell, LayoutDashboard, MessageSquare, PieChart, Settings, User, Book, Briefcase, Menu, LogOut, Sun, Moon, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

interface LayoutProps {
  children: React.ReactNode
  onNavigate: (page: string) => void
}

export default function Layout({ children, onNavigate }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { theme, setTheme } = useTheme()

  const navItems = [
    { icon: MessageSquare, label: "Chat", value: "chat" },
    { icon: PieChart, label: "Analytics", value: "analytics" },
    { icon: LayoutDashboard, label: "Dashboard", value: "dashboard" },
    { icon: Briefcase, label: "Projects", value: "projects" },
    { icon: Book, label: "Knowledge Base", value: "knowledge" },
    { icon: Settings, label: "Settings", value: "settings" },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for larger screens */}
      <motion.aside 
        className={`hidden md:flex flex-col bg-card border-r transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}
        initial={false}
        animate={{ width: isSidebarCollapsed ? 64 : 256 }}
      >
        <div className="p-4 flex justify-between items-center">
          {!isSidebarCollapsed && <h1 className="text-2xl font-bold text-foreground">ElevateAI</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4 text-foreground" /> : <ChevronLeft className="h-4 w-4 text-foreground" />}
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <nav className="space-y-2 p-2">
            {navItems.map((item) => (
              <Button
                key={item.value}
                variant="ghost"
                className={`w-full justify-start text-foreground hover:text-primary hover:bg-primary/10 ${isSidebarCollapsed ? 'px-2' : ''}`}
                onClick={() => onNavigate(item.value)}
              >
                <item.icon className={`h-4 w-4 ${isSidebarCollapsed ? '' : 'mr-2'}`} />
                {!isSidebarCollapsed && item.label}
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </motion.aside>

      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b bg-card">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-6 w-6 text-foreground" />
            </Button>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5 text-foreground" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="@username" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">username</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        user@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-muted"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? <Moon className="h-5 w-5 text-foreground" /> : <Sun className="h-5 w-5 text-foreground" />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6 bg-background">
          {children}
        </div>
      </main>

      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-card">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-foreground">ElevateAI</h1>
          </div>
          <ScrollArea className="flex-1">
            <nav className="space-y-2 p-2">
              {navItems.map((item) => (
                <Button
                  key={item.value}
                  variant="ghost"
                  className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/10"
                  onClick={() => {
                    onNavigate(item.value)
                    setIsSidebarOpen(false)
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}