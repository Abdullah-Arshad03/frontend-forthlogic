

import { Video } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card } from "./card"
import { CardContent } from "./card"

interface LoaderProps {
  progress: number
  text: string
}

export const Loader: React.FC<LoaderProps> = ({ progress, text }) => {
  return (
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
                <p className="text-sm font-medium text-slate-700">{text}</p>
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
  )
}
