#!/bin/bash

echo "Creating test invoice..."
RESPONSE=$(curl -s -X POST http://localhost:3000/invoices \
-H "Content-Type: application/json" \
-d '{
  "customer": "John Doe",
  "amount": 1500.50,
  "reference": "INV-2024-001",
  "date": "2024-03-21T10:00:00Z",
  "items": [
    {
      "sku": "ITEM-001",
      "qt": 2
    },
    {
      "sku": "ITEM-002",
      "qt": 1
    }
  ]
}')

echo "Response from create invoice:"
echo $RESPONSE | json_pp

ID=$(echo $RESPONSE | grep -o '"_id":"[^"]*' | cut -d'"' -f4)

echo -e "\nCreated invoice ID: $ID"

echo -e "\nWaiting 5 seconds..."
sleep 5

echo -e "\nGetting all invoices:"
curl -s http://localhost:3000/invoices | json_pp

echo -e "\nGetting specific invoice:"
curl -s http://localhost:3000/invoices/$ID | json_pp

echo -e "\nWaiting for daily report (60 seconds)..."
sleep 60

echo -e "\nChecking service logs:"
echo -e "\nInvoice Service Logs:"
docker-compose logs --tail=50 invoice-service

echo -e "\nEmail Service Logs:"
docker-compose logs --tail=50 email-service 