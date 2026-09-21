import { getSiteSettings } from "@/lib/data";
import { updateSiteSettings } from "@/lib/actions/settings";
import { AdminField } from "@/components/admin/AdminField";
import { Button } from "@/components/ui/Button";

export default async function AdminConfiguracoesPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">
          Configurações do site
        </h1>
        <p className="text-sm text-muted-foreground">
          Textos e contatos exibidos nas páginas públicas.
        </p>
      </div>

      <form
        action={updateSiteSettings}
        className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6"
      >
        <AdminField label="Título principal (hero)" name="heroTitle">
          <input
            name="heroTitle"
            required
            defaultValue={settings.heroTitle}
            className="input"
          />
        </AdminField>
        <AdminField label="Subtítulo (hero)" name="heroSubtitle">
          <textarea
            name="heroSubtitle"
            required
            rows={2}
            defaultValue={settings.heroSubtitle}
            className="input resize-none"
          />
        </AdminField>
        <AdminField label="Texto 'Sobre'" name="aboutText">
          <textarea
            name="aboutText"
            required
            rows={4}
            defaultValue={settings.aboutText}
            className="input resize-none"
          />
        </AdminField>
        <AdminField label="Link do Instagram" name="instagramUrl">
          <input
            name="instagramUrl"
            defaultValue={settings.instagramUrl ?? ""}
            placeholder="https://instagram.com/..."
            className="input"
          />
        </AdminField>
        <AdminField label="Link do TikTok" name="tiktokUrl">
          <input
            name="tiktokUrl"
            defaultValue={settings.tiktokUrl ?? ""}
            placeholder="https://tiktok.com/@..."
            className="input"
          />
        </AdminField>
        <AdminField label="WhatsApp (apenas números, com DDI e DDD)" name="whatsappNumber">
          <input
            name="whatsappNumber"
            defaultValue={settings.whatsappNumber ?? ""}
            placeholder="5511999999999"
            className="input"
          />
        </AdminField>
        <AdminField label="E-mail de contato" name="email">
          <input
            name="email"
            type="email"
            defaultValue={settings.email ?? ""}
            className="input"
          />
        </AdminField>
        <div>
          <Button type="submit">Salvar configurações</Button>
        </div>
      </form>
    </div>
  );
}
