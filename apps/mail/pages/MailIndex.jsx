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
        // Find the mail to update before making the copy
        const mailToUpdate = mails.find(mail => mail.id === mailId)
        if (!mailToUpdate) return // Should not happen if mailId is valid

        // Create a copy of the mail object with the updated property
        const updateMail = { ...mailToUpdate, isStarred: !mailToUpdate.isStarred }
        //Update state first
        setMails(mails =>
            mails.map(mail =>
                mail.id === mailId ? updateMail : mail
            )
        )
        // Call mailService.save with the single updated mail object
        mailService.save(updateMail)
            .then(savedMail => {
                console.log('Mail star status saved successfully:', savedMail)

            })
            .catch(err => {
                console.error('Error saving mail star status:', err)

            })
    }


    function onToggleRead(mailId) {
        const mailToUpdate = mails.find(mail => mail.id === mailId)
        if (!mailToUpdate) return

        //Create a NEW mail object with the toggled 'isRead' property
        const updatedMail = { ...mailToUpdate, isRead: !mailToUpdate.isRead }
        setMails(prevMails =>
            prevMails.map(mail =>
                mail.id === mailId ? updatedMail : mail // Replace the old mail with the updated one
            )
        )
        mailService.save(updatedMail)
            .then(savedMail => {
                console.log('Mail read status saved successfully to storage:', savedMail)
            })
            .catch(err => {
                console.error('Error saving mail read status to storage:', err)
            })

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




