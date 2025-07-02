import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onRemoveMail, onToggleStar }) {


    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <MailPreview
                    key={mail.id}
                    mail={mail}
                    removeMail={onRemoveMail}
                    onToggleStar={onToggleStar} />
            )}
        </ul>
    )



}
