import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { MediaImage } from "@/components/site/MediaImage";
import { ReactionBar } from "@/components/community/ReactionBar";
import { CommentForm } from "@/components/community/CommentForm";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { getBrideSession } from "@/lib/brideAuth";
import { getPostWithComments } from "@/lib/data";
import { deleteComment } from "@/lib/actions/community";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const session = await getBrideSession();
  const post = await getPostWithComments(postId, session?.userId);

  if (!post) notFound();
  if (!post.published && post.authorId !== session?.userId) notFound();

  return (
    <Container className="flex max-w-2xl flex-col gap-8 py-20 sm:py-28">
      <article className="flex flex-col gap-4 rounded-2xl bg-accent/25 p-6">
        <div className="flex items-center gap-3">
          <MediaImage
            src={post.author.avatarUrl}
            alt={post.author.name}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
            placeholderLabel={post.author.name.charAt(0)}
          />
          <div>
            <p className="text-sm font-medium text-foreground">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <p className="whitespace-pre-line text-foreground/90">{post.content}</p>

        {post.imageUrl && (
          <MediaImage
            src={post.imageUrl}
            alt="Foto do post"
            className="max-h-[520px] w-full rounded-xl object-cover"
          />
        )}

        <ReactionBar
          postId={post.id}
          reactions={post.reactions}
          currentUserId={session?.userId ?? null}
        />
      </article>

      <div className="flex flex-col gap-4">
        <p className="font-medium text-foreground">
          Comentários ({post.comments.length})
        </p>

        {post.comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 rounded-xl bg-accent/15 p-4">
            <MediaImage
              src={comment.author.avatarUrl}
              alt={comment.author.name}
              className="h-8 w-8 shrink-0 rounded-full object-cover"
              placeholderLabel={comment.author.name.charAt(0)}
            />
            <div className="flex-1">
              <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                {comment.author.name}
                {!comment.published && (
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-normal text-amber-700">
                    Aguardando aprovação
                  </span>
                )}
              </p>
              <p className="text-sm text-foreground/90">{comment.content}</p>
            </div>
            {session?.userId === comment.author.id && (
              <form action={deleteComment.bind(null, comment.id, post.id)}>
                <DeleteButton confirmText="Excluir este comentário?" />
              </form>
            )}
          </div>
        ))}

        {session ? (
          <CommentForm postId={post.id} />
        ) : (
          <p className="text-sm text-muted-foreground">
            Entre na comunidade para comentar.
          </p>
        )}
      </div>
    </Container>
  );
}
