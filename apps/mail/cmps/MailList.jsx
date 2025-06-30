import { MailPreview } from "./MailPreview.jsx"
import { mailService } from "../services/mail.service.js"

export function MailList({ mails, onRemoveMail }) {


    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} />
                    <button onClick={() => onRemoveMail(mail.id)}>Remove</button>
                </li>
            )}
        </ul>
    )



}
