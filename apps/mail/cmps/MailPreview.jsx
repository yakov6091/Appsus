import { utilService } from "../../../services/util.service.js"
const { useNavigate } = ReactRouterDOM
export function MailPreview({ mail, onRemoveMail, onToggleStar, onToggleRead }) {

    const { from, subject, body, sentAt, isStarred } = mail
    const formattedDate = utilService.formattedDate(sentAt)
    const navigate = useNavigate()

    function handleClick() {
        if (!mail.isRead) onToggleRead(mail.id)
        navigate(`/mail/${mail.id}`)

    }

    function handleStarClick(ev) {
        ev.stopPropagation()
        onToggleStar(mail.id)
    }

    function handleRemoveClick(ev) {
        ev.stopPropagation()
        onRemoveMail(mail.id)
    }

    return (
        <li className={`mail-preview ${mail.isRead ? "read" : "unread"}`}
            onClick={handleClick}
        >

            <span className={`mail-star ${isStarred ? "starred" : ""}`}
                onClick={handleStarClick}
                title="Star">
                <i className={isStarred ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
            </span>

            <span
                className="mail-trash"
                onClick={handleRemoveClick}
                title="Delete">
                <i className="fa-solid fa-trash"></i>
            </span>

            <header>
                <h3 className="mail-from">{from}</h3>
            </header>

            <section >
                <span className="mail-subject"><b>{subject}</b></span>
                <span className="mail-body-preview"><b>{body}</b></span>
            </section>

            <footer>
                <small className="mail-date">{formattedDate}</small>
            </footer>
        </li >
    )

}