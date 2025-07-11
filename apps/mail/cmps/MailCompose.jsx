import { mailService } from "../services/mail.service.js"
const { useState } = React

export function MailCompose({ onClose, onSendMail }) {
    const [form, setForm] = useState(mailService.getEmptyMail())


    function handleSubmit(ev) {
        ev.preventDefault()

        form.sentAt = Date.now()
        mailService.save(form)
            .then(() => {
                if (typeof onSendMail === 'function') onSendMail()
                if (typeof onClose === 'function') onClose()
                setForm(mailService.getEmptyMail())
            })
            .catch((err) => {
                console.log('err', err)
            })

    }

    function handleChange(ev) {
        const { name, value } = ev.target
        setForm(prevForm => ({ ...prevForm, [name]: value }))
    }

    return (
        <form className="new-compose" onSubmit={handleSubmit}>
            <header className="header">
                <h1>New Mail</h1> <button type="button" onClick={onClose}>X</button>
            </header>

            <main className="massage-main-data">
                <label htmlFor="from" className="mail-from">From: </label>
                <input name="from" value={form.from} onChange={handleChange} placeholder="Your-Mail" />


                <label htmlFor="to" className="mail-to">To:</label>
                <input name="to" value={form.to} onChange={handleChange} />


                <label htmlFor="subject" className="mail-subject">Subject:</label>
                <input name="subject" value={form.subject} onChange={handleChange} />


                <section className="mail-body">
                    <textarea name="body" value={form.body} onChange={handleChange} ></textarea>
                </section>

            </main>

            <div className="action-btn">
                <button type="submit">Send</button>
            </div>

        </form>
    )
}