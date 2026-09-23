import { MediaImage } from "@/components/site/MediaImage";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  photoUrl?: string | null;
};

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <MediaImage
        src={member.photoUrl}
        alt={member.name}
        className="h-40 w-40 rounded-full object-cover"
        placeholderLabel={member.name.charAt(0)}
      />
      <div>
        <p className="font-serif-display text-lg text-foreground">{member.name}</p>
        <p className="text-xs uppercase tracking-[0.15em] text-accent">
          {member.role}
        </p>
      </div>
      {member.bio && (
        <div
          className="rich-text max-w-xs text-sm text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: member.bio }}
        />
      )}
    </div>
  );
}
