

const filterProduct = ({
    products = [],
    filterBy = null,
    category, limit = null,
    except = null,
    sellerUID = null,
    state = null,
    district = null,
    block = null,
    producedBy = null,
    search = null,
    minMax = null
}) => {
    limit = limit ? limit : products.length - 1
    var localProducts = products;

    if (category && producedBy) {
        var catdata = [];
        category = category.toLowerCase()
        catdata = localProducts.filter(item => item.category.toLowerCase().includes(category))
        if (producedBy === 'inorganic') {
            localProducts = catdata.filter(item => item.organic === 'no')
        } else if (producedBy === 'organic') {
            localProducts = catdata.filter(item => item.organic === 'yes')
        } else {
            localProducts = catdata
        }
    }
    if (category) {
        const allProducts = [...localProducts];
        category = category.includes("%") ? category.split("%")[0] : category
        category = category.toLowerCase()
        localProducts = localProducts.filter(item => item.category.toLowerCase().includes(category))
        if(localProducts.length === 0){
                const searchQuery = category.toLowerCase();
                localProducts = allProducts.filter((item) => {
                    // const name = item.name.toLowerCase();
                    // const seller = item.sellerName.toLowerCase();
                    // const category = item.category.toLowerCase();
                    const name = item.name ? item.name.toLowerCase() : "";
                    const seller = item.sellerName ? item.sellerName.toLowerCase() : "";
                    const category = item.category ? item.category.toLowerCase() : "";
        
                    return name.includes(searchQuery) || seller.includes(searchQuery) || category.includes(searchQuery);
                });
        }
    }
    if (filterBy === "seller") {
        localProducts = localProducts.filter(item => item.sellerUID === sellerUID)
    }
    if (filterBy === "state") {
        localProducts = localProducts.filter(item => item.state.toLowerCase() === state.toLowerCase())
    }
    if (filterBy === "district") {
        localProducts = localProducts.filter(item => item.district.toLowerCase() === district.toLowerCase())
    }
    if (filterBy === "block") {
        localProducts = localProducts.filter(item => item.block?.toLowerCase() === block.toLowerCase())
    }
    if (/\d/.test(filterBy)) {
        const selectedPriceRange = Number(filterBy)
        localProducts = localProducts.filter(item => item.price <= selectedPriceRange)
    }
    if (except) {
        localProducts = localProducts.filter(item => item.id != except)
    }
    if (minMax) {
        const [minPrice, maxPrice] = minMax; // Assuming minMax is an array [minPrice, maxPrice]
        localProducts = localProducts.filter(item => item.price >= minPrice && item.price <= maxPrice);
    }

    return localProducts.splice(0, limit)
}

export default filterProduct