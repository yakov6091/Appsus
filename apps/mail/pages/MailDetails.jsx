
import { mailService } from "../../mail/services/mail.service.js"
const { useParams, useNavigate, Link } = ReactRouterDOM

const { useState, useEffect } = React

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadMail()

    }, [params.mailId])


    function loadMail() {
        mailService.get(params.mailId)
            .then(mail => {
                // mail.isRead = true
                setMail(mail)

            })
            .catch(err => console.log('err:', err))
    }


    if (!mail) return <div>Loading...</div>
    const { subject, body, from, to, sentAt } = mail
    return (
        <section className="mail-deatails">
            <h1>Mail from: {from} <span>{sentAt}</span></h1>
            <h2>Mail to:{to}</h2>

            <h3>Subject: {subject}</h3>

            <p>{body}</p>
        </section>
    )
}