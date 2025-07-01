import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"

const { Outlet, useParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    // const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const { mailId } = useParams()
    useEffect(() => {
        loadEmails()
    }, [])

    function loadEmails() {
        mailService.query()
            .then(mails => setMails(mails))
            .catch(err => console.log('err:', err))
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(mails => mails.filter(mail => mail.id !== mail.id))
            })
            .catch(err => {
                console.log('err:', err)
            })

    }


    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index" >
            {!mailId ? <MailList mails={mails}
                onRemoveMail={onRemoveMail} /> :
                <Outlet />}
        </section>


    )
}




