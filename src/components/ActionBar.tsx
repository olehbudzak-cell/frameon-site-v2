import { Link } from "@/i18n/navigation";
import { CONTACT } from "@/content/services";

export default function ActionBar({ price, call }: { price: string; call: string }) {
  return (
    <nav className="action-bar" aria-label="Quick actions">
      <a href={CONTACT.phoneHref}>{call}</a>
      <a href={CONTACT.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
      <Link href="/quote" className="primary">{price}</Link>
    </nav>
  );
}
