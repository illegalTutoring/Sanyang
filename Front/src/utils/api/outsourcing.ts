import axios from 'axios'

const serverURL = 'http://'

export default async function getOutsourcingList(year: number, month: number) {
    const response = await axios({
        method: 'GET',
        url: serverURL + '/outsourcing?year=' + year + 'month=' + month,
    })
    return response.data
}
