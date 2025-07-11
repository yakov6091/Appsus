const { useState, useEffect } = React

export function MailFilter({ defaultFilter, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (field === 'isRead') {
            value = value === '' ? '' : value === 'true'
        }
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;


            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="mail-filter">
            <form onSubmit={ev => ev.preventDefault()}>
                <label htmlFor="search-bar"></label>
                <input
                    onChange={handleChange}
                    value={filterByToEdit.txt || ''}
                    type="text"
                    name="txt"
                    placeholder="Search mail "></input>
            </form>

            <section>
                <select className="categories"
                    name="isRead"
                    value={filterByToEdit.isRead}
                    onChange={handleChange}
                >
                    <option value="">--Please choose an option--</option>
                    <option value="true">Read mails</option>
                    <option value="false">Unread mails</option>
                    {/* <option value="new-mails">New mails</option>
                    <option value="old-mails">Old mails</option> */}
                </select>
            </section>

        </section>

    )
}


