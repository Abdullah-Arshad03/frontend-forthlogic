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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Home, AlertCircle, CheckCircle } from "lucide-react"
import { PropertyData } from "@/interfaces/videoGeneratorInterfaces"

export function PropertyTourGenerator() {
  const [propertyData, setPropertyData] = useState<PropertyData>({
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    features: "",
    tourStyle: "standard",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [videoData, setVideoData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (name: string, value: string) => {
    setPropertyData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const simulateProgress = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 12
      })
    }, 250)
    return interval
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { address, price, bedrooms, bathrooms, squareFootage, features, tourStyle } = propertyData
    if (!address || !price || !bedrooms || !bathrooms || !squareFootage || !features || !tourStyle) {
      setError("All fields are required")
      return
    }

    setIsLoading(true)
    setError(null)
    setVideoData(null)

    const progressInterval = simulateProgress()

    try {
      await new Promise((resolve) => setTimeout(resolve, 2500))

      const response = await fetch("http://localhost:5000/api/property-tour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate property tour video")
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
          <Home className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <p className="text-sm text-slate-700">
                Great choice! I'll help you create a property tour video. Please fill in the property details below and
                I'll generate an immersive virtual tour for you.
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Property Address</Label>
                    <Input
                      id="address"
                      value={propertyData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      placeholder="123 Main St, City"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={propertyData.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                      placeholder="500,000"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={propertyData.bedrooms}
                      onChange={(e) => handleChange("bedrooms", e.target.value)}
                      placeholder="3"
                      min="1"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={propertyData.bathrooms}
                      onChange={(e) => handleChange("bathrooms", e.target.value)}
                      placeholder="2.5"
                      step="0.5"
                      min="1"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="squareFootage">Square Footage</Label>
                    <Input
                      id="squareFootage"
                      type="number"
                      value={propertyData.squareFootage}
                      onChange={(e) => handleChange("squareFootage", e.target.value)}
                      placeholder="2000"
                      min="100"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tourStyle">Tour Style</Label>
                    <Select
                      value={propertyData.tourStyle}
                      onValueChange={(value) => handleChange("tourStyle", value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tour style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Tour</SelectItem>
                        <SelectItem value="luxury">Luxury Showcase</SelectItem>
                        <SelectItem value="drone">Drone Footage</SelectItem>
                        <SelectItem value="virtual">Virtual Reality</SelectItem>
                        <SelectItem value="cinematic">Cinematic Experience</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Property Features</Label>
                  <Textarea
                    id="features"
                    value={propertyData.features}
                    onChange={(e) => handleChange("features", e.target.value)}
                    rows={4}
                    placeholder="List features separated by commas (e.g., swimming pool, hardwood floors, granite countertops)"
                    disabled={isLoading}
                    className="resize-none"
                  />
                  <p className="text-xs text-slate-500">Separate features with commas</p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" disabled={isLoading} className="w-full h-12 text-base" size="lg">
                  {isLoading ? "Generating Tour..." : "Generate Property Tour"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {isLoading && (
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Home className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                    <p className="text-sm font-medium text-slate-700">Creating your property tour...</p>
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
                    <h3 className="font-semibold text-green-800 mb-2">Property Tour Generated Successfully!</h3>
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
                    <a href={`http://localhost:5000${videoData.videoUrl}`} download="property-tour.mp4">
                      <Download className="h-4 w-4 mr-2" />
                      Download Tour Video
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
