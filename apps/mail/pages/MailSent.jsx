import { MailList } from "../cmps/MailList.jsx"
const { useOutletContext } = ReactRouterDOM

export function MailSent() {
    const { mails, onRemoveMail, onToggleStar, onToggleRead } = useOutletContext()

    // Filter the mails to show only starred ones
    const sentMails = mails ? mails.filter(mail => mail.isSent) : [];

    if (!mails) return <div>Loading sent mails...</div>;
    return (
        <section className="mail-sent">
            <MailList
                mails={sentMails}
                onRemoveMail={onRemoveMail}
                onToggleStar={onToggleStar}
                onToggleRead={onToggleRead}
            />
        </section>
    );
}