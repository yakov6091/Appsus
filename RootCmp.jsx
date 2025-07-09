const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'

import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'

import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { MailStarred } from './apps/mail/pages/MailStarred.jsx'
import { MailInbox } from './apps/mail/pages/MailInbox.jsx'

export function RootCmp() {
    return <Router>
        <section className="root-cmp">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />}>
                    <Route path=":mailId" element={<MailDetails />} />
                    <Route path="inbox" element={<MailInbox />} />
                    <Route path="starred" element={<MailStarred />} />
                    {/* <Route path="mail/sent" element={<MailSent />} /> */}


                </Route>

                <Route path="/note" element={<NoteIndex />} />

            </Routes>
            <UserMsg />
        </section>
    </Router>
}
