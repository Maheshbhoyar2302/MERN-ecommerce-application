// apifeatures: query selector, search, filter, price range, pagination

class ApiFeatures {
    constructor(query, querystr) {
        this.query = query
        this.querystr = querystr
    }

    // search feature with pattern matching
    search() {
        const keyword = this.querystr.keyword ? {
            name: {
                $regex: this.querystr.keyword,
                //user can search anything so made case insensitive
                $options: "i" //for caseinsensitive
            },
        } : {}

        //example : this.query = Product.find({...}) in productController page
        this.query = this.query.find({ ...keyword })
        return this
    }

    //filter function

    filter() {
        //to get actual copy not refrence
        const queryCopy = { ...this.querystr}

        //filter is for categories which are fixed : in frontend user can select only listed categories, he cant make his own category, also as it is fixed we no need case insensitive

        //removing some fields for category
        //we dont want this words in the filter query
        const removeFields = ["keyword", "page", "limit"]

        //if above words are present in querystr it will get removed
        removeFields.forEach(key => delete queryCopy[key])


        //filter for price check : we want to give the range for price
        //queryCopy is object : make it string
        let queryStr = JSON.stringify(queryCopy)
        //we want $ in front of key : for using mongodb operatores like $gt, $lt, ..
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

        //again convert the queryCopy to object
        this.query = this.query.find(JSON.parse(queryStr))
        return this

    }

    pagination(resultPerPage) {
        const currentPage = Number(this.querystr.page) || 1

        const skip = resultPerPage * (currentPage -1)

        this.query = this.query.limit(resultPerPage).skip(skip)

        return this
    }

}

module.exports = ApiFeatures