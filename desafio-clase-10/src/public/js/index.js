const socket = io();

socket.on('productAdded', (product) => {
    console.log(product);
    const productList = document.getElementById('productList');
    const listItem = document.createElement('li');
    listItem.textContent = `${product.title}, ${product.price} ID: ${product.id}`;
    console.log(productList);
    console.log(listItem);
    productList.appendChild(listItem);
});

socket.on('productDeleted', (productId) => {
    const productList = document.getElementById('productList');
    const items = productList.getElementsByTagName('li');
    Array.from(items).forEach((item) => {
        const itemId = item.textContent.split('ID: ')[1];
        if (itemId === productId) {
            productList.removeChild(item);
        }
    });
});

document.getElementById('productForm').addEventListener('submit',
    function (event) {
        event.preventDefault();
        const url = '/api/products';
        const body = {
            title: event.target.elements.title.value,
            description: event.target.elements.description.value,
            price: event.target.elements.price.value,
            thumbnail: [],
            code: event.target.elements.code.value,
            stock: event.target.elements.stock.value
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response);
            if (!response.ok) {
                throw new
                    Error('Error');
            }
            return response.json();
        })
            .then((data) => {
                console.log(data.product);
                socket.emit('addProduct', data.product);
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
                document.getElementById('price').value = '';
                document.getElementById('code').value = '';
                document.getElementById('stock').value = '';
                alert('Product added')
            })
            .catch(error => {
                alert(error.message);
            });
    });

document.getElementById('deleteForm').addEventListener('submit',
    function (event) {
        event.preventDefault();
        const productId = document.getElementById('productId').value;
        const url = '/api/products/' + productId;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                throw new
                    Error('Error');
            }
            return response.json();
        })
            .then(() => {
                socket.emit('deleteProduct', productId);
                document.getElementById('productId').value = '';
                alert('Product deleted');
            })
            .catch(error => {
                alert(error.message);
            });
    });