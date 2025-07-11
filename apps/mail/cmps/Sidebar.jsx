import { MailCompose } from "./MailCompose.jsx"
const { useParams, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function Sidebar() {
    const [isComposeOpen, setIsComposeOpen] = useState(false)

    function onMailCompose() {
        setIsComposeOpen(true)

    }



    return (
        <div className="sidebar">
            <div className="btn-compose">
                <button onClick={onMailCompose}>
                    <i className="fa-solid fa-pencil"></i>Compose
                </button>
            </div>

            <div className="sidebar-nav">

                <div>
                    <i className="fa-solid fa-inbox"></i>
                    <Link to="/mail/inbox">Inbox</Link>
                </div>

                <div>
                    <i className="fa-solid fa-star"></i>
                    <Link to="/mail/starred">Starred</Link>
                </div>

                <div>
                    <i className="fa-solid fa-paper-plane"></i>
                    <Link to="/mail/sent">Sent</Link>
                </div>
            </div>

            {isComposeOpen && <MailCompose onClose={() => setIsComposeOpen(false)} />}
        </div >
    )


}