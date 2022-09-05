function Product(id, name, description,
                 price, brand, sizes,
                 activeSize, quantity, date,
                 reviews, images) {

    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = sizes;
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = date;
    this.reviews = reviews;
    this.images = images;

    this.getId = () => {
        return this.id;
    }

    this.setId = (id) => {
        this.id = id;
    }

    this.getName = () => {
        return this.name;
    }

    this.setName = (name) => {
        this.name = name;
    }

    this.getDescription = () => {
        return this.description;
    }

    this.setDescription = (description) => {
        this.description = description;
    }

    this.getPrice = () => {
        return this.price;
    }

    this.setPrice = (price) => {
        this.price = price;
    }

    this.getBrand = () => {
        return this.brand;
    }

    this.setBrand = (brand) => {
        this.brand = brand;
    }

    this.getSizes = () => {
        return this.sizes;
    }

    this.setSizes = (sizes) => {
        this.sizes = sizes;
    }

    this.getActiveSize = () => {
        return this.activeSize;
    }

    this.setActivSizes = (activeSize) => {
        this.activeSize = activeSize;
    }

    this.getQuantity = () => {
        return this.quantity;
    }

    this.setQuantity = (quantity) => {
        this.quantity = quantity;
    }

    this.getDate = () => {
        return this.date;
    }

    this.setDate = (date) => {
        this.date = date;
    }

    this.getReviews = () => {
        return this.reviews;
    }

    this.setReviews = (reviews) => {
        this.reviews = reviews;
    }

    this.getImages = () => {
        return this.images;
    }

    this.setImages = (images) => {
        this.images = images;
    }

    this.getReviewByID = (id) => {
        for (let i = 0; i < this.reviews.length; i++) {
            if (this.reviews[i].getId() == id) {
                return this.reviews[i];
            }
        }
    }

    this.getImage = (num) => {
        if (num != undefined) {
            return this.images[num];
        }
        return this.images[0];
    }

    this.addSize = (size) => {
        this.sizes.push(size);
    }

    this.deleteSize = (size) => {
        for (let i = 0; i < this.sizes.length; i++) {
            if (this.sizes[i] == size) {
                this.sizes.splice(i, 1);
            }
        }
    }

    this.addReview = (review) => {
        this.reviews.push(review);
    }

    this.deleteReview = (review) => {
        for (let i = 0; i < this.reviews.length; i++) {
            if (this.reviews[i] == review) {
                this.reviews.splice(i, 1);
            }
        }
    }

    this.getAverageRating = () => {
        let sum = 0;
        for (let i = 0; i < this.reviews.length; i++) {
            sum += this.reviews[i].getAverageRating();
        }
        return sum / this.reviews.length;
    }

}


function Review(id, author, date,
                comment, rating) {
    this.id = id;
    this.author = author;
    this.date = date;
    this.comment = comment;
    this.rating = {
        'service': rating[0],
        'price': rating[1],
        'value': rating[2],
        'quality': rating[3]
    };


    this.getId = () => {
        return this.id;
    }

    this.setId = (id) => {
        this.id = id;
    }

    this.getAuthor = () => {
        return this.author;
    }

    this.setAuthor = (author) => {
        this.author = author;
    }

    this.getDate = () => {
        return this.date;
    }

    this.setDate = (date) => {
        this.date = date;
    }

    this.getComment = () => {
        return this.comment;
    }

    this.setComment = (comment) => {
        this.comment = comment;
    }

    this.getRating = (key) => {
        return this.rating.get(key);
    }

    this.setRating = (key, value) => {
        this.rating.set(key, value);
    }

    this.getAverageRating = () => {
        let sum = 0;
        for (let value of this.rating.values()) {
            sum += +value;
        }
        return sum / this.rating.size;
    }
}

function searchProducts(products, search) {
    let result = []
    products.forEach(value => {
        if (value.getName().toLowerCase().includes(search.toLowerCase()) ||
            value.getDescription().toLowerCase().includes(search.toLowerCase()))
            result.push(value);
    });
    return result
}

function sortProducts(products, sortRule) {
    switch (sortRule.toLowerCase()) {
        case "id":
            products.sort((a, b) => a.getId() - b.getId());
            break;
        case "name":
            products.sort((a, b) => a.getName() - b.getName());
            break;
        case "price":
            products.sort((a, b) => a.getPrice() - b.getPrice());
            break;

        default:
            break;
    }
}

let review = new Review("1", "me", new Date(), "somethisng", [15,20,14,9])
let review2 = new Review("2", "meToo", new Date(), "somethisngNew", [10,25,3,9])
let review3 = new Review("3", "eeeeewerwer", new Date(), "somNew", [9,50,40,19])

let product = new Product("5", "b", "cell iphone", 25000, "Iphone", ["mini", "max"], "mini", 100, new Date(), [review, review2],
    ["images/252993_1.webp", "images/iphone-12-family-select-2021.jfif", "images/iphone-13-family-hero.png"])
let product2 = new Product("2", "a", "cell iphone", 26000, "Iphone", ["mini", "max"], "mini", 100, new Date(), [review, review2],
    ["images/252993_1.webp", "images/iphone-12-family-select-2021.jfif", "images/iphone-13-family-hero.png"])
let product3 = new Product("3", "c", "cell car", 24000, "Iphone", ["mini", "max"], "mini", 100, new Date(), [review, review2],
    ["images/252993_1.webp", "images/iphone-12-family-select-2021.jfif", "images/iphone-13-family-hero.png"])
let product4 = new Product("4", "d", "cell car", 30000, "Iphone", ["mini", "max"], "mini", 100, new Date(), [review, review2],
    ["images/252993_1.webp", "images/iphone-12-family-select-2021.jfif", "images/iphone-13-family-hero.png"])
let product5 = new Product("1", "e", "cell car", 32000, "Iphone", ["mini", "max"], "mini", 100, new Date(), [review, review2],
    ["images/252993_1.webp", "images/iphone-12-family-select-2021.jfif", "images/iphone-13-family-hero.png"])
let arr = [product, product2, product3, product4, product5]

// sortProducts(arr, "id")
// console.log(arr)
// console.log("old id " + product.getId()+"\n");
// product.setId("ha-ah")
// console.log("new id ");
// console.log(product.getId());
// console.log();
// console.log(product.getName());
// console.log(product.getDescription());
// console.log(product.getPrice());
// console.log(product.getBrand());
// console.log(product.getSizes());
// console.log(product.getActiveSize());
// console.log(product.getQuantity());
// console.log(product.getDate());
// console.log(product.getImage());
// console.log();
// product.addReview(review3);
// console.log(review.getAverageRating());
// console.log(review2.getAverageRating());
// console.log(review3.getAverageRating());
// console.log();
// console.log(product.getAverageRating());
// console.log();
// console.log(review.getRating("key"));
// console.log(searchProducts(arr, "Cell"))