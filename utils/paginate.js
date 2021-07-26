module.exports = {
    paginate:  function(req) {
        const page = req.query.page || 2
    const limit = process.env.NODE_PG || 10

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const data_ = {}
    const url = process.env.NODE_IS_HOST + req.headers.host
    data_.data = req.data.slice(startIndex, endIndex)
    const lastPage = Math.ceil(req.data.length / limit)
    data_.links = {
        first: `${url}${req.baseUrl}?page=1`,
        last: `${url}${req.baseUrl}?page=${lastPage}`,
        prev: page > 1 ? `${url}${req.baseUrl}?page=${page - 1}` : null,
        next: page < lastPage ? `${url}${req.baseUrl}?page=${page + 1}` : null
    }
    data_.meta = {
        currenct_page: page,
        from: endIndex,
        last_page: lastPage,
        links: generateLinks(url, lastPage, page, req.baseUrl)
    }
    data_.path = `${url}${req.baseUrl}`
    data_.per_page = 1 * limit;
    data_.total = req.data.length;
    return data_
    }
}

generateLinks = (base_url, maxPageNumber, activePage, url) => {
    const links = [];
    for (let i = 1; i <= maxPageNumber; i++) {
        links.push({
            url: `${base_url}${url}?page=${i}`,
            label: i,
            active: i == activePage ? true : false
        })
    }
    return links
}