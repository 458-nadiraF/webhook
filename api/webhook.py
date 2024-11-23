import json
import requests

def handler(request):
    try:
        # Parse incoming request data
        data = json.loads(request.body.decode())
        stock = data.get("stock")
        price = data.get("price")

        # Construct payload for the outgoing webhook
        outgoing_payload = {
            "stock": stock,
            "price": price,
            "lot_size": 0.01  # Example calculation
        }

        # Outgoing webhook URL
        outgoing_webhook_url = "https://example-webhook-url.com/endpoint"

        # Send POST request to the outgoing webhook
        headers = {"Content-Type": "application/json"}
        response = requests.post(outgoing_webhook_url, data=json.dumps(outgoing_payload), headers=headers)

        # Check the response from the outgoing webhook
        if response.status_code == 200:
            return {
                "statusCode": 200,
                "body": json.dumps({"message": "Forwarded successfully", "response": response.json()})
            }
        else:
            return {
                "statusCode": response.status_code,
                "body": json.dumps({"error": "Failed to forward", "response": response.text})
            }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
