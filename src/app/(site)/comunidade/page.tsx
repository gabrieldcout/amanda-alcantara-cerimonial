import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { NewPostForm } from "@/components/community/NewPostForm";
import { PostCard } from "@/components/community/PostCard";
import { getBrideSession } from "@/lib/brideAuth";
import { getFeedPosts } from "@/lib/data";
import { logoutAction } from "@/lib/actions/brideAuth";

export const metadata: Metadata = {
  title: "Comunidade Noivas AA | Amanda Alcântara Cerimonial",
};

export default async function ComunidadePage() {
  const session = await getBrideSession();
  const posts = await getFeedPosts(session?.userId);

  return (
    <Container className="py-20 sm:py-28">
      <div className="flex flex-col gap-10 rounded-3xl bg-accent/25 p-6 sm:p-10 lg:p-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Comunidade Noivas AA"
            title="Um espaço para trocar com outras noivas"
            subtitle="Divida experiências, dúvidas e alegrias com quem também está planejando o grande dia."
            align="left"
          />
          {session ? (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">Olá, {session.name}</span>
              <form action={logoutAction}>
                <button type="submit" className="text-accent hover:underline">
                  Sair
                </button>
              </form>
            </div>
          ) : (
            <div className="flex gap-3">
              <ButtonLink href="/comunidade/entrar" variant="outline">
                Entrar
              </ButtonLink>
              <ButtonLink href="/comunidade/cadastro">Criar conta</ButtonLink>
            </div>
          )}
        </div>

        {session ? (
          <NewPostForm />
        ) : (
          <div className="rounded-2xl border border-dashed border-border/60 bg-background/50 p-6 text-center text-muted-foreground">
            <Link href="/comunidade/entrar" className="text-accent hover:underline">
              Entre
            </Link>{" "}
            ou{" "}
            <Link href="/comunidade/cadastro" className="text-accent hover:underline">
              crie sua conta
            </Link>{" "}
            para postar, comentar e reagir.
          </div>
        )}

        <div className="flex flex-col gap-6">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Ainda não há posts por aqui. Seja a primeira a compartilhar!
            </p>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} currentUserId={session?.userId ?? null} />
            ))
          )}
        </div>
      </div>
    </Container>
  );
}
