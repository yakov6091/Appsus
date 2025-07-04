
import { mailService } from "../../mail/services/mail.service.js"
const { useParams, useNavigate, Link } = ReactRouterDOM

const { useState, useEffect } = React

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const navigate = useNavigate()
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
    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                navigate('/mail/inbox')

            })
            .catch(err => {
                console.log('err:', err)
            })

    }
    function onBack() {
        navigate('/mail/inbox')
    }


    if (!mail) return <div>Loading...</div>
    const { subject, body, from, to, sentAt } = mail
    const formattedDate = new Date(sentAt).toLocaleString()
    return (
        <section className="mail-details">
            <button className="back" onClick={() => onBack()}><i className="fa-solid fa-arrow-left"></i></button>
            <button className="trash" onClick={() => onRemoveMail(mail.id)}><i className="fa-solid fa-trash"></i></button>
            <h1>Mail from: {from} <span>{formattedDate}</span></h1>
            <h2>Mail to:{to}</h2>

            <h3>Subject: {subject}</h3>

            <p>{body}</p>
        </section>
    )
}