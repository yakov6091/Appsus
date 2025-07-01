import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onRemoveMail }) {


    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <MailPreview key={mail.id} mail={mail} removeMail={onRemoveMail} />
            )}
        </ul>
    )



}
