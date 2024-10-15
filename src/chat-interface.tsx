import React, { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Mic, Image as ImageIcon, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  id: number
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

const messageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: "Hello! I'm your AI business consultant. How can I assist you today?", sender: "ai", timestamp: new Date() },
  ])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = { id: messages.length + 1, content: input, sender: "user", timestamp: new Date() }
      setMessages([...messages, newMessage])
      setInput("")
      setIsLoading(true)
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          content: "Thank you for your message. I'm analyzing your request and will provide insights shortly.",
          sender: "ai",
          timestamp: new Date()
        }
        setMessages(prevMessages => [...prevMessages, aiResponse])
        setIsLoading(false)
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Handle file upload logic here
      console.log("File uploaded:", file.name)
      toast({
        title: "File Uploaded",
        description: `${file.name} has been successfully uploaded.`,
      })
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Implement actual voice recording logic here
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-3xl font-bold mb-6">Chat with AI Consultant</h2>
      <Card className="flex-1 flex flex-col overflow-hidden">
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="w-full justify-start px-4 pt-2 bg-muted/50">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <MessageBubble message={message} />
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center py-4"
                >
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </motion.div>
              )}
            </ScrollArea>
            <CardContent className="border-t border-border p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex space-x-2"
              >
                <Button type="button" variant="outline" size="icon" onClick={() => document.getElementById('file-upload')?.click()}>
                  <Paperclip className="h-4 w-4" />
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button type="button" variant="outline" size="icon" onClick={toggleRecording}>
                  <Mic className={cn("h-4 w-4", isRecording && "text-destructive")} />
                </Button>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="flex-1"
                />
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </form>
            </CardContent>
          </TabsContent>
          <TabsContent value="files" className="flex-1 p-4">
            <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5].map((file) => (
                <motion.div
                  key={file}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border rounded p-4 flex items-center space-x-2 bg-card"
                >
                  <ImageIcon className="h-6 w-6 text-primary" />
                  <span>File {file}.jpg</span>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  return (
    <div
      className={cn(
        "flex items-start space-x-2 max-w-[80%] mb-4",
        message.sender === "user" ? "ml-auto" : "mr-auto"
      )}
    >
      {message.sender === "ai" && (
        <Avatar className="w-8 h-8">
          <AvatarFallback>AI</AvatarFallback>
          <AvatarImage src="/ai-avatar.png" />
        </Avatar>
      )}
      <div
        className={cn(
          "rounded-lg p-3",
          message.sender === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        <p>{message.content}</p>
        <div className="text-xs mt-1 opacity-50">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
      {message.sender === "user" && (
        <Avatar className="w-8 h-8">
          <AvatarFallback>U</AvatarFallback>
          <AvatarImage src="/user-avatar.png" />
        </Avatar>
      )}
    </div>
  )
}
