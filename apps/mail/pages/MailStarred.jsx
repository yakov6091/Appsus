import { MailList } from "../cmps/MailList.jsx"
const { useOutletContext } = ReactRouterDOM

export function MailStarred() {
    const { mails, onRemoveMail, onToggleStar, onToggleRead } = useOutletContext()

    // Filter the mails to show only starred ones
    const starredMails = mails ? mails.filter(mail => mail.isStarred) : [];

    if (!mails) return <div>Loading starred mails...</div>;
    return (
        <section className="mail-starred">
            <MailList
                mails={starredMails}
                onRemoveMail={onRemoveMail}
                onToggleStar={onToggleStar}
                onToggleRead={onToggleRead}
            />
        </section>
    );
}

