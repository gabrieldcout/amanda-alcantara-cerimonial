import { MediaImage } from "@/components/site/MediaImage";

type Testimonial = {
  id: string;
  clientName: string;
  eventType?: string | null;
  quote: string;
  rating: number;
  photoUrl?: string | null;
};

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex gap-1 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < testimonial.rating ? "" : "opacity-25"}>
            ★
          </span>
        ))}
      </div>
      <div
        className="rich-text testimonial-quote flex-1 text-foreground/90 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: testimonial.quote }}
      />
      <div className="flex items-center gap-3 pt-2">
        <MediaImage
          src={testimonial.photoUrl}
          alt={testimonial.clientName}
          className="h-11 w-11 shrink-0 rounded-full object-cover"
          placeholderLabel={testimonial.clientName.charAt(0)}
        />
        <div>
          <p className="text-sm font-medium text-foreground">
            {testimonial.clientName}
          </p>
          {testimonial.eventType && (
            <p className="text-xs text-muted-foreground">{testimonial.eventType}</p>
          )}
        </div>
      </div>
    </div>
  );
}
