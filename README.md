# Invoice & Daily Sales Report System

A microservice system built with NestJS for managing invoices and generating daily sales reports.

## Setup

1. Clone repo and install Docker + Docker Compose

2. Build & run services:
```bash
docker-compose up --build
```

3. Wait till all services are runing (mongodb, rabbitmq, invoice-service, email-service)

## Testing

1. Make test.sh executable:
```bash
chmod +x test.sh
```

2. Run tests:
```bash
./test.sh
```

This will:
- Create sample invoice
- Get all invoces
- Get specific invoice
- Wait for daily report generation
- Show service logs

## Create Invoice Manually

```bash
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

## Services

- Invoice Service (port 3000): Handles invoice CRUD + daily report generation
- Email Service: Processes daily reports & sends emails
- MongoDB (port 27017): Database
- RabbitMQ (ports 5672, 15672): Message broker

## Monitoring

- RabbitMQ dashboard: http://localhost:15672
  - username: guest 
  - passowrd: guest

## Notes

- Daily reports generate every minute (for testing)
- Email service uses mock SMTP settings
```
