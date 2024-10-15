import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from "./layout"
import ChatInterface from "./chat-interface"
import AnalyticsPage from "./analytics-page"
import Dashboard from "./dashboard"
import ProjectsPage from "./projects-page"
import KnowledgeBase from "./knowledge-base"
import SettingsPage from "./settings-page"

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
}

export default function App() {
  const [currentPage, setCurrentPage] = React.useState("chat")

  const renderPage = () => {
    switch (currentPage) {
      case "chat":
        return <ChatInterface />
      case "analytics":
        return <AnalyticsPage />
      case "dashboard":
        return <Dashboard />
      case "projects":
        return <ProjectsPage />
      case "knowledge":
        return <KnowledgeBase />
      case "settings":
        return <SettingsPage />
      default:
        return <ChatInterface />
    }
  }

  return (
    <Layout onNavigate={setCurrentPage}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="flex-grow overflow-hidden"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  )
}
