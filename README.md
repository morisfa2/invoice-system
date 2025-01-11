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

## API Usage

### Create New Invoice

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

### Get All Invoices
```bash
curl http://localhost:3000/invoices | json_pp
```

### Get Specific Invoice
```bash
# Replace {id} with actual invoice ID
curl http://localhost:3000/invoices/{id} | json_pp
```

### Monitor Daily Reports

1. Check invoice service logs:
```bash
docker-compose logs -f invoice-service
```

2. Check email service logs:
```bash
docker-compose logs -f email-service
```

3. Check RabbitMQ queue:
- Open RabbitMQ dashboard (see Monitoring section)
- Go to Queues tab
- Look for 'daily_sales_report' queue


## Monitoring

- RabbitMQ dashboard: http://localhost:15672
  - username: guest 
  - passowrd: guest

