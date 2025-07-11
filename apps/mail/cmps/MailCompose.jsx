import { mailService } from "../services/mail.service.js"
const { useState } = React
export function MailCompose({ onClose }) {
    const [form, setForm] = useState({
        from: mailService.loggedinUser.email,
        to: '',
        subject: '',
        body: ''
    })

    function handleSubmit(ev) {
        ev.preventDefault()
        alert('Email Sent')
        onClose()
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
                <button tupe="submit">Send</button>
            </div>

        </form>
    )
}