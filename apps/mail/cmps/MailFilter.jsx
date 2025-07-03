import { MailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailFilter({ defaultFillter, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFillter })

    function handleChange({ target }) {
        const value = target.value
        console.log('Filter value:', value)
        setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
        onSetFilter({ txt: value }, console.log({ txt: value }))

    }

    return (
        <section className="mail-filter">
            <h1 className="mail-logo">Mail</h1>

            <form onSubmit={ev => ev.preventDefault()}>
                <label htmlFor="search-bar"></label>
                <input
                    onChange={handleChange}
                    value={filterByToEdit.txt || ''}
                    type="text"
                    name="txt"
                    placeholder="Search mail "></input>
            </form>

        </section>
    )
}