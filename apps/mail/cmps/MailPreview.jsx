export function MailPreview({ mail }) {
    const { from, body, sentAt } = mail
    return (
        <article className="mail-preview">
            <header>
                <h3>{from}</h3>
            </header>

            <section>
                <p>{body}</p>
            </section>

            <footer>
                <small>{sentAt}</small>
            </footer>
        </article>
    )

}