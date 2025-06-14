"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Upload, Download, Video, AlertCircle, CheckCircle } from "lucide-react"

export function MarketingVideoGenerator() {
  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [videoData, setVideoData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const simulateProgress = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
    return interval
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!prompt || !image) {
      setError("Both prompt and image are required")
      return
    }

    setIsLoading(true)
    setError(null)
    setVideoData(null)

    const progressInterval = simulateProgress()

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const formData = new FormData()
      formData.append("prompt", prompt)
      formData.append("image", image)

      const response = await fetch("http://localhost:5000/api/marketing-video", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to generate video")
      }

      const data = await response.json()

      setProgress(100)
      await new Promise((resolve) => setTimeout(resolve, 500))

      setVideoData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      clearInterval(progressInterval)
      setIsLoading(false)
      setProgress(0)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Video className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <p className="text-sm text-slate-700">
                Hi! I'll help you create a marketing video. Please upload an image and describe what kind of video you'd
                like me to generate for you.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-medium text-slate-600">You</span>
        </div>
        <div className="flex-1">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prompt" className="text-base font-medium">
                    Describe your video
                  </Label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    placeholder="Enter a detailed description of the video you want to create..."
                    disabled={isLoading}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium">Upload Image</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 text-slate-400 mx-auto" />
                      <div className="space-y-1">
                        <Label
                          htmlFor="file-upload"
                          className="cursor-pointer text-primary hover:text-primary/80 font-medium"
                        >
                          Choose file or drag and drop
                        </Label>
                        <Input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={handleImageChange}
                          disabled={isLoading}
                        />
                      </div>
                      <p className="text-xs text-slate-500">PNG, JPG, JPEG up to 10MB</p>
                      {image && <p className="text-sm text-slate-700 font-medium">Selected: {image.name}</p>}
                    </div>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" disabled={isLoading} className="w-full h-12 text-base" size="lg">
                  {isLoading ? "Generating Video..." : "Generate Marketing Video"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {isLoading && (
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Video className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                    <p className="text-sm font-medium text-slate-700">Generating your marketing video...</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <p className="text-xs text-slate-500">This may take a few moments. Please don't close this window.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {videoData && (
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-green-800 mb-2">Video Generated Successfully!</h3>
                    <p className="text-sm text-green-700">{videoData.message}</p>
                  </div>

                  <div className="bg-black rounded-lg overflow-hidden max-w-md mx-auto">
                    <video
                      src={`http://localhost:5000${videoData.videoUrl}`}
                      controls
                      className="w-full h-auto"
                      style={{ maxHeight: "300px" }}
                    />
                  </div>

                  <Button asChild className="w-full">
                    <a href={`http://localhost:5000${videoData.videoUrl}`} download>
                      <Download className="h-4 w-4 mr-2" />
                      Download Video
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
