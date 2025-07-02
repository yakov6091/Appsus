const { useNavigate } = ReactRouterDOM
export function MailPreview({ mail, onRemove }) {
    const { from, subject, body, sentAt } = mail
    const navigate = useNavigate()

    function handleClick() {
        navigate(`/mail/${mail.id}`)

    }

    return (
        <li className="mail-preview" onClick={handleClick}>
            <header>
                <h3 className="mail-from">{from}</h3>
            </header>

            <section >
                <span className="mail-subject"><b>{subject}</b></span>
                <span className="mail-body-preview"><b>{body.slice(0, 60)}...</b></span>
            </section>

            <footer>
                <small className="mail-date">{sentAt}</small>
            </footer>
        </li>
    )

}