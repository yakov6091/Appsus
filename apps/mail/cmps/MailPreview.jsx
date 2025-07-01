const { useNavigate } = ReactRouterDOM
export function MailPreview({ mail, onRemove }) {
    const { from, subject, sentAt } = mail
    const navigate = useNavigate()

    function handleClick() {
        navigate(`/mail/${mail.id}`)

    }

    return (
        <li className="mail-preview" onClick={handleClick}>
            <header>
                <h3>{from}</h3>
            </header>

            <section >
                <p>{subject}</p>
            </section>

            <footer>
                <small>{sentAt}</small>
            </footer>
        </li>
    )

}