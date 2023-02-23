class Product {
    constructor(name, price, description, weight, domestic) {
      this.name = name;
      this.price = price;
      this.description = description;
      this.weight = weight;
      this.domestic = domestic;
    }
  
    truncateDescription(length) {
      if (this.description.length > length) {
        return this.description.substring(0, length - 3) + '...';
      } else {
        return this.description;
      }
    }
  
    print() {
      console.log("..." + this.name)
      console.log("Price: $" + parseFloat(this.price).toFixed(1))
      console.log(this.truncateDescription(13))
  
      if (!this.weight) {
        console.log("Weight: N/A")
      } else {
        console.log("Weight: " + this.weight + "g")
      }
    }
  }
  
  class ProductList {
    constructor(url) {
      this.url = url;
      this.domesticCost = 0;
      this.importedCost = 0;
      this.domesticCounter = 0;
      this.importedCounter = 0;
      this.products = [];
    }
  
    fetchData() {
      fetch(this.url)
        .then((response) => response.json())
        .then((data) => {
          data.forEach((productData) => {
            const product = new Product(
              productData.name,
              productData.price,
              productData.description,
              productData.weight,
              productData.domestic
            );
            this.products.push(product);
          });
        })
        .then(() => this.processData())
        .catch((error) => console.error(error));
    }
  
    processData() {
      this.products.sort((a, b) => a.name.localeCompare(b.name));
  
      console.log(". Domestic");
      this.products.forEach((product) => {
        if (product.domestic) {
          this.domesticCounter++;
          this.domesticCost += product.price;
          product.print();
        }
      });
  
      console.log(". Imported");
      this.products.forEach((product) => {
        if (!product.domestic) {
          this.importedCounter++;
          this.importedCost += product.price;
          product.print();
        }
      });
  
      console.log("Domestic cost: $" + parseFloat(this.domesticCost).toFixed(1));
      console.log("Imported cost: $" + parseFloat(this.importedCost).toFixed(1));
      console.log("Domestic count: " + this.domesticCounter);
      console.log("Imported count: " + this.importedCounter);
    }
  }
  
  const productList = new ProductList("https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1");
  productList.fetchData();