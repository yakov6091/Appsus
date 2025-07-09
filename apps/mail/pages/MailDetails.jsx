
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

            {/* Header with actions and possibly the subject line */}
            <div className="mail-details-header">

                <div className="mail-details-actions">
                    <button className="back-btn" onClick={() => onBack()} title="Back to Inbox">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <button className="trash-btn" onClick={() => onRemoveMail(mail.id)} title="Delete Mail">
                        <i className="fa-solid fa-trash"></i>
                    </button>

                </div>
            </div>

            {/* Mail Metadata (Sender, Recipient, Date) */}
            <div className="mail-details-meta">
                <h2 className="mail-details-subject">{subject}</h2>

                <div className="mail-details-from-date-wrapper">
                    <div className="mail-details-from">
                        <span className="label">From:</span>
                        <span className="value">{from}</span>
                    </div>
                    <div className="mail-details-date">
                        <span className="value">{formattedDate}</span>
                    </div>
                </div>

                <div className="mail-details-to">
                    <span className="label">To:</span>
                    <span className="value">{to}</span>
                </div>

            </div>

            {/* Mail Body */}
            <div className="mail-details-body">
                <p>{body}</p>
            </div>

        </section>
    )
}