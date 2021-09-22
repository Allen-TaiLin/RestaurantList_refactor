const page = {
  pagination: (reqPage, data) => {
    // 一頁幾筆資料
    const pageLimit = 3
    // 紀錄區間偏移起始
    let offset = 0
    if (reqPage) {
      offset = (reqPage - 1) * pageLimit
    }

    // console.log('pageList', reqPage, data)
    let count = data.length
    const page = Number(reqPage) || 1  // 目前分頁位置
    const pages = Math.ceil(count / pageLimit)  // 最大分頁數
    const totalPage = Array.from({ length: pages }).map((item, index) => index + 1)  // 初始分頁顯示內容
    const prev = page - 1 < 1 ? 1 : page - 1  // 上一頁位置
    const next = page + 1 > pages ? pages : page + 1  // 下一頁位置
    const data_slice = data.slice(offset, (offset + pageLimit))  // 分頁區間資料
    return {
      data_slice: data_slice,
      page: page,
      totalPage: totalPage,
      prev: prev,
      next: next
    }
  }
}

module.exports = page