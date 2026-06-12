products = [
{"name": "Tiffin", "stock": 70},
{"name": "Notebook", "stock": 4},
{"name": "Purse", "stock": 7},
{"name": "Bag", "stock": 49},
{"name": "Laptop", "stock": 9}
]
print("Products with stock less than 10:\n")
for product in products:
if product["stock"] < 10:
print(f"Product Name: {product['name']}, Stock:
{product['stock']}")
