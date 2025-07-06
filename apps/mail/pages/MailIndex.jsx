import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { Sidebar } from "../cmps/Sidebar.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"

const { Outlet, useParams } = ReactRouterDOM
const { useState, useEffect, Fragment } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const { mailId } = useParams()

    useEffect(() => {
        loadEmails()
    }, [filterBy])

    function loadEmails() {
        mailService.query(filterBy)
            .then(mails => setMails(mails))
            .catch(err => console.log('err:', err))
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(mails => mails.filter(mail => mail.id !== mailId))
            })
            .catch(err => {
                console.log('err:', err)
            })

    }

    function onToggleStar(mailId) {
        setMails(mails =>
            mails.map(mail =>
                mail.id === mailId ? { ...mail, isStarred: !mail.isStarred } : mail
            )
        )
    }

    function onToggleRead(mailId) {
        setMails(prevMails =>
            prevMails.map(mail =>
                mail.id === mailId ? { ...mail, isRead: !mail.isRead } : mail
            )
        )
    }

    function onSetFilter(filterBy) { // ex: {txt:'asd'}
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!mails) return <div>Loading...</div>
    return (
        <Fragment>
            <section className="mail-index">
                <aside>
                    <div className="mail-logo">
                        <h1>Mail</h1>
                    </div>
                    <Sidebar />
                </aside>

                <main className="mail-main">
                    <MailFilter
                        defaultFillter={filterBy}
                        onSetFilter={onSetFilter}
                    />
                    {!mailId ? (
                        <MailList
                            mails={mails}
                            onRemoveMail={onRemoveMail}
                            onToggleStar={onToggleStar}
                            onToggleRead={onToggleRead}
                        />
                    ) : (
                        <Outlet />
                    )}
                </main>

            </section>
        </Fragment>
    )
}




