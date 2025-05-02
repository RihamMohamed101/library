






export class ApiFeature {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery
        this.searchQuery = searchQuery
    }

    filter() {
        let filterObj = structuredClone(this.searchQuery)
     
        
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(lt|lte|gt|gte)/g,(value) => `$${value}`)

        filterObj = JSON.parse(filterObj)

       

        let excuted = ['page', 'sort', 'fields', 'search']
        excuted.forEach(val => {
            delete filterObj[val]
        })
         this.mongooseQuery.find(filterObj)

        return this
    }


    sort() {
        if (this.searchQuery.sort) {
            let sortBy = this.searchQuery.sort.split(',').join("")
            this.mongooseQuery.collation({ locale: "en", strength: 1 }).sort(sortBy)
        }

        return this
    }


    search() {
        if (this.searchQuery.search) {


            let x = [ 
                    { author: { $regex: this.searchQuery.search, $options: 'i' } },
                    { title: { $regex: this.searchQuery.search, $options: 'i' } },
                    { fullName: { $regex: this.searchQuery.search, $options: 'i' } },
                    { membershipType: { $regex: this.searchQuery.search, $options: 'i' } },
                    { borrowDate: { $regex: this.searchQuery.search, $options: 'i' } }
                
            ]

            if (Number(this.searchQuery.search)) {
                x.push({ joinYear: Number(this.searchQuery.search) })
                 x.push({ yearPublished: Number(this.searchQuery.search) })
                
             }

            
            
            this.mongooseQuery.find({
                $or:x
            })
        }

        return this
    }

}