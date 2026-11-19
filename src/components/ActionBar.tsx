import { Link } from "@/i18n/navigation";
import { CONTACT } from "@/content/services";
import { mailHref } from "@/lib/mail";

export default function ActionBar({ price, call, locale }: { price: string; call: string; locale: string }) {
  return (
    <nav className="action-bar" aria-label="Quick actions">
      <a href={CONTACT.phoneHref}>{call}</a>
      <a href={CONTACT.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
      <a href={mailHref(locale)}>Email</a>
      <Link href="/quote" className="primary">{price}</Link>
    </nav>
  );
}
