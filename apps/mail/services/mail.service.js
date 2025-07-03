import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'MahatmaAppsus'
}

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail =>
                    regExp.test(mail.subject) ||
                    regExp.test(mail.body) ||
                    regExp.test(mail.from)
                )
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId).then(_setNextPrevMailId)
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(txt = '') {
    return { txt }
}

function getDefaultFilter() {
    return { txt: '' }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: utilService.makeId(),
                createdAt: 1551133930500,
                subject: 'Miss you!',
                body: 'Would to catch up',
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                isStarred: false
            },
            {
                id: utilService.makeId(),
                createdAt: 1652234930500,
                subject: 'Meeting Reminder',
                body: 'Don’t forget about the team meeting at 10 AM tomorrow.',
                isRead: true,
                sentAt: 1652234930594,
                removedAt: null,
                from: 'boss@company.com',
                to: 'user@appsus.com',
                isStarred: false
            },
            {
                id: utilService.makeId(),
                createdAt: 1641123930500,
                subject: 'Discount Offer!',
                body: 'Get 30% off your next purchase. Limited time only.',
                isRead: false,
                sentAt: 1641123930594,
                removedAt: null,
                from: 'sales@shopnow.com',
                to: 'user@appsus.com',
                isStarred: false
            },
            {
                id: utilService.makeId(),
                createdAt: 1630012930500,
                subject: 'Trip Photos 📸',
                body: 'Here are the photos from our trip to the mountains. So fun!',
                isRead: true,
                sentAt: 1630012930594,
                removedAt: null,
                from: 'friend@travelers.com',
                to: 'user@appsus.com',
                isStarred: false
            },
            {
                id: utilService.makeId(),
                createdAt: 1629901830500,
                subject: 'Password Change Requested',
                body: 'We noticed a request to change your password. Was this you?',
                isRead: false,
                sentAt: 1629901830594,
                removedAt: null,
                from: 'security@safeweb.com',
                to: 'user@appsus.com',
                isStarred: false
            }


        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail() {
    const mail = getEmptyMail(vendor, speed)
    mail.id = makeId()
    return mail
}

function getFilterFromSearchParams(searchParams) {
    console.log(searchParams)
    const txt = searchParams.get('txt') || ''
    const minSpeed = searchParams.get('minSpeed') || ''

    return {
        txt,
        minSpeed
    }
}

function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}



