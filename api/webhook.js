from mt4client import MT4Client
#address="tcp://mt4server:28282"
# create ZeroMQ socket and connect to server
#mt4 = MT4Client(address=address)
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    stock = data.get("stock")
    price = float(data.get("price", 0))
    
    if not stock or not price:
        return jsonify({"error": "Invalid payload"}), 400

    # Example account balance; replace with your logic to fetch from MT4
    #account = mt4.account()
    account_balance=1000000
    #account_balance = account.balance  # Replace this with actual MT4 balance logic

    # Calculate lot size
    risk_percentage = 0.01
    lot_size = max(0.01, (account_balance * risk_percentage) / price)

    # Send order to MT4 (replace with actual integration)
    result = send_order_to_mt4(stock, lot_size, price)

    if result.get("success"):
        return jsonify({"message": "Order placed successfully"})
    else:
        return jsonify({"error": "Failed to place order"}), 500


def send_order_to_mt4(stock, lot_size, price):
    # Replace with your logic to send an order to MT4, e.g., via an EA or bridge
    return {"success": True, "message": "Order sent"}

if __name__ == "__main__":
    app.run(port=5000)
