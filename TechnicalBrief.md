# Technical Brief: Remote Worker Tracker

## Overview & Goals

This document outlines the technical architecture and strategic decisions for the Remote Worker Tracker mobile application. The primary goal is to establish a solid foundation that supports rapid feature development, team scalability, and long-term maintainability.

For the time constraint I have made the following compromises:

- Focused on iOS only, the native module is not implemented on Android
- Not 100% completion, only the fetch worker is implemented without any pagination support. Worker details screen does not utilize the domain usecase or repository layer.
- Not added any offline persistence layer
- Not added any analytics or observability layer
- Not added any unit test
- Not added any integration test
- Did not modify any config files (babel.config.js, .prettierrc etc).

## Architectural Rationale: Clean Architecture

The application is built using **Clean Architecture**, a variant of MVVM (Model-View-ViewModel). This choice was deliberate and offers significant advantages over simpler patterns like standard MVC or MVVM for scalability and maintainability.

- **Structure:** The architecture is divided into three primary layers:

  - **Presentation:** Contains the UI (React Components) and presentation logic (ViewModels/Stores). It is the framework-dependent part of the app.
  - **Domain:** The core of the application. It contains the business logic (Use Cases) and business objects (Entities). It is completely independent of any framework.
  - **Data:** Responsible for data retrieval and storage. It contains Repository implementations and Data Sources (e.g., API clients, local database). Right now, I have not added any offline persistence layer. But this layer will handle those logics.

- **Benefits vs. Other Patterns:**

  - **Scalability & Maintainability:** By decoupling the business logic from the UI and data sources, we can modify or replace any layer with minimal impact on the others. This is crucial for a rapidly evolving app.
  - **Testability:** Each layer can be tested in isolation. Mocking dependencies is straightforward, leading to robust and reliable unit and integration tests.
  - **Team Collaboration:** Different developers can work on different layers simultaneously (e.g., one on UI, another on a data source) with fewer merge conflicts and clearer ownership boundaries.

- **Drawbacks & Mitigation:**
  - **Initial Complexity:** Clean Architecture requires more initial setup and boilerplate. This is mitigated by using code generation tools and establishing clear conventions, which pay off as the project complexity grows. Another overhead could be developer onboarding if they are not familiar with this architecture. But this is a one-time cost.

## State Management: Zustand & Immer

I have used **Zustand** for state management. It is a simple, fast, and scalable state management library for React. It is a great choice for small to medium-sized applications, and it is also a great choice for large applications that need to manage complex state. **Immer** helps to mutate the state in a more readable way.

## Navigation: React Navigation

I have used **React Navigation** for navigation. It is a simple, fast, and scalable navigation library for React. It is a great choice for small to medium-sized applications, and it is also a great choice for large applications that need to manage complex navigation.

## Rationale for react-native-maps

I have used **react-native-maps** for maps. It is a popular, simple, fast, and scalable maps library for React Native. It is a great choice for small to medium-sized applications, and it is also a great choice for large applications that need to manage complex maps.

Limitations faced for react-native-maps: I could not use the latest version of React Native(0.80.1), since react-native-maps is not compatible with it. I had to stick to React Native 0.79.3. This is a known issue and it is also an example of how React Native can be bottlenecked by third-party libraries. This downgrade is not a huge drawback as 0.79.3 still uses TurboModule and Fabric with new architecture.

Also if the app needs more fine grained control we can either create our own map native module or use **Mapbox**. The MapView is created as a reusable component, giving us the flexibility to switch to other solutions in the future.

## Native Modules: SOS & Turbo Modules

While the current implementation is entirely in TypeScript, we anticipate the need for native modules for performance-critical tasks or accessing platform-specific APIs (e.g., an SOS feature for emergency alerts). For a 2025 greenfield modern React Native app, I have used TurboModule to have placeholder native module for now. This serves as proof of concept for the SOS feature.

- **Strategy:** We can use React Native's **Turbo Modules** for any new native functionality. Turbo Modules offer significant performance improvements over the traditional "Bridge"-based modules by using JSI (JavaScript Interface), enabling direct, synchronous communication between JavaScript and native code.
- **Benefits:**

  - **Performance:** Eliminates the overhead of the asynchronous, JSON-serialized bridge.
  - **Type Safety:** The architecture enforces type-safe communication between JS and native code.

A placeholder TurboModule is added for iOS SOS integration. Android implementation is omitted due to timebox.

## Testing Strategy

While not implemented in this timebox, test scaffolding is ready and the architecture is designed to support layered testing. A multi-layered testing strategy ensures code quality and application stability:

- **Unit Tests (Jest):** Focus on the **Domain** and **Data** layers. Use cases, data mapping logic, and repository implementations will be thoroughly tested with mocked dependencies.
- **ViewModel/Store Tests (Jest & React Native Testing Library):** Test the presentation logic, ensuring UI state changes correctly in response to user actions and data updates.
- **Component Tests (React Native Testing Library):** Render individual UI components to verify they display correctly based on their props and state.
- **Integration Tests:** Test the interaction between layers, for example, ensuring a screen correctly fetches and displays data from its ViewModel, which in turn uses a repository.

## Scaling for Analytics and Logging

To support data-driven decisions and proactive issue resolution, a scalable analytics and logging strategy is essential.

- **Logging:** Implement a centralized logging provider (e.g., Sentry, Datadog). An abstraction layer can be created to wrap the provider's SDK, allowing us to switch providers in the future with minimal code changes.
- **Analytics:** Similar to logging, we can use a dedicated analytics service (e.g., Mixpanel, Amplitude) wrapped in our own `AnalyticsService`. This service will provide a simple, consistent API for tracking events throughout the app, decoupling our code from the specific implementation details of the analytics provider.

## API Layer: From Mock to Production

The current API is mocked within the data layer, which has allowed for rapid UI development and testing without a backend dependency.

- **Rationale:** The **Repository Pattern** is key here. The `domain` layer depends on a `Repository` interface, not a concrete implementation. The `presentation` layer is completely unaware of the data source.
- **Transition to Production:** To switch to a live API, we can:

  1. Create a new `ApiDataSource` that uses a robust HTTP client like `axios`.
  2. Implement a production version of the repository that uses this new data source.
  3. Use dependency injection to provide the production repository to our use cases.

  - This entire process requires **zero changes** to the domain or presentation layers, demonstrating the power of this architecture.

- **Offline Persistence:** Offline-first support can be added via zustand/persist, MMKV or SQLite in the data layer without affecting domain logic.

## AI Tool Usage Rationale

AI-powered tools, specifically an agentic coding assistant (Windsurf Cascade), was utilized to accelerate development and improve the quality of the final product.

- **Code Generation:** Boilerplate for components, tests, and data models was generated automatically, freeing up developer time to focus on business logic.
- **Documentation:** This document was drafted and refined with AI assistance, ensuring clarity, conciseness, and completeness.

Besides Windsurf Cascade, I have used Perplexity for research and ChatGPT for rubber ducking ideas, brainstorming, and general knowledge.

This take-home prioritizes architectural soundness, long-term maintainability, and team-scale readiness over feature completeness. It demonstrates a pragmatic foundation to support a rapidly evolving mobile platform
