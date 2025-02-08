import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  title: string;
  content: string;
  content_sub?: string;
  author: string;
  role: string;
}

export function TestimonialCard({
  title,
  content,
  content_sub,
  author,
  role,
}: TestimonialCardProps) {
  return (
    <Card className="h-fit">
      <CardContent className="pt-6 space-y-4">
        <div className="flex text-teal-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
        <h3 className="text-xl font-semibold leading-tight">{title}</h3>
        <p className="text-muted-foreground">{content}</p>
        {content_sub && <p className="text-muted-foreground">{content_sub}</p>}
        <div className="pt-4">
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
}
