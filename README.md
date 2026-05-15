# 🦈 DentalShark Marketplace

DentalShark is a high-performance, premium dental equipment marketplace and AI diagnostic platform. This project is built using modern React best practices, meeting all technical requirements for a professional-grade web application.

## 🚀 Key Features & Requirements Met

### 1. Modern Project Structure
The project follows a clean, industry-standard folder organization:
- `src/components`: Reusable UI components.
- `src/context`: Global state management using Context API.
- `src/hooks`: Custom React hooks for shared logic.
- `src/pages`: Main application views.
- `src/utils`: Utility functions and API integration.
- `src/styles`: Theme and design system tokens.

### 2. React Hooks & State Management
- **useState**: Extensively used for local state (forms, UI toggles, loading states).
- **useEffect**: Used for handling side effects like API calls and legacy script synchronization.
- **Context API**: Global state for user authentication, shopping cart, wishlist, and theme persistence.

### 3. Advanced Component Architecture
- **Reusable Components**: Modular UI elements like `FeatureItem`, `StyledButton`, and `ProductCard`.
- **Props & Mapping**: Components receive data via props, and lists (e.g., tech stack, products) are rendered efficiently using `.map()`.
- **Event Handling**: Robust handling of user interactions (clicks, form submissions, input changes).

### 4. Styling Techniques
This project demonstrates multiple styling approaches:
- **External CSS**: Global styles and resets in `index.css`.
- **Internal Styling**: Component-specific styles for precise layout control.
- **Styled Components**: Dynamic, theme-aware components using the `styled-components` library.
- **Bootstrap 5**: Integrated via `@layer` to provide grid utilities and base components without conflicting with custom designs.

### 5. API Integration (GET & POST)
A dedicated `api.js` utility handles backend communication:
- **GET Methods**: Fetching products and user profiles.
- **POST Methods**: Handling AI analysis requests and form submissions.
- **Async/Await**: Clean, readable asynchronous logic with error handling.

### 6. Authentication & Persistence
- **"Faster" Auth**: User session is persisted in `localStorage`.
- **Session Restoration**: On page reload, the application immediately restores the user state from local storage and verifies it in the background, ensuring no "back to login" flicker.

### 7. Routing & Navigation
- **React Router 7**: Implemented for seamless navigation between the main site and the technical demonstration pages.

## 🛠️ Installation & Setup

1. **Prerequisites**: Ensure you have Node.js installed.
2. **Backend**:
   ```bash
   cd backend
   npm install
   npm start
   ```
3. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📝 Code Documentation
Each section of the code is clearly commented to explain its purpose and how it satisfies specific project requirements.

---
*Built with ❤️ for the Dental Industry.*
