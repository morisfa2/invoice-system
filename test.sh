#!/bin/bash

# Create an invoice
echo "Creating invoice..."
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

# Extract the ID from the response
ID=$(echo $RESPONSE | grep -o '"_id":"[^"]*' | cut -d'"' -f4)

echo "Invoice created with ID: $ID"

# Get all invoices
echo -e "\nGetting all invoices..."
curl -s http://localhost:3000/invoices | json_pp

# Get specific invoice
echo -e "\nGetting specific invoice..."
curl -s http://localhost:3000/invoices/$ID | json_pp 