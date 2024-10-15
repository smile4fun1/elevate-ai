import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Book, FileText } from "lucide-react"

interface Article {
  id: number
  title: string
  category: string
  content: string
}

const articles: Article[] = [
  { id: 1, title: "Getting Started with AI Business Consulting", category: "Basics", content: "Learn the fundamentals of AI-powered business consulting..." },
  { id: 2, title: "Optimizing Your Business Processes", category: "Optimization", content: "Discover how to streamline your operations using AI insights..." },
  { id: 3, title: "Understanding Market Trends", category: "Market Analysis", content: "Leverage AI to analyze and predict market trends..." },
  { id: 4, title: "Enhancing Customer Experience", category: "Customer Relations", content: "Use AI-driven strategies to improve customer satisfaction..." },
  { id: 5, title: "Financial Forecasting with AI", category: "Finance", content: "Learn how to use AI for accurate financial predictions..." },
]

export default function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Knowledge Base</h2>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3 space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <ScrollArea className="h-[600px] rounded-md border p-4">
            {filteredArticles.map(article => (
              <Button
                key={article.id}
                variant="ghost"
                className="w-full justify-start text-left mb-2"
                onClick={() => setSelectedArticle(article)}
              >
                <FileText className="mr-2 h-4 w-4" />
                {article.title}
              </Button>
            ))}
          </ScrollArea>
        </div>
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>{selectedArticle ? selectedArticle.title : "Select an Article"}</CardTitle>
            <CardDescription>{selectedArticle ? selectedArticle.category : "Choose an article from the list to view its content"}</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedArticle ? (
              <p>{selectedArticle.content}</p>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <Book className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Select an article to view its content</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
