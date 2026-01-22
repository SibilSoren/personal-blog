# SagaFlow: Proposed Code Structure

For a senior-level microservices project, we want a structure that is **highly modular**, **testable**, and **docker-friendly**. I recommend a **Monorepo** approach for the portfolio so that anyone can see the whole system in one place.

## 📁 Root Directory Layout

```text
SagaFlow/
├── .github/workflows/ (CI/CD scripts)
├── common-lib/        (Shared Event DTOs & Schemas)
├── orchestrator/      (The SagaFlow Engine - Spring Boot)
├── services/
│   ├── order-service/     (Spring Boot)
│   ├── payment-service/   (Spring Boot)
│   └── inventory-service/ (Spring Boot)
├── infrastructure/
│   └── kafka/         (Custom scripts/configs for Kafka)
├── docker-compose.yml (The magic command)
└── README.md          (Installation & Arch docs)
```

---

## 🛠️ Orchestrator Internal Structure
I recommend using **Hexagonal Architecture** (Ports and Adapters) for the orchestrator to keep the business logic separated from Kafka or the Database.

```text
orchestrator/src/main/java/com/sagaflow/
├── domain/
│   ├── model/         (SagaInstance, SagaState, TransactionStep)
│   └── service/       (SagaOrchestratorLogic - Pure Java)
├── application/
│   ├── ports/         (Interfaces: MessagePublisher, StateRepository)
│   └── usecase/       (ProcessOrderSaga, CompensatePayment)
├── infrastructure/
│   ├── adapters/      
│   │   ├── kafka/     (Implementation of MessagePublisher)
│   │   └── db/        (JPA Repositories implementation)
│   └── config/        (KafkaConfig, SecurityConfig)
└── web/               (REST Controllers for external monitoring)
```

---

## 🐳 Sample `docker-compose.yml`
This shows the hiring manager that you understand how to orchestrate the entire environment locally.

```yaml
version: '3.8'
services:
  kafka:
    image: confluentinc/cp-kafka:latest
    ports: ["9092:9092"]
    # ... environment variables ...

  sagaflow-db:
    image: postgres:15
    environment:
      POSTGRES_DB: sagaflow_state
  
  orchestrator:
    build: ./orchestrator
    depends_on:
      - kafka
      - sagaflow-db
    environment:
      KAFKA_BOOTSTRAP_SERVERS: kafka:9092

  payment-service:
    build: ./services/payment-service
    depends_on:
      - kafka
    # Uses its own private database container (optional for smaller demos)
```

---

## 🔑 Key Professional Touches
1.  **Shared Common Lib**: Don't duplicate code. Create a `common-lib` where you define the **Event Schemas** (using POJOs or Avro). All services should import this.
2.  **Healthchecks**: In `docker-compose`, use `healthcheck` to ensure the orchestrator doesn't start until Kafka is fully ready. This is a very "Senior" thing to do.
3.  **Logs Aggregation**: For bonus points, add an **ELK** or **Prometheus** container to the docker-compose to show you care about observability.

Does this structure help you visualize how to start coding the project?
