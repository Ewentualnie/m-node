function AbstractProduct(id, name, description,
                         price, brand, quantity,
                         date, reviews, images) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.quantity = quantity;
    this.date = date;
    this.reviews = reviews;
    this.images = images;
}

Object.assign(AbstractProduct.prototype, {
    getId() {
        return this.id;
    },

    setId(id) {
        this.id = id;
    },

    getName() {
        return this.name;
    },

    setName(name) {
        this.name = name;
    },

    getDescription() {
        return this.description;
    },

    setDescription(description) {
        this.description = description;
    },

    getPrice() {
        return this.price;
    },

    setPrice(price) {
        this.price = price;
    },

    getBrand() {
        return this.brand;
    },

    setBrand(brand) {
        this.brand = brand;
    },

    getQuantity() {
        return this.quantity;
    },

    setQuantity(quantity) {
        this.quantity = quantity;
    },

    getDate() {
        return this.date;
    },

    setDate(date) {
        this.date = date;
    },

    getReviews() {
        return this.reviews;
    },

    setReviews(reviews) {
        this.reviews = reviews;
    },

    getImages() {
        return this.images;
    },

    setImages(images) {
        this.images = images;
    },

    getReviewByID(id) {
        for (let i = 0; i < this.reviews.length; i++) {
            if (this.reviews[i].getId() === id) {
                return this.reviews[i];
            }
        }
    },

    getImage(num) {
        if (num !== undefined) {
            return this.images[num];
        }
        return this.images[0];
    },


    addReview(review) {
        this.reviews.push(review);
    },

    deleteReview(review) {
        for (let i = 0; i < this.reviews.length; i++) {
            if (this.reviews[i] === review) {
                this.reviews.splice(i, 1);
            }
        }
    },

    getAverageRating() {
        let sum = 0;
        for (let i = 0; i < this.reviews.length; i++) {
            sum += this.reviews[i].getAverageRating();
        }
        return sum / this.reviews.length;
    },

    getFullInformation() {
        let resultString = "";
        for (let i in this) {
            if (this.hasOwnProperty(i)) {
                resultString += i + " - " + this[i] + "\n";
            }
        }
        return resultString;
    },

    getPriceForQuantity(int) {
        return typeof (int) === "number" ?
            "$" + ((this.price * int * 100) / 100).toFixed(2) :
            "error - wrong number entered";
    },

    getterSetter(field, set) {
        if (set !== undefined) {
            this[field] = set;
        } else {
            return this[field]
        }
    }
})

function Clothes(material, color, ...other) {
    AbstractProduct.call(this, ...other);
    this.material = material;
    this.color = color;
}

Clothes.prototype = Object.create(AbstractProduct.prototype)

Object.assign(Clothes.prototype, {
    getMaterial() {
        return this.material;
    },
    setMaterial(material) {
        this.material = material;
    },
    getColor() {
        return this.color;
    },
    setColor(color) {
        this.color = color;
    }
})

function Electronics(warranty, power, ...other) {
    AbstractProduct.call(this, ...other);
    this.warranty = warranty;
    this.power = power;
}

Electronics.prototype = Object.create(AbstractProduct.prototype)
Object.assign(Electronics.prototype, {
    getWarranty() {
        return this.warranty;
    },
    setWarranty(warranty) {
        this.warranty = warranty;
    },
    getPower() {
        return this.power;
    },
    setPower(power) {
        this.power = power;
    }
})

function Review(id, author, date, comment, rating) {
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
    return products.filter(value => {
        if (value.getName().toLowerCase().includes(search.toLowerCase() ||
            value.getDescription().toLowerCase().includes(search.toLowerCase())))
            return value;
    });
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

let review1 = new Review("1", "me", new Date(), "somethings", [15, 45, 47, 8])
let review2 = new Review("2", "meToo", new Date(), "somethingsNew", [15, 45, 47, 8])


let cloth = new Clothes("bawowna", "fire", "5", "Name", "cell iphone", 250, "Iphone", 100, new Date(), [review1, review2],
    ["images/252993_1.webp", "images/iphone-12-family-select-2021.jfif", "images/iphone-13-family-hero.png"])
let electric1 = new Electronics(5, 100, "3", "ggg", "cell iphone", 250, "Iphone", 100, new Date(), [review1, review2],
    ["images/252993_1.webp", "images/iphone-12-family-select-2021.jfif", "images/iphone-13-family-hero.png"])
let electric2 = new Electronics(5, 100, "45", "rrr", "cell iphone", 250, "Iphone", 100, new Date(), [review1, review2],
    ["images/252993_1.webp", "images/iphone-12-family-select-2021.jfif", "images/iphone-13-family-hero.png"])
let electric3 = new Electronics(5, 100, "5", "Name", "cell iphone", 250, "Iphone", 100, new Date(), [review1, review2],
    ["images/252993_1.webp", "images/iphone-12-family-select-2021.jfif", "images/iphone-13-family-hero.png"])
let electric4 = new Electronics(5, 100, "9", "nime", "cell iphone", 250, "Iphone", 100, new Date(), [review1, review2],
    ["images/252993_1.webp", "images/iphone-12-family-select-2021.jfif", "images/iphone-13-family-hero.png"])
let electricArr = [electric1, electric2, electric3, electric4]
// let abstractProduct = new AbstractProduct(45, "545456", "aeefd egrthw wrt ghgh", 100, "ytyt", 101, new Date(), [review1, review2])
// console.log(abstractProduct)
// console.log(cloth.getName());
// cloth.setName("new bawowna");
// console.log(cloth.getName());
// console.log(cloth.getFullInformation())
// console.log(cloth.getPriceForQuantity(5))
// console.log()
// console.log(electric1.getFullInformation())
// sortProducts(electricArr, "id")
// console.log(searchProducts(electricArr, "name"))