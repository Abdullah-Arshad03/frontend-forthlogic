
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MarketingVideoGenerator } from "@/components/marketing-video-generator"
import { PropertyTourGenerator } from "@/components/property-tour-generator"
import { MessageCircle, Video, Home } from "lucide-react"

export default function VideoGeneratorApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-full">
              <MessageCircle className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">AI Video Generator</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Create stunning marketing videos and property tours with our AI-powered generator. Choose your preferred
            option below and let's get started!
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <Tabs defaultValue="marketing" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
                <TabsTrigger value="marketing" className="flex items-center gap-2 text-base">
                  <Video className="h-4 w-4" />
                  Marketing Video
                </TabsTrigger>
                <TabsTrigger value="property" className="flex items-center gap-2 text-base">
                  <Home className="h-4 w-4" />
                  Property Tour
                </TabsTrigger>
              </TabsList>

              <TabsContent value="marketing" className="mt-0">
                <MarketingVideoGenerator />
              </TabsContent>

              <TabsContent value="property" className="mt-0">
                <PropertyTourGenerator />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-slate-500">
          <p>Generated videos are stored temporarily. Download your video to save it permanently.</p>
        </div>
      </div>
    </div>
  )
}
