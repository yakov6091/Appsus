
import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onRemoveMail, onToggleStar, onToggleRead }) {


    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <MailPreview
                    key={mail.id}
                    mail={mail}
                    onRemoveMail={onRemoveMail}
                    onToggleStar={onToggleStar}
                    onToggleRead={onToggleRead} />
            )}
        </ul>
    )
}
