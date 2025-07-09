import { MailList } from "../cmps/MailList.jsx";
const { useOutletContext } = ReactRouterDOM

export function MailInbox() {
    // Destructure the context provided by the Outlet in MailIndex
    const { mails, onRemoveMail, onToggleStar, onToggleRead } = useOutletContext()

    if (!mails) return <div>Loading inbox...</div>;
    return (
        <section className="mail-inbox">
            {/* Render the MailList component, passing down the necessary props */}
            <MailList
                mails={mails}
                onRemoveMail={onRemoveMail}
                onToggleStar={onToggleStar}
                onToggleRead={onToggleRead}
            />
        </section>
    )

}