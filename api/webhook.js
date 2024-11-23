import json

def handler(request):
    try:
        # Parse incoming JSON payload
        data = json.loads(request.body.decode())
    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid payload", "details": str(e)})
        }

    # Extract parameters
    stock = data.get("stock")
    price = float(data.get("price", 0))

    if not stock or not price:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Missing 'stock' or 'price'"})
        }

    # Example logic for lot size calculation
    account_balance = 10000  # Replace with dynamic balance logic
    risk_percentage = 0.01
    lot_size = max(0.01, (account_balance * risk_percentage) / price)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "stock": stock,
            "price": price,
            "lot_size": lot_size
        })
    }
