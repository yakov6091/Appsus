const { useNavigate } = ReactRouterDOM
export function MailPreview({ mail, onRemove, onToggleStar }) {
    const { from, subject, body, sentAt, isStarred } = mail
    const navigate = useNavigate()

    function handleClick() {
        navigate(`/mail/${mail.id}`)

    }

    function handleStarClick(ev) {
        ev.stopPropagation()
        onToggleStar(mail.id)
    }

    return (
        <li className="mail-preview" onClick={handleClick}>
            <span className={`mail-star${isStarred ? "starred" : ""}`}
                onClick={handleStarClick}
                title="Star">
                <i className={isStarred ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
            </span>
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
        </li >
    )

}