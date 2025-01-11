# How create a new invoice

1. Create a new invoice in the invoice-service
2. Send the invoice to the email-service
3. The email-service will send an email to the customer with the invoice

curl -X POST http://localhost:3000/invoices \
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
}'
```
